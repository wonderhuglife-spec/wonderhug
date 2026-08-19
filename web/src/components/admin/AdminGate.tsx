'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { AdminShell } from '@/components/admin/AdminShell'
import { logoutAdmin, readAdminSession, verifyAdminSession, type AdminSession } from '@/cms/adminAuth'
import { AdminLoginPage } from '@/views/admin/AdminLoginPage'

const AdminSessionContext = createContext<AdminSession | null>(null)

export function useAdminSession() {
  return useContext(AdminSessionContext)
}

export function AdminGate({ children }: { children: ReactNode }) {
  // Always start signed out so the server HTML and the first client paint match.
  const [session, setSession] = useState<AdminSession | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let cancelled = false
    const stored = readAdminSession()
    void verifyAdminSession(stored).then((next) => {
      if (cancelled) return
      if (stored && !next) logoutAdmin()
      setSession(next)
      setChecked(true)
    })
    const onChange = () => setSession(readAdminSession())
    window.addEventListener('wonderhug-admin-session', onChange)
    return () => {
      cancelled = true
      window.removeEventListener('wonderhug-admin-session', onChange)
    }
  }, [])

  if (!session) {
    return <AdminLoginPage checking={checked === false} />
  }

  return (
    <AdminSessionContext.Provider value={session}>
      <AdminShell session={session}>{children}</AdminShell>
    </AdminSessionContext.Provider>
  )
}
