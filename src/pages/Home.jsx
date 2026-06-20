import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CircuitBackground from '../components/CircuitBackground';
import LiveTicker from '../components/LiveTicker';
import GameCabinet from '../components/GameCabinet';
import GameSpotlight from '../components/GameSpotlight';
import StatsBar from '../components/StatsBar';
import PlayerVoices from '../components/PlayerVoices';
import { GAMES } from '../data/games';
import './Home.css';

const STEPS = [
  {
    label: 'Create your account',
    detail: 'Sign up with an email or wallet. Set a username and you\'re on the floor.',
  },
  {
    label: 'Pick a game',
    detail: 'Six skill games, each with its own rhythm. Try them free in practice mode first.',
  },
  {
    label: 'Climb the board',
    detail: 'Every match feeds your season rank. Top players get featured on the front page.',
  },
];

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <CircuitBackground />
        <div className="container hero__inner">
          <motion.span
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Skill-based gaming arcade
          </motion.span>
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Where reflexes,
            <br />
            not luck, <span className="hero__title-accent">win the board.</span>
          </motion.h1>
          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Six fast, skill-first games. Real leaderboards, real rankings, zero pay-to-win.
            Practice free, then climb for keeps.
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/games" className="btn btn--gold btn--lg">Browse Games</Link>
            <Link to="/leaderboard" className="btn btn--ghost btn--lg">View Leaderboard</Link>
          </motion.div>
        </div>
      </section>

      <LiveTicker />
      <StatsBar />

      <section className="section">
        <div className="container">
          <div className="section__head">
            <span className="section__eyebrow">The Lineup</span>
            <h2 className="section__title">The Cabinets</h2>
            <p className="section__sub">Six games. Pick your rhythm — every one rewards getting better, not spending more.</p>
          </div>
          <div className="cabinet-grid">
            {GAMES.map((g, i) => (
              <GameCabinet key={g.id} game={g} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--spotlight">
        <div className="container">
          <div className="section__head">
            <span className="section__eyebrow">In Depth</span>
            <h2 className="section__title">Inside the Top Games</h2>
            <p className="section__sub">A closer look at three player favorites — the mechanics, the pace, and what it actually takes to climb their boards.</p>
          </div>
          <div className="spotlight-list">
            {[GAMES[0], GAMES[1], GAMES[3]].map((g, i) => (
              <GameSpotlight key={g.id} game={g} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--voices">
        <div className="container">
          <div className="section__head">
            <span className="section__eyebrow">Player Voices</span>
            <h2 className="section__title">From the Leaderboard</h2>
          </div>
          <PlayerVoices />
        </div>
      </section>

      <section className="section section--steps">
        <div className="container">
          <div className="section__head">
            <span className="section__eyebrow">Get Started</span>
            <h2 className="section__title">How It Works</h2>
            <p className="section__sub">Three steps between you and the leaderboard.</p>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => (
              <motion.div
                className="step"
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="step__index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="step__label">{s.label}</h3>
                <p className="step__detail">{s.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cta">
        <div className="container cta">
          <div className="cta__glow" />
          <h2 className="cta__title">Your rank is waiting.</h2>
          <p className="cta__sub">Free practice mode, no card required. See where you land.</p>
          <Link to="/games" className="btn btn--gold btn--lg">Start Playing</Link>
        </div>
      </section>
    </div>
  );
}
