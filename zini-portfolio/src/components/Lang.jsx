import { useCallback, useEffect, useId, useMemo, useState } from 'react'
import { LangContext, useLang } from '../i18n'

const STORAGE_KEY = 'zini-lang'
const LANGS = ['en', 'fr']

const meta = {
  en: {
    title: 'Mohamed Amine Zini • Software Engineer & Graphic Designer',
    description: 'Mohamed Amine Zini - Software Engineer (Computer Vision, OCR & AI applications) and Graphic Designer. Portfolio.',
  },
  fr: {
    title: 'Mohamed Amine Zini • Ingénieur logiciel & designer graphique',
    description: "Mohamed Amine Zini - Ingénieur logiciel (vision par ordinateur, OCR & applications IA) et designer graphique. Portfolio.",
  },
}

function readStoredLang() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return LANGS.includes(stored) ? stored : 'en'
  } catch {
    return 'en'
  }
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang)

  const setLang = useCallback((next) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private mode or blocked storage: the switch still works for this visit
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = meta[lang].title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta[lang].description)
    // Text widths changed: let scroll-driven UI (nav pill, horizontal tracks) re-measure
    const frame = requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
    return () => cancelAnimationFrame(frame)
  }, [lang])

  const value = useMemo(() => ({
    lang,
    setLang,
    t: (text) => (text && typeof text === 'object' && 'en' in text ? text[lang] : text),
  }), [lang, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

function FlagUK() {
  const id = useId()
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <clipPath id={`${id}s`}><path d="M0,0 v30 h60 v-30 z" /></clipPath>
      <clipPath id={`${id}t`}><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
      <g clipPath={`url(#${id}s)`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${id}t)`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

function FlagFR() {
  return (
    <svg viewBox="0 0 3 2" preserveAspectRatio="none" aria-hidden="true">
      <rect width="1" height="2" fill="#002654" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#CE1126" />
    </svg>
  )
}

export function LangSwitch({ className = '' }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Language / Langue">
      <button type="button" className={lang === 'en' ? 'is-active' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')} title="English">
        <span className="flag"><FlagUK /></span><span className="code">EN</span>
      </button>
      <button type="button" className={lang === 'fr' ? 'is-active' : ''} aria-pressed={lang === 'fr'} onClick={() => setLang('fr')} title="Français">
        <span className="flag"><FlagFR /></span><span className="code">FR</span>
      </button>
    </div>
  )
}
