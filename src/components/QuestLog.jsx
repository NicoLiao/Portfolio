import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { quests } from '../data'
import { useGame } from '../game'
import { PixelLabel, Reveal, Stage, Tag } from './ui'

function Quest({ quest, open, onToggle }) {
  const done = quest.status === 'complete'
  const color = done ? 'var(--color-lime)' : 'var(--color-gold)'
  return (
    <article id={`quest-${quest.id}`} className="scroll-mt-24 border-2 bg-surface transition-colors" style={{ borderColor: open ? color : 'var(--color-line)' }}>
      <h3>
        <button
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`quest-body-${quest.id}`}
          className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-center sm:gap-5 sm:p-6"
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center border-2 font-pixel text-xs"
            style={{ borderColor: color, color, background: done ? 'color-mix(in oklab, var(--color-lime) 12%, transparent)' : 'transparent' }}
            aria-hidden="true"
          >
            {done ? '✓' : <span className="blink">▶</span>}
          </span>
          <span className="flex-1">
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <PixelLabel className="text-faint">{quest.type.toUpperCase()}</PixelLabel>
              <PixelLabel style={{ color }}>{done ? 'COMPLETE' : 'IN PROGRESS'}</PixelLabel>
            </span>
            <span className="mt-2 block text-lg font-semibold leading-snug">{quest.role}</span>
            <span className="block text-accent">{quest.company}</span>
          </span>
          <span className="font-mono text-xs text-muted sm:text-right">{quest.period}</span>
          <span className={`hidden font-pixel text-xs text-faint transition-transform sm:block ${open ? 'rotate-90' : ''}`} aria-hidden="true">
            ▶
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`quest-body-${quest.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t-2 border-line px-5 pb-6 pt-5 sm:px-6 sm:pl-[5.25rem]">
              <PixelLabel className="text-gold">OBJECTIVES</PixelLabel>
              <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-muted">
                {quest.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-0.5 font-mono text-xs" style={{ color }} aria-hidden="true">
                      {done ? '[✓]' : '[▸]'}
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              {quest.tags.length > 0 && (
                <>
                  <p className="mt-5">
                    <PixelLabel className="text-gold">LOOT</PixelLabel>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {quest.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export default function QuestLog() {
  const { play } = useGame()
  const [open, setOpen] = useState('accton')
  const done = quests.filter((q) => q.status === 'complete').length

  return (
    <Stage
      id="quests"
      title="Quest Log"
      subtitle={`Education and experience — ${done} quests complete, ${quests.length - done} in progress.`}
    >
      <div className="space-y-4">
        {quests.map((q, i) => (
          <Reveal key={q.id} delay={i * 0.05}>
            <Quest
              quest={q}
              open={open === q.id}
              onToggle={() => {
                play(open === q.id ? 'close' : 'open')
                setOpen(open === q.id ? null : q.id)
              }}
            />
          </Reveal>
        ))}
      </div>
    </Stage>
  )
}
