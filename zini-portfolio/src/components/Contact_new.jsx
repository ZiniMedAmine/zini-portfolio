import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FiGithub, FiMail } from 'react-icons/fi'
import { FaBehance } from 'react-icons/fa'
import { L, useLang } from '../i18n'

const copy = {
  eyebrow: L('Get in touch', 'Me contacter'),
  title: [L("Let's", 'Construisons'), L('build', 'ensemble'), L('something good.', 'du solide.')],
  emailKind: L('Email - primary', 'Email - principal'),
  emailSub: L(
    "Have an AI, computer vision, or web app idea? I'm open to a final-year internship, freelance, and collaborations.",
    "Une idée d'app IA, de vision par ordinateur ou web ? Je suis ouvert à un stage de fin d'études, à des missions freelance et à des collaborations.",
  ),
  githubSub: L('Projects, experiments, and source code live here.', 'Projets, expérimentations et code source.'),
  behanceSub: L('Visual design, branding, and creative project presentations live here.', 'Design visuel, branding et présentations de projets créatifs.'),
  formTitle: [L('Tell me about ', 'Parlez-moi de '), L('the project.', 'votre projet.')],
  formIntro: L(
    "Fill out the form and I'll get back to you soon. Computer vision and OCR pipelines, AI-powered applications, and the full-stack architecture around them are the work I want this site to lead with.",
    "Remplissez le formulaire et je vous réponds rapidement. Les pipelines de vision par ordinateur et d'OCR, les applications propulsées par l'IA et l'architecture full-stack qui les entoure sont au cœur de mon travail.",
  ),
  metaInternship: L('Open to a final-year internship - Feb 2027', "Ouvert à un stage de fin d'études - févr. 2027"),
  metaBased: L('Based in Laval, France - mobile across France', 'Basé à Laval, France - mobile partout en France'),
  name: L('Name', 'Nom'),
  namePh: L('Your name', 'Votre nom'),
  emailPh: L('your email', 'Votre email'),
  subject: L('Subject', 'Sujet'),
  subjectPh: L('Project inquiry', 'Demande de projet'),
  messagePh: L('Tell me about your project, timeline, and budget...', 'Parlez-moi de votre projet, de vos délais et de votre budget...'),
  sending: L('Sending', 'Envoi'),
  send: L('Send Message', 'Envoyer le message'),
  success: L("Message sent. I'll get back to you soon.", 'Message envoyé. Je vous réponds très vite.'),
  error: L('Failed to send. Please try again or email me directly.', "Échec de l'envoi. Réessayez ou écrivez-moi directement."),
}

export function Contact({ socials = [] }) {
  const { t } = useLang()
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
        <p className="eyebrow reveal"><span className="num">08</span><span className="line" /><span>{t(copy.eyebrow)}</span></p>
        <h2 className="reveal">{t(copy.title[0])} <em>{t(copy.title[1])}</em><br /><span className="grad">{t(copy.title[2])}</span></h2>

        <div className="contact-actions reveal-stagger">
          <a href="mailto:zini.m.amine@gmail.com" className="contact-card" data-hover>
            <span className="glyph" aria-hidden="true"><FiMail /></span>
            <span className="kind">{t(copy.emailKind)}</span>
            <span className="value">zini.m.amine@gmail.com</span>
            <span className="sub">{t(copy.emailSub)}</span>
            <span className="icon" aria-hidden="true"><span className="arrow" /></span>
          </a>
          <a href="https://github.com/ZiniMedAmine" target="_blank" rel="noopener noreferrer" className="contact-card" data-hover>
            <span className="glyph" aria-hidden="true"><FiGithub /></span>
            <span className="kind">GitHub - code</span>
            <span className="value">@ZiniMedAmine</span>
            <span className="sub">{t(copy.githubSub)}</span>
            <span className="icon" aria-hidden="true"><span className="arrow" /></span>
          </a>
          <a href="https://www.behance.net/zinimedamine" target="_blank" rel="noopener noreferrer" className="contact-card" data-hover>
            <span className="glyph" aria-hidden="true"><FaBehance /></span>
            <span className="kind">Behance - design</span>
            <span className="value">@zinimedamine</span>
            <span className="sub">{t(copy.behanceSub)}</span>
            <span className="icon" aria-hidden="true"><span className="arrow" /></span>
          </a>
        </div>

        <div className="contact-form-wrap reveal">
          <div className="contact-form-intro">
            <h3>{t(copy.formTitle[0])}<em>{t(copy.formTitle[1])}</em></h3>
            <p>{t(copy.formIntro)}</p>
            <div className="form-meta">
              <div className="row">{t(copy.metaInternship)}</div>
              <div className="row">{t(copy.metaBased)}</div>
            </div>
          </div>

          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="field-row">
              <div className="field">
                <label htmlFor="user_name">{t(copy.name)}<span className="req">*</span></label>
                <input id="user_name" type="text" name="user_name" required placeholder={t(copy.namePh)} disabled={isSubmitting} />
              </div>
              <div className="field">
                <label htmlFor="user_email">Email<span className="req">*</span></label>
                <input id="user_email" type="email" name="user_email" required placeholder={t(copy.emailPh)} disabled={isSubmitting} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="subject">{t(copy.subject)}<span className="req">*</span></label>
              <input id="subject" type="text" name="subject" required placeholder={t(copy.subjectPh)} disabled={isSubmitting} />
            </div>

            <div className="field">
              <label htmlFor="message">Message<span className="req">*</span></label>
              <textarea id="message" name="message" required rows="5" placeholder={t(copy.messagePh)} disabled={isSubmitting} />
            </div>

            <div className="submit-row">
              <button type="submit" className={`btn-send ${isSubmitting ? 'is-sending' : ''}`} disabled={isSubmitting}>
                {t(isSubmitting ? copy.sending : copy.send)} <span className="arrow" />
              </button>
              <div className={`form-status ${submitStatus ? 'is-visible' : ''} ${submitStatus === 'success' ? 'is-success' : ''} ${submitStatus === 'error' ? 'is-error' : ''}`}>
                {submitStatus === 'success' && t(copy.success)}
                {submitStatus === 'error' && t(copy.error)}
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
