import { motion } from 'framer-motion';
import logo from '../assets/logo.jpeg';
import GameArt from '../components/GameArt';
import StatsBar from '../components/StatsBar';
import { GAMES } from '../data/games';
import './About.css';

const VALUES = [
  {
    title: 'Skill decides outcomes',
    detail: 'Every game on the floor rewards reaction time, pattern reading, or planning — never chance alone.',
  },
  {
    title: 'Transparent rankings',
    detail: 'Leaderboards are calculated the same way for everyone. No hidden multipliers, no pay-for-rank.',
  },
  {
    title: 'Practice before you play',
    detail: 'Every cabinet has a free practice mode. Learn the rhythm before you put your rank on the line.',
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
            <span className="about-hero__eyebrow">About Bitg</span>
            <h1 className="about-hero__title">Built for players who'd rather get good than get lucky.</h1>
            <p className="about-hero__sub">
              Bitg Arcade started as a question: what would a games platform look like if it took
              competitive skill as seriously as a ranked ladder, without dressing it up as anything
              other than a game?
            </p>
          </motion.div>
          <motion.div
            className="about-hero__coin"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <img src={logo} alt="Bitg logo" />
          </motion.div>
        </div>
      </section>

      <StatsBar />

      <section className="section">
        <div className="container">
          <div className="section__head">
            <span className="section__eyebrow">The Lineup</span>
            <h2 className="section__title">What We Stand For</h2>
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
            <h2 className="section__title">Six Games, One Standard</h2>
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
            <h2 className="section__title">Why We Built This</h2>
          </div>
          <p>
            We're a small team of game designers and engineers who got tired of "earning" apps that
            call themselves games but are really just spreadsheets with a slot-machine skin. So we
            built six games we'd actually want to get good at — fast rounds, honest mechanics,
            and a leaderboard that means something.
          </p>
          <p>
            There's no staking product here, no referral commissions, no token to chase. Just games,
            scores, and a season that resets so everyone gets a clean shot at the top.
          </p>
        </div>
      </section>
    </div>
  );
}
