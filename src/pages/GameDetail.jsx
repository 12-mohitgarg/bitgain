import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GAMES } from '../data/games';
import ArcadeCabinet from '../components/ArcadeCabinet';
import CircuitFrame from '../components/CircuitFrame';
import './GameDetail.css';

// Mock values for live payouts generator
const MOCK_NAMES = ['CryptoKing', '0xGigaChad', 'MetaMaster', 'TrustPlay', 'BitGainer', 'ApexPlayer', 'Web3Wizard', 'BSC_Ninja', 'ChainRacer', 'DeFi_Don'];
const PAYOUTS_BY_GAME = {
  ludo: { text: 'won 2x table payout', min: 20, max: 150 },
  spectrum: { text: 'called Red/Green successfully', min: 10, max: 80 },
  reflex: { text: 'secured daily speed practice tier', min: 5, max: 50 },
  tactics: { text: 'won head-to-head grid round', min: 40, max: 200 },
  cascade: { text: 'popped maximum cascade gems combo', min: 15, max: 120 },
  sprint: { text: 'completed speed mental round', min: 8, max: 90 },
};

export default function GameDetail() {
  const { id } = useParams();
  const game = GAMES.find((g) => g.id === id);
  const [liveMatches, setLiveMatches] = useState([]);

  // Generate initial simulated live matches
  useEffect(() => {
    if (!game) return;
    const initialMatches = Array.from({ length: 4 }).map((_, i) => generateMockMatch(i));
    setLiveMatches(initialMatches);

    // Dynamic additions
    const timer = setInterval(() => {
      setLiveMatches((prev) => {
        const newMatch = generateMockMatch(Date.now());
        return [newMatch, ...prev.slice(0, 3)];
      });
    }, 5500);

    return () => clearInterval(timer);
  }, [game, id]);

  function generateMockMatch(seedId) {
    const name = MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)];
    const maskName = name.slice(0, 4) + '...' + Math.floor(100 + Math.random() * 900);
    const gameConfig = PAYOUTS_BY_GAME[game.id] || { text: 'played arcade round', min: 10, max: 100 };
    const amount = (gameConfig.min + Math.random() * (gameConfig.max - gameConfig.min)).toFixed(2);
    const time = 'Just now';
    return { id: seedId, player: maskName, action: gameConfig.text, amount: `$${amount}`, time };
  }

  if (!game) {
    return (
      <div className="game-detail-error container">
        <h2>Cabinet Offline</h2>
        <p>The cabinet ID you requested does not exist on our arcade board.</p>
        <Link to="/games" className="btn btn--gold">Back to Catalog</Link>
      </div>
    );
  }

  // Define mock leaderboards specific to games
  const leaderboardData = [
    { rank: 1, name: 'Satoshi_BSC', value: game.id === 'ludo' ? '92 Wins' : game.id === 'spectrum' ? '4.5x Hit' : '1,820 Pts' },
    { rank: 2, name: '0xAlpha', value: game.id === 'ludo' ? '74 Wins' : game.id === 'spectrum' ? '4.5x Hit' : '1,650 Pts' },
    { rank: 3, name: 'TrustGamer', value: game.id === 'ludo' ? '61 Wins' : game.id === 'spectrum' ? '2.0x Hit' : '1,490 Pts' },
  ];

  return (
    <div className={`game-detail-page theme-${game.accent}`}>
      <div className="game-detail-hero">
        <div className="container">
          <div className="game-detail-breadcrumb">
            <Link to="/games" className="breadcrumb-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back to Games</span>
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{game.name}</span>
          </div>

          <div className="game-hero-header">
            <span className={`detail-tag tag--${game.accent}`}>{game.tag}</span>
            <h1 className="detail-title">{game.name}</h1>
            <p className="detail-subtitle">{game.blurb}</p>
          </div>
        </div>
      </div>

      <div className="container game-detail-grid">
        {/* Left Column: Details, Rules, Leaderboard */}
        <div className="game-detail-info">
          {/* Quick Stats Grid */}
          <div className="detail-card stats-grid">
            <div className="stat-tile">
              <span className="stat-tile-lbl">Current Players</span>
              <strong className="stat-tile-val val-green">
                <span className="online-pulse" />
                {game.online.toLocaleString()}
              </strong>
            </div>
            <div className="stat-tile">
              <span className="stat-tile-lbl">Avg Round Length</span>
              <strong className="stat-tile-val">{game.avgTime}</strong>
            </div>
            <div className="stat-tile">
              <span className="stat-tile-lbl">Difficulty</span>
              <strong className="stat-tile-val">{game.difficulty}</strong>
            </div>
            <div className="stat-tile">
              <span className="stat-tile-lbl">Strategic Focus</span>
              <strong className="stat-tile-val val-dim">{game.skillNote}</strong>
            </div>
          </div>

          {/* Description & Rules */}
          <div className="detail-card content-card">
            <h3>Cabinet Spec & Gameplay</h3>
            <p className="long-description">{game.longBlurb}</p>

            <div className="rules-section">
              <h4>System Instructions</h4>
              <ul className="rules-list">
                {game.id === 'reflex' && (
                  <>
                    <li>Speed tests require instantaneous clicks inside the illuminated matrix.</li>
                    <li>Each correct target hit adds +10 points to your counter.</li>
                    <li>Missing the active target outputs a penalty sound and halts tempo.</li>
                  </>
                )}
                {game.id === 'sprint' && (
                  <>
                    <li>Calculate standard mathematical formulas rapidly under stress.</li>
                    <li>Solve the equation displayed and choose from three possible answers.</li>
                    <li>Correct answers award +20 points. Speed and consistency are key.</li>
                  </>
                )}
                {game.id === 'spectrum' && (
                  <>
                    <li>Analyze shifting color pulses and call Red, Green, or Violet.</li>
                    <li>Red and Green multiply at 2x rates; Violet acts as a rarer 4.5x multiplier.</li>
                    <li>The system rotates energy core colors every 60 seconds.</li>
                  </>
                )}
                {game.id === 'ludo' && (
                  <>
                    <li>A head-to-head race track modeled on four-token tabletop Ludo.</li>
                    <li>Roll the dice and calculate movement options within your 30s turn.</li>
                    <li>Securing space 9 triggers automatic winner board calculation.</li>
                  </>
                )}
                {game.id === 'tactics' && (
                  <>
                    <li>Capture and lock adjacent nodes on a 3x3 strategic hex matrix.</li>
                    <li>Form straight rows, columns, or diagonal links to defeat the computer.</li>
                    <li>Wins calculate immediately at +150 points to season scores.</li>
                  </>
                )}
                {game.id === 'cascade' && (
                  <>
                    <li>Align adjacent color elements (2 or more) to explode gem nodes.</li>
                    <li>Cleared segments cascade elements downward, generating combos.</li>
                    <li>Pop larger groups simultaneously to maximize score efficiency.</li>
                  </>
                )}
                <li>Each demo starts with a booting emulation setup to synchronize keys.</li>
                <li>Switch to real-money cabinets in the guide to unlock active payout contracts.</li>
              </ul>
            </div>
          </div>

          {/* Live Payout Tracker */}
          <div className="detail-card payout-card">
            <div className="card-header-flex">
              <h3>Live Payout Activity</h3>
              <span className="live-badge">REAL-TIME</span>
            </div>
            <div className="payout-feed">
              <AnimatePresence initial={false}>
                {liveMatches.map((match) => (
                  <motion.div
                    key={match.id}
                    className="payout-row"
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="payout-left">
                      <span className="payout-user">{match.player}</span>
                      <span className="payout-action">{match.action}</span>
                    </div>
                    <div className="payout-right">
                      <strong className={`payout-amount amount--${game.accent}`}>{match.amount}</strong>
                      <span className="payout-time">{match.time}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Leaderboard panel */}
          <div className="detail-card leader-card">
            <h3>Leaderboard Rank // Season 1</h3>
            <div className="leader-rows">
              {leaderboardData.map((lead) => (
                <div key={lead.rank} className="leader-row-item">
                  <div className="leader-rank-col">
                    <span className={`rank-badge rank-${lead.rank}`}>#{lead.rank}</span>
                    <span className="leader-username">{lead.name}</span>
                  </div>
                  <strong className="leader-score">{lead.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Arcade Cabinet Emulator Screen */}
        <div className="game-detail-play">
          <div className="play-sticky-wrapper">
            <CircuitFrame accent={game.accent} className="play-frame">
              <div className="cabinet-glow-layer" />
              <ArcadeCabinet gameId={game.id} accent={game.accent} name={game.name} />
            </CircuitFrame>
            <div className="demo-disclaimer">
              <span className="icon-warning">⚠️</span>
              <p>You are playing in <strong>Practice Sandbox Mode</strong> using mock balances. Winnings accumulated here do not reflect real wallets.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
