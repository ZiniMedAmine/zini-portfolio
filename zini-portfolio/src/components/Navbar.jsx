import { useEffect, useState } from 'react'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [active, setActive] = useState('home')

  // Robust scroll spy: pick the section whose top is above the viewport center line
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    let ticking = false
    const compute = () => {
      const pos = window.scrollY + window.innerHeight * 0.35 // 35% from top
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
    const onResize = () => compute()

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const clickTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const offsetTop = el.offsetTop - 100 // Account for fixed navbar + some padding
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="nav reveal in">
      {links.map((l) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          onClick={(e) => {
            e.preventDefault()
            clickTo(l.id)
          }}
          className={active === l.id ? 'active' : ''}
        >
          {l.label}
        </a>
      ))}
  </nav>
  )
}
