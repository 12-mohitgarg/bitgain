import { useState, useEffect, useRef } from 'react';
import './ArcadeCabinet.css';

// Sound Generator using Web Audio API
const playSound = (type) => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'correct') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.08); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(164.81, ctx.currentTime); // E3
      osc.frequency.linearRampToValueAtTime(110.00, ctx.currentTime + 0.2); // A2
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else if (type === 'gameover') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(180, ctx.currentTime + 0.15);
      osc.frequency.setValueAtTime(147, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'start') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
      osc.frequency.setValueAtTime(440.00, ctx.currentTime + 0.06); // A4
      osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.12); // C#5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.18); // E5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch {
    // Fail silently if browser audio is not initialized or blocked
  }
};

// ----------------------------------------------------
// PURE UTILITIES FOR RANDOM GENERATION
// ----------------------------------------------------
const getNextTile = (currentTile) => {
  let nextTile;
  do {
    nextTile = Math.floor(Math.random() * 9);
  } while (nextTile === currentTile);
  return nextTile;
};

const getSprintQuestion = () => {
  const num1 = Math.floor(Math.random() * 8) + 2;
  const num2 = Math.floor(Math.random() * 8) + 2;
  const isAdd = Math.random() > 0.5;
  const ans = isAdd ? num1 + num2 : num1 * num2;
  const question = `${num1} ${isAdd ? '+' : '×'} ${num2} = ?`;

  const options = [ans];
  while (options.length < 3) {
    const offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
    const wrongOpt = ans + offset;
    if (wrongOpt >= 0 && !options.includes(wrongOpt)) {
      options.push(wrongOpt);
    }
  }
  return {
    question,
    choices: options.sort(() => Math.random() - 0.5),
    correctAnswer: ans,
  };
};

const COLORS = ['gold', 'violet', 'silver'];
const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const getLudoRoll = () => Math.floor(Math.random() * 4) + 1;

const getOpponentMove = (emptyIndices) => {
  if (emptyIndices.length === 0) return -1;
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
};

const createRandomBoard = () => {
  const b = [];
  for (let i = 0; i < 16; i++) {
    b.push(Math.floor(Math.random() * 4));
  }
  return b;
};

const getRandomGemType = () => Math.floor(Math.random() * 4);

