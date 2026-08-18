'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { catalogFromState, loadMergedCms, seedCatalog, type Catalog } from '@/cms/catalog'
import { CMS_EVENT, type CmsState } from '@/cms/types'
import { getWorkingCms } from '@/cms/store'
import { seedCmsState } from '@/cms/seed'

interface CatalogContextValue {
  catalog: Catalog
  state: CmsState
  ready: boolean
  refresh: () => void
}

const CatalogContext = createContext<CatalogContextValue | null>(null)

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CmsState>(() => seedCmsState())
  const [ready, setReady] = useState(false)

  const refresh = () => {
    setState(getWorkingCms())
  }

  useEffect(() => {
    let cancelled = false
    void loadMergedCms({ includeDrafts: window.location.pathname.startsWith('/admin') }).then((merged) => {
      if (!cancelled) {
        setState(merged)
        setReady(true)
      }
    })
    const onChange = () => setState(getWorkingCms())
    window.addEventListener(CMS_EVENT, onChange)
    window.addEventListener('storage', onChange)
    return () => {
      cancelled = true
      window.removeEventListener(CMS_EVENT, onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  const catalog = useMemo(() => catalogFromState(state), [state])
  const value = useMemo(() => ({ catalog, state, ready, refresh }), [catalog, state, ready])

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog(): Catalog {
  const ctx = useContext(CatalogContext)
  return ctx?.catalog ?? seedCatalog()
}

export function useCmsState(): CmsState {
  const ctx = useContext(CatalogContext)
  return ctx?.state ?? seedCmsState()
}
