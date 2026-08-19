import { beforeEach, describe, expect, it } from 'vitest'
import { loginAdmin, logoutAdmin, readAdminSession } from '@/cms/adminAuth'

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
})
