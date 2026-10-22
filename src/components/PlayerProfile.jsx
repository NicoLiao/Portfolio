import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { about, profile, quests } from '../data'
import { useGame } from '../game'
import PixelArt, { KNIGHT } from './PixelArt'
import { PixelLabel, Reveal, Stage } from './ui'

const LINES = ["Hi, I'm Nico!", 'Welcome to my portfolio.', 'Hey, that tickles.', 'Okay, okay…', 'You found a secret!']

export default function PlayerProfile() {
  const { play, unlock } = useGame()
  const [pokes, setPokes] = useState(0)
  const active = quests.filter((q) => q.status === 'active')

  const poke = () => {
    const n = pokes + 1
    setPokes(n)
    play(n === 5 ? 'coin' : 'move')
    if (n === 5) unlock('poke')
  }

  return (
    <Stage id="profile" title="Player Profile" subtitle="Character details, loaded from my résumé.">
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <Reveal>
          <div className="pixel-shadow border-2 border-accent bg-surface p-6 [--shadow:var(--color-accent)]">
            <div className="relative flex justify-center border-2 border-line bg-bg py-8">
              <AnimatePresence>
                {pokes > 0 && (
                  <motion.p
                    key={pokes}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-2 border-2 border-fg bg-fg px-2 py-1 font-pixel text-[8px] text-bg"
                    aria-live="polite"
                  >
                    {LINES[Math.min(pokes, LINES.length) - 1]}
                  </motion.p>
                )}
              </AnimatePresence>
              <motion.button
                onClick={poke}
                whileTap={{ scale: 0.9, rotate: -6 }}
                animate={{ y: [0, -4, 0] }}
                transition={{ y: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' } }}
                className="mt-4"
                aria-label="Player avatar: a pixel chess knight"
              >
                <PixelArt bitmap={KNIGHT} size={8} palette={{ '#': '#3df5ff', o: '#17142a', e: '#ff4fd8' }} />
              </motion.button>
            </div>

            <p className="mt-6 font-pixel text-sm">{profile.name.toUpperCase()}</p>
            <p className="mt-2 text-sm text-muted">{profile.fullName}</p>

            <dl className="mt-6 space-y-3 text-sm">
              {about.stats.map((s) => (
                <div key={s.label} className="grid grid-cols-[92px_1fr] gap-3">
                  <dt>
                    <PixelLabel className="text-accent-2">{s.label.toUpperCase()}</PixelLabel>
                  </dt>
                  <dd className="text-fg">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full border-2 border-line bg-surface p-6 sm:p-8">
            <PixelLabel className="text-gold">BIO</PixelLabel>
            <div className="mt-4 space-y-4 leading-relaxed text-muted">
              {about.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-fg' : ''}>
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8">
              <PixelLabel className="text-gold">SPECIALIZATIONS</PixelLabel>
              <ul className="mt-4 flex flex-wrap gap-2">
                {about.specializations.map((s) => (
                  <li key={s} className="border-2 border-accent-2/60 px-3 py-1.5 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <PixelLabel className="text-gold">ACTIVE QUESTS</PixelLabel>
              <ul className="mt-4 space-y-2 text-sm">
                {active.map((q) => (
                  <li key={q.id}>
                    <a href={`#quest-${q.id}`} className="group flex items-baseline gap-2 hover:text-accent">
                      <span className="text-gold" aria-hidden="true">▶</span>
                      <span>
                        {q.role} — <span className="text-muted group-hover:text-accent">{q.company}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Stage>
  )
}
