import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAMES } from '../data/games';
import { DemoModalContext } from './DemoModalContext';
import ArcadeCabinet from './ArcadeCabinet';
import './DemoModal.css';

export function DemoProvider({ children }) {
  const [activeGameId, setActiveGameId] = useState(null);

  const openDemo = (gameId) => {
    setActiveGameId(gameId);
  };

  const closeDemo = () => {
    setActiveGameId(null);
  };

  return (
    <DemoModalContext.Provider value={{ openDemo, closeDemo }}>
      {children}
      <AnimatePresence>
        {activeGameId && (
          <DemoModal gameId={activeGameId} onClose={closeDemo} />
        )}
      </AnimatePresence>
    </DemoModalContext.Provider>
  );
}

function DemoModal({ gameId, onClose }) {
  const game = GAMES.find((g) => g.id === gameId);

  if (!game) return null;

  return (
    <div className="demo-modal-overlay" onClick={onClose}>
      <motion.div
        className={`demo-modal-container accent-${game.accent}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="demo-modal-close" onClick={onClose} aria-label="Close cabinet overlay">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Info panel */}
        <div className="demo-modal-info">
          <div>
            <span className="demo-game-tag">{game.tag}</span>
            <h2 className="demo-game-name">{game.name}</h2>
            <p className="demo-game-blurb">{game.longBlurb}</p>
          </div>

          <div>
            <div className="demo-meta-grid">
              <div className="demo-meta-item">
                <span className="demo-meta-label">Difficulty</span>
                <span className="demo-meta-value">{game.difficulty}</span>
              </div>
              <div className="demo-meta-item">
                <span className="demo-meta-label">Est. Length</span>
                <span className="demo-meta-value">{game.avgTime}</span>
              </div>
            </div>

            <div className="demo-controls">
              <h4 className="demo-controls-title">Controls / Guide</h4>
              <p className="demo-controls-list">
                {gameId === 'reflex' && 'Tap the illuminated grid tile as quickly and accurately as possible.'}
                {gameId === 'sprint' && 'Answer arithmetic equations rapidly by selecting one of three choices.'}
                {gameId === 'spectrum' && 'Predict which color will appear next in the shifting energy loop.'}
                {gameId === 'ludo' && 'Roll the dice and race your token to the finish line against an AI bot.'}
                {gameId === 'tactics' && 'Capture nodes on the hexagonal cell grid. Alternate turns with the AI.'}
                {gameId === 'cascade' && 'Click matching color gems of 2 or more to pop them and clear the screen.'}
              </p>
            </div>
          </div>
        </div>

        {/* Emulated screen container */}
        <div className="demo-modal-screen-container">
          <ArcadeCabinet gameId={game.id} accent={game.accent} name={game.name} />
        </div>
      </motion.div>
    </div>
  );
}
