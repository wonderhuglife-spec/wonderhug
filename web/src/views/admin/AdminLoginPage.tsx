'use client'

import { useState } from 'react'
import { loginAdmin } from '@/cms/adminAuth'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { Seo } from '@/components/seo/Seo'

export function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  return (
    <div className="flex min-h-svh items-center justify-center bg-[#1d2327] px-4">
      <Seo title="CMS sign in" description="Staff sign in for the WonderHug website CMS." path="/admin/login" />
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
        <p className="mt-3 text-sm text-slate">Staff only. Usernames are checked against the WonderHug backend.</p>
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
