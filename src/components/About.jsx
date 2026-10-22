import { about } from '../data'
import { Reveal, Section, SpotlightCard, Text } from './ui'

export default function About() {
  return (
    <Section id="about" index="01" title="About me">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>
                <Text className={i === 0 ? 'text-fg' : ''}>{p}</Text>
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <SpotlightCard className="p-6 sm:p-7">
            <dl className="divide-y divide-line">
              {about.facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-6 py-3 first:pt-0">
                  <dt className="font-mono text-xs uppercase tracking-wider text-faint">{f.label}</dt>
                  <dd className="text-right text-sm">
                    <Text>{f.value}</Text>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-mono text-xs uppercase tracking-wider text-faint">Awards</p>
            <ul className="mt-3 space-y-2.5 text-sm">
              {about.awards.map((a) => (
                <li key={a.title} className="flex items-baseline gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 -translate-y-0.5 rounded-full bg-accent" />
                  <span className="flex-1">{a.title}</span>
                  <span className="font-mono text-xs text-muted">{a.year}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  )
}
