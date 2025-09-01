import { Reveal } from './Reveal'

const skills = {
  design: [
    { label: 'Figma', level: 88 },
    { label: 'Brand Design', level: 86 },
    { label: 'Typography', level: 84 },
    { label: 'Art Direction', level: 80 },
  ],
  development: [
    { label: 'React', level: 90 },
    { label: 'TypeScript', level: 80 },
    { label: 'Animations', level: 85 },
    { label: 'Node.js', level: 70 },
  ],
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2>Skills</h2>
        <div className="two-col">
          <Reveal className="card left-7" style={{ padding: 24 }}>
            <h3>Design</h3>
            <p className="muted">Brand identity, motion, and interface craft.</p>
            {skills.design.map((s) => (
              <div key={s.label} style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{s.label}</strong>
                  <span className="muted">{s.level}%</span>
                </div>
                <div style={{ height: 8, background: 'rgba(255,255,255,.06)', borderRadius: 999, marginTop: 8 }}>
                  <div className="skill-bar" style={{ width: 0 }} data-target={s.level} />
                </div>
              </div>
            ))}
            <div className="tool-row" style={{ marginTop: 14 }}>
              {['Branding','Visual identity','Layout','Motion'].map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </Reveal>
          <Reveal className="card right-5" style={{ padding: 24 }}>
            <h3>Development</h3>
            <p className="muted">Front-end engineering and interactions.</p>
            {skills.development.map((s) => (
              <div key={s.label} style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{s.label}</strong>
                  <span className="muted">{s.level}%</span>
                </div>
                <div style={{ height: 8, background: 'rgba(255,255,255,.06)', borderRadius: 999, marginTop: 8 }}>
                  <div className="skill-bar" style={{ width: 0 }} data-target={s.level} />
                </div>
              </div>
            ))}
            <div className="tool-row" style={{ marginTop: 14 }}>
              {['React','TypeScript','Vite','CSS','GSAP/Lenis'].map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
