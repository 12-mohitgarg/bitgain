import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../assets/logo.jpeg';
import './NavBar.css';

const TABS = [
  { to: '/', label: 'Home' },
  { to: '/games', label: 'Games' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/about', label: 'About' },
  { to: '/help', label: 'Help' },
  { to: '/contact', label: 'Contact' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 12);
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <span className="navbar__coin">
            <img src={logo} alt="" />
          </span>
          <span className="navbar__wordmark">
            BIT<span className="navbar__wordmark-accent">G</span>
          </span>
        </NavLink>

        <nav className="navbar__tabs" aria-label="Primary">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.to === '/'}
              className={({ isActive }) => `navbar__tab ${isActive ? 'navbar__tab--active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="navbar__tab-bg"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="navbar__tab-txt">{t.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions" />

        <button
          className={`navbar__burger ${open ? 'navbar__burger--open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="navbar__burger-dot" />
          <span className="navbar__burger-dot" />
          <span className="navbar__burger-dot" />
        </button>
      </div>
      <motion.div
        className="navbar__progress"
        style={{ scaleX: progress }}
        transition={{ type: 'spring', stiffness: 180, damping: 28 }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="navbar__mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />
        )}
        {open && (
          <motion.div
            key="drawer"
            className="navbar__mobile-drawer"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="navbar__mobile-drawer-bg">
              <svg width="100%" height="100%" viewBox="0 0 340 820" fill="none" opacity="0.2">
                <motion.path
                  d="M 0,190 L 118,190 L 158,230 L 158,355 L 210,407 L 340,407"
                  stroke="var(--gold)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.1 }}
                />
                <motion.path
                  d="M 340,615 L 210,615 L 158,563 L 158,485 L 108,435 L 0,435"
                  stroke="var(--cyan)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                />
                <circle cx="158" cy="230" r="3" fill="var(--gold)" />
                <circle cx="210" cy="407" r="3" fill="var(--gold)" />
                <circle cx="158" cy="563" r="3" fill="var(--cyan)" />
                <circle cx="108" cy="435" r="3" fill="var(--cyan)" />
              </svg>
            </div>

            <div className="navbar__mobile-inner">
              <motion.div
                className="navbar__mobile-head"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.28 }}
              >
                <span>Bitgain Menu</span>
                <strong>Wallet-first gaming</strong>
              </motion.div>
              <div className="navbar__mobile-tabs">
                {TABS.map((t, idx) => (
                  <motion.div
                    key={t.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + idx * 0.04, duration: 0.25 }}
                  >
                    <NavLink
                      to={t.to}
                      end={t.to === '/'}
                      className={({ isActive }) => `navbar__mobile-tab ${isActive ? 'navbar__mobile-tab--active' : ''}`}
                      onClick={() => setOpen(false)}
                    >
                      {t.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
