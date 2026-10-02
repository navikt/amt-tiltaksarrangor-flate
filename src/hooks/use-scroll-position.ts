import { useEffect } from 'react'

import { useScrollPositionContext } from '../store/ScrollPositionContextProvider'

// Registrerer siden som "aktiv" for scrollagring, og gjenoppretter scrollposisjonen når data er klar
export const useScrollPosition = (key: string, ready: boolean) => {
  const { scrollPositions, setActiveKey } = useScrollPositionContext()

  useEffect(() => {
    setActiveKey(key)

      // cleanup
    return () => setActiveKey(null)
  }, [key])

  useEffect(() => {
    if (!ready) return

    const savedPosition = scrollPositions[key]
    if (savedPosition === undefined) return

      // venter til sidne er ferdig lastet før vi scroller
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, savedPosition)
      })
    })

      // cleanup
    return () => cancelAnimationFrame(id)
  }, [key, ready])
}

