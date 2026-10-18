import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { L, en, useLang } from '../i18n'
import { CaseStudy } from './CaseStudy'
import { caseCopy, caseKey, splitTitle, useCaseStudy } from './useCaseStudy'

const copy = {
  featured: L('Featured', 'À la une'),
  flagship: L('flagship projects', 'projets phares'),
  allTitle: L('All ', 'Tous les '),
  allMark: L('projects', 'projets'),
  allSub: L('Filter by what you are looking for, then open any project.', 'Filtrez selon ce que vous cherchez, puis ouvrez un projet.'),
  filters: L('Filter projects', 'Filtrer les projets'),
}

const categories = [
  { key: 'all', label: L('All', 'Tous') },
  { key: 'ai', label: L('AI & Data', 'IA & données') },
  { key: 'backend', label: L('Backend & Security', 'Back-end & sécurité') },
  { key: 'web', label: L('Web apps', 'Apps web') },
  { key: 'client', label: L('Client sites', 'Sites clients') },
  { key: 'mobile', label: 'Mobile' },
]

const pad = (n) => String(n).padStart(2, '0')
const cover = (project) => project.images?.[0] || project.image
const sourceIn = (element) => element.querySelector('img[data-case-key]')

export function DevWork({ id, projects, copy: head, number }) {
  const { t } = useLang()
  const study = useCaseStudy(projects)
  const featured = projects.filter((project) => project.featured)

  return (
    <section id={id} className="dev-work" data-screen-label={en(head.eyebrow)}>
      <div className="container work-head reveal">
        <p className="eyebrow"><span className="num">{number}</span><span className="line" /><span>{t(head.eyebrow)}</span></p>
        <h2>{t(head.title)} <span className="grad">{t(head.mark)}</span><em>{t(head.subtitle)}</em></h2>
        <p className="work-note">{t(head.note)}</p>
      </div>

      <div className="container deck-head">
        <span className="deck-badge">★ {t(copy.featured)}</span>
        <span className="deck-meta">{pad(featured.length)} {t(copy.flagship)}</span>
      </div>
      <Deck projects={featured} onOpen={study.open} />

      <ProjectIndex projects={projects} onOpen={study.open} />

      <CaseStudy study={study} type="dev" />
    </section>
  )
}

function Deck({ projects, onOpen }) {
  const { t } = useLang()
  const deckRef = useRef(null)

  // Each card is sticky; as the next one slides over it, it sinks back a little
  useEffect(() => {
    const cards = [...deckRef.current.querySelectorAll('.deck-card')]
    let frame = 0
    const update = () => {
      frame = 0
      const rects = cards.map((card) => card.getBoundingClientRect())
      cards.forEach((card, i) => {
        let covered = 0
        for (let j = i + 1; j < cards.length; j++) {
          covered += Math.max(0, Math.min(1, (rects[i].bottom - rects[j].top) / rects[i].height))
        }
        card.style.setProperty('--cover', Math.min(covered, 3).toFixed(3))
      })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [projects.length])

  return (
    <div className="container deck" ref={deckRef}>
      {projects.map((project, i) => {
        const title = t(project.title)
        const [head, tail] = splitTitle(title)
        const open = (event) => onOpen(project, sourceIn(event.currentTarget))
        return (
          <article className="deck-card" key={caseKey(project)} style={{ '--i': i }}>
            <div
              className="deck-inner"
              role="button"
              tabIndex={0}
              aria-label={`${t(caseCopy.openCase)}: ${title}`}
              onClick={open}
              onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(event) } }}
              data-hover
            >
              <div className="deck-media">
                <span className="deck-num">{pad(i + 1)} / {pad(projects.length)}</span>
                <div className="frame"><img src={cover(project)} alt={title} loading="lazy" data-case-key={caseKey(project)} /></div>
              </div>
              <div className="deck-info">
                <span className="kind">{t(project.tag)} - {project.year}</span>
                <h3>{head && <>{head} </>}<em>{tail}</em></h3>
                <p>{t(project.description)}</p>
                <div className="specs">
                  <div className="spec"><div className="label">{t(caseCopy.role)}</div><div className="value">{t(project.role)}</div></div>
                  <div className="spec"><div className="label">{t(caseCopy.year)}</div><div className="value">{project.year}</div></div>
                  <div className="spec"><div className="label">{t(caseCopy.output)}</div><div className="value">{t(project.output)}</div></div>
                </div>
                <div className="tools compact">
                  {project.tech?.slice(0, 6).map((tech) => <span className="tool" key={en(tech)}>{t(tech)}</span>)}
                </div>
                <div className="project-actions" onClick={(event) => event.stopPropagation()}>
                  <span className="link solid" aria-hidden="true">{t(caseCopy.openCase)} <span className="arrow" /></span>
                  {project.url && !project.url.startsWith('#') && (
                    <a className="link" href={project.url} target="_blank" rel="noopener noreferrer">{t(caseCopy.viewProject)} <span className="arrow" /></a>
                  )}
                </div>
              </div>
              <span className="deck-shade" aria-hidden="true" />
            </div>
          </article>
        )
      })}
    </div>
  )
}

