import { motion } from 'motion/react'
import { interests, isPlaceholder, skills } from '../data'
import { Reveal, Section, SpotlightCard } from './ui'

export default function Skills() {
  return (
    <Section id="skills" index="04" title="Skills">
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={i * 0.06} className="h-full">
            <SpotlightCard className="h-full p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-faint">{s.group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.items.map((item, j) => (
                  <motion.span
                    key={j}
                    whileHover={{ y: -3, scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    className={`cursor-default rounded-lg px-3 py-1.5 text-sm ${
                      isPlaceholder(item)
                        ? 'border border-dashed border-line italic text-faint'
                        : 'bg-raised text-fg ring-1 ring-line hover:ring-accent/50'
                    }`}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="marquee flex w-max gap-10">
            {[...interests, ...interests].map((t, i) => (
              <span key={i} className="flex items-center gap-10 whitespace-nowrap text-2xl font-semibold tracking-tight text-faint sm:text-3xl">
                {t}
                <span className="text-accent/60">✦</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
