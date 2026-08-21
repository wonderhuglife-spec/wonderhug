import { beforeEach, describe, expect, it } from 'vitest'
import { supabase } from '@/lib/supabase'
import { loginAdmin, logoutAdmin, readAdminSession, verifyAdminSession } from '@/cms/adminAuth'

describe('admin login', () => {
  beforeEach(() => {
    logoutAdmin()
    sessionStorage.clear()
  })

  it('accepts the starter adminmani account when the SQL login RPC is not installed', async () => {
    const error = await loginAdmin('adminmani', 'maniadmin')
    expect(error).toBeNull()
    expect(readAdminSession()?.username).toBe('adminmani')
  })

  it('rejects a wrong password', async () => {
    const error = await loginAdmin('adminmani', 'wrong')
    expect(error).toBeTruthy()
    expect(readAdminSession()).toBeNull()
  })

  it('does not keep a local-only session once Supabase is configured', async () => {
    const next = await verifyAdminSession({
      token: 'bootstrap',
      username: 'adminmani',
      displayName: 'WonderHug admin',
      source: 'bootstrap',
    })
    if (supabase) expect(next).toBeNull()
    else expect(next?.username).toBe('adminmani')
  })
})