function ProjectIndex({ projects, onOpen }) {
  const { t } = useLang()
  const [filter, setFilter] = useState('all')
  const [hovered, setHovered] = useState(null)
  const previewRef = useRef(null)
  const list = filter === 'all' ? projects : projects.filter((project) => project.category === filter)
  const counts = Object.fromEntries(categories.map(({ key }) => [key, key === 'all' ? projects.length : projects.filter((p) => p.category === key).length]))

  // Desktop: the project under the pointer trails the cursor and leans with its speed.
  // Driven by the real pointer position (also re-checked on scroll), so it can never get stuck.
  useEffect(() => {
    const preview = previewRef.current
    if (!preview || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let x = 0, y = 0, tx = 0, ty = 0, frame = 0, known = false, current = null
    const loop = () => {
      const dx = tx - x
      x += dx * 0.16
      y += (ty - y) * 0.16
      preview.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${Math.max(-12, Math.min(12, dx * 0.08))}deg)`
      frame = current || Math.abs(dx) > 0.5 ? requestAnimationFrame(loop) : 0
    }
    const show = (key) => {
      if (key === current) return
      if (key && !current && !frame) { x = tx; y = ty }
      current = key
      setHovered(key)
      if (key && !frame) frame = requestAnimationFrame(loop)
    }
    const rowAt = (el) => (document.body.classList.contains('modal-open') ? null : el?.closest?.('.index-row[data-key]')?.dataset.key ?? null)
    const onMove = (event) => {
      tx = event.clientX
      ty = event.clientY
      known = true
      show(rowAt(event.target))
    }
    const onScroll = () => { if (known) show(rowAt(document.elementFromPoint(tx, ty))) }
    const onOut = (event) => { if (!event.relatedTarget) { known = false; show(null) } }
    const onBlur = () => { known = false; show(null) }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseout', onOut)
    window.addEventListener('blur', onBlur)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  const openRow = (project, row) => {
    const key = caseKey(project)
    const trail = previewRef.current?.querySelector(`img[data-case-key="${CSS.escape(key)}"]`)
    const visible = trail && hovered === key && trail.checkVisibility?.({ opacityProperty: true })
    onOpen(project, visible ? trail : sourceIn(row))
  }

  return (
    <div className="container index-block">
      <div className="index-head reveal">
        <h3>{t(copy.allTitle)}<span className="grad">{t(copy.allMark)}</span> <sup>{pad(projects.length)}</sup></h3>
        <p>{t(copy.allSub)}</p>
      </div>
      <div className="index-filters" role="group" aria-label={t(copy.filters)}>
        {categories.map(({ key, label }) => (
          <button key={key} className={`chip ${filter === key ? 'on' : ''}`} aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {t(label)} <sup>{counts[key]}</sup>
          </button>
        ))}
      </div>
      <ol className={`index-list ${hovered ? 'has-hover' : ''}`} key={filter}>
        {list.map((project, i) => {
          const key = caseKey(project)
          return (
            <li key={key} style={{ '--i': i }}>
              <button
                className={`index-row ${hovered === key ? 'on' : ''}`}
                data-key={key}
                onClick={(event) => openRow(project, event.currentTarget)}
              >
                <span className="ix-num">{pad(projects.indexOf(project) + 1)}</span>
                <span className="ix-thumb"><img src={cover(project)} alt="" loading="lazy" data-case-key={key} /></span>
                <span className="ix-text">
                  <span className="ix-title">{t(project.title)}</span>
                  <span className="ix-meta">{[...new Set([t(project.tag), ...(project.tech || []).map((tech) => t(tech))])].slice(0, 4).join(' · ')}</span>
                </span>
                <span className="ix-year">{project.year}</span>
                <span className="ix-arrow" aria-hidden="true" />
              </button>
            </li>
          )
        })}
      </ol>
      {createPortal(
        <div className={`index-preview ${hovered ? 'show' : ''}`} ref={previewRef} aria-hidden="true">
          <div className="index-preview-card">
            {projects.map((project) => (
              <img key={caseKey(project)} src={cover(project)} alt="" className={hovered === caseKey(project) ? 'on' : ''} data-case-key={caseKey(project)} />
            ))}
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
