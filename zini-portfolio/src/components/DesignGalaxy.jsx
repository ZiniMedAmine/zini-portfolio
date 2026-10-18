import { useEffect, useRef, useState } from 'react'
import { L, en, useLang } from '../i18n'
import { CaseStudy } from './CaseStudy'
import { caseCopy, caseKey, useCaseStudy } from './useCaseStudy'

const copy = {
  title: L('Design', 'La galaxie'),
  mark: L('galaxy.', 'design.'),
  intro: (n) => L(`${n} visual projects. Scroll to fly through.`, `${n} projets visuels. Défilez pour la traverser.`),
  hint: L('Scroll to fly', 'Défilez pour voler'),
  skip: L('Skip the galaxy', 'Passer la galaxie'),
  jump: L('Fly to', 'Aller à'),
  outro: L('End of the galaxy.', 'Fin de la galaxie.'),
  outroSub: L('More work lives on Behance.', 'Plus de projets sur Behance.'),
  behance: L('Open Behance', 'Ouvrir Behance'),
}

const BEHANCE = 'https://www.behance.net/zinimedamine'
const SCROLL_PER_PROJECT = 30 // svh of page scroll for each project in the flight
const pad = (n) => String(n).padStart(2, '0')
const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v))
const thumbOf = (project) => project.thumb || project.images?.[0]

export function DesignGalaxy({ id, projects, copy: head, number }) {
  const study = useCaseStudy(projects)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  return (
    <>
      {reduced
        ? <GalaxyGrid id={id} projects={projects} head={head} number={number} onOpen={study.open} />
        : <Galaxy id={id} projects={projects} head={head} number={number} onOpen={study.open} />}
      <CaseStudy study={study} type="design" />
    </>
  )
}

// Camera path: projects sit on a golden-angle spiral, spaced along the depth axis
function layout(count) {
  const w = window.innerWidth
  const h = window.innerHeight
  const mobile = w < 720
  const gap = mobile ? 950 : 1200
  const lead = 750
  const focus = mobile ? -150 : -170
  const radius = mobile ? Math.min(w * 0.17, 90) : Math.min(w, h) * 0.3
  const items = Array.from({ length: count }, (_, i) => {
    const angle = i * 2.39996 + 0.6
    return {
      // Desktop: centred a little right and up, clear of the title panel in the bottom-left
      x: Math.cos(angle) * radius * (mobile ? 1 : 1.2) + (mobile ? 0 : w * 0.11),
      y: Math.sin(angle) * radius * (mobile ? 0.72 : 0.5 * clamp((h - 480) / 420, 0.4, 1)) - (mobile ? 0 : 18),
      z: focus - lead - i * gap,
    }
  })
  const focusAt = (i) => lead + i * gap
  return { items, focus, focusAt, end: focusAt(count - 1) + 900, mobile }
}

