import './index.css'
import { useEffect, useRef } from 'react'
import { MobileNav } from './components/MobileNav'
import Contact from './components/Contact_new'

// Import all images
import skepticLogo from './assets/Skeptic.webp'
import behanceIcon from './assets/behance-circle.svg'
import spacePlanetArt from './assets/Space_Planet_Art.webp'
import spaceDoodleArt from './assets/Space_doodle_artwork.webp'
import bipolarArt from './assets/bipolar_disorder_digital_art.webp'
import mementoMori from './assets/Memento_mori.webp'
import fightClub from './assets/FightClub.webp'
import curiositySkeptic from './assets/curiositykillstheskeptic.webp'
import tunisiaFront from './assets/Tunisia_Front.webp'
import tunisiaBack from './assets/Tunisia_Back.webp'
import hegelsHotel from './assets/Hegels_hotel_california.webp'
import skepticLogo1 from './assets/skeptic_logo_1.webp'
import skepticLogo2 from './assets/skeptic_logo_2.webp'
import skepticLogo3 from './assets/skeptic_logo_3.webp'
import deadWelder from './assets/The_dead_welder.webp'
import bioaura from './assets/bioaura.webp'
import todo1 from './assets/todo1.webp'
import todo2 from './assets/todo2.webp'
import flyer1 from './assets/F1.webp'
import flyer2 from './assets/F2.webp'
import flyer3 from './assets/F3.webp'
import flyer4 from './assets/F4.webp'
import skepticTshirt from './assets/skepticTshirt.webp'
import kant1 from './assets/Kant1.webp'
import kant2 from './assets/Kant2.webp'
import cogito from './assets/Cogito.webp'
import problemImage from './assets/problem.webp'
import dermaIn from './assets/derma-in.webp'
import jradBeauty from './assets/jradbeauty.webp'
import ttWebsite from './assets/TTWebsite.webp'
import invoiceScan from './assets/InvoiceScan.webp'
import reactCalculator from './assets/reactcalculator.webp'
import portfolioWebsite from './assets/portfoliowebsite.webp'

