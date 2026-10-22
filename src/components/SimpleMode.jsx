import { useEffect } from 'react'
import { about, achievements, featuredProject, profile, projects, quests, skills } from '../data'
import { useGame } from '../game'

// Plain, résumé-style page for quick reading. No effects, sound, or animation.

function Heading({ children }) {
  return <h2 className="border-b border-zinc-300 pb-2 text-sm font-semibold uppercase tracking-wider text-zinc-500">{children}</h2>
}

function ProjectLinks({ links }) {
  return (
    <>
      {links.demo && (
        <a href={links.demo} target="_blank" rel="noreferrer" className="text-blue-700 underline-offset-2 hover:underline">
          Demo
        </a>
      )}
      {links.demo && links.code && ' · '}
      {links.code && (
        <a href={links.code} target="_blank" rel="noreferrer" className="text-blue-700 underline-offset-2 hover:underline">
          Code
        </a>
      )}
    </>
  )
}

export default function SimpleMode() {
  const { setSimple } = useGame()

  useEffect(() => {
    document.documentElement.style.colorScheme = 'light'
    document.body.style.background = '#ffffff'
    return () => {
      document.documentElement.style.colorScheme = ''
      document.body.style.background = ''
    }
  }, [])

  const contact = [
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: 'GitHub', href: profile.github },
    { label: 'LinkedIn', href: profile.linkedin },
    { label: 'Résumé (PDF)', href: profile.resume },
  ]

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
            <p className="mt-1 text-zinc-600">
              {profile.program} · {profile.school} · {profile.location}
            </p>
          </div>
          <button
            onClick={() => setSimple(false)}
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium hover:bg-zinc-100"
          >
            Switch to Arcade Mode
          </button>
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {contact.map((c) => (
            <li key={c.label}>
              <a href={c.href} target={c.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer" className="text-blue-700 underline-offset-2 hover:underline">
                {c.label}
              </a>
            </li>
          ))}
        </ul>

        <main className="mt-10 space-y-10">
          <section>
            <Heading>About</Heading>
            <div className="mt-4 space-y-3 leading-relaxed text-zinc-700">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <section>
            <Heading>Education &amp; Experience</Heading>
            <div className="mt-4 space-y-6">
              {quests.map((q) => (
                <div key={q.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-semibold">{q.company}</h3>
                    <p className="text-sm text-zinc-500">{q.period}</p>
                  </div>
                  <p className="text-sm italic text-zinc-600">{q.role}</p>
                  {q.id !== 'uoft' && (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-zinc-700">
                      {q.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <Heading>Projects</Heading>
            <ul className="mt-4 space-y-4">
              {[featuredProject, ...projects].map((p) => (
                <li key={p.id}>
                  <p>
                    <span className="font-semibold">{p.title}</span>
                    {p.subtitle && <span className="text-zinc-600"> — {p.subtitle}</span>}
                    <span className="text-sm text-zinc-500"> · {p.tags.join(', ')}</span>
                  </p>
                  <p className="text-[15px] text-zinc-700">{p.summary}</p>
                  {(p.links.demo || p.links.code) && (
                    <p className="text-sm">
                      <ProjectLinks links={p.links} />
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <Heading>Skills</Heading>
            <dl className="mt-4 space-y-2 text-[15px]">
              {skills.map((g) => (
                <div key={g.group} className="sm:flex sm:gap-2">
                  <dt className="font-semibold sm:w-48 sm:shrink-0">{g.group}</dt>
                  <dd className="text-zinc-700">{g.items.join(', ')}</dd>
                </div>
              ))}
              <div className="sm:flex sm:gap-2">
                <dt className="font-semibold sm:w-48 sm:shrink-0">Spoken Languages</dt>
                <dd className="text-zinc-700">Mandarin (Native), English (Fluent), Japanese (Fluent)</dd>
              </div>
            </dl>
          </section>

          <section>
            <Heading>Awards &amp; Achievements</Heading>
            <ul className="mt-4 space-y-1.5 text-[15px]">
              {achievements.map((a) => (
                <li key={a.title} className="flex justify-between gap-4">
                  <span>
                    <span className="font-medium">{a.title}</span>
                    {a.detail && <span className="text-zinc-600"> — {a.detail}</span>}
                  </span>
                  {a.year && <span className="shrink-0 text-sm text-zinc-500">{a.year}</span>}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}
