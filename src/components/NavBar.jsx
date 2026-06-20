import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
              {t.label}
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
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar__mobile ${open ? 'navbar__mobile--open' : ''}`}>
        {TABS.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.to === '/'}
            className={({ isActive }) => `navbar__mobile-tab ${isActive ? 'navbar__mobile-tab--active' : ''}`}
            onClick={() => setOpen(false)}
          >
            {t.label}
          </NavLink>
        ))}

      </div>
    </header>
  );
}
