import { experience } from '../data'
import { Reveal, Section, SpotlightCard, Tag, Text } from './ui'

export default function Experience() {
  return (
    <Section id="experience" index="02" title="Experience">
      <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-10">
        {experience.map((job, i) => (
          <li key={job.company + i} className="relative">
            <span className="absolute -left-[29px] top-7 flex h-2.5 w-2.5 sm:-left-[45px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-bg" />
            </span>
            <Reveal>
              <SpotlightCard className="p-6 sm:p-8">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {job.role} <span className="text-accent">@ {job.company}</span>
                  </h3>
                  <p className="font-mono text-xs text-muted">
                    <Text>{job.period}</Text>
                  </p>
                </div>
                {job.location && (
                  <p className="mt-1 text-sm text-muted">
                    <Text>{job.location}</Text>
                  </p>
                )}
                <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-muted">
                  {job.points.map((p, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-faint" />
                      <Text>{p}</Text>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {job.tags.map((t, j) => (
                    <Tag key={j}>{t}</Tag>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