export default function ArcadeCabinet({ gameId, accent = 'gold', name = 'Game' }) {
  const [gameState, setGameState] = useState('idle'); // idle, booting, playing, gameover
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef(null);

  const startGame = () => {
    playSound('start');
    setScore(0);
    setTimeLeft(15);
    setGameState('booting');
  };

  useEffect(() => {
    if (gameState === 'booting') {
      const timeout = setTimeout(() => {
        setGameState('playing');
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameState('gameover');
            playSound('gameover');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  // CSS CSS color mapping classes dynamically
  const cabinetAccentClass = `accent-${accent}`;

  return (
    <div className={`arcade-cabinet-container ${cabinetAccentClass}`}>
      <div className="arcade-cabinet">
        <div className="arcade-header">
          <span>{name.toUpperCase()} SYSTEM</span>
          <div className="arcade-header-status">
            <span className={`status-dot ${gameState === 'playing' ? 'pulsing' : ''}`} />
            <span>{gameState === 'playing' ? 'LIVE EMULATOR' : 'CABINET CONNECTED'}</span>
          </div>
        </div>

        <div className="arcade-screen">
          <div className="screen-glow" />

          {gameState === 'idle' && (
            <div className="screen-idle">
              <h3 className="arcade-logo">{name}</h3>
              <p className="arcade-sub">Direct Cabinet Preview Emulation</p>
              <p className="insert-coin">INSERT COIN</p>
              <button className="btn-start" onClick={startGame}>
                BOOT PREVIEW
              </button>
            </div>
          )}

          {gameState === 'booting' && (
            <div className="screen-boot">
              <div className="boot-terminal">
                <p className="boot-line active-line">BOOTING CABINET HARDWARE...</p>
                <p className="boot-line delay-1">ROM CHECKSUM: OK</p>
                <p className="boot-line delay-2">CONNECTING DIRECT ANALOG INPUT... OK</p>
                <p className="boot-line delay-3">LOADING CHIP EMULATOR CORE...</p>
                <div className="boot-cursor" />
              </div>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="screen-active">
              <div className="active-bar">
                <span>SCORE: {String(score).padStart(4, '0')}</span>
                <span>SEC LEFT: {timeLeft}s</span>
              </div>

              <div className="game-play-area">
                {gameId === 'reflex' && (
                  <ReflexGridGame setScore={setScore} />
                )}
                {gameId === 'sprint' && (
                  <NumberSprintGame setScore={setScore} />
                )}
                {gameId === 'spectrum' && (
                  <SpectrumCallGame setScore={setScore} />
                )}
                {gameId === 'ludo' && (
                  <LudoRoyaleGame setScore={setScore} onGameOver={() => {
                    setGameState('gameover');
                    playSound('gameover');
                    clearInterval(timerRef.current);
                  }} />
                )}
                {gameId === 'tactics' && (
                  <HexTacticsGame score={score} onGameOver={(finalScore) => {
                    setScore(finalScore);
                    setGameState('gameover');
                    playSound('gameover');
                    clearInterval(timerRef.current);
                  }} />
                )}
                {gameId === 'cascade' && (
                  <CascadeMatchGame setScore={setScore} />
                )}
              </div>
            </div>
          )}

          {gameState === 'gameover' && (
            <div className="screen-gameover">
              <h3 className="gameover-title">SESSION COMPLETE</h3>
              <span className="gameover-score-lbl">Demo Score</span>
              <span className="gameover-score-val">{score}</span>
              <div className="gameover-actions">
                <button className="btn-retry" onClick={startGame}>
                  RELOAD DEMO
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MINI GAMES COMPONENTS
// ----------------------------------------------------

// 1. Reflex Grid Game
function ReflexGridGame({ setScore }) {
  const [activeTile, setActiveTile] = useState(4);

  const handleTileClick = (idx) => {
    if (idx === activeTile) {
      playSound('correct');
      setScore((s) => s + 10);
      setActiveTile(getNextTile(activeTile));
    } else {
      playSound('wrong');
    }
  };

  return (
    <div className="reflex-grid-board">
      {Array.from({ length: 9 }).map((_, i) => (
        <button
          key={i}
          className={`reflex-tile ${i === activeTile ? 'active' : ''}`}
          onClick={() => handleTileClick(i)}
        />
      ))}
    </div>
  );
}

// 2. Number Sprint Game
function NumberSprintGame({ setScore }) {
  const [qData, setQData] = useState(() => getSprintQuestion());

  const handleAnswer = (choice) => {
    if (choice === qData.correctAnswer) {
      playSound('correct');
      setScore((s) => s + 20);
      setQData(getSprintQuestion());
    } else {
      playSound('wrong');
      setQData(getSprintQuestion());
    }
  };

  return (
    <div className="math-game">
      <span className="math-question">{qData.question}</span>
      <div className="math-options">
        {qData.choices.map((c) => (
          <button key={c} className="math-btn" onClick={() => handleAnswer(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

// 3. Spectrum Call Game
function SpectrumCallGame({ setScore }) {
  const [currentColor, setCurrentColor] = useState('gold');
  const [resultMsg, setResultMsg] = useState('Emulating Sequence...');
  const [resultClass, setResultClass] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor(getRandomColor());
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handlePredict = (predictedColor) => {
    playSound('click');
    const winningColor = getRandomColor();
    if (predictedColor === winningColor) {
      playSound('correct');
      setScore((s) => s + 50);
      setResultMsg(`CORRECT! Pattern hit ${winningColor.toUpperCase()}`);
      setResultClass('correct');
    } else {
      playSound('wrong');
      setResultMsg(`MISSED! Core hit ${winningColor.toUpperCase()}`);
      setResultClass('wrong');
    }
  };

  return (
    <div className="spectrum-game">
      <span className="spectrum-instruction">PREDICT THE NEXT ENERGY COLOR</span>
      <div className="spectrum-wheel">
        <span className={`spectrum-dot ${currentColor}`} />
      </div>
      <div className="spectrum-options">
        {COLORS.map((c) => (
          <button
            key={c}
            className={`spectrum-btn ${c}-btn`}
            onClick={() => handlePredict(c)}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>
      <div className={`spectrum-result ${resultClass}`}>{resultMsg}</div>
    </div>
  );
}

// 4. Ludo Royale Game
function LudoRoyaleGame({ setScore, onGameOver }) {
  const [playerPos, setPlayerPos] = useState(0);
  const [oppPos, setOppPos] = useState(0);
  const [diceVal, setDiceVal] = useState('?');
  const [turn, setTurn] = useState('player'); // player, opponent
  const [statusText, setStatusText] = useState('Your roll! Roll to reach space 9.');

  const rollDice = () => {
    if (turn !== 'player') return;
    playSound('click');
    const roll = getLudoRoll();
    setDiceVal(roll);
    const nextPos = Math.min(9, playerPos + roll);
    setPlayerPos(nextPos);
    setStatusText(`You rolled a ${roll}!`);

    if (nextPos === 9) {
      setScore(100);
      setStatusText('YOU WIN! Champion board secured.');
      setTimeout(() => onGameOver(), 1200);
      return;
    }

    setTurn('opponent');
    setTimeout(() => runOpponentTurn(), 1000);
  };

  const runOpponentTurn = () => {
    const oppRoll = getLudoRoll();
    setDiceVal(oppRoll);
    const nextOppPos = Math.min(9, oppPos + oppRoll);
    setOppPos(nextOppPos);
    setStatusText(`AI rolled a ${oppRoll}!`);

    if (nextOppPos === 9) {
      setScore(10);
      setStatusText('AI WON! Better luck next time.');
      setTimeout(() => onGameOver(), 1200);
      return;
    }

    setTurn('player');
  };

  return (
    <div className="ludo-game">
      <div className="ludo-track">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={`ludo-cell ${i === 0 ? 'start' : ''} ${i === 9 ? 'goal' : ''}`}>
            {i === 0 && <span style={{ fontSize: '0.5rem', color: '#666', position: 'absolute', top: 2 }}>ST</span>}
            {i === 9 && <span style={{ fontSize: '0.5rem', color: '#888', position: 'absolute', top: 2 }}>FN</span>}
            {playerPos === i && <span className="ludo-token player" />}
            {oppPos === i && <span className="ludo-token opponent" style={{ transform: playerPos === i ? 'translate(4px, 4px)' : 'none' }} />}
          </div>
        ))}
      </div>

      <div className="ludo-controls">
        <div className="ludo-dice">{diceVal}</div>
        <button
          className="ludo-btn"
          onClick={rollDice}
          disabled={turn !== 'player'}
        >
          ROLL DICE
        </button>
      </div>

      <div className="ludo-status">{statusText}</div>
    </div>
  );
}

// 5. Hex Tactics Game
function HexTacticsGame({ score, onGameOver }) {
  const [board, setBoard] = useState(Array(9).fill(null)); // null, 'player', 'opponent'
  const [turn, setTurn] = useState('player'); // player, opponent

  const handleCellClick = (idx) => {
    if (board[idx] || turn !== 'player') return;
    playSound('click');
    
    const newBoard = [...board];
    newBoard[idx] = 'player';
    setBoard(newBoard);
    
    // Check if player won
    if (checkWin(newBoard, 'player')) {
      playSound('correct');
      setTimeout(() => onGameOver(score + 150), 800);
      return;
    }

    const empties = newBoard.reduce((acc, cell, i) => {
      if (cell === null) acc.push(i);
      return acc;
    }, []);

    if (empties.length === 0) {
      setTimeout(() => onGameOver(score + 50), 800);
      return;
    }

    setTurn('opponent');
    setTimeout(() => runOpponentTurn(newBoard, empties), 800);
  };

  const runOpponentTurn = (currentBoard, empties) => {
    const choice = getOpponentMove(empties);
    if (choice === -1) return;
    
    const newBoard = [...currentBoard];
    newBoard[choice] = 'opponent';
    setBoard(newBoard);

    if (checkWin(newBoard, 'opponent')) {
      playSound('wrong');
      setTimeout(() => onGameOver(score + 10), 800);
      return;
    }

    setTurn('player');
  };

  const checkWin = (b, char) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];
    return lines.some(l => l.every(idx => b[idx] === char));
  };

  return (
    <div className="hex-game">
      <div className="hex-grid">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className={`hex-cell ${cell || ''}`}
            onClick={() => handleCellClick(idx)}
          />
        ))}
      </div>
    </div>
  );
}

// 6. Cascade Match Game
function CascadeMatchGame({ setScore }) {
  const [board, setBoard] = useState(() => createRandomBoard());

  const handleGemClick = (idx) => {
    const type = board[idx];
    
    // Find adjacent items matching color (simple check: left, right, top, bottom)
    const matches = new Set([idx]);
    const queue = [idx];
    
    while (queue.length > 0) {
      const curr = queue.shift();
      const row = Math.floor(curr / 4);
      const col = curr % 4;
      
      const adj = [];
      if (row > 0) adj.push(curr - 4);
      if (row < 3) adj.push(curr + 4);
      if (col > 0) adj.push(curr - 1);
      if (col < 3) adj.push(curr + 1);

      for (const a of adj) {
        if (board[a] === type && !matches.has(a)) {
          matches.add(a);
          queue.push(a);
        }
      }
    }

    if (matches.size >= 2) {
      playSound('correct');
      setScore((s) => s + matches.size * 10);
      
      // Cascade matching elements (replace them with random elements)
      const newBoard = [...board];
      matches.forEach((m) => {
        newBoard[m] = getRandomGemType();
      });
      setBoard(newBoard);
    } else {
      playSound('wrong');
    }
  };

  return (
    <div className="cascade-game">
      <div className="cascade-grid">
        {board.map((type, idx) => (
          <button
            key={idx}
            className="cascade-cell"
            onClick={() => handleGemClick(idx)}
          >
            <span className={`cascade-gem type-${type}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
