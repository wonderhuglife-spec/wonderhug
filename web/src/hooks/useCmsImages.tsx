'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_MEDIA_ASSETS, type MediaAssetKey } from '@/data/mediaAssets'
import { supabase } from '@/lib/supabase'
import { useCatalog } from '@/hooks/useCatalog'

type Overrides = Partial<Record<MediaAssetKey, { src?: string; alt?: string }>>

const CmsImagesContext = createContext<Overrides>({})

export function CmsImagesProvider({ children }: { children: ReactNode }) {
  const [remote, setRemote] = useState<Overrides>({})

  useEffect(() => {
    if (!supabase) return
    void supabase
      .from('cms_blocks')
      .select('payload')
      .eq('block_key', 'media_assets')
      .maybeSingle()
      .then(({ data }) => {
        const payload = (data?.payload ?? {}) as Overrides
        setRemote(payload)
      })
  }, [])

  return <CmsImagesContext.Provider value={remote}>{children}</CmsImagesContext.Provider>
}

export function useCmsImage(key: MediaAssetKey) {
  const remote = useContext(CmsImagesContext)
  const catalog = useCatalog()
  const fallback = DEFAULT_MEDIA_ASSETS[key]
  return useMemo(() => {
    const fromCatalog = catalog.media[key]
    const fromRemote = remote[key]
    return {
      src: fromCatalog?.src?.trim() || fromRemote?.src?.trim() || fallback.src,
      alt: fromCatalog?.alt?.trim() || fromRemote?.alt?.trim() || fallback.alt,
    }
  }, [remote, catalog.media, key, fallback.src, fallback.alt])
}
