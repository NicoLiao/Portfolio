import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import PixelArt, { ICONS } from './components/PixelArt'
import { secrets } from './data'
import { sfx } from './sfx'

// Shared arcade state: sound, Simple Mode, and secret achievements.
const GameContext = createContext(null)
export const useGame = () => useContext(GameContext)

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v === null ? fallback : JSON.parse(v)
  } catch {
    return fallback
  }
}
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable */
  }
}

const initialSimple = () => {
  const mode = new URLSearchParams(window.location.search).get('mode')
  if (mode) return mode === 'simple'
  return read('arcade:simple', false)
}

export function GameProvider({ children }) {
  const [sound, setSound] = useState(() => read('arcade:sound', false))
  const [simple, setSimpleState] = useState(initialSimple)
  const [found, setFound] = useState(() => read('arcade:secrets', []))
  const [toast, setToast] = useState(null)
  const soundRef = useRef(sound)
  const foundRef = useRef(found)
  const lastHover = useRef(0)
  const toastTimer = useRef()

  const play = useCallback((name) => {
    if (!soundRef.current) return
    if (name === 'hover') {
      const now = performance.now()
      if (now - lastHover.current < 70) return
      lastHover.current = now
    }
    sfx[name]?.()
  }, [])

  const toggleSound = useCallback(() => {
    const next = !soundRef.current
    soundRef.current = next
    setSound(next)
    write('arcade:sound', next)
    if (next) sfx.select()
  }, [])

  const setSimple = useCallback((value) => {
    setSimpleState(value)
    write('arcade:simple', value)
    const url = new URL(window.location.href)
    if (value) url.searchParams.set('mode', 'simple')
    else url.searchParams.delete('mode')
    window.history.replaceState(null, '', url)
    window.scrollTo(0, 0)
  }, [])

  const unlock = useCallback(
    (id) => {
      if (foundRef.current.includes(id)) return
      const next = [...foundRef.current, id]
      foundRef.current = next
      setFound(next)
      write('arcade:secrets', next)
      play('unlock')
      setToast(secrets.find((s) => s.id === id))
      clearTimeout(toastTimer.current)
      toastTimer.current = setTimeout(() => setToast(null), 3800)
    },
    [play],
  )

  const value = useMemo(
    () => ({ sound, toggleSound, play, simple, setSimple, found, unlock }),
    [sound, toggleSound, play, simple, setSimple, found, unlock],
  )

  return (
    <GameContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-4 z-[80] flex justify-end">
        <AnimatePresence>
          {toast && !simple && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="pixel-shadow flex items-center gap-3 border-2 border-gold bg-surface px-4 py-3 [--shadow:var(--color-gold)]"
            >
              <PixelArt bitmap={ICONS.trophy} size={4} className="text-gold" />
              <div>
                <p className="font-pixel text-[9px] text-gold">ACHIEVEMENT UNLOCKED</p>
                <p className="mt-1.5 text-sm font-semibold">{toast.title}</p>
                <p className="text-xs text-muted">{toast.text}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GameContext.Provider>
  )
}
