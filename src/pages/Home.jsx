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
    label: 'Connect wallet',
    detail: 'Sign in with MetaMask or Trust Wallet using a free signature. No email, no password, no gas fee.',
  },
  {
    label: 'Use practice mode',
    detail: 'New players get a $100 demo balance for risk-free learning before switching to real play.',
  },
  {
    label: 'Play, earn, withdraw',
    detail: 'Use game, winnings, referral, investor, club, cashback, and draw wallets with clear balances.',
  },
];

const GUIDE_FEATURES = [
  {
    stat: '60s',
    title: 'Fast Game Rounds',
    text: 'Color Prediction opens every minute, while Ludo keeps matches sharp with a 30-second turn timer.',
  },
  {
    stat: '1%',
    title: 'Daily Investor Flow',
    text: 'Stake from Pro level and receive daily investor earnings until your earning cap is reached.',
  },
  {
    stat: '15',
    title: 'Referral Levels',
    text: 'Team income can flow through a deep referral network after your account is activated.',
  },
  {
    stat: '2x',
    title: 'Clear Payout Paths',
    text: 'Game wins, investor earnings, draw prizes, and referral income each land in a dedicated wallet.',
  },
];

const ACCOUNT_LEVELS = [
  ['Practice', 'Free signup', '$100 demo balance for 30 days'],
  ['Basic', '$10 deposit', 'Real-money games, referrals, cashback'],
  ['Pro', '$100 deposit', 'Investor product and deeper team rewards'],
];

const floatingTokens = ['BTG', 'USDT', '2x', '4.5x', '1%'];

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <CircuitBackground />
        <div className="hero__beam hero__beam--one" />
        <div className="hero__beam hero__beam--two" />
        <div className="container hero__grid">
          <div className="hero__inner">
            <motion.span
              className="hero__eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Bitgain on Binance Smart Chain
            </motion.span>
            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              Play games.
              <span className="hero__title-accent"> Earn passively.</span>
              <span className="hero__title-soft"> Stay on your wallet.</span>
            </motion.h1>
            <motion.p
              className="hero__sub"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A wallet-first real-money gaming platform with practice mode, instant game payouts,
              investor earnings, referrals, lucky draws, and transparent balances.
            </motion.p>
            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/games" className="btn btn--gold btn--lg">Explore Games</Link>
              <Link to="/help" className="btn btn--ghost btn--lg">Read Guide</Link>
            </motion.div>
            <motion.div
              className="hero__badges"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <span>Wallet login</span>
              <span>$100 practice</span>
              <span>18+ responsible play</span>
            </motion.div>
          </div>

          <motion.div
            className="hero-terminal"
            initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 110, damping: 18, delay: 0.15 }}
          >
            <div className="hero-terminal__orbit" />
            {floatingTokens.map((token, i) => (
              <motion.span
                key={token}
                className={`hero-token hero-token--${i + 1}`}
                animate={{ y: [0, -16, 0], rotate: [0, i % 2 ? -8 : 8, 0] }}
                transition={{ duration: 3.2 + i * 0.35, repeat: Infinity, ease: 'easeInOut' }}
              >
                {token}
              </motion.span>
            ))}
            <div className="hero-terminal__screen">
              <div className="hero-terminal__top">
                <span />
                <span />
                <span />
              </div>
              <div className="wallet-card wallet-card--active">
                <small>Game Wallet</small>
                <strong>$1,240.00</strong>
                <em>Ready for Ludo, Color, Draw</em>
              </div>
              <div className="wallet-stack">
                <div>
                  <small>Investor</small>
                  <strong>1% daily</strong>
                </div>
                <div>
                  <small>Referral</small>
                  <strong>15 levels</strong>
                </div>
              </div>
              <div className="signal-bars">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <LiveTicker />
      <StatsBar />

      <section className="guide-ribbon" aria-label="Bitgain guide highlights">
        <div className="guide-ribbon__track">
          {[...GUIDE_FEATURES, ...GUIDE_FEATURES].map((item, i) => (
            <span key={`${item.title}-${i}`}>{item.stat} {item.title}</span>
          ))}
        </div>
      </section>

      <section className="section section--guide">
        <div className="container">
          <div className="section__head">
            <span className="section__eyebrow">From the Guide</span>
            <h2 className="section__title">Everything moves through one connected account.</h2>
            <p className="section__sub">The platform is designed around wallet sign-in, practice-first onboarding, active play, and separate earning wallets.</p>
          </div>
          <div className="guide-grid">
            {GUIDE_FEATURES.map((item, i) => (
              <motion.article
                className="guide-card"
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.025 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 240, damping: 20, delay: i * 0.08 }}
              >
                <span className="guide-card__stat">{item.stat}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <span className="section__eyebrow">The Lineup</span>
            <h2 className="section__title">Games that feel fast before they feel complicated.</h2>
            <p className="section__sub">Practice risk-free, then move into real play when you understand the rhythm, payout, and pace.</p>
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
            <h2 className="section__title">Inside the most active games.</h2>
            <p className="section__sub">Ludo, Color Prediction, and practice play carry the guide’s core journey: learn, compete, and keep balances clear.</p>
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
            <h2 className="section__title">Three levels, one clean path.</h2>
            <p className="section__sub">Start in practice, activate Basic when you are ready, and unlock Pro features when passive earning matters.</p>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => (
              <motion.div
                className="step"
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.025 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 240, damping: 20, delay: i * 0.1 }}
              >
                <span className="step__index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="step__label">{s.label}</h3>
                <p className="step__detail">{s.detail}</p>
              </motion.div>
            ))}
          </div>
          <div className="level-table">
            {ACCOUNT_LEVELS.map(([level, unlock, reward], i) => (
              <motion.div
                className="level-row"
                key={level}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 8, scale: 1.01 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 22, delay: i * 0.08 }}
              >
                <strong>{level}</strong>
                <span>{unlock}</span>
                <p>{reward}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cta">
        <div className="container cta">
          <div className="cta__glow" />
          <h2 className="cta__title">Start with the demo balance. Move only when ready.</h2>
          <p className="cta__sub">Bitgain is for adults only. Real-money gaming and crypto products carry financial risk.</p>
          <Link to="/games" className="btn btn--gold btn--lg">Launch Arcade</Link>
        </div>
      </section>
    </div>
  );
}