function Galaxy({ id, projects, head, number, onOpen }) {
  const { t } = useLang()
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const worldRef = useRef(null)
  const canvasRef = useRef(null)
  const introRef = useRef(null)
  const outroRef = useRef(null)
  const hudRef = useRef(null)
  const itemRefs = useRef([])
  const geo = useRef(null)
  const flyRef = useRef(null)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const section = sectionRef.current
    const world = worldRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let stars = []
    let cam = 0
    let lastCam = 0
    let mx = 0, my = 0, px = 0, py = 0
    let frame = 0
    let visible = false
    let current = -2

    const place = () => {
      geo.current = layout(projects.length)
      geo.current.items.forEach((item, i) => {
        const el = itemRefs.current[i]
        if (el) el.style.transform = `translate3d(${item.x}px, ${item.y}px, ${item.z}px) translate(-50%, -50%)`
      })
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = geo.current.mobile ? 150 : 280
      stars = Array.from({ length: count }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() }))
    }

    const target = () => {
      const max = section.offsetHeight - window.innerHeight
      const progress = max > 0 ? clamp(-section.getBoundingClientRect().top / max) : 0
      return progress * geo.current.end
    }

    const drawStars = (speed) => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const cx = w / 2 + px * 40
      const cy = h / 2 + py * 30
      const f = Math.max(w, h) * 0.5
      ctx.clearRect(0, 0, w, h)
      ctx.lineCap = 'round'
      for (const s of stars) {
        const prevZ = Math.min(1, s.z + speed * 6)
        s.z -= speed
        if (s.z <= 0.02) { s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; s.z = 1 }
        const sx = cx + (s.x / s.z) * f * 0.5
        const sy = cy + (s.y / s.z) * f * 0.5
        if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) continue
        const ox = cx + (s.x / prevZ) * f * 0.5
        const oy = cy + (s.y / prevZ) * f * 0.5
        const a = (1 - s.z) * 0.9
        ctx.strokeStyle = s.z < 0.3 ? `rgba(250, 210, 90, ${a})` : `rgba(220, 228, 255, ${a})`
        ctx.lineWidth = (1 - s.z) * 2.2 + 0.3
        ctx.beginPath()
        ctx.moveTo(ox, oy)
        ctx.lineTo(sx, sy)
        ctx.stroke()
      }
    }

    const render = () => {
      frame = visible ? requestAnimationFrame(render) : 0
      const g = geo.current
      cam += (target() - cam) * 0.12
      const velocity = Math.abs(cam - lastCam)
      lastCam = cam
      px += (mx - px) * 0.06
      py += (my - py) * 0.06
      world.style.transform = `translate3d(${-px * 26}px, ${-py * 18}px, 0) rotateX(${py * 3}deg) rotateY(${-px * 4}deg) translateZ(${cam}px)`

      let nearest = -1
      let best = Infinity
      g.items.forEach((item, i) => {
        const el = itemRefs.current[i]
        if (!el) return
        const vz = item.z + cam
        let o = 1
        if (vz < -6000) o = 0
        else if (vz < -3800) o = (vz + 6000) / 2200
        if (vz > g.focus + 80) o = Math.min(o, clamp(1 - (vz - g.focus - 80) / 260))
        el.style.opacity = o.toFixed(3)
        el.style.visibility = o < 0.01 ? 'hidden' : 'visible'
        el.style.pointerEvents = o < 0.5 ? 'none' : 'auto'
        const d = Math.abs(vz - g.focus)
        if (d < best && o > 0.3) { best = d; nearest = i }
      })
      const focused = best < 700 ? nearest : -1
      if (focused !== current) {
        current = focused
        itemRefs.current.forEach((el, i) => el?.classList.toggle('is-active', i === focused))
        setActive(focused)
      }

      const lead = g.focusAt(0)
      // Projects stay faint behind the intro title, then come in as it clears
      world.style.opacity = clamp(0.12 + cam / (lead * 0.55)).toFixed(3)
      introRef.current.style.opacity = clamp(1 - cam / (lead * 0.7)).toFixed(3)
      introRef.current.style.transform = `translate(-50%, -50%) scale(${1 + cam / 1800})`
      introRef.current.style.visibility = cam > lead * 0.7 ? 'hidden' : 'visible'
      const out = clamp((cam - g.focusAt(projects.length - 1) - 350) / 400)
      outroRef.current.style.opacity = out.toFixed(3)
      outroRef.current.style.visibility = out < 0.01 ? 'hidden' : 'visible'
      hudRef.current.classList.toggle('hide', focused < 0)

      drawStars(0.0012 + Math.min(velocity, 120) * 0.00018)
    }

    const start = () => { if (!frame) frame = requestAnimationFrame(render) }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      document.body.classList.toggle('on-galaxy', visible && entry.intersectionRatio > 0.2)
      if (visible) start()
    }, { threshold: [0, 0.2, 0.6] })
    const onMouse = (event) => {
      mx = event.clientX / window.innerWidth - 0.5
      my = event.clientY / window.innerHeight - 0.5
    }

    // Stops along the flight: the intro, each project, then the outro
    const stops = () => {
      const g = geo.current
      return [0, ...g.items.map((_, i) => g.focusAt(i)), g.end]
    }
    const camToY = (camZ) => {
      const max = section.offsetHeight - window.innerHeight
      return section.getBoundingClientRect().top + window.scrollY + clamp(camZ / geo.current.end) * max
    }
    const yToCam = (y) => {
      const max = section.offsetHeight - window.innerHeight
      const top = section.getBoundingClientRect().top + window.scrollY
      return max > 0 ? clamp((y - top) / max) * geo.current.end : 0
    }
    const pinned = () => {
      const rect = section.getBoundingClientRect()
      return rect.top <= 1 && rect.bottom >= window.innerHeight - 1
    }

    // Eased glide to a scroll target; retargeting mid-flight keeps it one continuous motion
    let glideTo = null
    let glideY = 0
    let lastSetY = 0
    let glideFrame = 0
    const glide = () => {
      if (Math.abs(window.scrollY - lastSetY) > 4) { glideTo = null; glideFrame = 0; return } // user took over
      const d = glideTo - glideY
      if (Math.abs(d) < 0.6) {
        window.scrollTo({ top: glideTo, behavior: 'instant' })
        glideTo = null
        glideFrame = 0
        return
      }
      glideY += d * 0.11
      window.scrollTo({ top: glideY, behavior: 'instant' })
      lastSetY = window.scrollY
      glideFrame = requestAnimationFrame(glide)
    }
    const flyTo = (camZ) => {
      if (glideTo === null) glideY = lastSetY = window.scrollY
      glideTo = camToY(camZ)
      if (!glideFrame) glideFrame = requestAnimationFrame(glide)
    }
    flyRef.current = flyTo

    // One wheel notch, arrow or page key = one stop. Returns false past the ends, so the page carries on.
    const step = (dir) => {
      const all = stops()
      const now = glideTo !== null ? yToCam(glideTo) : target()
      let i = -1
      if (dir > 0) i = all.findIndex((v) => v > now + 8)
      else for (let k = all.length - 1; k >= 0; k--) if (all[k] < now - 8) { i = k; break }
      if (i < 0) return false
      flyTo(all[i])
      return true
    }
    let wheelSum = 0
    let lastStep = 0
    let lastWheel = 0
    let lastMag = 0
    const onWheel = (event) => {
      if (event.ctrlKey || document.body.classList.contains('modal-open')) return
      if (!pinned() && glideTo === null) return
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      const dy = event.deltaMode === 1 ? event.deltaY * 40 : event.deltaMode === 2 ? event.deltaY * 800 : event.deltaY
      const dir = Math.sign(dy)
      if (!dir) return
      const now = performance.now()
      const mag = Math.abs(dy)
      // A wheel notch is big and either isolated or the same size as the last one;
      // trackpads stream small, ever-changing deltas every few milliseconds
      const notch = mag >= 50 && (now - lastWheel > 30 || Math.abs(mag - lastMag) < 0.5)
      lastWheel = now
      lastMag = mag
      if (!notch) {
        // Trackpad: one swipe is one step, and its momentum tail is absorbed
        if (now - lastStep < 420) { event.preventDefault(); lastStep = now; return }
        wheelSum += dy
        if (Math.abs(wheelSum) < 40) { event.preventDefault(); return }
      }
      wheelSum = 0
      if (step(dir)) { event.preventDefault(); lastStep = now }
    }
    const onKey = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || document.body.classList.contains('modal-open')) return
      if (event.target.closest?.('input, textarea, select, [contenteditable], button, a') && event.key === ' ') return
      if (event.target.closest?.('input, textarea, select, [contenteditable]')) return
      const dir = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1, ' ': event.shiftKey ? -1 : 1 }[event.key]
      if (!dir || (!pinned() && glideTo === null)) return
      if (step(dir)) event.preventDefault()
    }

    // Touch and scrollbar: when scrolling settles mid-flight, glide to the nearest stop
    let settle = 0
    let touching = false
    const snap = () => {
      if (touching || glideTo !== null || !pinned()) return
      const now = target()
      const stop = stops().reduce((a, b) => (Math.abs(b - now) < Math.abs(a - now) ? b : a))
      if (Math.abs(stop - now) > 20) flyTo(stop)
    }
    const onScroll = () => {
      clearTimeout(settle)
      settle = setTimeout(snap, 180)
    }
    const onTouchStart = () => { touching = true; glideTo = null; clearTimeout(settle) }
    const onTouchEnd = () => { touching = false; onScroll() }

    place()
    cam = lastCam = target()
    io.observe(stageRef.current)
    window.addEventListener('resize', place)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    if (finePointer) window.addEventListener('mousemove', onMouse, { passive: true })
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
      cancelAnimationFrame(glideFrame)
      clearTimeout(settle)
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('mousemove', onMouse)
      document.body.classList.remove('on-galaxy')
    }
  }, [projects.length])

  const skip = () => {
    const section = sectionRef.current
    window.scrollTo({ top: section.getBoundingClientRect().bottom + window.scrollY, behavior: 'smooth' })
  }

  const current = active >= 0 ? projects[active] : null

  return (
    <section
      id={id}
      className="galaxy"
      ref={sectionRef}
      data-screen-label={en(head.eyebrow)}
      style={{ height: `calc(100svh + ${projects.length * SCROLL_PER_PROJECT}svh)` }}
    >
      <div className="galaxy-stage" ref={stageRef}>
        <canvas className="galaxy-stars" ref={canvasRef} aria-hidden="true" />
        <div className="galaxy-nebula" aria-hidden="true" />

        <div className="galaxy-world" ref={worldRef}>
          {projects.map((project, i) => {
            const title = t(project.title)
            return (
              <div className="g-item" key={caseKey(project)} ref={(el) => { itemRefs.current[i] = el }} data-fade>
                <button
                  className="g-card"
                  tabIndex={-1}
                  onClick={(event) => onOpen(project, event.currentTarget.querySelector('img'))}
                  data-hover
                >
                  <img src={thumbOf(project)} alt={title} draggable="false" data-case-key={caseKey(project)} />
                  <span className="g-label"><em>{pad(i + 1)}</em>{title}</span>
                </button>
              </div>
            )
          })}
        </div>

        <div className="galaxy-intro" ref={introRef}>
          <p className="eyebrow"><span className="num">{number}</span><span className="line" /><span>{t(head.eyebrow)}</span></p>
          <h2>{t(copy.title)} <span className="grad">{t(copy.mark)}</span></h2>
          <p className="galaxy-lede">{t(copy.intro(projects.length))}</p>
          <p className="galaxy-note">{t(head.note)}</p>
          <span className="galaxy-hint"><span className="mouse" aria-hidden="true" />{t(copy.hint)}</span>
        </div>

        <div className="galaxy-outro" ref={outroRef}>
          <h3>{t(copy.outro)}</h3>
          <p>{t(copy.outroSub)}</p>
          <a className="link solid" href={BEHANCE} target="_blank" rel="noopener noreferrer">{t(copy.behance)} <span className="arrow" /></a>
        </div>

        <div className="galaxy-hud hide" ref={hudRef} aria-live="polite">
          {current && (
            <>
              <span className="g-count">{pad(active + 1)} / {pad(projects.length)}</span>
              <strong>{t(current.title)}</strong>
              <span className="g-kind">{t(current.tag)} - {current.year}</span>
              <button
                className="link solid"
                onClick={() => onOpen(current, itemRefs.current[active]?.querySelector('img'))}
              >
                {t(caseCopy.openCase)} <span className="arrow" />
              </button>
            </>
          )}
        </div>

        <nav className="galaxy-ticks" aria-label={t(head.eyebrow)}>
          {projects.map((project, i) => (
            <button
              key={caseKey(project)}
              className={i === active ? 'on' : ''}
              onClick={() => flyRef.current?.(geo.current.focusAt(i))}
              aria-label={`${t(copy.jump)} ${t(project.title)}`}
              aria-current={i === active ? 'true' : undefined}
            >
              <span>{t(project.title)}</span>
            </button>
          ))}
        </nav>

        <button className="galaxy-skip" onClick={skip}>{t(copy.skip)} <span className="chev down" /></button>
      </div>
    </section>
  )
}

// Reduced motion: the same projects, without the flight
function GalaxyGrid({ id, projects, head, number, onOpen }) {
  const { t } = useLang()
  return (
    <section id={id} className="galaxy-grid-section section" data-screen-label={en(head.eyebrow)}>
      <div className="container">
        <div className="work-head">
          <p className="eyebrow"><span className="num">{number}</span><span className="line" /><span>{t(head.eyebrow)}</span></p>
          <h2>{t(copy.title)} <span className="grad">{t(copy.mark)}</span></h2>
          <p className="work-note">{t(head.note)}</p>
        </div>
        <div className="galaxy-grid">
          {projects.map((project) => (
            <button key={caseKey(project)} className="g-tile" onClick={(event) => onOpen(project, event.currentTarget.querySelector('img'))}>
              <img src={thumbOf(project)} alt="" loading="lazy" data-case-key={caseKey(project)} />
              <span className="kind">{t(project.tag)} - {project.year}</span>
              <strong>{t(project.title)}</strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
