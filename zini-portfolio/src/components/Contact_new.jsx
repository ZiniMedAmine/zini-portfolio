import { useState, useRef } from 'react'
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck, FiAlertTriangle } from 'react-icons/fi'
import emailjs from '@emailjs/browser'

export function Contact() {
  const form = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('') // 'success', 'error', or ''

  const sendEmail = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    // EmailJS configuration - you'll need to replace these with your actual values
    emailjs.sendForm(
      'service_uujweh8', // Replace with your EmailJS service ID
      'template_vb4rhxh', // Replace with your EmailJS template ID
      form.current,
      'lEMwboFCkO0LvbUBw' // Replace with your EmailJS public key
    )
    .then((result) => {
      console.log(result.text)
      setSubmitStatus('success')
      setIsSubmitting(false)
      // Reset form
      form.current.reset()
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000)
    }, (error) => {
      console.log(error.text)
      setSubmitStatus('error')
      setIsSubmitting(false)
      
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000)
    })
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="left-7" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card" style={{ padding: 24 }}>
            <h2>Let's build something</h2>
            <p className="muted">Have a brief or idea? I'm open for freelance and collaborations. Fill out the form and I'll get back to you soon.</p>
              
            {/* Contact Form */}
            <form ref={form} onSubmit={sendEmail} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="user_name">Name *</label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    required
                    placeholder="Your name"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user_email">Email *</label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    required
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="Project inquiry"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  placeholder="Tell me about your project, timeline, and budget..."
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="status-message success">
                  <FiCheck /> Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="status-message error">
                  <FiAlertTriangle /> Failed to send message. Please try again or email me directly.
                </div>
              )}
            </form>
              
            {/* Alternative Contact Methods */}
            <div className="contact-alternatives">
              <p className="muted" style={{ marginTop: 24, marginBottom: 12 }}>Or reach out directly:</p>
              <div className="social-buttons-grid">
                <a className="btn secondary" href="mailto:zini.m.amine@gmail.com"><FiMail /> Email</a>
                <a className="btn secondary" href="https://www.facebook.com/hu.chi.355" target="_blank" rel="noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
                <a className="btn secondary" href="https://www.instagram.com/zini_med_amine" target="_blank" rel="noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
                <a className="btn secondary" href="https://www.linkedin.com/in/mohamed-amine-zini/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
                <a className="btn secondary" href="https://github.com/ZiniMedAmine" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
                <a className="btn secondary" href="https://www.behance.net/ZiniMedAmine" target="_blank" rel="noreferrer">Behance</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
