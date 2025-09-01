import { useState, useMemo, useEffect, useRef } from 'react'
import { Reveal } from './Reveal'
import { works } from '../data/works'

export function Work() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const sectionRef = useRef(null)
  const progressRef = useRef(null)

  const filtered = useMemo(() => {
    if (filter === 'all') return works
    return works.filter((w) => w.type === filter)
  }, [filter])

  useEffect(() => {
    setActive((prev) => {
      if (!prev) return filtered[0] || null
      const still = filtered.find((w) => w.id === prev.id)
      return still || filtered[0] || null
    })
  }, [filtered])

  const handleCardMouseMove = (e) => {
    const t = e.currentTarget
    const rect = t.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const mx = `${(x / rect.width) * 100}%`
    const my = `${(y / rect.height) * 100}%`
    t.style.setProperty('--mx', mx)
    t.style.setProperty('--my', my)
    const rx = ((rect.height / 2 - y) / rect.height) * 10
    const ry = ((x - rect.width / 2) / rect.width) * 12
    t.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }

  const handleCardLeave = (e) => {
    const t = e.currentTarget
    t.style.transform = 'none'
    t.style.removeProperty('--mx')
    t.style.removeProperty('--my')
  }

  // Horizontal scroll effect: translate the track based on scroll within section
  useEffect(() => {
    const pin = pinRef.current
    const track = trackRef.current
    const section = sectionRef.current
    if (!pin || !track || !section) return
    const onScroll = () => {
      const rect = pin.getBoundingClientRect()
      const viewH = window.innerHeight
      const progress = Math.min(1, Math.max(0, (viewH - rect.top) / (rect.height + viewH)))
      const maxShift = Math.max(0, track.scrollWidth - window.innerWidth)
      track.style.transform = `translateX(${-progress * maxShift}px)`
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress.toFixed(4)})`
      }
    }
    const onResize = () => {
      // Dynamic height so vertical scroll length matches horizontal width
      const extra = Math.max(0, track.scrollWidth - window.innerWidth)
      section.style.height = `${window.innerHeight + extra}px`
      onScroll()
    }
    onResize()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [filtered.length])


  return (
    <section id="work" className="section">
      <div className="container" style={{ marginBottom: 12 }}>
        <h2>Selected Work</h2>
        <p className="muted">Curated projects across design and web—hover to preview, click to dive in.</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          {[
            { k: 'all', label: 'All' },
            { k: 'design', label: 'Graphic Design' },
            { k: 'web', label: 'Web Dev' },
          ].map((t) => (
            <button key={t.k} className={`btn ${filter === t.k ? '' : 'secondary'}`} onClick={() => setFilter(t.k)}>
              {t.label}
            </button>
          ))}
        </div>
        <section className="section horizontal" id="work-horizontal" aria-label="Portfolio" ref={sectionRef}>
          <div className="pin" ref={pinRef} role="region" aria-roledescription="Horizontal scroller">
            <div className="h-inner" id="work-track" ref={trackRef} role="list">
              {filtered.length === 0 && (
                <div className="card" role="status" aria-live="polite">
                  <h3>No projects match this filter</h3>
                  <p className="muted">Try switching categories to see more work.</p>
                </div>
              )}
              {filtered.map((w) => (
                <article key={w.id} className="card" onMouseEnter={() => setActive(w)} role="listitem">
                  <div className="media">
                    <img src={w.banner || w.thumbnail} alt={w.title} loading="lazy" />
                    <div className="tag">{w.type === 'web' ? 'Web' : 'Branding'}</div>
                  </div>
                  <h3>{w.title}</h3>
                  <p className="muted">{w.short}</p>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop: 12 }}>
                    {w.tags.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                    <button className="btn" onClick={() => setSelected(w)}>Details</button>
                    {w.link && <a className="btn secondary" href={w.link} target="_blank" rel="noreferrer">Visit</a>}
                  </div>
                </article>
              ))}
            </div>
            <div className="h-progress" aria-hidden="true"><div className="bar" ref={progressRef} /></div>
          </div>
        </section>
      </div>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal-panel reveal in" onClick={(e) => e.stopPropagation()} style={{ transform: 'translateY(0)' }}>
            <img src={selected.banner} alt="banner" style={{ width: '100%', height: 320, objectFit: 'cover', borderTopLeftRadius: 18, borderTopRightRadius: 18 }} />
            <div style={{ padding: 20 }}>
              <h3 style={{ marginTop: 0 }}>{selected.title}</h3>
              <p className="muted" style={{ marginTop: -6 }}>{selected.short}</p>
              <div className="divider" />
              <p style={{ whiteSpace: 'pre-wrap' }}>{selected.description}</p>
              {selected.link && (
                <a className="btn" href={selected.link} target="_blank" rel="noreferrer">Visit project</a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
