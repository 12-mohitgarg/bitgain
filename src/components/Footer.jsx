import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import GameArt from './GameArt';
import { GAMES } from '../data/games';
import './Footer.css';

const SOCIALS = [
  { label: 'Discord', icon: 'discord' },
  { label: 'X', icon: 'x' },
  { label: 'YouTube', icon: 'youtube' },
  { label: 'Instagram', icon: 'instagram' },
];

function SocialIcon({ icon }) {
  switch (icon) {
    case 'discord':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M19 5.5c-1.4-.65-2.9-1.1-4.45-1.36a.08.08 0 00-.09.04c-.2.34-.4.79-.56 1.14a16.4 16.4 0 00-4.8 0c-.16-.36-.37-.8-.57-1.14a.08.08 0 00-.09-.04A16.8 16.8 0 005 5.5a.07.07 0 00-.04.03C2.3 9.4 1.6 13.2 1.9 17a.09.09 0 00.03.06 17 17 0 005.1 2.55.08.08 0 00.09-.03c.4-.53.74-1.1 1.03-1.69a.08.08 0 00-.04-.11 11 11 0 01-1.6-.76.08.08 0 01-.01-.13c.1-.08.22-.17.32-.25a.08.08 0 01.08-.01c3.36 1.53 7 1.53 10.32 0a.08.08 0 01.08.01c.1.08.21.17.32.25a.08.08 0 010 .13c-.51.3-1.04.55-1.6.76a.08.08 0 00-.04.12c.3.58.65 1.15 1.03 1.68a.08.08 0 00.09.03 17 17 0 005.11-2.55.08.08 0 00.03-.06c.36-4.4-.6-8.16-2.56-11.47A.06.06 0 0019 5.5zM8.68 14.7c-.96 0-1.75-.88-1.75-1.96 0-1.08.78-1.96 1.75-1.96.98 0 1.76.89 1.75 1.96 0 1.08-.77 1.96-1.75 1.96zm6.65 0c-.96 0-1.75-.88-1.75-1.96 0-1.08.78-1.96 1.75-1.96.99 0 1.76.89 1.75 1.96 0 1.08-.76 1.96-1.75 1.96z" fill="currentColor"/>
        </svg>
      );
    case 'x':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.2 7H1.3l8.1-9.3L1 2h7l4.9 6.4L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z" fill="currentColor"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M22 12s0-3.2-.4-4.7a2.8 2.8 0 00-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.3a2.8 2.8 0 00-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7a2.8 2.8 0 002 2C6.1 19 12 19 12 19s5.9 0 7.6-.3a2.8 2.8 0 002-2C22 15.2 22 12 22 12z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
          <path d="M10 9l5 3-5 3V9z" fill="currentColor"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4"/>
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__circuit-strip" aria-hidden="true">
        {GAMES.map((g) => (
          <div key={g.id} className="footer__strip-art">
            <GameArt id={g.id} />
          </div>
        ))}
      </div>

      <div className="container footer__top">
        <div className="footer__brand">
          <div className="footer__brand-row">
            <span className="footer__coin">
              <img src={logo} alt="" />
            </span>
            <span className="footer__wordmark">BITGAIN ARCADE</span>
          </div>
          <p className="footer__tagline">
            Six skill games. Real leaderboards, real rankings, zero pay-to-win.
            Built for players who'd rather get good than get lucky.
          </p>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href="#" className="footer__social-btn" aria-label={s.label}>
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h4 className="footer__heading">Games</h4>
            {GAMES.map((g) => (
              <Link to="/games" key={g.id}>{g.name}</Link>
            ))}
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Site</h4>
            <Link to="/">Home</Link>
            <Link to="/games">All Games</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Support</h4>
            <Link to="/help">Help Center</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/help#fair-play">Fair Play</Link>
            <Link to="/help#responsible">Play Responsibly</Link>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Legal</h4>
            <Link to="/help#terms">Terms of Service</Link>
            <Link to="/help#privacy">Privacy Policy</Link>
            <Link to="/contact">Report an Issue</Link>
          </div>
        </div>

        <div className="footer__newsletter">
          <h4 className="footer__heading">Stay in the loop</h4>
          <p className="footer__newsletter-copy">Patch notes, new games, and season-reset alerts. No spam.</p>
          <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@example.com" aria-label="Email address" />
            <button type="submit" className="btn btn--gold">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Bitgain Arcade. All scores are earned.</span>
        <span className="footer__age">18+ · Skill-based games · No purchase necessary to play free modes</span>
      </div>
    </footer>
  );
}
