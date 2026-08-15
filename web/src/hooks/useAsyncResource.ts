import { useCallback, useEffect, useRef, useState } from 'react'
import type { AsyncState } from '@/types/domain'

export function useAsyncResource<T>(loader: () => Promise<AsyncState<T>>, resourceKey: string) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading', data: null, error: null })
  const loaderRef = useRef(loader)
  loaderRef.current = loader

  const reload = useCallback(() => {
    let cancelled = false
    setState({ status: 'loading', data: null, error: null })
    const requestKey = resourceKey
    void loaderRef.current().then((result) => {
      if (!cancelled && requestKey === resourceKey) setState(result)
    })
    return () => {
      cancelled = true
    }
  }, [resourceKey])

  useEffect(() => reload(), [reload])

  return { ...state, retry: reload }
}
