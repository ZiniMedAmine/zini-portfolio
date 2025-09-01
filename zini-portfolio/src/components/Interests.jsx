import { Reveal } from './Reveal'

const interests = [
  'Generative art', 'Poster design', 'Kinetic typography', '3D renders', 'Minimal branding',
  'WebGL experiments', 'Design systems', 'Micro‑interactions', 'Street photography', 'Music production'
]

export function Interests() {
  return (
  <section id="interests" className="section">
      <div className="container">
        <h2>Interests</h2>
        <div className="grid" style={{ marginTop: 12 }}>
          {interests.map((t, i) => (
            <Reveal key={t} className="card" style={{ gridColumn: 'span 4', padding: 16 }}>
              <strong>{t}</strong>
              <p className="muted" style={{ marginTop: 6 }}>Short note about how I approach {t.toLowerCase()} and what inspires me.</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
