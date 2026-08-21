-- CMS login is not auth.uid(), so staff_* RLS policies reject browser upserts.
-- Persist catalogue rows inside cms_save_state after ANY valid cms_admins session.
-- PL/pgSQL variables must not be named slug (or they clash with table columns).

alter table public.programs add column if not exists cover_image text;
alter table public.programs add column if not exists cover_image_alt text;
alter table public.programs add column if not exists description_te text;
alter table public.programs add column if not exists level text not null default 'all';

alter table public.community_groups add column if not exists name_te text;
alter table public.community_groups add column if not exists description_te text;
alter table public.community_groups add column if not exists journey_stages text[] not null default '{}';

alter table public.experts add column if not exists bio_te text;

alter table public.blog_posts add column if not exists title_te text;
alter table public.blog_posts add column if not exists excerpt_te text;
alter table public.blog_posts add column if not exists content_te text;
alter table public.blog_posts add column if not exists featured_image_alt text;
alter table public.blog_posts add column if not exists author_name text;
alter table public.blog_posts add column if not exists seo_title_te text;
alter table public.blog_posts add column if not exists seo_description_te text;
alter table public.blog_posts add column if not exists tags text[] not null default '{}';

create or replace function public.cms_save_state(p_token uuid, p_staff jsonb, p_published jsonb, p_settings jsonb, p_media jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
#variable_conflict use_variable
declare
  v_caller_id uuid;
  v_actor text;
  v_row jsonb;
  v_extra jsonb;
  v_coll text;
  v_slug text;
  v_page_slug text;
  v_published boolean;
  v_tags text[];
begin
  select s.admin_id into v_caller_id
  from public.cms_admin_sessions s
  where s.token = p_token and s.expires_at > now();
  if v_caller_id is null then
    return jsonb_build_object('ok', false, 'error', 'Session expired. Sign in again.');
  end if;

  select coalesce(nullif(trim(a.display_name), ''), a.username)
    into v_actor
  from public.cms_admins a
  where a.id = v_caller_id;
  v_actor := coalesce(v_actor, 'WonderHug Editorial');

  insert into public.cms_blocks (block_key, locale, payload)
  values
    ('staff_cms', 'en', coalesce(p_staff, '{}'::jsonb)),
    ('cms_published', 'en', coalesce(p_published, '{}'::jsonb)),
    ('homepage_hero', 'en', coalesce(p_settings, '{}'::jsonb)),
    ('media_assets', 'en', coalesce(p_media, '{}'::jsonb))
  on conflict (block_key, locale) do update
    set payload = excluded.payload, updated_at = now();

  for v_row in
    select value from jsonb_array_elements(coalesce(p_staff->'items', '[]'::jsonb))
  loop
    v_coll := v_row->>'collection';
    v_slug := nullif(btrim(coalesce(v_row->>'slug', '')), '');
    v_extra := coalesce(v_row->'extra', '{}'::jsonb);
    v_published := coalesce(v_row->>'status', '') = 'published';
    if v_slug is null then
      continue;
    end if;

    if v_coll = 'posts' then
      select coalesce(array_agg(trim(part)), '{}'::text[])
        into v_tags
      from unnest(string_to_array(coalesce(v_extra->>'tags', ''), ',')) as part
      where trim(part) <> '';
      begin
        insert into public.blog_posts (
          slug, title, title_te, excerpt, excerpt_te, content, content_te,
          featured_image, featured_image_alt, category, tags, author_name,
          is_published, is_featured, seo_title, seo_description, published_at, updated_at
        )
        values (
          v_slug,
          coalesce(nullif(v_row->>'title', ''), v_slug),
          coalesce(v_row->>'titleTe', ''),
          v_row->>'excerpt',
          v_row->>'excerptTe',
          v_row->>'body',
          v_row->>'bodyTe',
          v_row->>'imageUrl',
          v_row->>'imageAlt',
          coalesce(nullif(v_extra->>'category', ''), 'Pregnancy'),
          coalesce(v_tags, '{}'::text[]),
          coalesce(nullif(v_extra->>'authorName', ''), v_actor),
          v_published,
          coalesce(v_extra->>'featured', '') = 'true',
          coalesce(nullif(v_extra->>'seoTitle', ''), v_row->>'title'),
          coalesce(nullif(v_extra->>'seoDescription', ''), v_row->>'excerpt'),
          case when v_published then now() else null end,
          now()
        );
      exception
        when unique_violation then
          update public.blog_posts set
            title = coalesce(nullif(v_row->>'title', ''), v_slug),
            title_te = coalesce(v_row->>'titleTe', ''),
            excerpt = v_row->>'excerpt',
            excerpt_te = v_row->>'excerptTe',
            content = v_row->>'body',
            content_te = v_row->>'bodyTe',
            featured_image = v_row->>'imageUrl',
            featured_image_alt = v_row->>'imageAlt',
            category = coalesce(nullif(v_extra->>'category', ''), 'Pregnancy'),
            tags = coalesce(v_tags, '{}'::text[]),
            author_name = coalesce(nullif(v_extra->>'authorName', ''), v_actor),
            is_published = v_published,
            is_featured = coalesce(v_extra->>'featured', '') = 'true',
            seo_title = coalesce(nullif(v_extra->>'seoTitle', ''), v_row->>'title'),
            seo_description = coalesce(nullif(v_extra->>'seoDescription', ''), v_row->>'excerpt'),
            published_at = case when v_published then now() else null end,
            updated_at = now()
          where public.blog_posts.slug = v_slug;
      end;

    elsif v_coll = 'products' then
      begin
        insert into public.products (
          slug, name, name_te, description, description_te, price_paise, image, category, is_digital, is_published, updated_at
        )
        values (
          v_slug,
          coalesce(nullif(v_row->>'title', ''), v_slug),
          v_row->>'titleTe',
          coalesce(nullif(v_row->>'excerpt', ''), nullif(v_row->>'body', ''), ''),
          coalesce(nullif(v_row->>'excerptTe', ''), v_row->>'bodyTe'),
          case when v_extra->>'pricePaise' ~ '^[0-9]+$' then (v_extra->>'pricePaise')::int else 0 end,
          v_row->>'imageUrl',
          coalesce(nullif(v_extra->>'category', ''), 'digital'),
          coalesce(v_extra->>'isDigital', 'true') <> 'false',
          v_published,
          now()
        );
      exception
        when unique_violation then
          update public.products set
            name = coalesce(nullif(v_row->>'title', ''), v_slug),
            name_te = v_row->>'titleTe',
            description = coalesce(nullif(v_row->>'excerpt', ''), nullif(v_row->>'body', ''), ''),
            description_te = coalesce(nullif(v_row->>'excerptTe', ''), v_row->>'bodyTe'),
            price_paise = case when v_extra->>'pricePaise' ~ '^[0-9]+$' then (v_extra->>'pricePaise')::int else 0 end,
            image = v_row->>'imageUrl',
            category = coalesce(nullif(v_extra->>'category', ''), 'digital'),
            is_digital = coalesce(v_extra->>'isDigital', 'true') <> 'false',
            is_published = v_published,
            updated_at = now()
          where public.products.slug = v_slug;
      end;

    elsif v_coll = 'programs' then
      begin
        insert into public.programs (
          slug, name, name_te, summary, summary_te, description, description_te,
          price_paise, duration_weeks, cover_image, cover_image_alt, level, is_published, updated_at
        )
        values (
          v_slug,
          coalesce(nullif(v_row->>'title', ''), v_slug),
          v_row->>'titleTe',
          coalesce(nullif(v_row->>'excerpt', ''), ''),
          v_row->>'excerptTe',
          coalesce(nullif(v_row->>'body', ''), ''),
          v_row->>'bodyTe',
          case when v_extra->>'pricePaise' ~ '^[0-9]+$' then (v_extra->>'pricePaise')::int else 0 end,
          case when v_extra->>'durationWeeks' ~ '^[0-9]+$' then (v_extra->>'durationWeeks')::int else 4 end,
          v_row->>'imageUrl',
          v_row->>'imageAlt',
          coalesce(nullif(v_extra->>'level', ''), 'all'),
          v_published,
          now()
        );
      exception
        when unique_violation then
          update public.programs set
            name = coalesce(nullif(v_row->>'title', ''), v_slug),
            name_te = v_row->>'titleTe',
            summary = coalesce(nullif(v_row->>'excerpt', ''), ''),
            summary_te = v_row->>'excerptTe',
            description = coalesce(nullif(v_row->>'body', ''), ''),
            description_te = v_row->>'bodyTe',
            price_paise = case when v_extra->>'pricePaise' ~ '^[0-9]+$' then (v_extra->>'pricePaise')::int else 0 end,
            duration_weeks = case when v_extra->>'durationWeeks' ~ '^[0-9]+$' then (v_extra->>'durationWeeks')::int else 4 end,
            cover_image = v_row->>'imageUrl',
            cover_image_alt = v_row->>'imageAlt',
            level = coalesce(nullif(v_extra->>'level', ''), 'all'),
            is_published = v_published,
            updated_at = now()
          where public.programs.slug = v_slug;
      end;

    elsif v_coll = 'practices' then
      begin
        insert into public.garbh_practices (
          slug, title, title_te, description, duration_minutes, media_type, trimester, is_published
        )
        values (
          v_slug,
          coalesce(nullif(v_row->>'title', ''), v_slug),
          v_row->>'titleTe',
          coalesce(nullif(v_row->>'excerpt', ''), nullif(v_row->>'body', ''), ''),
          case when v_extra->>'durationMinutes' ~ '^[0-9]+$' then (v_extra->>'durationMinutes')::int else 10 end,
          coalesce(nullif(v_extra->>'mediaType', ''), 'guide'),
          coalesce(nullif(v_extra->>'trimester', ''), 'any'),
          v_published
        );
      exception
        when unique_violation then
          update public.garbh_practices set
            title = coalesce(nullif(v_row->>'title', ''), v_slug),
            title_te = v_row->>'titleTe',
            description = coalesce(nullif(v_row->>'excerpt', ''), nullif(v_row->>'body', ''), ''),
            duration_minutes = case when v_extra->>'durationMinutes' ~ '^[0-9]+$' then (v_extra->>'durationMinutes')::int else 10 end,
            media_type = coalesce(nullif(v_extra->>'mediaType', ''), 'guide'),
            trimester = coalesce(nullif(v_extra->>'trimester', ''), 'any'),
            is_published = v_published
          where public.garbh_practices.slug = v_slug;
      end;

    elsif v_coll = 'groups' then
      begin
        insert into public.community_groups (
          slug, name, name_te, description, description_te, is_published
        )
        values (
          v_slug,
          coalesce(nullif(v_row->>'title', ''), v_slug),
          v_row->>'titleTe',
          coalesce(nullif(v_row->>'excerpt', ''), v_row->>'body'),
          v_row->>'excerptTe',
          v_published
        );
      exception
        when unique_violation then
          update public.community_groups set
            name = coalesce(nullif(v_row->>'title', ''), v_slug),
            name_te = v_row->>'titleTe',
            description = coalesce(nullif(v_row->>'excerpt', ''), v_row->>'body'),
            description_te = v_row->>'excerptTe',
            is_published = v_published
          where public.community_groups.slug = v_slug;
      end;

    elsif v_coll = 'experts' then
      begin
        insert into public.experts (
          slug, name, photo, speciality, qualification, bio, bio_te, availability,
          booking_url, is_faculty_seat, is_listed, review_status, updated_at
        )
        values (
          v_slug,
          coalesce(nullif(v_row->>'title', ''), v_slug),
          v_row->>'imageUrl',
          coalesce(nullif(v_extra->>'speciality', ''), 'Garbh Sanskar Guides'),
          coalesce(nullif(v_extra->>'qualification', ''), v_row->>'excerpt'),
          v_row->>'body',
          v_row->>'bodyTe',
          coalesce(v_extra->>'availability', ''),
          nullif(v_extra->>'bookingUrl', ''),
          coalesce(v_extra->>'isFacultySeat', 'true') <> 'false',
          v_published,
          'in_review',
          now()
        );
      exception
        when unique_violation then
          update public.experts set
            name = coalesce(nullif(v_row->>'title', ''), v_slug),
            photo = v_row->>'imageUrl',
            speciality = coalesce(nullif(v_extra->>'speciality', ''), 'Garbh Sanskar Guides'),
            qualification = coalesce(nullif(v_extra->>'qualification', ''), v_row->>'excerpt'),
            bio = v_row->>'body',
            bio_te = v_row->>'bodyTe',
            availability = coalesce(v_extra->>'availability', ''),
            booking_url = nullif(v_extra->>'bookingUrl', ''),
            is_faculty_seat = coalesce(v_extra->>'isFacultySeat', 'true') <> 'false',
            is_listed = v_published,
            review_status = 'in_review',
            updated_at = now()
          where public.experts.slug = v_slug;
      end;

    elsif v_coll = 'pages' then
      v_page_slug := regexp_replace(v_slug, '^/+', '');
      begin
        insert into public.site_pages (
          slug, locale, title, kicker, intro, body, related, seo_title, seo_description, is_published, updated_at
        )
        values (
          v_page_slug,
          'en',
          coalesce(nullif(v_row->>'title', ''), v_page_slug),
          coalesce(v_extra->>'kicker', ''),
          v_row->>'excerpt',
          jsonb_build_array(jsonb_build_object('heading', coalesce(v_row->>'title', ''), 'body', coalesce(v_row->>'body', ''))),
          '[]'::jsonb,
          coalesce(nullif(v_extra->>'seoTitle', ''), v_row->>'title'),
          coalesce(nullif(v_extra->>'seoDescription', ''), v_row->>'excerpt'),
          v_published,
          now()
        );
      exception
        when unique_violation then
          update public.site_pages set
            title = coalesce(nullif(v_row->>'title', ''), v_page_slug),
            kicker = coalesce(v_extra->>'kicker', ''),
            intro = v_row->>'excerpt',
            body = jsonb_build_array(jsonb_build_object('heading', coalesce(v_row->>'title', ''), 'body', coalesce(v_row->>'body', ''))),
            seo_title = coalesce(nullif(v_extra->>'seoTitle', ''), v_row->>'title'),
            seo_description = coalesce(nullif(v_extra->>'seoDescription', ''), v_row->>'excerpt'),
            is_published = v_published,
            updated_at = now()
          where public.site_pages.slug = v_page_slug and public.site_pages.locale = 'en';
      end;
    end if;
  end loop;

  return jsonb_build_object('ok', true);
end;
$$;

grant execute on function public.cms_save_state(uuid, jsonb, jsonb, jsonb, jsonb) to anon, authenticated;
grant execute on function public.cms_admin_login(text, text) to anon, authenticated;
grant execute on function public.cms_admin_verify(uuid) to anon, authenticated;
grant execute on function public.cms_admin_create(uuid, text, text, text) to anon, authenticated;
grant execute on function public.cms_admin_list(uuid) to anon, authenticated;

insert into storage.buckets (id, name, public)
values ('cms-media', 'cms-media', true)
on conflict (id) do nothing;

drop policy if exists cms_media_public_read on storage.objects;
create policy cms_media_public_read on storage.objects
  for select using (bucket_id = 'cms-media');

drop policy if exists cms_media_public_insert on storage.objects;
create policy cms_media_public_insert on storage.objects
  for insert with check (bucket_id = 'cms-media');

drop policy if exists cms_media_public_update on storage.objects;
create policy cms_media_public_update on storage.objects
  for update using (bucket_id = 'cms-media') with check (bucket_id = 'cms-media');
