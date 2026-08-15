import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { track } from '@/services/analytics'

interface AuthContextValue {
  user: User | null
  role: string | null
  loading: boolean
  sendPhoneOtp: (phone: string) => Promise<string | null>
  verifyPhoneOtp: (phone: string, token: string) => Promise<string | null>
  sendEmailLink: (email: string) => Promise<string | null>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    void supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!supabase || !user) {
      setRole(null)
      return
    }
    void supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => setRole((data?.role as string) ?? 'user'))
  }, [user])

  const sendPhoneOtp = async (phone: string) => {
    if (!supabase) return 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable OTP.'
    track('signup_started', { method: 'phone' })
    const { error } = await supabase.auth.signInWithOtp({ phone })
    return error?.message ?? null
  }

  const verifyPhoneOtp = async (phone: string, token: string) => {
    if (!supabase) return 'Supabase is not configured.'
    const { error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' })
    if (!error) track('signup_completed', { method: 'phone' })
    return error?.message ?? null
  }

  const sendEmailLink = async (email: string) => {
    if (!supabase) return 'Supabase is not configured. Add keys to enable magic links.'
    track('signup_started', { method: 'email' })
    const { error } = await supabase.auth.signInWithOtp({ email })
    return error?.message ?? null
  }

  const signOut = async () => {
    await supabase?.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, sendPhoneOtp, verifyPhoneOtp, sendEmailLink, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
