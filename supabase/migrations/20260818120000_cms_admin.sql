-- Staff write for remaining catalogues, and hide staff-only CMS snapshots from anonymous reads.

drop policy if exists cms_blocks_public_read on public.cms_blocks;
create policy cms_blocks_public_read on public.cms_blocks
  for select using (block_key not like 'staff_%' or public.is_staff());

drop policy if exists staff_all_practices on public.garbh_practices;
create policy staff_all_practices on public.garbh_practices
  for all using (public.is_staff()) with check (public.is_staff());

drop policy if exists staff_all_groups on public.community_groups;
create policy staff_all_groups on public.community_groups
  for all using (public.is_staff()) with check (public.is_staff());

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
