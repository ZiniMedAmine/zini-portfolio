import { useState } from 'react'
import { flushSync } from 'react-dom'
import { L, en } from '../i18n'

export const caseCopy = {
  role: L('Role', 'Rôle'),
  year: L('Year', 'Année'),
  output: L('Output', 'Livrable'),
  stack: L('Stack', 'Stack'),
  openCase: L('Open case', 'Détails'),
  viewBehance: L('View on Behance', 'Voir sur Behance'),
  viewProject: L('View project', 'Voir le projet'),
  closeProject: L('Close project', 'Fermer le projet'),
  prevProject: L('Previous project', 'Projet précédent'),
  nextProject: L('Next project', 'Projet suivant'),
  showImage: L('Show image', "Afficher l'image"),
}

// Stable identifier for a project, whatever the active language
export const caseKey = (project) => en(project.title)

export function splitTitle(title) {
  const words = title.split(' ')
  if (words.length < 2) return [null, title]
  return [words.slice(0, -1).join(' '), words.at(-1)]
}

export const MORPH = 'case-media'
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const canMorph = () => Boolean(document.startViewTransition) && !reduceMotion()
const coverImage = (project) => project.images?.[0] || project.image

// Wait (briefly) for the big image so the morph lands on pixels, not on an empty box
function preload(src, timeout = 400) {
  if (!src) return Promise.resolve()
  const img = new Image()
  img.src = src
  const ready = img.decode ? img.decode().catch(() => {}) : Promise.resolve()
  return Promise.race([ready, new Promise((resolve) => setTimeout(resolve, timeout))])
}

// The on-page image the case study should shrink back into: visible, on screen, not faded out
function findSource(key) {
  const candidates = document.querySelectorAll(`[data-case-key="${CSS.escape(key)}"]`)
  for (const el of candidates) {
    if (el.closest('.case')) continue
    const rect = el.getBoundingClientRect()
    if (rect.width < 4 || rect.bottom < 0 || rect.top > window.innerHeight) continue
    if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue
    const fade = el.closest('[data-fade]')
    if (fade && Number(fade.style.opacity || 1) < 0.35) continue
    return el
  }
  return null
}

function transition(update) {
  if (!canMorph()) {
    update()
    return null
  }
  const run = document.startViewTransition(async () => {
    flushSync(update)
    // Let the freshly mounted image decode before the new state is captured
    await document.querySelector('.case-media img')?.decode?.().catch(() => {})
  })
  run.ready.catch(() => {})
  return run
}

export function useCaseStudy(projects) {
  const [index, setIndex] = useState(-1)

  const open = async (project, source) => {
    const next = projects.indexOf(project)
    if (next < 0) return
    if (!canMorph()) {
      setIndex(next)
      return
    }
    await preload(coverImage(project))
    if (source) source.style.viewTransitionName = MORPH
    const run = transition(() => {
      if (source) source.style.viewTransitionName = ''
      setIndex(next)
    })
    run?.finished.finally(() => { if (source) source.style.viewTransitionName = '' })
  }

  const close = () => {
    const current = projects[index]
    const target = current && canMorph() ? findSource(caseKey(current)) : null
    const run = transition(() => {
      setIndex(-1)
      if (target) target.style.viewTransitionName = MORPH
    })
    run?.finished.finally(() => { if (target) target.style.viewTransitionName = '' })
  }

  const go = async (step) => {
    const next = (index + step + projects.length) % projects.length
    await preload(coverImage(projects[next]))
    transition(() => setIndex(next))
  }

  return { project: index >= 0 ? projects[index] : null, index, total: projects.length, projects, open, close, go }
}
