import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { en, useLang } from '../i18n'
import { MORPH, caseCopy, caseKey, splitTitle } from './useCaseStudy'

export function CaseStudy({ study, type }) {
  if (!study.project) return null
  return createPortal(<CaseView key={caseKey(study.project)} study={study} type={type} />, document.body)
}

function CaseView({ study, type }) {
  const { t } = useLang()
  const { project, index, total, projects, close, go } = study
  const [imageIndex, setImageIndex] = useState(0)
  const closeRef = useRef(null)
  const images = project.images || [project.image]
  const title = t(project.title)
  const [titleHead, titleTail] = splitTitle(title)
  const next = projects[(index + 1) % total]
  const cta = project.cta || (type === 'design' ? caseCopy.viewBehance : caseCopy.viewProject)
  const internal = project.url?.startsWith('#')

  // Latest handlers for the key listener, which is bound once per open project
  const actions = useRef({ close, go })
  useEffect(() => { actions.current = { close, go } })

  useEffect(() => {
    const previous = document.activeElement
    document.body.classList.add('modal-open')
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (event) => {
      if (event.key === 'Escape') actions.current.close()
      else if (event.key === 'ArrowRight') actions.current.go(1)
      else if (event.key === 'ArrowLeft') actions.current.go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
      if (previous instanceof HTMLElement && document.contains(previous)) previous.focus({ preventScroll: true })
    }
  }, [])

  return (
    <div className="case" role="dialog" aria-modal="true" aria-label={title}>
      <div className="case-scroll">
        <header className="case-bar">
          <span className="case-count">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <div className="case-controls">
            <button className="case-btn" onClick={() => go(-1)} aria-label={t(caseCopy.prevProject)}><span className="chev left" /></button>
            <button className="case-btn" onClick={() => go(1)} aria-label={t(caseCopy.nextProject)}><span className="chev" /></button>
            <button className="case-btn close" ref={closeRef} onClick={close} aria-label={t(caseCopy.closeProject)}>×</button>
          </div>
        </header>

        <div className="case-hero">
          <div className="case-media">
            <img
              src={images[imageIndex]}
              alt={title}
              style={{ viewTransitionName: imageIndex === 0 ? MORPH : undefined }}
            />
          </div>
          {images.length > 1 && (
            <div className="case-thumbs">
              {images.map((image, i) => (
                <button
                  key={image}
                  className={i === imageIndex ? 'on' : ''}
                  onClick={() => setImageIndex(i)}
                  aria-label={`${t(caseCopy.showImage)} ${i + 1}`}
                  aria-pressed={i === imageIndex}
                >
                  <img src={image} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="case-body">
          <div className="case-main">
            <span className="kind">{t(project.tag)} - {project.year}</span>
            <h2>{titleHead && <>{titleHead} </>}<em>{titleTail}</em></h2>
            <p>{t(project.description)}</p>
          </div>
          <aside className="case-side">
            <dl className="case-specs">
              <div><dt>{t(caseCopy.role)}</dt><dd>{t(project.role)}</dd></div>
              <div><dt>{t(caseCopy.year)}</dt><dd>{project.year}</dd></div>
              <div><dt>{t(caseCopy.output)}</dt><dd>{t(project.output)}</dd></div>
            </dl>
            {project.tech && (
              <>
                <div className="case-label">{t(caseCopy.stack)}</div>
                <div className="tools compact">
                  {project.tech.map((tech) => <span className="tool" key={en(tech)}>{t(tech)}</span>)}
                </div>
              </>
            )}
            {project.url && (
              <a
                className="link solid"
                href={project.url}
                target={internal ? undefined : '_blank'}
                rel="noopener noreferrer"
                onClick={internal ? close : undefined}
              >
                {t(cta)} <span className="arrow" />
              </a>
            )}
          </aside>
        </div>

        <button className="case-next" onClick={() => go(1)}>
          <span className="case-label">{t(caseCopy.nextProject)}</span>
          <span className="case-next-title">{t(next.title)}</span>
          <img src={next.thumb || next.images?.[0] || next.image} alt="" loading="lazy" />
          <span className="chev" />
        </button>
      </div>
    </div>
  )
}
