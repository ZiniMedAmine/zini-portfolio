import { FiMail, FiGithub, FiLinkedin, FiDribbble } from 'react-icons/fi'

export function Contact() {
  return (
  <section id="contact" className="section">
      <div className="container">
        <div className="two-col">
          <div className="left-7">
            <div className="card" style={{ padding: 24 }}>
              <h2>Let’s build something</h2>
              <p className="muted">Have a brief or idea? I’m open for freelance and collaborations. Reach out and we’ll make it real.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
                <a className="btn" href="mailto:hello@example.com"><FiMail /> Email</a>
                <a className="btn secondary" href="https://github.com/" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
                <a className="btn secondary" href="https://linkedin.com/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
                <a className="btn secondary" href="https://www.behance.net/" target="_blank" rel="noreferrer">Behance</a>
                <a className="btn secondary" href="https://dribbble.com/" target="_blank" rel="noreferrer"><FiDribbble /> Dribbble</a>
              </div>
            </div>
          </div>
          <div className="right-5">
            <div className="grid">
              {[{t:'Email',s:'hello@example.com'},{t:'Phone',s:'(+000) 000-000-000'},{t:'Location',s:'Remote / Worldwide'}].map((x)=> (
                <div key={x.t} className="card" style={{ padding: 16, gridColumn: 'span 12' }}>
                  <strong>{x.t}</strong>
                  <div className="muted">{x.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
