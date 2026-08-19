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
  const [session, setSession] = useState<AdminSession | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const stored = readAdminSession()
    void verifyAdminSession(stored).then((next) => {
      if (cancelled) return
      if (stored && !next) logoutAdmin()
      setSession(next)
      setReady(true)
    })
    const onChange = () => setSession(readAdminSession())
    window.addEventListener('wonderhug-admin-session', onChange)
    return () => {
      cancelled = true
      window.removeEventListener('wonderhug-admin-session', onChange)
    }
  }, [])

  if (!ready) {
    return <div className="min-h-svh bg-[#f0f0f1]" aria-busy="true" aria-label="Loading CMS" />
  }

  if (!session) {
    return <AdminLoginPage />
  }

  return (
    <AdminSessionContext.Provider value={session}>
      <AdminShell session={session}>{children}</AdminShell>
    </AdminSessionContext.Provider>
  )
}
