import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { profile, sections } from '../data'
import { useGame } from '../game'
import { goTo } from './ui'

const ease = [0.21, 0.47, 0.32, 0.98]

export default function MainMenu() {
  const { play, unlock, setSimple } = useGame()
  const [index, setIndex] = useState(0)
  const [credits, setCredits] = useState(0)
  const refs = useRef([])

  const items = [
    ...sections.map((s) => ({ label: s.label, run: () => goTo(s.id) })),
    { label: 'Simple Mode', run: () => setSimple(true), muted: true },
  ]

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const next = (index + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length
    setIndex(next)
    refs.current[next]?.focus()
    play('move')
  }

  const insertCoin = () => {
    const next = credits + 1
    setCredits(next)
    play('coin')
    if (next === 5) unlock('coins')
  }

  return (
    <section id="top" aria-label="Main menu" className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-24 text-center">
      <div className="stars absolute inset-0" aria-hidden="true" />
      <div className="grid-floor" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-bg" />

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="relative font-pixel text-[9px] tracking-widest text-gold sm:text-[11px]"
      >
        {profile.program.toUpperCase()} @ {profile.school.toUpperCase()}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="title-neon relative mt-6 font-pixel text-4xl leading-tight sm:text-6xl lg:text-7xl"
      >
        NICO <br className="sm:hidden" />
        LIAO
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative mt-6 max-w-xl text-muted"
      >
        {profile.tagline}
      </motion.p>

      <motion.nav
        aria-label="Main menu"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6, ease }}
        className="relative mt-10 w-full max-w-sm"
      >
        <ul onKeyDown={onKeyDown} className="pixel-shadow border-2 border-accent-2 bg-surface/90 p-2 text-left backdrop-blur">
          {items.map((item, i) => (
            <li key={item.label}>
              <button
                ref={(el) => (refs.current[i] = el)}
                data-menu-item
                onFocus={() => setIndex(i)}
                onMouseEnter={() => {
                  setIndex(i)
                  play('hover')
                }}
                onClick={() => {
                  play('select')
                  item.run()
                }}
                className={`flex w-full items-center gap-3 px-3 py-3 font-pixel text-[10px] tracking-wide transition-colors sm:text-[11px] ${
                  index === i ? 'bg-raised text-fg' : item.muted ? 'text-faint' : 'text-muted'
                }`}
              >
                <span className={`w-3 text-gold ${index === i ? 'blink' : 'opacity-0'}`} aria-hidden="true">
                  ▶
                </span>
                {item.label.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="relative mt-8 flex items-center gap-5 font-pixel text-[9px] sm:text-[10px]"
      >
        <button onClick={insertCoin} className="blink text-gold hover:text-fg">
          INSERT COIN
        </button>
        <span className="text-faint" aria-live="polite">
          CREDITS {String(credits).padStart(2, '0')}
        </span>
      </motion.div>

      <p className="relative mt-6 hidden font-mono text-xs text-faint sm:block">
        ↑↓ select · Enter start · 1–6 jump · M sound · ? controls
      </p>
    </section>
  )
}
