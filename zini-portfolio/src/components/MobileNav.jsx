import { useState, useEffect } from 'react'

const mobileLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('home')

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-nav') && !event.target.closest('.mobile-nav-toggle')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Active section tracking
  useEffect(() => {
    const sections = mobileLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    let ticking = false
    const compute = () => {
      const pos = window.scrollY + window.innerHeight * 0.35
      let current = sections[0]?.id || 'home'
      for (const el of sections) {
        const top = el.offsetTop
        if (top <= pos) current = el.id
      }
      setActive(current)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(compute)
        ticking = true
      }
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = (id, event) => {
    event.preventDefault()
    setIsOpen(false)
    
    const el = document.getElementById(id)
    if (el) {
      const offsetTop = el.offsetTop - 100
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <button 
        className={`mobile-nav-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        type="button"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav ${isOpen ? 'active' : ''}`}>
        <nav className="mobile-nav-links">
          {mobileLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(link.id, e)}
              className={active === link.id ? 'active' : ''}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
