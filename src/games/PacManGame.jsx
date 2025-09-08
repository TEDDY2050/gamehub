import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const CELL_SIZE = 25;
const BOARD_WIDTH = 19;
const BOARD_HEIGHT = 21;

// Simple maze layout (1 = wall, 0 = dot, 2 = empty, 3 = power pellet)
const MAZE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,3,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,3,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,2,1,2,1,1,1,0,1,1,1,1],
  [2,2,2,1,0,1,2,2,2,2,2,2,2,1,0,1,2,2,2],
  [1,1,1,1,0,1,2,1,2,2,2,1,2,1,0,1,1,1,1],
  [2,2,2,2,0,2,2,1,2,2,2,1,2,2,0,2,2,2,2],
  [1,1,1,1,0,1,2,1,1,1,1,1,2,1,0,1,1,1,1],
  [2,2,2,1,0,1,2,2,2,2,2,2,2,1,0,1,2,2,2],
  [1,1,1,1,0,1,1,1,2,1,2,1,1,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
  [1,3,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,3,1],
  [1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const PacManGame = () => {
  const [pacman, setPacman] = useState({ x: 9, y: 15, direction: 'right' });
  const [ghosts, setGhosts] = useState([
    { x: 9, y: 9, direction: 'up', color: 'red' },
    { x: 8, y: 10, direction: 'left', color: 'pink' },
    { x: 10, y: 10, direction: 'right', color: 'cyan' },
    { x: 9, y: 11, direction: 'down', color: 'orange' }
  ]);
  const [maze, setMaze] = useState(MAZE.map(row => [...row]));
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [powerMode, setPowerMode] = useState(false);
  const [powerTimer, setPowerTimer] = useState(0);
  const gameLoopRef = useRef();

  const directions = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  const isValidMove = (x, y) => {
    return x >= 0 && x < BOARD_WIDTH && y >= 0 && y < BOARD_HEIGHT && maze[y][x] !== 1;
  };

  const movePacman = (newDirection) => {
    const dir = directions[newDirection];
    const newX = pacman.x + dir.x;
    const newY = pacman.y + dir.y;

    if (isValidMove(newX, newY)) {
      setPacman(prev => ({
        ...prev,
        x: newX,
        y: newY,
        direction: newDirection
      }));

      // Check for dots and power pellets
      if (maze[newY][newX] === 0) {
        setMaze(prev => {
          const newMaze = prev.map(row => [...row]);
          newMaze[newY][newX] = 2;
          return newMaze;
        });
        setScore(prev => prev + 10);
      } else if (maze[newY][newX] === 3) {
        setMaze(prev => {
          const newMaze = prev.map(row => [...row]);
          newMaze[newY][newX] = 2;
          return newMaze;
        });
        setScore(prev => prev + 50);
        setPowerMode(true);
        setPowerTimer(100); // Power mode duration
      }
    }
  };

  const moveGhosts = () => {
    setGhosts(prevGhosts => {
      return prevGhosts.map(ghost => {
        const possibleMoves = Object.keys(directions).filter(dir => {
          const newPos = directions[dir];
          return isValidMove(ghost.x + newPos.x, ghost.y + newPos.y);
        });

        if (possibleMoves.length > 0) {
          const randomDirection = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
          const dir = directions[randomDirection];
          return {
            ...ghost,
            x: ghost.x + dir.x,
            y: ghost.y + dir.y,
            direction: randomDirection
          };
        }
        return ghost;
      });
    });
  };

  const checkCollisions = () => {
    const collision = ghosts.find(ghost => ghost.x === pacman.x && ghost.y === pacman.y);
    
    if (collision) {
      if (powerMode) {
        // Remove ghost and add score
        setScore(prev => prev + 200);
        setGhosts(prev => prev.filter(ghost => ghost !== collision));
      } else {
        // Lose a life
        setLives(prev => prev - 1);
        if (lives <= 1) {
          setGameOver(true);
        } else {
          // Reset positions
          setPacman({ x: 9, y: 15, direction: 'right' });
          setGhosts([
            { x: 9, y: 9, direction: 'up', color: 'red' },
            { x: 8, y: 10, direction: 'left', color: 'pink' },
            { x: 10, y: 10, direction: 'right', color: 'cyan' },
            { x: 9, y: 11, direction: 'down', color: 'orange' }
          ]);
        }
      }
    }
  };

  const checkWinCondition = () => {
    const hasDotsLeft = maze.some(row => row.some(cell => cell === 0 || cell === 3));
    if (!hasDotsLeft) {
      setGameWon(true);
    }
  };

  const handleKeyPress = useCallback((e) => {
    if (gameOver || gameWon) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        movePacman('up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        movePacman('down');
        break;
      case 'ArrowLeft':
        movePacman('left');
        break;
      case 'ArrowRight':
        movePacman('right');
        break;
    }
  }, [pacman, maze, gameOver, gameWon]);

  const initializeGame = () => {
    setMaze(MAZE.map(row => [...row]));
    setPacman({ x: 9, y: 15, direction: 'right' });
    setGhosts([
      { x: 9, y: 9, direction: 'up', color: 'red' },
      { x: 8, y: 10, direction: 'left', color: 'pink' },
      { x: 10, y: 10, direction: 'right', color: 'cyan' },
      { x: 9, y: 11, direction: 'down', color: 'orange' }
    ]);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setGameWon(false);
    setPowerMode(false);
    setPowerTimer(0);
  };

  const getPacmanChar = (direction) => {
    switch (direction) {
      case 'up': return '🔼';
      case 'down': return '🔽';
      case 'left': return '◀️';
      case 'right': return '▶️';
      default: return '🟡';
    }
  };

  const getGhostChar = (color) => {
    if (powerMode) return '💙';
    switch (color) {
      case 'red': return '👻';
      case 'pink': return '💗';
      case 'cyan': return '💎';
      case 'orange': return '🧡';
      default: return '👻';
    }
  };

  // Game loop
  useEffect(() => {
    if (!gameOver && !gameWon) {
      gameLoopRef.current = setInterval(() => {
        moveGhosts();
        checkCollisions();
        checkWinCondition();
        
        if (powerMode) {
          setPowerTimer(prev => {
            if (prev <= 1) {
              setPowerMode(false);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 200);
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [pacman, ghosts, powerMode, powerTimer, gameOver, gameWon, lives]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <>
      <style>{`
        .pacman-game {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 600px;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .home-btn, .control-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .home-btn:hover, .control-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .game-title {
          font-size: 2.5rem;
          font-weight: 900;
          text-align: center;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          margin: 0;
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .game-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .stat-box {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem 1.5rem;
          border-radius: 15px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          font-weight: 600;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #fbbf24;
        }

        .lives-display {
          color: #ef4444;
        }

        .power-mode {
          color: #10b981 !important;
          animation: pulse 1s ease-in-out infinite;
        }

        .game-board {
          display: grid;
          grid-template-columns: repeat(${BOARD_WIDTH}, 1fr);
          gap: 1px;
          background: rgba(255, 255, 255, 0.1);
          padding: 10px;
          border-radius: 15px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          margin-bottom: 1rem;
        }

        .cell {
          width: ${CELL_SIZE}px;
          height: ${CELL_SIZE}px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          position: relative;
        }

        .wall {
          background: #4338ca;
          border-radius: 2px;
        }

        .dot {
          background: #1f2937;
        }

        .dot::after {
          content: '';
          width: 3px;
          height: 3px;
          background: #fbbf24;
          border-radius: 50%;
          position: absolute;
        }

        .power-pellet {
          background: #1f2937;
        }

        .power-pellet::after {
          content: '';
          width: 8px;
          height: 8px;
          background: #fbbf24;
          border-radius: 50%;
          position: absolute;
          animation: pulse 1s ease-in-out infinite;
        }

        .empty {
          background: #1f2937;
        }

        .pacman {
          font-size: 16px;
          z-index: 2;
        }

        .ghost {
          font-size: 14px;
          z-index: 1;
        }

        .instructions {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
          max-width: 400px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          margin-bottom: 1rem;
        }

        .instructions h3 {
          margin: 0 0 0.5rem 0;
          color: #fbbf24;
        }

        .instructions p {
          margin: 0.25rem 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .game-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(5px);
        }

        .overlay-content {
          background: rgba(255, 255, 255, 0.1);
          padding: 3rem;
          border-radius: 20px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
        }

        .overlay-title {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .overlay-title.won {
          color: #10b981;
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
        }

        .overlay-title.lost {
          color: #ef4444;
          text-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
        }

        .overlay-message {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .overlay-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          color: white;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border-radius: 12px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .overlay-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(16, 185, 129, 0.4);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.9); }
        }

        @media (max-width: 768px) {
          .pacman-game {
            padding: 0.5rem;
          }

          .game-header {
            flex-direction: column;
            text-align: center;
          }

          .game-title {
            font-size: 2rem;
          }

          .game-stats {
            gap: 1rem;
          }

          .cell {
            width: 18px;
            height: 18px;
            font-size: 10px;
          }

          .pacman, .ghost {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="pacman-game">
        <div className="game-header">
          <Link to="/" className="home-btn">🏠 Back to Games</Link>
          <h1 className="game-title">👻 Pac-Man</h1>
          <button onClick={initializeGame} className="control-btn">🔄 New Game</button>
        </div>

        <div className="game-stats">
          <div className="stat-box">
            <div className="stat-label">Score</div>
            <div className="stat-value">{score.toLocaleString()}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Lives</div>
            <div className={`stat-value lives-display`}>{'❤️'.repeat(lives)}</div>
          </div>
          {powerMode && (
            <div className="stat-box">
              <div className="stat-label">Power Mode</div>
              <div className={`stat-value power-mode`}>⚡ {Math.ceil(powerTimer / 10)}</div>
            </div>
          )}
        </div>

        <div className="game-board">
          {maze.map((row, y) =>
            row.map((cell, x) => {
              const isPacman = pacman.x === x && pacman.y === y;
              const ghost = ghosts.find(g => g.x === x && g.y === y);
              
              return (
                <div
                  key={`${x}-${y}`}
                  className={`cell ${
                    cell === 1 ? 'wall' : 
                    cell === 0 ? 'dot' : 
                    cell === 3 ? 'power-pellet' : 
                    'empty'
                  }`}
                >
                  {isPacman && (
                    <span className="pacman">{getPacmanChar(pacman.direction)}</span>
                  )}
                  {ghost && (
                    <span className="ghost">{getGhostChar(ghost.color)}</span>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="instructions">
          <h3>🎮 How to Play</h3>
          <p>Use arrow keys to move Pac-Man</p>
          <p>Eat all dots to win • Avoid ghosts</p>
          <p>Power pellets make ghosts vulnerable</p>
        </div>

        {gameWon && (
          <div className="game-overlay">
            <div className="overlay-content">
              <h2 className="overlay-title won">🎉 You Won!</h2>
              <p className="overlay-message">
                Congratulations! You cleared the maze!<br/>
                Final Score: {score.toLocaleString()}
              </p>
              <button onClick={initializeGame} className="overlay-btn">
                Play Again
              </button>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="game-overlay">
            <div className="overlay-content">
              <h2 className="overlay-title lost">💀 Game Over!</h2>
              <p className="overlay-message">
                The ghosts got you!<br/>
                Final Score: {score.toLocaleString()}
              </p>
              <button onClick={initializeGame} className="overlay-btn">
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PacManGame;