import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

export function Contact({ socials = [] }) {
  const form = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const sendEmail = (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    emailjs.sendForm(
      'service_uujweh8',
      'template_vb4rhxh',
      form.current,
      'lEMwboFCkO0LvbUBw',
    )
      .then(() => {
        setSubmitStatus('success')
        setIsSubmitting(false)
        form.current.reset()
        setTimeout(() => setSubmitStatus(''), 5000)
      }, () => {
        setSubmitStatus('error')
        setIsSubmitting(false)
        setTimeout(() => setSubmitStatus(''), 5000)
      })
  }

  return (
    <section id="contact" className="section contact" data-screen-label="Contact">
      <div className="container">
        <p className="eyebrow reveal"><span className="num">07</span><span className="line" /><span>Get in touch</span></p>
        <h2 className="reveal">Let's <em>build</em><br /><span className="grad">something good.</span></h2>

        <div className="contact-actions reveal-stagger">
          <a href="mailto:zini.m.amine@gmail.com" className="contact-card" data-hover>
            <span className="kind">Email - primary</span>
            <span className="value">zini.m.amine@gmail.com</span>
            <span className="sub">Have a web app, website, or software idea? I'm open for freelance and collaborations.</span>
            <span className="icon" aria-hidden="true"><span className="arrow" /></span>
          </a>
          <a href="https://github.com/ZiniMedAmine" target="_blank" rel="noopener noreferrer" className="contact-card" data-hover>
            <span className="kind">GitHub - code</span>
            <span className="value">@ZiniMedAmine</span>
            <span className="sub">Projects, experiments, and source code live here.</span>
            <span className="icon" aria-hidden="true"><span className="arrow" /></span>
          </a>
        </div>

        <div className="contact-form-wrap reveal">
          <div className="contact-form-intro">
            <h3>Tell me about <em>the project.</em></h3>
            <p>Fill out the form and I'll get back to you soon. Web applications, websites, automations, and polished interfaces are the work I want this site to lead with.</p>
            <div className="form-meta">
              <div className="row">Freelance - software - web</div>
              <div className="row">Based in Tunis, available remote</div>
            </div>
          </div>

          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="field-row">
              <div className="field">
                <label htmlFor="user_name">Name<span className="req">*</span></label>
                <input id="user_name" type="text" name="user_name" required placeholder="Your name" disabled={isSubmitting} />
              </div>
              <div className="field">
                <label htmlFor="user_email">Email<span className="req">*</span></label>
                <input id="user_email" type="email" name="user_email" required placeholder="your email" disabled={isSubmitting} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="subject">Subject<span className="req">*</span></label>
              <input id="subject" type="text" name="subject" required placeholder="Project inquiry" disabled={isSubmitting} />
            </div>

            <div className="field">
              <label htmlFor="message">Message<span className="req">*</span></label>
              <textarea id="message" name="message" required rows="5" placeholder="Tell me about your project, timeline, and budget..." disabled={isSubmitting} />
            </div>

            <div className="submit-row">
              <button type="submit" className={`btn-send ${isSubmitting ? 'is-sending' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? 'Sending' : 'Send Message'} <span className="arrow" />
              </button>
              <div className={`form-status ${submitStatus ? 'is-visible' : ''} ${submitStatus === 'success' ? 'is-success' : ''} ${submitStatus === 'error' ? 'is-error' : ''}`}>
                {submitStatus === 'success' && "Message sent. I'll get back to you soon."}
                {submitStatus === 'error' && 'Failed to send. Please try again or email me directly.'}
              </div>
            </div>
          </form>
        </div>

        <div className="socials reveal-stagger">
          {socials.map(([platform, handle, href]) => (
            <a href={href} target="_blank" rel="noopener noreferrer" data-hover key={platform}>
              <span className="platform">{platform}</span>
              <span className="handle">{handle}</span>
              <span className="arrow" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
