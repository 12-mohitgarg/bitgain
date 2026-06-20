import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Help.css';

const FAQS = [
  {
    q: 'Do I need an email or password?',
    a: 'No. Bitgain uses wallet sign-in. Connect a wallet such as MetaMask or Trust Wallet and approve a free signature. Your wallet acts as your account.',
  },
  {
    q: 'Why do I need a referral code?',
    a: 'The guide says new members register with a referral code from an existing member. It keeps the community accountable and unlocks your placement in the referral network.',
  },
  {
    q: 'Can I try games before using real funds?',
    a: 'Yes. New accounts start with a $100 practice balance for 30 days, so you can learn the games risk-free before activating your account.',
  },
  {
    q: 'What are the account levels?',
    a: 'Practice is free on signup. Basic unlocks after a $10 deposit and includes real-money games, referrals, and cashback. Pro unlocks after a $100 deposit and adds the Investor product.',
  },
  {
    q: 'How are balances organized?',
    a: 'Bitgain separates Game, Winnings, Investor, Referral, Club, Lucky Draw, and Cashback wallets so players can see where each balance came from.',
  },
  {
    q: 'How do withdrawals work?',
    a: 'Choose a withdrawable balance on the Withdraw page. The guide notes a 10% platform fee and says payouts are made in BTG after approval.',
  },
  {
    q: 'Is there any risk?',
    a: 'Yes. These are real-money games and crypto products. Only play with what you can afford, start in practice mode, and use the platform responsibly. 18+ only.',
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
        <motion.div
          className="faq-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
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
        </motion.div>
 
        <motion.aside
          className="help-aside"
          id="responsible"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="help-aside-card">
            <h3>Still stuck?</h3>
            <p>Our support team replies within a day.</p>
            <Link to="/contact" className="btn btn--gold btn--block">Contact Us</Link>
          </div>
          <div className="help-aside-card" id="terms">
          <h3>Play Responsibly</h3>
            <p>Real-money gaming and crypto products carry risk. Start with practice mode and only play with what you can afford.</p>
          </div>
          <div className="help-aside-card" id="privacy">
            <h3>Privacy & Terms</h3>
            <p>We collect only what's needed to run matches and leaderboards. Full policy available on request via Contact.</p>
          </div>
        </motion.aside>
      </section>
    </div>
  );
}
