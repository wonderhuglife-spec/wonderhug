create or replace function public.cms_admin_login(p_username text, p_password text)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  rec public.cms_admins%rowtype;
  sess public.cms_admin_sessions%rowtype;
begin
  select * into rec from public.cms_admins where username = lower(trim(p_username));
  if rec.id is null then
    return jsonb_build_object('ok', false, 'error', 'Invalid username or password');
  end if;
  if rec.password_hash <> extensions.crypt(p_password, rec.password_hash) then
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

create or replace function public.cms_admin_create(p_token uuid, p_username text, p_password text, p_display_name text default null)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
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
  values (uname, extensions.crypt(p_password, extensions.gen_salt('bf', 10)), nullif(trim(p_display_name), ''))
  returning * into created;
  return jsonb_build_object('ok', true, 'username', created.username, 'id', created.id);
exception
  when unique_violation then
    return jsonb_build_object('ok', false, 'error', 'That username already exists.');
end;
$$;
