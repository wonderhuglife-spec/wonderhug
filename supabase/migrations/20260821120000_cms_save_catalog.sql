-- CMS login is not auth.uid(), so staff_* RLS policies reject browser upserts.
-- Persist catalogue rows inside cms_save_state after the admin session is verified.

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
declare
  caller_id uuid;
  item jsonb;
  extra jsonb;
  coll text;
  slug text;
  published boolean;
  page_slug text;
begin
  select s.admin_id into caller_id
  from public.cms_admin_sessions s
  where s.token = p_token and s.expires_at > now();
  if caller_id is null then
    return jsonb_build_object('ok', false, 'error', 'Session expired. Sign in again.');
  end if;

  insert into public.cms_blocks (block_key, locale, payload)
  values
    ('staff_cms', 'en', coalesce(p_staff, '{}'::jsonb)),
    ('cms_published', 'en', coalesce(p_published, '{}'::jsonb)),
    ('homepage_hero', 'en', coalesce(p_settings, '{}'::jsonb)),
    ('media_assets', 'en', coalesce(p_media, '{}'::jsonb))
  on conflict (block_key, locale) do update
    set payload = excluded.payload, updated_at = now();

  for item in
    select value from jsonb_array_elements(coalesce(p_staff->'items', '[]'::jsonb))
  loop
    coll := item->>'collection';
    slug := nullif(btrim(coalesce(item->>'slug', '')), '');
    extra := coalesce(item->'extra', '{}'::jsonb);
    published := coalesce(item->>'status', '') = 'published';
    if slug is null then
      continue;
    end if;

    if coll = 'posts' then
      insert into public.blog_posts (
        slug, title, title_te, excerpt, excerpt_te, content, content_te,
        featured_image, featured_image_alt, category, tags, author_name,
        is_published, is_featured, seo_title, seo_description, published_at, updated_at
      )
      values (
        slug,
        coalesce(nullif(item->>'title', ''), slug),
        coalesce(item->>'titleTe', ''),
        item->>'excerpt',
        item->>'excerptTe',
        item->>'body',
        item->>'bodyTe',
        item->>'imageUrl',
        item->>'imageAlt',
        coalesce(nullif(extra->>'category', ''), 'Pregnancy'),
        coalesce((
          select array_agg(trim(part))
          from unnest(string_to_array(coalesce(extra->>'tags', ''), ',')) as part
          where trim(part) <> ''
        ), '{}'::text[]),
        coalesce(nullif(extra->>'authorName', ''), 'WonderHug Editorial'),
        published,
        coalesce(extra->>'featured', '') = 'true',
        coalesce(nullif(extra->>'seoTitle', ''), item->>'title'),
        coalesce(nullif(extra->>'seoDescription', ''), item->>'excerpt'),
        case when published then now() else null end,
        now()
      )
      on conflict (slug) do update set
        title = excluded.title,
        title_te = excluded.title_te,
        excerpt = excluded.excerpt,
        excerpt_te = excluded.excerpt_te,
        content = excluded.content,
        content_te = excluded.content_te,
        featured_image = excluded.featured_image,
        featured_image_alt = excluded.featured_image_alt,
        category = excluded.category,
        tags = excluded.tags,
        author_name = excluded.author_name,
        is_published = excluded.is_published,
        is_featured = excluded.is_featured,
        seo_title = excluded.seo_title,
        seo_description = excluded.seo_description,
        published_at = excluded.published_at,
        updated_at = now();

    elsif coll = 'products' then
      insert into public.products (
        slug, name, name_te, description, description_te, price_paise, image, category, is_digital, is_published, updated_at
      )
      values (
        slug,
        coalesce(nullif(item->>'title', ''), slug),
        item->>'titleTe',
        coalesce(nullif(item->>'excerpt', ''), nullif(item->>'body', ''), ''),
        coalesce(nullif(item->>'excerptTe', ''), item->>'bodyTe'),
        case when extra->>'pricePaise' ~ '^[0-9]+$' then (extra->>'pricePaise')::int else 0 end,
        item->>'imageUrl',
        coalesce(nullif(extra->>'category', ''), 'digital'),
        coalesce(extra->>'isDigital', 'true') <> 'false',
        published,
        now()
      )
      on conflict (slug) do update set
        name = excluded.name,
        name_te = excluded.name_te,
        description = excluded.description,
        description_te = excluded.description_te,
        price_paise = excluded.price_paise,
        image = excluded.image,
        category = excluded.category,
        is_digital = excluded.is_digital,
        is_published = excluded.is_published,
        updated_at = now();

    elsif coll = 'programs' then
      insert into public.programs (
        slug, name, name_te, summary, summary_te, description, description_te,
        price_paise, duration_weeks, cover_image, cover_image_alt, level, is_published, updated_at
      )
      values (
        slug,
        coalesce(nullif(item->>'title', ''), slug),
        item->>'titleTe',
        coalesce(nullif(item->>'excerpt', ''), ''),
        item->>'excerptTe',
        coalesce(nullif(item->>'body', ''), ''),
        item->>'bodyTe',
        case when extra->>'pricePaise' ~ '^[0-9]+$' then (extra->>'pricePaise')::int else 0 end,
        case when extra->>'durationWeeks' ~ '^[0-9]+$' then (extra->>'durationWeeks')::int else 4 end,
        item->>'imageUrl',
        item->>'imageAlt',
        coalesce(nullif(extra->>'level', ''), 'all'),
        published,
        now()
      )
      on conflict (slug) do update set
        name = excluded.name,
        name_te = excluded.name_te,
        summary = excluded.summary,
        summary_te = excluded.summary_te,
        description = excluded.description,
        description_te = excluded.description_te,
        price_paise = excluded.price_paise,
        duration_weeks = excluded.duration_weeks,
        cover_image = excluded.cover_image,
        cover_image_alt = excluded.cover_image_alt,
        level = excluded.level,
        is_published = excluded.is_published,
        updated_at = now();

    elsif coll = 'practices' then
      insert into public.garbh_practices (
        slug, title, title_te, description, duration_minutes, media_type, trimester, is_published
      )
      values (
        slug,
        coalesce(nullif(item->>'title', ''), slug),
        item->>'titleTe',
        coalesce(nullif(item->>'excerpt', ''), nullif(item->>'body', ''), ''),
        case when extra->>'durationMinutes' ~ '^[0-9]+$' then (extra->>'durationMinutes')::int else 10 end,
        coalesce(nullif(extra->>'mediaType', ''), 'guide'),
        coalesce(nullif(extra->>'trimester', ''), 'any'),
        published
      )
      on conflict (slug) do update set
        title = excluded.title,
        title_te = excluded.title_te,
        description = excluded.description,
        duration_minutes = excluded.duration_minutes,
        media_type = excluded.media_type,
        trimester = excluded.trimester,
        is_published = excluded.is_published;

    elsif coll = 'groups' then
      insert into public.community_groups (
        slug, name, name_te, description, description_te, is_published
      )
      values (
        slug,
        coalesce(nullif(item->>'title', ''), slug),
        item->>'titleTe',
        coalesce(nullif(item->>'excerpt', ''), item->>'body'),
        item->>'excerptTe',
        published
      )
      on conflict (slug) do update set
        name = excluded.name,
        name_te = excluded.name_te,
        description = excluded.description,
        description_te = excluded.description_te,
        is_published = excluded.is_published;

    elsif coll = 'experts' then
      insert into public.experts (
        slug, name, photo, speciality, qualification, bio, bio_te, availability,
        booking_url, is_faculty_seat, is_listed, review_status, updated_at
      )
      values (
        slug,
        coalesce(nullif(item->>'title', ''), slug),
        item->>'imageUrl',
        coalesce(nullif(extra->>'speciality', ''), 'Garbh Sanskar Guides'),
        coalesce(nullif(extra->>'qualification', ''), item->>'excerpt'),
        item->>'body',
        item->>'bodyTe',
        coalesce(extra->>'availability', ''),
        nullif(extra->>'bookingUrl', ''),
        coalesce(extra->>'isFacultySeat', 'true') <> 'false',
        published,
        'in_review',
        now()
      )
      on conflict (slug) do update set
        name = excluded.name,
        photo = excluded.photo,
        speciality = excluded.speciality,
        qualification = excluded.qualification,
        bio = excluded.bio,
        bio_te = excluded.bio_te,
        availability = excluded.availability,
        booking_url = excluded.booking_url,
        is_faculty_seat = excluded.is_faculty_seat,
        is_listed = excluded.is_listed,
        review_status = excluded.review_status,
        updated_at = now();

    elsif coll = 'pages' then
      page_slug := regexp_replace(slug, '^/+', '');
      insert into public.site_pages (
        slug, locale, title, kicker, intro, body, related, seo_title, seo_description, is_published, updated_at
      )
      values (
        page_slug,
        'en',
        coalesce(nullif(item->>'title', ''), page_slug),
        coalesce(extra->>'kicker', ''),
        item->>'excerpt',
        jsonb_build_array(jsonb_build_object('heading', coalesce(item->>'title', ''), 'body', coalesce(item->>'body', ''))),
        '[]'::jsonb,
        coalesce(nullif(extra->>'seoTitle', ''), item->>'title'),
        coalesce(nullif(extra->>'seoDescription', ''), item->>'excerpt'),
        published,
        now()
      )
      on conflict (slug, locale) do update set
        title = excluded.title,
        kicker = excluded.kicker,
        intro = excluded.intro,
        body = excluded.body,
        seo_title = excluded.seo_title,
        seo_description = excluded.seo_description,
        is_published = excluded.is_published,
        updated_at = now();
    end if;
  end loop;

  return jsonb_build_object('ok', true);
end;
$$;

grant execute on function public.cms_save_state(uuid, jsonb, jsonb, jsonb, jsonb) to anon, authenticated;
