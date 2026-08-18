'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_MEDIA_ASSETS, type MediaAssetKey } from '@/data/mediaAssets'
import { supabase } from '@/lib/supabase'

type Overrides = Partial<Record<MediaAssetKey, { src?: string; alt?: string }>>

const CmsImagesContext = createContext<Overrides>({})

export function CmsImagesProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Overrides>({})

  useEffect(() => {
    if (!supabase) return
    void supabase
      .from('cms_blocks')
      .select('payload')
      .eq('block_key', 'media_assets')
      .maybeSingle()
      .then(({ data }) => {
        const payload = (data?.payload ?? {}) as Overrides
        setOverrides(payload)
      })
  }, [])

  return <CmsImagesContext.Provider value={overrides}>{children}</CmsImagesContext.Provider>
}

export function useCmsImage(key: MediaAssetKey) {
  const overrides = useContext(CmsImagesContext)
  const fallback = DEFAULT_MEDIA_ASSETS[key]
  return useMemo(
    () => ({
      src: overrides[key]?.src?.trim() || fallback.src,
      alt: overrides[key]?.alt?.trim() || fallback.alt,
    }),
    [overrides, key, fallback.src, fallback.alt],
  )
}
