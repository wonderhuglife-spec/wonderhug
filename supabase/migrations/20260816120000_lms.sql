-- LMS tables for structured wellness programmes.
-- Lesson bodies are readable only by enrolled profiles (or staff).

alter table public.programs
  add column if not exists cover_image text,
  add column if not exists cover_image_alt text,
  add column if not exists level text not null default 'all',
  add column if not exists instructor_slug text,
  add column if not exists instructor_name text,
  add column if not exists duration_label text;

alter table public.enrollments
  add column if not exists enrolled_at timestamptz not null default now(),
  add column if not exists payment_status text not null default 'unpaid';

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  module_id uuid references public.program_modules (id) on delete set null,
  slug text not null,
  title text not null,
  title_te text,
  body text,
  body_te text,
  kind text not null default 'text' check (kind in ('video', 'audio', 'text')),
  media_url text,
  resource_url text,
  duration_seconds int not null default 0,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (program_id, slug)
);

create table if not exists public.module_quizzes (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.program_modules (id) on delete cascade unique,
  question text not null,
  question_te text,
  options jsonb not null default '[]'::jsonb,
  answer_index int not null default 0,
  explanation text,
  explanation_te text
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  completed_at timestamptz,
  position_seconds int not null default 0,
  updated_at timestamptz not null default now(),
  unique (profile_id, lesson_id)
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  program_id uuid not null references public.programs (id) on delete cascade,
  issued_at timestamptz not null default now(),
  unique (profile_id, program_id)
);

alter table public.lessons enable row level security;
alter table public.module_quizzes enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.certificates enable row level security;

create or replace function public.is_enrolled(p_program uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.enrollments e
    where e.program_id = p_program
      and e.profile_id = auth.uid()
      and e.status = 'active'
  );
$$;

drop policy if exists lessons_enrolled_read on public.lessons;
create policy lessons_enrolled_read on public.lessons
  for select using (
    public.is_staff()
    or public.is_enrolled(program_id)
  );

drop policy if exists quizzes_enrolled_read on public.module_quizzes;
create policy quizzes_enrolled_read on public.module_quizzes
  for select using (
    public.is_staff()
    or exists (
      select 1 from public.program_modules m
      where m.id = module_id and public.is_enrolled(m.program_id)
    )
  );

drop policy if exists lesson_progress_own on public.lesson_progress;
create policy lesson_progress_own on public.lesson_progress
  for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());

drop policy if exists certificates_own on public.certificates;
create policy certificates_own on public.certificates
  for select using (profile_id = auth.uid() or public.is_staff());

drop policy if exists certificates_insert_own on public.certificates;
create policy certificates_insert_own on public.certificates
  for insert with check (profile_id = auth.uid());

grant select on public.lessons, public.module_quizzes to anon, authenticated;
grant select, insert, update, delete on public.lesson_progress to authenticated;
grant select, insert on public.certificates to authenticated;
