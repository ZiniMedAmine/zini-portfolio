import { useEffect, useRef } from 'react'

export function Reveal({ children, as = 'div', y = 16, duration = 600, delay = 0, className = '', ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--reveal-y', `${y}px`)
    el.style.setProperty('--reveal-dur', `${duration}ms`)
    el.style.setProperty('--reveal-delay', `${delay}ms`)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add('in')
          // animate child skill bars
          el.querySelectorAll('.skill-bar').forEach((bar) => {
            const target = bar.getAttribute('data-target')
            if (target) bar.style.width = `${target}%`
          })
        }
      }),
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [y, duration, delay])
  const Tag = as
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
