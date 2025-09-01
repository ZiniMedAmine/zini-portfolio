import { Reveal } from './Reveal'

export function About() {
  return (
  <section id="about" className="section">
      <div className="container">
        <div className="two-col">
          <div className="left-7">
            <Reveal className="card" style={{ padding: 24 }}>
              <h2>About</h2>
              <p className="muted">
                I’m a multidisciplinary creative focusing on brand systems, visual identities, and
                performant web apps. I love motion, micro-interactions, and meaningful details that make
                products feel alive. Below is a snapshot of what I bring.
              </p>
              <div className="divider" />
              <div className="grid">
                <div style={{ gridColumn: 'span 6' }}>
                  <h3>Design</h3>
                  <ul>
                    <li>Branding & Visual Identity</li>
                    <li>Art Direction & Layout</li>
                    <li>Motion & Micro-interactions</li>
                  </ul>
                </div>
                <div style={{ gridColumn: 'span 6' }}>
                  <h3>Development</h3>
                  <ul>
                    <li>React / Vite / TypeScript</li>
                    <li>Animations & Interaction</li>
                    <li>Design Systems & Accessibility</li>
                  </ul>
                </div>
              </div>
              <div className="divider" />
              <div className="grid">
                <div style={{ gridColumn: 'span 12' }}>
                  <h3>About me</h3>
                  <p className="muted">
                    I grew up drawing logos and album covers, then fell in love with the web as a playground for motion and interactivity.
                    These days I split my time between brand work and building delightful web experiences.
                  </p>
                  <ul>
                    <li>Style: bold type, clean grids, tasteful gradients</li>
                    <li>Values: clarity, performance, polish</li>
                    <li>Tools: Figma, Adobe Suite, React, Vite</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="right-5">
            <div className="media-card" style={{ aspectRatio: '4/5' }}>
              <img src="https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?q=80&w=1200&auto=format&fit=crop" alt="about" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
