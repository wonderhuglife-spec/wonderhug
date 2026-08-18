-- WonderHug v1 commerce, programs, CMS, trackers, WhatsApp

create table if not exists public.site_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  locale text not null default 'en',
  title text not null,
  kicker text,
  intro text,
  body jsonb not null default '[]'::jsonb,
  related jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  is_published boolean not null default true,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (slug, locale)
);

create table if not exists public.cms_blocks (
  id uuid primary key default gen_random_uuid(),
  block_key text not null,
  locale text not null default 'en',
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (block_key, locale)
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  name_te text,
  description text not null,
  description_te text,
  price_paise int not null,
  currency text not null default 'INR',
  image text,
  category text not null default 'wellness',
  journey_stages text[] not null default '{}',
  goals text[] not null default '{}',
  is_digital boolean not null default true,
  is_published boolean not null default true,
  inventory int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  name_te text,
  summary text not null,
  summary_te text,
  description text not null,
  price_paise int not null,
  duration_weeks int not null default 4,
  journey_stages text[] not null default '{}',
  goals text[] not null default '{}',
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.program_modules (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  title text not null,
  body text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete set null,
  email text,
  phone text,
  status text not null default 'pending',
  amount_paise int not null,
  currency text not null default 'INR',
  razorpay_order_id text,
  razorpay_payment_id text,
  checkout_mode text not null default 'razorpay',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id),
  program_id uuid references public.programs (id),
  title text not null,
  quantity int not null default 1,
  unit_paise int not null
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  program_id uuid not null references public.programs (id) on delete cascade,
  order_id uuid references public.orders (id),
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (profile_id, program_id)
);

create table if not exists public.garbh_practices (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  title_te text,
  description text not null,
  duration_minutes int not null default 10,
  media_url text,
  media_type text not null default 'audio',
  trimester text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.pregnancy_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade unique,
  due_date date,
  last_period_date date,
  baby_name text,
  baby_birth_date date,
  goals text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists public.tracker_entries (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null,
  value_num numeric,
  note text,
  recorded_at timestamptz not null default now()
);

create table if not exists public.saved_articles (
  profile_id uuid not null references public.profiles (id) on delete cascade,
  post_id uuid not null references public.blog_posts (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (profile_id, post_id)
);

create table if not exists public.notification_preferences (
  profile_id uuid primary key references public.profiles (id) on delete cascade,
  daily_practice boolean not null default true,
  program_milestones boolean not null default true,
  order_updates boolean not null default true,
  whatsapp_opt_in boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.whatsapp_leads (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete set null,
  phone text not null,
  locale text not null default 'te',
  source text,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_tags (
  post_id uuid not null references public.blog_posts (id) on delete cascade,
  tag text not null,
  primary key (post_id, tag)
);

alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists locale text not null default 'en';
alter table public.journey_progress add column if not exists goals text[] not null default '{}';

alter table public.experts add column if not exists booking_url text;
alter table public.experts add column if not exists is_faculty_seat boolean not null default false;
alter table public.experts add column if not exists specialties text[] not null default '{}';

create index if not exists products_published_idx on public.products (is_published);
create index if not exists programs_published_idx on public.programs (is_published);
create index if not exists orders_profile_idx on public.orders (profile_id, created_at desc);
create index if not exists tracker_profile_idx on public.tracker_entries (profile_id, kind, recorded_at desc);
create index if not exists site_pages_slug_idx on public.site_pages (slug, locale);
create index if not exists practices_published_idx on public.garbh_practices (is_published);

alter table public.site_pages enable row level security;
alter table public.cms_blocks enable row level security;
alter table public.products enable row level security;
alter table public.programs enable row level security;
alter table public.program_modules enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.enrollments enable row level security;
alter table public.garbh_practices enable row level security;
alter table public.pregnancy_profiles enable row level security;
alter table public.tracker_entries enable row level security;
alter table public.saved_articles enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.whatsapp_leads enable row level security;
alter table public.blog_tags enable row level security;

create policy site_pages_public_read on public.site_pages for select using (is_published = true);
create policy cms_blocks_public_read on public.cms_blocks for select using (true);
create policy products_public_read on public.products for select using (is_published = true);
create policy programs_public_read on public.programs for select using (is_published = true);
create policy program_modules_public_read on public.program_modules for select using (
  exists (select 1 from public.programs p where p.id = program_id and p.is_published)
);
create policy practices_public_read on public.garbh_practices for select using (is_published = true);
create policy blog_tags_public_read on public.blog_tags for select using (true);

create policy orders_self on public.orders for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy order_items_self on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_id and o.profile_id = auth.uid())
);
create policy enrollments_self on public.enrollments for select using (profile_id = auth.uid());
create policy pregnancy_self on public.pregnancy_profiles for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy tracker_self on public.tracker_entries for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy saved_self on public.saved_articles for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy notif_self on public.notification_preferences for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy whatsapp_insert on public.whatsapp_leads for insert with check (true);

create policy staff_all_products on public.products for all using (public.is_staff()) with check (public.is_staff());
create policy staff_all_programs on public.programs for all using (public.is_staff()) with check (public.is_staff());
create policy staff_all_pages on public.site_pages for all using (public.is_staff()) with check (public.is_staff());
create policy staff_all_cms on public.cms_blocks for all using (public.is_staff()) with check (public.is_staff());
create policy staff_all_experts on public.experts for all using (public.is_staff()) with check (public.is_staff());
create policy staff_all_posts on public.blog_posts for all using (public.is_staff()) with check (public.is_staff());
