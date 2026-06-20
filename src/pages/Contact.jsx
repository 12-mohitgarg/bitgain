import { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const TOPICS = ['General Question', 'Report an Issue', 'Account Help', 'Partnership'];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <span className="contact-hero__eyebrow">Get In Touch</span>
          <h1 className="contact-hero__title">Contact Us</h1>
          <p className="contact-hero__sub">Questions, bug reports, or just want to say hi — we read everything.</p>
        </div>
      </section>

      <section className="container contact-grid">
        <motion.div
          className="contact-form-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {submitted ? (
            <motion.div
              className="contact-success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="contact-success__icon">✓</div>
              <h3>Message sent.</h3>
              <p>We'll get back to you within a day. Thanks for reaching out.</p>
              <button className="btn btn--ghost" onClick={() => setSubmitted(false)}>
                Send another message
              </button>
            </motion.div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" required placeholder="Your name" />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" required placeholder="you@example.com" />
              </div>
              <div className="form-row">
                <label htmlFor="topic">Topic</label>
                <div className="topic-pills">
                  {TOPICS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={`topic-pill ${topic === t ? 'topic-pill--active' : ''}`}
                      onClick={() => setTopic(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea id="message" required rows={6} placeholder="Tell us what's going on..." />
              </div>
              <button type="submit" className="btn btn--gold btn--lg btn--block">Send Message</button>
            </form>
          )}
        </motion.div>
 
        <motion.aside
          className="contact-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="info-card">
            <h3>Support</h3>
            <p>support@bitgarcade.com</p>
            <span className="info-note">Replies within 24 hours</span>
          </div>
          <div className="info-card">
            <h3>Partnerships</h3>
            <p>partners@bitgarcade.com</p>
            <span className="info-note">For tournament & creator inquiries</span>
          </div>
          <div className="info-card">
            <h3>Community</h3>
            <p>Join the Discord for live match chat and patch notes.</p>
          </div>
        </motion.aside>
      </section>
    </div>
  );
}
