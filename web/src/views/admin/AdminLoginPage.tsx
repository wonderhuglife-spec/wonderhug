'use client'

import { useEffect, useState } from 'react'
import { loginAdmin } from '@/cms/adminAuth'
import { supabase, supabaseConfigStatus } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { Seo } from '@/components/seo/Seo'

export function AdminLoginPage({ checking = false }: { checking?: boolean }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [backend, setBackend] = useState<'checking' | 'ready' | 'needs-sql' | 'offline'>('checking')

  useEffect(() => {
    if (!supabase) {
      setBackend('offline')
      return
    }
    void supabase
      .rpc('cms_admin_login', { p_username: '__probe__', p_password: '__probe__' })
      .then(({ error }) => {
        if (!error || /invalid username or password/i.test(error.message)) setBackend('ready')
        else if (/could not find|schema cache|function/i.test(error.message)) setBackend('needs-sql')
        else setBackend('ready')
      })
  }, [])

  return (
    <div className="flex min-h-svh items-center justify-center bg-[#1d2327] px-4">
      <Seo title="CMS sign in" description="Staff sign in for the WonderHug website CMS." path="/admin" />
      <form
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lift"
        onSubmit={(event) => {
          event.preventDefault()
          setBusy(true)
          setError(null)
          void loginAdmin(username, password).then((message) => {
            setBusy(false)
            if (message) setError(message)
          })
        }}
      >
        <p className="text-xs uppercase tracking-[0.16em] text-slate">WonderHug</p>
        <h1 className="mt-2 font-serif text-3xl">CMS sign in</h1>
        <p className="mt-3 text-sm text-slate">
          {checking ? 'Checking your session…' : 'Staff only. Usernames are checked against the WonderHug backend.'}
        </p>
        <p className="mt-3 rounded-xl bg-canvas px-3 py-2 text-xs text-slate">
          {supabaseConfigStatus === 'unconfigured' && 'Supabase keys are missing in this build.'}
          {backend === 'checking' && supabase && 'Checking the backend…'}
          {backend === 'ready' && 'Backend connected. Sign in with an admin username.'}
          {backend === 'needs-sql' &&
            'Project is reachable. Apply supabase/migrations/20260819120000_cms_admin_auth.sql in the Supabase SQL editor so admin users live in the database. Until then, adminmani / maniadmin still opens the panel.'}
          {backend === 'offline' &&
            'This browser cannot see Supabase. Starter login: adminmani / maniadmin. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, then restart the site.'}
        </p>
        <div className="mt-6">
          <Label htmlFor="cms-username">Username</Label>
          <Input id="cms-username" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="mt-4">
          <Label htmlFor="cms-password">Password</Label>
          <Input id="cms-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
        <Button className="mt-6 w-full" type="submit" disabled={busy}>
          {busy ? 'Signing in…' : 'Log in'}
        </Button>
      </form>
    </div>
  )
}