function App() {
  const yearRef = useRef(null)
  const progressRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const p = docHeight > 0 ? scrollTop / docHeight : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (yearRef.current) yearRef.current.textContent = String(new Date().getFullYear())
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main .section'))
    const nav = document.getElementById('dot-nav')
    if (!nav) return
    nav.innerHTML = ''
    const buttons = sections.map((s) => {
      const b = document.createElement('button')
      b.setAttribute('data-title', s.dataset.title || s.id)
      b.setAttribute('aria-label', s.dataset.title || s.id)
      b.addEventListener('click', () => s.scrollIntoView({ behavior: 'smooth', block: 'start' }))
      nav.appendChild(b)
      return b
    })
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.3) {
          const idx = sections.indexOf(e.target)
          buttons.forEach((b, i) => b.classList.toggle('active', i === idx))
        }
      })
    }, { threshold: [0.3, 0.5, 0.7] })
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const magnets = Array.from(document.querySelectorAll('.magnetic'))
    const strength = 0.35
    function onMove(e){
      const t = e.currentTarget
      const rect = t.getBoundingClientRect()
      const mx = e.clientX - (rect.left + rect.width/2)
      const my = e.clientY - (rect.top + rect.height/2)
      t.style.transform = `translate(${mx * strength}px, ${my * strength}px)`
    }
    function reset(e){ e.currentTarget.style.transform = 'translate(0,0)' }
    magnets.forEach(el => {
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', reset)
    })
    return () => magnets.forEach(el => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', reset)
    })
  }, [])

  useEffect(() => {
    // Skills progress bars
    const skillItems = document.querySelectorAll('.skill-item')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.setProperty('--skill-width', entry.target.style.getPropertyValue('--skill-width'))
          }, 200)
        }
      })
    }, { threshold: 0.3 })
    
    skillItems.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const dot = document.querySelector('.cursor-dot')
    const ring = document.querySelector('.cursor-ring')
    if (!dot || !ring) return
    let x = 0, y = 0; let rx = 0, ry = 0; let scale = 1
    function move(e){ x = e.clientX; y = e.clientY; dot.style.transform = `translate(${x}px,${y}px)` }
    addEventListener('mousemove', move, { passive: true })
    function loop(){ rx += (x - rx) * 0.18; ry += (y - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px) scale(${scale})`; requestAnimationFrame(loop) }
    loop()
    const hoverables = 'a, button, .magnetic, input, textarea, [role="button"]'
    const onOver = (e) => { if (e.target.closest(hoverables)) scale = 1.2 }
    const onOut = (e) => { if (e.target.closest(hoverables)) scale = 1 }
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => { removeEventListener('mousemove', move); document.removeEventListener('mouseover', onOver); document.removeEventListener('mouseout', onOut) }
  }, [])

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        const designGallery = document.querySelector('.design-gallery')
        const devModal = document.querySelector('.dev-modal')
        
        if (designGallery && designGallery.classList.contains('active')) {
          designGallery.classList.remove('active')
        }
        
        if (devModal && devModal.classList.contains('active')) {
          devModal.classList.remove('active')
        }
      }
    }
    
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [])

  // Alternating title effect
  useEffect(() => {
    const titles = ['Graphic Designer', 'Web Developer']
    let currentIndex = 0 // Start at 0 (Graphic Designer)
    let intervalId = null
    
    const titleElement = titleRef.current
    if (!titleElement) return
    
    const changeTitle = () => {
      // Fade out
      titleElement.style.opacity = '0'
      
      // After fade out completes, change text and fade in
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % titles.length
        titleElement.textContent = titles[currentIndex]
        titleElement.style.opacity = '1'
      }, 500) // Match CSS transition duration
    }
    
    // Start alternating after 3 seconds, then every 3.5 seconds consistently
    const initialTimeout = setTimeout(() => {
      changeTitle()
      // Set up interval for consistent 3.5s cycles after first change
      intervalId = setInterval(changeTitle, 3500)
    }, 3000)
    
    return () => {
      clearTimeout(initialTimeout)
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  return (
    <>
      <div id="scroll-progress" aria-hidden="true" ref={progressRef} />

      {/* Mobile Navigation */}
      <MobileNav />

      <div className="bg-accents" aria-hidden="true">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
      </div>

      <nav id="dot-nav" aria-label="Section navigation" />

      <header className="site-header">
        <a href="#home" className="brand" aria-label="Home">
          <img src={skepticLogo} alt="Skeptic Logo" style={{height: '28px', width: 'auto'}} />
          <span>Mohamed Amine Zini</span>
        </a>
        <div className="spacer" />
        <ul className="top-nav">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#contact" className="magnetic btn btn-primary">Contact</a></li>
        </ul>
      </header>

      <main id="page" className="snap-container">
        <section id="home" className="section hero" data-title="Home">
          <div className="hero-inner">
            <div className="intro">
              <p className="eyebrow">Available for freelance</p>
              <h1>
                Mohamed Amine Zini
                <span className="gradient" ref={titleRef}>Graphic Designer</span>
              </h1>
              <p className="lede">I blend graphic design artistry with robust, scalable web development to craft distinctive brand identities and interactive digital experiences.</p>
              <div className="cta-row">
                <a href="#work" className="btn btn-primary magnetic">View Work</a>
                <a href="#contact" className="btn btn-ghost magnetic">Get in touch</a>
              </div>
              <div className="socials">
                <a href="mailto:zini.m.amine@gmail.com" aria-label="Email" className="icon-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/hu.chi.355" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="icon-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/zini_med_amine" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="icon-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/mohamed-amine-zini/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.behance.net/ZiniMedAmine" target="_blank" rel="noopener noreferrer" aria-label="Behance" className="icon-link">
                  <img src={behanceIcon} alt="Behance" width="24" height="24" style={{filter: 'brightness(0) invert(1)'}} />
                </a>
                <a href="https://github.com/ZiniMedAmine" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="orbit">
                <div className="planet" />
                <div className="ring" />
                <div className="ring r2" />
              </div>
            </div>
          </div>
          <div className="scroll-hint" aria-hidden="true">Scroll</div>
        </section>

        <section id="about" className="section" data-title="About">
          <div className="container">
            <div className="split">
              <div>
                <h2>About me</h2>
                <p>
                  I'm Mohamed Amine, a passionate <strong>Graphic Designer</strong> and <strong>Web Developer</strong> who believes that great design isn't just about making things look beautiful—it's about solving problems and telling stories that resonate.
                </p>
                <p>
                  My journey began with a fascination for visual communication and evolved into a multidisciplinary approach where design meets technology. I specialize in crafting distinctive brand identities that capture the essence of businesses, from startups finding their voice to established companies ready to evolve.
                </p>
                <p>
                  What sets me apart is my ability to bridge the gap between creative vision and technical execution. Whether I'm designing a logo in Photoshop, building an interactive website with React, or developing a complete brand system, I bring the same attention to detail and commitment to excellence.
                </p>
                
                <div className="skills-breakdown">
                  <h3>What I Do Best</h3>
                  <div className="skill-bars-mini">
                    <div className="skill-bar-mini">
                      <div className="skill-info">
                        <span>Brand Design</span>
                        <span>95%</span>
                      </div>
                      <div className="skill-progress">
                        <div className="skill-fill" style={{width: '95%', background: 'linear-gradient(90deg, #7C4DFF, #00E5FF)'}}></div>
                      </div>
                    </div>
                    <div className="skill-bar-mini">
                      <div className="skill-info">
                        <span>Graphic design & creativity</span>
                        <span>95%</span>
                      </div>
                      <div className="skill-progress">
                        <div className="skill-fill" style={{width: '95%', background: 'linear-gradient(90deg, #00E5FF, #00FFA3)'}}></div>
                      </div>
                    </div>
                    <div className="skill-bar-mini">
                      <div className="skill-info">
                        <span>Web development</span>
                        <span>85%</span>
                      </div>
                      <div className="skill-progress">
                        <div className="skill-fill" style={{width: '85%', background: 'linear-gradient(90deg, #7C4DFF, #00FFA3)'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <aside className="stats-enhanced">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-visual">
                      <div className="circular-progress" style={{'--progress': '75%', '--color': '#7C4DFF'}}>
                        <span className="stat-number">3</span>
                        <span className="stat-unit">yrs</span>
                      </div>
                    </div>
                    <span className="stat-label">Experience</span>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-visual">
                      <div className="circular-progress" style={{'--progress': '85%', '--color': '#00E5FF'}}>
                        <span className="stat-number">50</span>
                        <span className="stat-unit">+</span>
                      </div>
                    </div>
                    <span className="stat-label">Designs Created</span>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-visual">
                      <div className="circular-progress" style={{'--progress': '90%', '--color': '#00FFA3'}}>
                        <span className="stat-number">15</span>
                        <span className="stat-unit">+</span>
                      </div>
                    </div>
                    <span className="stat-label">Happy Clients</span>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-visual">
                      <div className="circular-progress" style={{'--progress': '70%', '--color': '#7C4DFF'}}>
                        <span className="stat-number">1K</span>
                        <span className="stat-unit">+</span>
                      </div>
                    </div>
                    <span className="stat-label">Followers</span>
                  </div>
                </div>
                
                <div className="tools-grid">
                  <h3>Design Tools I Master</h3>
                  <div className="tool-icons">
                    <div className="tool-icon" title="Adobe Photoshop">
                      <div className="tool-bg" style={{background: 'linear-gradient(135deg, #31A8FF, #0078D4)'}}>Ps</div>
                      <span>Photoshop</span>
                    </div>
                    <div className="tool-icon" title="Adobe Illustrator">
                      <div className="tool-bg" style={{background: 'linear-gradient(135deg, #FF9A00, #FF6B00)'}}>Ai</div>
                      <span>Illustrator</span>
                    </div>
                    <div className="tool-icon" title="Figma">
                      <div className="tool-bg" style={{background: 'linear-gradient(135deg, #F24E1E, #A259FF)'}}>Fi</div>
                      <span>Figma</span>
                    </div>
                    <div className="tool-icon" title="Canva">
                      <div className="tool-bg" style={{background: 'linear-gradient(135deg, #00C4CC, #7B68EE)'}}>Ca</div>
                      <span>Canva</span>
                    </div>
                    <div className="tool-icon" title="Adobe Premiere Pro">
                      <div className="tool-bg" style={{background: 'linear-gradient(135deg, #9999FF, #EA77FF)'}}>Pr</div>
                      <span>Premiere</span>
                    </div>
                    <div className="tool-icon" title="Filmora">
                      <div className="tool-bg" style={{background: 'linear-gradient(135deg, #00D4AA, #00A3FF)'}}>Fi</div>
                      <span>Filmora</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
          <div className="marquee" aria-hidden="true">
            <div className="track">
              <span>Brand Identity</span>
              <span>Logo Design</span>
              <span>UI/UX Design</span>
              <span>Web Development</span>
              <span>MERN Stack</span>
              <span>Social Media Design</span>
              <span>Print Design</span>
              <span>Video Editing</span>
              <span>WordPress</span>
              <span>Creative Direction</span>
            </div>
          </div>
        </section>

        <section id="skills" className="section" data-title="Skills">
          <div className="container">
            <h2>Skills & Expertise</h2>
            <p className="muted">My technical proficiency across design and development tools.</p>
            <div className="skills-timeline">
              <div className="skills-category">
                <div className="skills-category-label">Design & Creativity </div>
                <div className="skills-category-card">
                  <h3>Graphic Design</h3>
                  <div className="skills-list">
                    <div className="skill-item" style={{'--skill-width': '95%'}}>
                      <div className="skill-name">Adobe Photoshop</div>
                      <div className="skill-level">Expert</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '90%'}}>
                      <div className="skill-name">Adobe Illustrator</div>
                      <div className="skill-level">Advanced</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '88%'}}>
                      <div className="skill-name">Figma</div>
                      <div className="skill-level">Advanced</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '85%'}}>
                      <div className="skill-name">Canva</div>
                      <div className="skill-level">Advanced</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '85%'}}>
                      <div className="skill-name">Brand design</div>
                      <div className="skill-level">Advanced</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="skills-category">
                <div className="skills-category-label">Web Development</div>
                <div className="skills-category-card">
                  <h3>Web Development & Frameworks</h3>
                  <div className="skills-list">
                    <div className="skill-item" style={{'--skill-width': '90%'}}>
                      <div className="skill-name">HTML/CSS</div>
                      <div className="skill-level">Advanced</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '85%'}}>
                      <div className="skill-name">JavaScript</div>
                      <div className="skill-level">Advanced</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '82%'}}>
                      <div className="skill-name">ReactJS</div>
                      <div className="skill-level">Advanced</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '50%'}}>
                      <div className="skill-name">Django</div>
                      <div className="skill-level">Intermediate</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '75%'}}>
                      <div className="skill-name">Bootstrap</div>
                      <div className="skill-level">Proficient</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '75%'}}>
                      <div className="skill-name">TailwindCSS</div>
                      <div className="skill-level">Proficient</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '80%'}}>
                      <div className="skill-name">NodeJS</div>
                      <div className="skill-level">Advanced</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '75%'}}>
                      <div className="skill-name">Express JS</div>
                      <div className="skill-level">Proficient</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '75%'}}>
                      <div className="skill-name">MongoDB</div>
                      <div className="skill-level">Proficient</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '70%'}}>
                      <div className="skill-name">Python</div>
                      <div className="skill-level">Proficient</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '70%'}}>
                      <div className="skill-name">SQL</div>
                      <div className="skill-level">Proficient</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="skills-category">
                <div className="skills-category-label">General Programming</div>
                <div className="skills-category-card">
                  <h3>Programming languages</h3>
                  <div className="skills-list">
                    <div className="skill-item" style={{'--skill-width': '70%'}}>
                      <div className="skill-name">C</div>
                      <div className="skill-level">Proficient</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '60%'}}>
                      <div className="skill-name">Java</div>
                      <div className="skill-level">Proficient</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '80%'}}>
                      <div className="skill-name">JavaScript</div>
                      <div className="skill-level">Advanced</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '80%'}}>
                      <div className="skill-name">Python</div>
                      <div className="skill-level">Advanced</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '70%'}}>
                      <div className="skill-name">SQL</div>
                      <div className="skill-level">Proficient</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="skills-category">
                <div className="skills-category-label">Video Editing</div>
                <div className="skills-category-card">
                  <h3>Video Editing</h3>
                  <div className="skills-list">
                    <div className="skill-item" style={{'--skill-width': '60%'}}>
                      <div className="skill-name">Adobe Premiere Pro</div>
                      <div className="skill-level">Proficient</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '30%'}}>
                      <div className="skill-name">Adobe After Effects</div>
                      <div className="skill-level">Intermediate</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '90%'}}>
                      <div className="skill-name">Wondershare Filmora</div>
                      <div className="skill-level">Advanced</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '90%'}}>
                      <div className="skill-name">Capcut</div>
                      <div className="skill-level">Advanced</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="skills-category">
                <div className="skills-category-label">General Skills</div>
                <div className="skills-category-card">
                  <h3>General Skills</h3>
                  <div className="skills-list">
                    <div className="skill-item" style={{'--skill-width': '95%'}}>
                      <div className="skill-name">Analytical Thinking</div>
                      <div className="skill-level">Advanced</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '90%'}}>
                      <div className="skill-name">Emotional Intelligence</div>
                      <div className="skill-level">Advanced</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '85%'}}>
                      <div className="skill-name">Business Communication</div>
                      <div className="skill-level">Proficient</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '70%'}}>
                      <div className="skill-name">E-commerce</div>
                      <div className="skill-level">Intermediate</div>
                    </div>
                    <div className="skill-item" style={{'--skill-width': '75%'}}>
                      <div className="skill-name">Sales</div>
                      <div className="skill-level">Proficient</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section" data-title="Experience">
          <div className="container">
            <div className="experience-header">
              <h2>Professional Experience</h2>
              <p className="muted">My journey through graphic design and web development roles, building expertise across creative and technical domains.</p>
            </div>
            <div className="timeline-enhanced">
              <div className="timeline-item">
                <div className="timeline-year">
                  <span className="year-badge current">2024</span>
                  <span className="year-label">Ongoing</span>
                </div>
                <div className="timeline-content">
                  <div className="experience-card freelance">
                    <div className="card-header">
                      <div className="role-info">
                        <h3>Freelance Web Developer</h3>
                        <div className="company">
                          <span className="company-icon">💼</span>
                          <span>Self-Employed</span>
                        </div>
                      </div>
                      <div className="role-type">Remote</div>
                    </div>
                    <p className="role-description">
                      Developed MERN stack exam platform, built WordPress sites, and delivered full-stack solutions with client-focused approach. Specialized in creating scalable web applications and custom solutions.
                    </p>
                    <div className="tech-stack">
                      <span className="tech-tag">React</span>
                      <span className="tech-tag">Node.js</span>
                      <span className="tech-tag">MongoDB</span>
                      <span className="tech-tag">WordPress</span>
                      <span className="tech-tag">Express</span>
                    </div>
                    <div className="achievements">
                      <div className="achievement">
                        <span className="achievement-icon">🚀</span>
                        <span>6+ projects delivered</span>
                      </div>
                      <div className="achievement">
                        <span className="achievement-icon">⭐</span>
                        <span>100% client satisfaction</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-year">
                  <span className="year-badge">2023</span>
                  <span className="year-label">Ongoing</span>
                </div>
                <div className="timeline-content">
                  <div className="experience-card design">
                    <div className="card-header">
                      <div className="role-info">
                        <h3>Freelance Graphic Designer</h3>
                        <div className="company">
                          <span className="company-icon">🎨</span>
                          <span>Self-Employed</span>
                        </div>
                      </div>
                      <div className="role-type">Global</div>
                    </div>
                    <p className="role-description">
                      Created brand identities, managed social media content, and launched TeePublic store with 50+ designs for international clients. Focused on building cohesive brand experiences across digital platforms.
                    </p>
                    <div className="tech-stack">
                      <span className="tech-tag design">Photoshop</span>
                      <span className="tech-tag design">Illustrator</span>
                      <span className="tech-tag design">Figma</span>
                      <span className="tech-tag design">Canva</span>
                      <span className="tech-tag design">Brand Design</span>
                    </div>
                    <div className="achievements">
                      <div className="achievement">
                        <span className="achievement-icon">🎯</span>
                        <span>50+ designs</span>
                      </div>
                      <div className="achievement">
                        <span className="achievement-icon">🌍</span>
                        <span>International reach</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-year">
                  <span className="year-badge">2024</span>
                  <span className="year-label">Graduation</span>
                </div>
                <div className="timeline-content">
                  <div className="experience-card internship">
                    <div className="card-header">
                      <div className="role-info">
                        <h3>Bachelor Graduation Intern</h3>
                        <div className="company">
                          <span className="company-icon">🏢</span>
                          <span>Elite Council Consulting</span>
                        </div>
                      </div>
                      <div className="role-type">Intern</div>
                    </div>
                    <p className="role-description">
                      Developed OCR web application using Django, enhanced accuracy by 60% with OpenCV preprocessing techniques. Focused on computer vision and machine learning applications.
                    </p>
                    <div className="tech-stack">
                      <span className="tech-tag">Django</span>
                      <span className="tech-tag">Python</span>
                      <span className="tech-tag">OpenCV</span>
                      <span className="tech-tag">OCR</span>
                      <span className="tech-tag">ML</span>
                    </div>
                    <div className="achievements">
                      <div className="achievement">
                        <span className="achievement-icon">👨‍💻</span>
                        <span>Python</span>
                      </div>
                      <div className="achievement">
                        <span className="achievement-icon">🤖</span>
                        <span>Prompt Engineering</span>
                      </div>
                      <div className="achievement">
                        <span className="achievement-icon">📄</span>
                        <span>OCR Technology</span>
                      </div>
                      <div className="achievement">
                        <span className="achievement-icon">🎓</span>
                        <span>Graduation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-year">
                  <span className="year-badge">2023</span>
                  <span className="year-label">Summer</span>
                </div>
                <div className="timeline-content">
                  <div className="experience-card internship">
                    <div className="card-header">
                      <div className="role-info">
                        <h3>Web Development Intern</h3>
                        <div className="company">
                          <span className="company-icon">📡</span>
                          <span>Tunisie Telecom</span>
                        </div>
                      </div>
                      <div className="role-type">Intern</div>
                    </div>
                    <p className="role-description">
                      Built social activity management website using MERN Stack in collaborative team environment. Gained experience in enterprise-level development and teamwork.
                    </p>
                    <div className="tech-stack">
                      <span className="tech-tag">React</span>
                      <span className="tech-tag">Node.js</span>
                      <span className="tech-tag">MongoDB</span>
                      <span className="tech-tag">Express</span>
                      <span className="tech-tag">Team Work</span>
                    </div>
                    <div className="achievements">
                      <div className="achievement">
                        <span className="achievement-icon">👨‍💻</span>
                        <span>MERN Stack</span>
                      </div>
                      <div className="achievement">
                        <span className="achievement-icon">👥</span>
                        <span>Team collaboration</span>
                      </div>
                      <div className="achievement">
                        <span className="achievement-icon">🔧</span>
                        <span>Enterprise experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section work-section" data-title="Work">
          <div className="container">
            <h2>Selected Work</h2>
            <p className="muted">Explore my latest projects across design and development.</p>
            
            <div className="work-categories">
              <div className="work-category">
                <h3>Design Projects</h3>
                <p className="muted">Brand identities, visual designs, and creative solutions</p>
                <div className="work-grid design-grid">
                  {[
                    {
                      id: 2,
                      title: "Space Planet Art",
                      description: "Digital artwork featuring some planets along with doodle simple details and space elements with vibrant colors and artistic flair.",
                      tag: "Illustration",
                      type: "design",
                      behanceUrl: "https://www.behance.net/gallery/233604109/Space-digital-illustration",
                      images: [
                        spacePlanetArt,
                      ]
                    },
                    {
                      id: 3,
                      title: "Space Doodle Artwork",
                      description: "Creative space-themed doodle illustration.",
                      tag: "Illustration",
                      type: "design",
                      behanceUrl: "https://www.behance.net/gallery/181236815/Space-doodle-art",
                      images: [
                        spaceDoodleArt,
                      ]
                    },
                    {
                      id: 4,
                      title: "Bipolar Disorder Digital Art",
                      description: "Expressive digital artwork Illustrating the inner-experience of people with bipolar disorder.",
                      tag: "Digital Art",
                      type: "design",
                      behanceUrl: "https://www.behance.net/gallery/205355239/Bipolar-disorder-digital-art",
                      images: [
                        bipolarArt,
                      ]
                    },
                    {
                      id: 5,
                      title: "Memento Mori - تذكر أنك ميت",
                      description: "Digital art piece inspired by the Meditations of Marcus Aurelius, beautifully mixing arabic & latin letters, about  the philosophical concept of mortality and the reminder to live meaningfully.",
                      tag: "Digital Art",
                      type: "design",
                      behanceUrl: "https://www.behance.net/gallery/209749997/Memento-mori-design",
                      images: [
                        mementoMori,
                      ]
                    },
                    {
                      id: 6,
                      title: "Fight Club Poster",
                      description: "Movie poster design exploring the film's philosophy of anti-consumerism, freedom from material chains, and breaking societal norms through bold visual metaphors.",
                      tag: "Digital Art",
                      type: "design",
                      behanceUrl: "https://www.behance.net/gallery/206744351/Fight-Club-Poster-Artwork",
                      images: [
                        fightClub,
                      ]
                    },
                    {
                      id: 7,
                      title: "Curiosity Kills the Skeptic",
                      description: "Deep philosophical poster exploring the paradox between intellectual curiosity and skeptical doubt, questioning whether the pursuit of knowledge ultimately challenges our protective skepticism.",
                      tag: "Digital Art",
                      type: "design",
                      behanceUrl: "https://www.behance.net/gallery/205354867/Curiosity-kills-the-skeptic-digital-artwork",
                      images: [
                        curiositySkeptic,
                      ]
                    },
                    {
                      id: 8,
                      title: "The Quantum Society",
                      description: "Conceptual design project exploring quantum theory as a metaphor for modern society, featuring front and back compositions that represent different perspectives of social complexity.",
                      tag: "Digital Art",
                      type: "design",
                      behanceUrl: "https://www.behance.net/gallery/207066209/Tunisia-The-quantum-society-Digital-Art",
                      images: [
                        tunisiaFront,
                        tunisiaBack
                      ]
                    },
                    {
                      id: 9,
                      title: "Hegel's Hotel California",
                      description: "Philosophical cover art reimagining the Eagles' classic album with Hegel's dialectical thinking, featuring the text 'such a lovely place for a contradiction' - merging rock culture with German idealism.",
                      tag: "Digital Art",
                      type: "design",
                      behanceUrl: "https://www.behance.net/gallery/206487429/Eagles-Hotel-California-Album-Cover-Rework",
                      images: [
                        hegelsHotel,
                      ]
                    },
                    {
                      id: 10,
                      title: "Skeptic Brand Identity",
                      description: "Logo design variations for my philosophical brand 'Skeptic', exploring different visual approaches to represent critical thinking, questioning, and intellectual curiosity through typography and symbolic elements.",
                      tag: "Brand Identity",
                      type: "design",
                      behanceUrl: "https://www.behance.net/gallery/178779857/Skeptic-Logo-design",
                      images: [
                        skepticLogo3,
                        skepticLogo1,
                        skepticLogo2
                      ]
                    },
                    {
                      id: 11,
                      title: "The Dead Welder",
                      description: "Brand identity and logo design for a welder content creator, combining industrial aesthetics with edgy typography to create a memorable brand that reflects the raw, skilled nature of welding craftsmanship.",
                      tag: "Brand Identity",
                      type: "design",
                      behanceUrl: "https://www.behance.net/gallery/179077249/The-Dead-Welder-Logo-Design",
                      images: [
                        deadWelder,
                      ]
                    },
                    {
                      id: 12,
                      title: "BioAura Cosmetics",
                      description: "Brand identity and logo design for BioAura Cosmetics, creating an elegant and organic visual identity that emphasizes natural beauty, wellness, and the harmonious connection between biology and personal care.",
                      tag: "Brand Identity",
                      type: "design",
                      behanceUrl: "https://www.behance.net/gallery/180198681/BioAura-Cosmetics",
                      images: [
                        bioaura,
                      ]
                    },
                    {
                      id: 13,
                      title: "Todo Notebook Covers",
                      description: "Two cover designs for todo notebooks created for a small business, featuring clean layouts and motivational aesthetics to inspire productivity and organization for everyday task management.",
                      tag: "Print Design",
                      type: "design",
                      behanceUrl: "https://www.behance.net/gallery/208940377/TO-DO-Notebook-Cover-Designs",
                      images: [
                        todo1,
                        todo2
                      ]
                    },
                    {
                      id: 14,
                      title: "Derma-In Laboratory Flyers",
                      description: "Marketing flyer designs for Derma-In laboratory, showcasing their sun protection products and natural oils collection. Clean, professional layouts emphasizing the scientific quality and natural benefits of their skincare solutions.",
                      tag: "Print design",
                      type: "design",
                      behanceUrl: "https://www.behance.net/gallery/233602985/Derma-In-Laboratory-Flyer-Design",
                      images: [
                        flyer1,
                        flyer2,
                        flyer3,
                        flyer4
                      ]
                    },
                    {
                      id: 15,
                      title: "Skeptic T-Shirt Designs",
                      description: "Philosophical t-shirt designs available on TeePublic, featuring thought-provoking concepts from great philosophers like Kant, Descartes, and original Skeptic brand artwork that challenges conventional thinking.",
                      tag: "T-Shirt Design",
                      type: "design",
                      linkUrl: "https://www.teepublic.com/user/skeptic-styles",
                      linkType: "teepublic",
                      images: [
                        skepticTshirt,
                        kant1,
                        kant2,
                        cogito,
                        problemImage
                      ]
                    }
                  ].map((project) => (
                    <div 
                      key={project.id}
                      className="work-card design-card magnetic"
                      onClick={() => {
                        const gallery = document.querySelector('.design-gallery')
                        const galleryTitle = gallery.querySelector('.gallery-title')
                        const galleryDesc = gallery.querySelector('.gallery-description')
                        const galleryTag = gallery.querySelector('.gallery-tag')
                        const galleryImages = gallery.querySelector('.gallery-images')
                        const projectLink = gallery.querySelector('.project-link')
                        
                        galleryTitle.textContent = project.title
                        galleryDesc.textContent = project.description
                        galleryTag.textContent = project.tag
                        
                        // Handle different link types
                        if (project.linkType === 'teepublic') {
                          projectLink.href = project.linkUrl
                          projectLink.textContent = 'Shop on TeePublic'
                          projectLink.classList.add('teepublic-link')
                          projectLink.classList.remove('behance-link')
                        } else {
                          projectLink.href = project.behanceUrl
                          projectLink.textContent = 'View on Behance'
                          projectLink.classList.add('behance-link')
                          projectLink.classList.remove('teepublic-link')
                        }
                        
                        galleryImages.innerHTML = project.images.map((img, index) => 
                          `<div class="gallery-slide ${index === 0 ? 'active' : ''}" style="background-image: url(${img})"></div>`
                        ).join('')
                        
                        gallery.classList.add('active')
                        gallery.currentImageIndex = 0
                        gallery.totalImages = project.images.length
                      }}
                    >
                      <div className="work-card-bg" style={{ backgroundImage: `url(${project.images[0]})` }} />
                      <div className="work-card-overlay">
                        <div className="work-card-tag design-tag">{project.tag}</div>
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                        <div className="design-indicator">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          Gallery View
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="work-category">
                <h3>Development Projects</h3>
                <p className="muted">Web applications, websites, and interactive experiences</p>
                <div className="work-grid dev-grid">
                  {[
                    {
                      id: 5,
                      title: "Derma-In E-commerce Website",
                      description: "A functional & responsive E-commerce website for derma-in laboratory, created using wordpress. Designed to help the company manage its orders and products through a user-friendly UI",
                      tag: "Wordpress",
                      type: "dev",
                      image: dermaIn,
                      liveUrl: "https://www.derma-in.com",
                      codeUrl: "https://www.derma-in.com",
                      tech: ["Wordpress", "Elementor", "Woocommerce", "PHP", "SEO", "YoastSEO"]
                    },
                    {
                      id: 6,
                      title: "Jrad Beauty Center Blog Website",
                      description: "A responsive wordpress blog website for Jrad Beauty Center that helps the clients get to know the project and better reach it through a user-friendly and minimalist UI.",
                      tag: "Wordpress",
                      type: "dev",
                      image: jradBeauty,
                      liveUrl: "https://jradbeautycenter.tn/",
                      codeUrl: "https://jradbeautycenter.tn/",
                      tech: ["Wordpress", "Elementor", "PHP", "SEO", "RankMath"]
                    },
                    {
                      id: 7,
                      title: "Tunisie Telecom Social Activity Management Website",
                      description: "A website for Tunisie Telecom, which is a website that manages social activities, accounts and offers of Tunisie Telecom Employees developed using MERN Stack.",
                      tag: "MERN STACK",
                      type: "dev",
                      image: ttWebsite,
                      liveUrl: "https://github.com/ZiniMedAmine/TTApp",
                      codeUrl: "https://github.com/ZiniMedAmine/TTApp",
                      tech: ["HTML/CSS","React", "Express JS", "MongoDB", "NodeJS"]
                    },
                    {
                      id: 8,
                      title: "InvoiceScan+",
                      description: "A website through which the user can scan any document image and get the relevant data and the document type in a useable JSON, Word or PDF file within seconds.",
                      tag: "Django/AI Web",
                      type: "dev",
                      image: invoiceScan,
                      liveUrl: "https://github.com/ZiniMedAmine/InvoiceScan",
                      codeUrl: "https://github.com/ZiniMedAmine/InvoiceScan",
                      tech: ["Python", "Django", "REST API", "OCR", "OpenCV", "Tesserract", "Prompt Engineering", "Gemini"]
                    },
                    {
                      id: 9,
                      title: "React Calculator",
                      description: "A simple react calculator developed purely for the purpose of learning and mastering TailwindCSS, found it a good idea in ters of learning to use tailwind's grid system, dark & light theme control and other features of it at that time",
                      tag: "React",
                      type: "dev",
                      image: reactCalculator,
                      liveUrl: "https://github.com/ZiniMedAmine/React-Calculator",
                      codeUrl: "https://github.com/ZiniMedAmine/React-Calculator",
                      tech: ["React", "NodeJS", "TailwindCSS"]
                    },
                    {
                      id: 10,
                      title: "My Portfolio Website",
                      description: "Explore my personal React portfolio, where I bring creativity and code together—showcasing my graphic design projects, web development work, professional experience, and ways to connect.",
                      tag: "React",
                      type: "dev",
                      image: portfolioWebsite,
                      liveUrl: "#",
                      codeUrl: "#",
                      tech: ["React", "NodeJS"]
                    }
                  ].map((project) => (
                    <div 
                      key={project.id}
                      className="work-card dev-card magnetic"
                      onClick={() => {
                        const modal = document.querySelector('.dev-modal')
                        modal.classList.add('active')
                        modal.querySelector('.modal-title').textContent = project.title
                        modal.querySelector('.modal-description').textContent = project.description
                        modal.querySelector('.modal-tag').textContent = project.tag
                        modal.querySelector('.modal-image').src = project.image
                        modal.querySelector('.live-link').href = project.liveUrl
                        
                        const techContainer = modal.querySelector('.modal-tech')
                        techContainer.innerHTML = project.tech.map(tech => 
                          `<span class="tech-tag">${tech}</span>`
                        ).join('')
                      }}
                    >
                      <div className="work-card-bg" style={{ backgroundImage: `url(${project.image})` }} />
                      <div className="work-card-overlay">
                        <div className="work-card-tag dev-tag">{project.tag}</div>
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                        <div className="tech-preview">
                          {project.tech.slice(0, 3).map(tech => (
                            <span key={tech} className="tech-badge">{tech}</span>
                          ))}
                          {project.tech.length > 3 && <span className="tech-more">+{project.tech.length - 3}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="design-gallery" onClick={(e) => {
            if (e.target === e.currentTarget) {
              e.currentTarget.classList.remove('active')
            }
          }}>
            <div className="gallery-content">
              <button className="gallery-close" onClick={() => {
                document.querySelector('.design-gallery').classList.remove('active')
              }}>×</button>
              
              <div className="gallery-header">
                <h2 className="gallery-title">Project Title</h2>
                <span className="gallery-tag">Category</span>
              </div>
              
              <div className="gallery-main">
                <div className="gallery-images"></div>
                <button className="gallery-nav gallery-prev" onClick={(e) => {
                  e.stopPropagation()
                  const gallery = document.querySelector('.design-gallery')
                  const slides = gallery.querySelectorAll('.gallery-slide')
                  const current = gallery.currentImageIndex || 0
                  const prev = current === 0 ? slides.length - 1 : current - 1
                  
                  slides[current].classList.remove('active')
                  slides[prev].classList.add('active')
                  gallery.currentImageIndex = prev
                }}>‹</button>
                <button className="gallery-nav gallery-next" onClick={(e) => {
                  e.stopPropagation()
                  const gallery = document.querySelector('.design-gallery')
                  const slides = gallery.querySelectorAll('.gallery-slide')
                  const current = gallery.currentImageIndex || 0
                  const next = current === slides.length - 1 ? 0 : current + 1
                  
                  slides[current].classList.remove('active')
                  slides[next].classList.add('active')
                  gallery.currentImageIndex = next
                }}>›</button>
              </div>
              
              <div className="gallery-footer">
                <p className="gallery-description">Project description will be shown here.</p>
                <div className="gallery-actions">
                  <a href="#" className="btn btn-primary magnetic project-link" target="_blank" rel="noopener noreferrer">View on Behance</a>
                </div>
                <div className="gallery-indicators">
                </div>
              </div>
            </div>
          </div>

          <div className="dev-modal" onClick={(e) => {
            if (e.target === e.currentTarget) {
              e.currentTarget.classList.remove('active')
            }
          }}>
            <div className="modal-content">
              <button className="modal-close" onClick={() => {
                document.querySelector('.dev-modal').classList.remove('active')
              }}>×</button>
              
              <img className="modal-image" src="" alt="Project" />
              
              <div className="modal-body">
                <div className="modal-header">
                  <h2 className="modal-title">Project Title</h2>
                  <span className="modal-tag">Category</span>
                </div>
                
                <p className="modal-description">Project description will be populated here.</p>
                
                <div className="modal-tech"></div>
                
                <div className="modal-actions">
                  <a href="#" className="btn btn-primary magnetic live-link">View Project</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Using EmailJS Component */}
        <Contact />
      </main>

      <footer className="site-footer">
        <div className="container">
          <div>© <span id="year" ref={yearRef} /> Mohamed Amine Zini</div>
          <div className="made">Crafted with care · Dark mode only</div>
        </div>
      </footer>

      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
    </>
  )
}

export default App
