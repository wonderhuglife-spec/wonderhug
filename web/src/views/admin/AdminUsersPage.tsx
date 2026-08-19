'use client'

import { useEffect, useState } from 'react'
import { createAdminUser, listAdminUsers } from '@/cms/adminAuth'
import { useAdminSession } from '@/components/admin/AdminGate'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'
import { Seo } from '@/components/seo/Seo'

export function AdminUsersPage() {
  const session = useAdminSession()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [notice, setNotice] = useState<string | null>(null)
  const [users, setUsers] = useState<{ id: string; username: string; displayName: string; createdAt: string }[]>([])

  async function refresh() {
    if (!session) return
    const result = await listAdminUsers(session)
    if (result.ok) {
      setUsers(result.users)
      if ('notice' in result && result.notice) setNotice(result.notice)
    } else {
      setNotice(result.error)
    }
  }

  useEffect(() => {
    void refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.token])

  return (
    <>
      <Seo title="Admin users · WonderHug CMS" description="Add CMS operators." path="/admin/users" />
      <h1 className="font-serif text-3xl">Admin users</h1>
      <p className="mt-2 max-w-2xl text-slate">People who can sign in to this panel. The first account is adminmani.</p>
      {notice ? <p className="mt-4 text-sm text-navy">{notice}</p> : null}
      <form
        className="mt-8 max-w-lg space-y-4 rounded-2xl border border-[#c3c4c7] bg-white p-6"
        onSubmit={(event) => {
          event.preventDefault()
          if (!session) return
          void createAdminUser(session, username, password, displayName).then((result) => {
            if (!result.ok) setNotice(result.error)
            else {
              setNotice(`Added ${username}.`)
              setUsername('')
              setPassword('')
              setDisplayName('')
              void refresh()
            }
          })
        }}
      >
        <div>
          <Label htmlFor="new-admin">Username</Label>
          <Input id="new-admin" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          <Label htmlFor="new-admin-name">Display name</Label>
          <Input id="new-admin-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
        </div>
        <div>
          <Label htmlFor="new-admin-password">Password</Label>
          <Input id="new-admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <Button type="submit">Add admin</Button>
      </form>
      <ul className="mt-8 divide-y divide-line rounded-2xl border border-[#c3c4c7] bg-white">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between px-5 py-4">
            <span>
              <span className="font-medium">{user.displayName}</span>
              <span className="ml-2 text-sm text-slate">{user.username}</span>
            </span>
            <span className="text-xs text-slate">{user.createdAt.slice(0, 10)}</span>
          </li>
        ))}
      </ul>
    </>
  )
}
