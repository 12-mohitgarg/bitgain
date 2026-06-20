import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Help.css';

const FAQS = [
  {
    q: 'Do I need to pay to play?',
    a: 'No. Every game has a free practice mode with no time limit. Ranked play (which feeds the leaderboard) is also free — there\'s no entry fee to compete.',
  },
  {
    q: 'How is the leaderboard calculated?',
    a: 'Your season score is the sum of your best results across ranked matches, weighted slightly by game difficulty. Ties are broken by win streak. Seasons reset quarterly so everyone starts fresh.',
  },
  {
    q: 'Can I play on mobile?',
    a: 'Yes — the site is fully responsive and every game is built to work with touch controls, no app download required.',
  },
  {
    q: 'What happens if I lose connection mid-match?',
    a: 'Matches auto-pause for up to 60 seconds if you disconnect. If you don\'t reconnect in time, the match is scored as a forfeit and won\'t count against your streak.',
  },
  {
    q: 'Is there any randomness involved in the games?',
    a: 'Some games (like Spectrum Call) involve reading a pattern under time pressure, but outcomes are driven by your decisions and reaction time, not house-controlled chance. We don\'t run games designed around fixed payout odds.',
  },
  {
    q: 'How do I report a bug or unfair match?',
    a: 'Use the Contact page and select "Report an Issue." Include the match ID shown in your match history and we\'ll look into it within 48 hours.',
  },
];

export default function Help() {
  const [query, setQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const filtered = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="help-page">
      <section className="help-hero">
        <div className="container">
          <span className="help-hero__eyebrow">Help Center</span>
          <h1 className="help-hero__title">What can we help with?</h1>
          <div className="help-search">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13 13L16.5 16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search for an answer..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="container help-content" id="fair-play">
        <div className="faq-list">
          {filtered.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div className="faq-item" key={f.q}>
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{f.q}</span>
                  <span className={`faq-icon ${isOpen ? 'faq-icon--open' : ''}`}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-answer-wrap"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <p className="faq-answer">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="faq-empty">No results for "{query}". Try a different search, or contact us directly.</p>
          )}
        </div>

        <aside className="help-aside" id="responsible">
          <div className="help-aside-card">
            <h3>Still stuck?</h3>
            <p>Our support team replies within a day.</p>
            <Link to="/contact" className="btn btn--gold btn--block">Contact Us</Link>
          </div>
          <div className="help-aside-card" id="terms">
            <h3>Play Responsibly</h3>
            <p>These are skill games meant for fun and friendly competition. Take breaks, and play at a pace that feels good.</p>
          </div>
          <div className="help-aside-card" id="privacy">
            <h3>Privacy & Terms</h3>
            <p>We collect only what's needed to run matches and leaderboards. Full policy available on request via Contact.</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
