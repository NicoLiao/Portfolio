import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { skills, usedIn } from '../data'
import { useGame } from '../game'
import { PixelLabel, Reveal, Stage } from './ui'

const COLORS = ['var(--color-accent)', 'var(--color-accent-2)', 'var(--color-gold)', 'var(--color-lime)']
const total = skills.reduce((n, g) => n + g.items.length, 0)

function Info({ sel, className = '' }) {
  const uses = useMemo(() => usedIn(sel.item), [sel.item])
  const color = COLORS[sel.group]
  return (
    <motion.div
      key={sel.item}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`pixel-shadow border-2 bg-surface p-5 ${className}`}
      style={{ borderColor: color, '--shadow': color }}
      aria-live="polite"
    >
      <PixelLabel className="text-faint">SELECTED · {skills[sel.group].group.toUpperCase()}</PixelLabel>
      <p className="mt-3 font-pixel text-sm" style={{ color }}>
        {sel.item.toUpperCase()}
      </p>
      <p className="mt-4">
        <PixelLabel className="text-gold">USED IN</PixelLabel>
      </p>
      {uses.length ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {uses.map((u) => (
            <li key={u.href}>
              <a href={u.href} className="inline-block border-2 border-line px-2.5 py-1 text-sm hover:border-accent hover:text-accent">
                {u.label}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted">Listed on my résumé — not tied to a specific project on this site yet.</p>
      )}
    </motion.div>
  )
}

export default function SkillTree() {
  const { play } = useGame()
  const [sel, setSel] = useState({ group: 0, item: 'Python' })

  return (
    <Stage id="skills" title="Skill Tree" subtitle={`${total} skills unlocked. Select one to see where I've used it.`}>
      <Reveal>
        <div className="flex justify-center">
          <div className="pixel-shadow border-2 border-fg bg-surface px-5 py-3 font-pixel text-[10px] [--shadow:var(--color-accent)]">
            CORE: COMPUTER SCIENCE
          </div>
        </div>
        <div className="relative hidden h-10 lg:block" aria-hidden="true">
          <span className="absolute left-1/2 top-0 h-5 w-0.5 -translate-x-1/2 bg-line" />
          <span className="absolute left-[12.5%] right-[12.5%] top-5 h-0.5 bg-line" />
        </div>
      </Reveal>

      <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4 lg:gap-5">
        {skills.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.08}>
            <div className="flex flex-col items-center">
              <span className="hidden h-5 w-0.5 bg-line lg:block" aria-hidden="true" />
              <h3 className="border-2 bg-bg px-3 py-2 text-center font-pixel text-[9px] leading-relaxed" style={{ borderColor: COLORS[gi], color: COLORS[gi] }}>
                {g.group.toUpperCase()}
              </h3>
              <ul className="relative mt-4 flex w-full flex-col items-center gap-2.5 before:absolute before:inset-y-0 before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-line">
                {g.items.map((item) => {
                  const on = sel.item === item
                  return (
                    <li key={item} className="relative w-full max-w-52">
                      <button
                        onClick={() => {
                          setSel({ group: gi, item })
                          play('select')
                        }}
                        onMouseEnter={() => play('hover')}
                        aria-pressed={on}
                        className="relative w-full border-2 px-3 py-2 text-sm transition-all duration-200 hover:-translate-y-0.5"
                        style={
                          on
                            ? { background: COLORS[gi], borderColor: COLORS[gi], color: 'var(--color-bg)', boxShadow: `0 0 18px ${COLORS[gi]}` }
                            : { background: 'var(--color-raised)', borderColor: 'var(--color-line)' }
                        }
                      >
                        {item}
                      </button>
                    </li>
                  )
                })}
              </ul>
              {/* On small screens, show details right under the branch you tapped. */}
              <AnimatePresence>{sel.group === gi && <Info sel={sel} className="mt-5 w-full lg:hidden" />}</AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 hidden lg:block">
        <Info sel={sel} />
      </div>
    </Stage>
  )
}
