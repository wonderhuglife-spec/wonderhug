-- WonderHug.Life initial schema
-- Apply with Supabase CLI: supabase db push
-- Never expose service-role keys to clients.

create extension if not exists "pgcrypto";

do $$ begin
  create type public.user_role as enum ('user', 'moderator', 'expert', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.journey_stage as enum (
    'planning', 'ttc', 'pregnant', 'birth_prep', 'new_parent', 'parenting'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.review_status as enum ('draft', 'in_review', 'reviewed', 'needs_update');
exception when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'user',
  display_name text,
  language text not null default 'en-IN',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.journey_progress (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  journey_stage public.journey_stage not null default 'planning',
  pregnancy_week int,
  baby_age_months int,
  interests text[] not null default '{}',
  saved_content_ids uuid[] not null default '{}',
  completed_activity_ids uuid[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (profile_id)
);

create table if not exists public.experts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  photo text,
  speciality text not null,
  qualification text,
  bio text,
  languages text[] not null default '{}',
  review_status public.review_status not null default 'draft',
  availability text,
  is_listed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.expert_content (
  id uuid primary key default gen_random_uuid(),
  expert_id uuid not null references public.experts (id) on delete cascade,
  title text not null,
  body text,
  content_type text not null default 'article',
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  featured_image text,
  video_url text,
  category text not null,
  author_id uuid references public.profiles (id),
  expert_reviewer_id uuid references public.experts (id),
  review_status public.review_status not null default 'draft',
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  display_order int not null default 0,
  reading_time int not null default 1,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  seo_title text,
  seo_description text,
  canonical_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  title text not null,
  body text,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.daily_activities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body text,
  journey_stage public.journey_stage,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tools (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  href text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.community_groups (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.community_groups (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  body text not null,
  is_expert_answer boolean not null default false,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.community_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.community_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles (id) on delete cascade,
  post_id uuid references public.community_posts (id) on delete cascade,
  comment_id uuid references public.community_comments (id) on delete cascade,
  reason text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  starts_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  attribution text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  body text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists blog_posts_published_idx on public.blog_posts (is_published, display_order);
create index if not exists blog_posts_slug_idx on public.blog_posts (slug);
create index if not exists blog_posts_category_idx on public.blog_posts (category);
create index if not exists experts_listed_idx on public.experts (is_listed, speciality);
create index if not exists experts_slug_idx on public.experts (slug);
create index if not exists community_posts_group_idx on public.community_posts (group_id, created_at desc);
create index if not exists community_comments_post_idx on public.community_comments (post_id, created_at);
create index if not exists notifications_profile_idx on public.notifications (profile_id, created_at desc);

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists journey_progress_updated_at on public.journey_progress;
create trigger journey_progress_updated_at before update on public.journey_progress
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.journey_progress enable row level security;
alter table public.experts enable row level security;
alter table public.expert_content enable row level security;
alter table public.blog_posts enable row level security;
alter table public.courses enable row level security;
alter table public.course_modules enable row level security;
alter table public.daily_activities enable row level security;
alter table public.tools enable row level security;
alter table public.community_groups enable row level security;
alter table public.community_posts enable row level security;
alter table public.community_comments enable row level security;
alter table public.community_reports enable row level security;
alter table public.events enable row level security;
alter table public.testimonials enable row level security;
alter table public.notifications enable row level security;

create or replace function public.is_staff()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'moderator', 'expert')
  );
$$;

-- Public read of published content
create policy blog_posts_public_read on public.blog_posts
  for select using (is_published = true);

create policy experts_public_read on public.experts
  for select using (is_listed = true);

create policy expert_content_public_read on public.expert_content
  for select using (is_published = true);

create policy courses_public_read on public.courses
  for select using (is_published = true);

create policy course_modules_public_read on public.course_modules
  for select using (
    exists (select 1 from public.courses c where c.id = course_id and c.is_published)
  );

create policy activities_public_read on public.daily_activities
  for select using (is_published = true);

create policy tools_public_read on public.tools
  for select using (is_published = true);

create policy groups_public_read on public.community_groups
  for select using (is_published = true);

create policy posts_public_read on public.community_posts
  for select using (is_hidden = false);

create policy comments_public_read on public.community_comments
  for select using (is_hidden = false);

create policy events_public_read on public.events
  for select using (is_published = true);

create policy testimonials_public_read on public.testimonials
  for select using (is_published = true);

-- Authenticated profile / journey
create policy profiles_self_select on public.profiles
  for select using (id = auth.uid() or public.is_staff());

create policy profiles_self_update on public.profiles
  for update using (id = auth.uid());

create policy journey_self_all on public.journey_progress
  for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());

create policy notifications_self_select on public.notifications
  for select using (profile_id = auth.uid());

create policy posts_insert_own on public.community_posts
  for insert with check (auth.uid() = author_id);

create policy comments_insert_own on public.community_comments
  for insert with check (auth.uid() = author_id);

create policy reports_insert_own on public.community_reports
  for insert with check (auth.uid() = reporter_id);

create policy reports_staff_read on public.community_reports
  for select using (public.is_staff());
