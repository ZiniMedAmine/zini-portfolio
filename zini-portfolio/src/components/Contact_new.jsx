import { useState, useRef } from 'react'
import { FiSend, FiCheck, FiAlertTriangle } from 'react-icons/fi'
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
                    placeholder="your email"
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
              
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
