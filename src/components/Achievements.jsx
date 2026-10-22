import { useEffect, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { achievements, secrets } from '../data'
import { useGame } from '../game'
import PixelArt, { ICONS } from './PixelArt'
import { PixelLabel, Stage } from './ui'

const COLORS = ['var(--color-gold)', 'var(--color-accent)', 'var(--color-accent-2)', 'var(--color-lime)']

export default function Achievements() {
  const { play, found } = useGame()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  useEffect(() => {
    if (inView) play('unlock')
  }, [inView, play])

  return (
    <Stage id="achievements" title="Achievements" subtitle={`${achievements.length}/${achievements.length} milestones unlocked, from competitions to community.`}>
      <ul ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => {
          const color = COLORS[i % COLORS.length]
          return (
            <motion.li
              key={a.title}
              initial={{ opacity: 0.35, filter: 'grayscale(1)' }}
              animate={inView ? { opacity: 1, filter: 'grayscale(0)' } : undefined}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.4 }}
              className="relative flex gap-4 border-2 border-line bg-surface p-4 transition-colors hover:border-faint"
            >
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center border-2" style={{ borderColor: color, color, boxShadow: inView ? `0 0 14px color-mix(in oklab, ${color} 45%, transparent)` : 'none' }}>
                <PixelArt bitmap={ICONS[a.icon]} size={4} />
                <motion.span
                  className="absolute inset-0 flex items-center justify-center bg-raised text-faint"
                  initial={{ opacity: 1 }}
                  animate={inView ? { opacity: 0, scale: 1.4 } : undefined}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.35 }}
                  aria-hidden="true"
                >
                  <PixelArt bitmap={ICONS.lock} size={3} />
                </motion.span>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2">
                  <PixelLabel style={{ color }}>UNLOCKED</PixelLabel>
                  {a.year && <span className="font-mono text-[11px] text-faint">{a.year}</span>}
                </div>
                <h3 className="mt-1.5 font-semibold leading-snug">{a.title}</h3>
                {a.detail && <p className="mt-1 text-sm text-muted">{a.detail}</p>}
              </div>
            </motion.li>
          )
        })}
      </ul>

      <div className="mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-pixel text-xs text-gold">SECRET ACHIEVEMENTS</h3>
          <PixelLabel className="text-faint">
            {found.length}/{secrets.length} FOUND
          </PixelLabel>
        </div>
        <p className="mt-2 text-sm text-muted">Visitor achievements, hidden around this page.</p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {secrets.map((s) => {
            const got = found.includes(s.id)
            return (
              <li key={s.id} className={`flex items-center gap-4 border-2 border-dashed p-4 ${got ? 'border-gold bg-gold/5' : 'border-line'}`}>
                <span className={got ? 'text-gold' : 'text-faint'}>
                  <PixelArt bitmap={got ? ICONS.coin : ICONS.lock} size={4} />
                </span>
                <div>
                  <p className="font-pixel text-[10px]">{got ? s.title.toUpperCase() : '???'}</p>
                  <p className="mt-1.5 text-sm text-muted">{got ? s.text : `Hint: ${s.hint}`}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Stage>
  )
}
