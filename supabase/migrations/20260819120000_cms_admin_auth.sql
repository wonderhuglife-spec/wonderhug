-- CMS admin users, login RPC, and a public media bucket for panel uploads.

create extension if not exists pgcrypto;

create table if not exists public.cms_admins (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.cms_admin_sessions (
  token uuid primary key default gen_random_uuid(),
  admin_id uuid not null references public.cms_admins (id) on delete cascade,
  expires_at timestamptz not null default (now() + interval '14 days'),
  created_at timestamptz not null default now()
);

alter table public.cms_admins enable row level security;
alter table public.cms_admin_sessions enable row level security;

insert into public.cms_admins (username, password_hash, display_name)
values ('adminmani', crypt('maniadmin', gen_salt('bf', 10)), 'WonderHug admin')
on conflict (username) do nothing;

create or replace function public.cms_admin_login(p_username text, p_password text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  rec public.cms_admins%rowtype;
  sess public.cms_admin_sessions%rowtype;
begin
  select * into rec from public.cms_admins where username = lower(trim(p_username));
  if rec.id is null then
    return jsonb_build_object('ok', false, 'error', 'Invalid username or password');
  end if;
  if rec.password_hash <> crypt(p_password, rec.password_hash) then
    return jsonb_build_object('ok', false, 'error', 'Invalid username or password');
  end if;
  insert into public.cms_admin_sessions (admin_id)
  values (rec.id)
  returning * into sess;
  return jsonb_build_object(
    'ok', true,
    'token', sess.token,
    'username', rec.username,
    'displayName', coalesce(rec.display_name, rec.username)
  );
end;
$$;

create or replace function public.cms_admin_verify(p_token uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  rec public.cms_admins%rowtype;
begin
  select a.* into rec
  from public.cms_admin_sessions s
  join public.cms_admins a on a.id = s.admin_id
  where s.token = p_token and s.expires_at > now();
  if rec.id is null then
    return jsonb_build_object('ok', false);
  end if;
  return jsonb_build_object('ok', true, 'username', rec.username, 'displayName', coalesce(rec.display_name, rec.username));
end;
$$;

create or replace function public.cms_admin_create(p_token uuid, p_username text, p_password text, p_display_name text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  caller public.cms_admins%rowtype;
  created public.cms_admins%rowtype;
  uname text := lower(trim(p_username));
begin
  select a.* into caller
  from public.cms_admin_sessions s
  join public.cms_admins a on a.id = s.admin_id
  where s.token = p_token and s.expires_at > now();
  if caller.id is null then
    return jsonb_build_object('ok', false, 'error', 'Session expired. Sign in again.');
  end if;
  if uname is null or length(uname) < 3 then
    return jsonb_build_object('ok', false, 'error', 'Username must be at least 3 characters.');
  end if;
  if p_password is null or length(p_password) < 8 then
    return jsonb_build_object('ok', false, 'error', 'Password must be at least 8 characters.');
  end if;
  insert into public.cms_admins (username, password_hash, display_name)
  values (uname, crypt(p_password, gen_salt('bf', 10)), nullif(trim(p_display_name), ''))
  returning * into created;
  return jsonb_build_object('ok', true, 'username', created.username, 'id', created.id);
exception
  when unique_violation then
    return jsonb_build_object('ok', false, 'error', 'That username already exists.');
end;
$$;

create or replace function public.cms_admin_list(p_token uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_id uuid;
begin
  select s.admin_id into caller_id
  from public.cms_admin_sessions s
  where s.token = p_token and s.expires_at > now();
  if caller_id is null then
    return jsonb_build_object('ok', false, 'error', 'Session expired. Sign in again.');
  end if;
  return jsonb_build_object(
    'ok', true,
    'users', coalesce((
      select jsonb_agg(jsonb_build_object('id', id, 'username', username, 'displayName', coalesce(display_name, username), 'createdAt', created_at) order by created_at)
      from public.cms_admins
    ), '[]'::jsonb)
  );
end;
$$;

grant execute on function public.cms_admin_login(text, text) to anon, authenticated;
grant execute on function public.cms_admin_verify(uuid) to anon, authenticated;
grant execute on function public.cms_admin_create(uuid, text, text, text) to anon, authenticated;
grant execute on function public.cms_admin_list(uuid) to anon, authenticated;

create or replace function public.cms_save_state(p_token uuid, p_staff jsonb, p_published jsonb, p_settings jsonb, p_media jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_id uuid;
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

  return jsonb_build_object('ok', true);
end;
$$;

grant execute on function public.cms_save_state(uuid, jsonb, jsonb, jsonb, jsonb) to anon, authenticated;

insert into storage.buckets (id, name, public)
values ('cms-media', 'cms-media', true)
on conflict (id) do nothing;

drop policy if exists cms_media_public_read on storage.objects;
create policy cms_media_public_read on storage.objects
  for select using (bucket_id = 'cms-media');

drop policy if exists cms_media_public_insert on storage.objects;
create policy cms_media_public_insert on storage.objects
  for insert with check (bucket_id = 'cms-media');
