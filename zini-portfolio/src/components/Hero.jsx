import { FiDownload, FiMail } from 'react-icons/fi'
import { Reveal } from './Reveal'
import { useEffect, useRef } from 'react'

export function Hero() {
  const orbRef = useRef(null)
  useEffect(() => {
    const el = orbRef.current
    if (!el) return
    const onScroll = () => {
      const y = window.scrollY * 0.15
      el.style.transform = `translate3d(0, ${y}px, 0)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <section id="home" className="section hero">
      <div className="container">
        <div className="two-col">
          <div className="left-7">
            <Reveal>
              <div className="pill eyebrow">Hey, I’m Zini — Designer & Web Dev</div>
              <h1 className="headline">Crafting bold visuals and silky-smooth experiences.</h1>
              <p className="subhead">
                I blend graphic design taste with modern web engineering to build brands, sites,
                and interactions that feel premium.
              </p>
              <div className="hero-cta">
                <a className="btn" href="#work">Explore my work</a>
                <a className="btn secondary" href="#contact"><FiMail /> Contact me</a>
                <a className="btn secondary" href="#" onClick={(e)=>e.preventDefault()}><FiDownload /> Download CV</a>
              </div>
              <div className="stats">
                <div className="stat"><div className="num">6+ yrs</div><div className="label">Experience</div></div>
                <div className="stat"><div className="num">40+</div><div className="label">Projects</div></div>
                <div className="stat"><div className="num">10+</div><div className="label">Brands</div></div>
              </div>
            </Reveal>
          </div>
          <div className="right-5">
            <div className="media-card" style={{ aspectRatio: '4/5' }}>
              <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" alt="preview" loading="eager" />
            </div>
          </div>
        </div>
      </div>
      <div className="orb" ref={orbRef} />
    </section>
  )
}
