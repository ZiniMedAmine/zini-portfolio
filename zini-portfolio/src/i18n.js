import { createContext, useContext } from 'react'

// Bilingual text: L('English', 'Français'). Plain strings are shared by both languages.
export const L = (en, fr) => ({ en, fr })

// Stable identifier for keys, whatever the active language
export const en = (value) => (value && typeof value === 'object' ? value.en : value)

export const LangContext = createContext(null)

export function useLang() {
  return useContext(LangContext)
}
