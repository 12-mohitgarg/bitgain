import { motion } from 'framer-motion';
import logo from '../assets/logo.jpeg';
import GameArt from '../components/GameArt';
import StatsBar from '../components/StatsBar';
import { GAMES } from '../data/games';
import './About.css';

const VALUES = [
  {
    title: 'Wallet-first access',
    detail: 'Players sign in with their own crypto wallet by approving a free signature, with no email or password flow.',
  },
  {
    title: 'Practice before risk',
    detail: 'Every new account starts with a $100 practice balance so players can learn the platform before real-money play.',
  },
  {
    title: 'Clear earning wallets',
    detail: 'Game winnings, investor earnings, referral income, club rewards, cashback, and lucky draw wins stay separated.',
  },
];

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container about-hero__grid">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="about-hero__eyebrow">About Bitgain</span>
            <h1 className="about-hero__title">Built for wallet-first gaming and earning.</h1>
            <p className="about-hero__sub">
              Bitgain combines quick games, practice mode, referral access, lucky draws, and an
              Investor product into one Binance Smart Chain experience that stays tied to the
              player&apos;s own wallet.
            </p>
          </motion.div>
          <motion.div
            className="about-hero__coin"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <img src={logo} alt="Bitgain logo" />
          </motion.div>
        </div>
      </section>

      <StatsBar />

      <section className="section">
        <div className="container">
          <div className="section__head">
            <span className="section__eyebrow">The Guide</span>
            <h2 className="section__title">What The Platform Stands For</h2>
          </div>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <motion.div
                className="value-card"
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <h3>{v.title}</h3>
                <p>{v.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mosaic">
        <div className="container">
          <div className="section__head">
            <span className="section__eyebrow">The Floor</span>
            <h2 className="section__title">Games, rewards, and earning products</h2>
          </div>
          <div className="mosaic-grid">
            {GAMES.map((g, i) => (
              <motion.div
                className={`mosaic-tile mosaic-tile--${g.accent}`}
                key={g.id}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <GameArt id={g.id} />
                <span className="mosaic-tile__name">{g.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--story">
        <div className="container story">
          <div className="section__head">
            <span className="section__eyebrow">The Short Version</span>
            <h2 className="section__title">How Bitgain Fits Together</h2>
          </div>
          <p>
            The guide describes Bitgain as a real-money gaming platform with a built-in earning
            product. Players can begin with practice mode, activate Basic with a deposit, or unlock
            Pro features such as the Investor product when they are ready.
          </p>
          <p>
            Because this involves crypto and real-money gameplay, the responsible path matters:
            learn first, understand each wallet, and only participate with funds you can afford.
          </p>
        </div>
      </section>
    </div>
  );
}
