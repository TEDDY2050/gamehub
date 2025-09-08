import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const GRID_SIZE = 4;
const WINNING_TILE = 2048;

const Game2048 = () => {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Initialize empty grid
  const createEmptyGrid = () => {
    return Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
  };

  // Get random empty cell
  const getRandomEmptyCell = (grid) => {
    const emptyCells = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === 0) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  // Add random tile (2 or 4)
  const addRandomTile = (grid) => {
    const newGrid = grid.map(row => [...row]);
    const emptyCell = getRandomEmptyCell(newGrid);
    if (emptyCell) {
      newGrid[emptyCell.row][emptyCell.col] = Math.random() < 0.9 ? 2 : 4;
    }
    return newGrid;
  };

  // Initialize game
  const initializeGame = () => {
    let newGrid = createEmptyGrid();
    newGrid = addRandomTile(newGrid);
    newGrid = addRandomTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameWon(false);
    setGameOver(false);
  };

  // Move and merge logic
  const slideArray = (arr) => {
    const filtered = arr.filter(val => val !== 0);
    const missing = GRID_SIZE - filtered.length;
    const zeros = Array(missing).fill(0);
    return filtered.concat(zeros);
  };

  const combineArray = (arr) => {
    let score = 0;
    for (let i = 0; i < GRID_SIZE - 1; i++) {
      if (arr[i] !== 0 && arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        arr[i + 1] = 0;
        score += arr[i];
      }
    }
    return { array: arr, score };
  };

  const moveLeft = (grid) => {
    let totalScore = 0;
    let hasWon = false;
    const newGrid = grid.map(row => {
      const slid = slideArray([...row]);
      const combined = combineArray(slid);
      const final = slideArray(combined.array);
      totalScore += combined.score;
      if (final.includes(WINNING_TILE)) hasWon = true;
      return final;
    });
    return { grid: newGrid, score: totalScore, hasWon };
  };

  const moveRight = (grid) => {
    let totalScore = 0;
    let hasWon = false;
    const newGrid = grid.map(row => {
      const reversed = [...row].reverse();
      const slid = slideArray(reversed);
      const combined = combineArray(slid);
      const final = slideArray(combined.array).reverse();
      totalScore += combined.score;
      if (final.includes(WINNING_TILE)) hasWon = true;
      return final;
    });
    return { grid: newGrid, score: totalScore, hasWon };
  };

  const moveUp = (grid) => {
    const transposed = grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
    const moved = moveLeft(transposed);
    const newGrid = moved.grid[0].map((_, colIndex) => moved.grid.map(row => row[colIndex]));
    return { grid: newGrid, score: moved.score, hasWon: moved.hasWon };
  };

  const moveDown = (grid) => {
    const transposed = grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
    const moved = moveRight(transposed);
    const newGrid = moved.grid[0].map((_, colIndex) => moved.grid.map(row => row[colIndex]));
    return { grid: newGrid, score: moved.score, hasWon: moved.hasWon };
  };

  // Check if grids are equal
  const gridsEqual = (grid1, grid2) => {
    return grid1.every((row, i) => row.every((cell, j) => cell === grid2[i][j]));
  };

  // Check if moves are possible
  const canMove = (grid) => {
    // Check for empty cells
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === 0) return true;
      }
    }

    // Check for possible merges
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const current = grid[i][j];
        if (
          (i < GRID_SIZE - 1 && grid[i + 1][j] === current) ||
          (j < GRID_SIZE - 1 && grid[i][j + 1] === current)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // Handle key press
  const handleKeyPress = useCallback((e) => {
    if (gameOver) return;

    let moved;
    switch (e.key) {
      case 'ArrowLeft':
        moved = moveLeft(grid);
        break;
      case 'ArrowRight':
        moved = moveRight(grid);
        break;
      case 'ArrowUp':
        e.preventDefault();
        moved = moveUp(grid);
        break;
      case 'ArrowDown':
        e.preventDefault();
        moved = moveDown(grid);
        break;
      default:
        return;
    }

    if (!gridsEqual(grid, moved.grid)) {
      const newGrid = addRandomTile(moved.grid);
      setGrid(newGrid);
      setScore(prev => {
        const newScore = prev + moved.score;
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        return newScore;
      });

      if (moved.hasWon && !gameWon) {
        setGameWon(true);
      }

      if (!canMove(newGrid)) {
        setGameOver(true);
      }
    }
  }, [grid, gameOver, gameWon, bestScore]);

  // Get tile color
  const getTileColor = (value) => {
    const colors = {
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e'
    };
    return colors[value] || '#3c3a32';
  };

  // Get text color
  const getTextColor = (value) => {
    return value <= 4 ? '#776e65' : '#f9f6f2';
  };

  useEffect(() => {
    initializeGame();
    const savedBest = localStorage.getItem('2048-best-score');
    if (savedBest) {
      setBestScore(parseInt(savedBest));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (bestScore > 0) {
      localStorage.setItem('2048-best-score', bestScore.toString());
    }
  }, [bestScore]);

  return (
    <>
      <style>{`
        .game-2048 {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 2rem;
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
          margin-bottom: 2rem;
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

        .score-container {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .score-box {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem 2rem;
          border-radius: 15px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .score-label {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          font-weight: 600;
        }

        .score-value {
          font-size: 2rem;
          font-weight: bold;
          color: #fbbf24;
        }

        .game-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-gap: 10px;
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(15px);
          margin-bottom: 2rem;
        }

        .game-cell {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: bold;
          transition: all 0.2s ease;
          position: relative;
        }

        .game-cell.empty {
          background: rgba(255, 255, 255, 0.1);
        }

        .instructions {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
          max-width: 400px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .instructions h3 {
          margin: 0 0 0.5rem 0;
          color: #fbbf24;
        }

        .instructions p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .game-won-overlay, .game-over-overlay {
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
          text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
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

        .overlay-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
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

        .overlay-btn.continue {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .overlay-btn.continue:hover {
          box-shadow: 0 5px 20px rgba(245, 158, 11, 0.4);
        }

        @media (max-width: 768px) {
          .game-2048 {
            padding: 1rem;
          }

          .game-header {
            flex-direction: column;
            text-align: center;
          }

          .game-title {
            font-size: 2rem;
          }

          .score-container {
            gap: 1rem;
          }

          .game-cell {
            width: 60px;
            height: 60px;
            font-size: 1.4rem;
          }

          .game-grid {
            padding: 10px;
            grid-gap: 8px;
          }
        }
      `}</style>

      <div className="game-2048">
        <div className="game-header">
          <Link to="/" className="home-btn">🏠 Back to Games</Link>
          <h1 className="game-title">2048</h1>
          <button onClick={initializeGame} className="control-btn">🔄 New Game</button>
        </div>

        <div className="score-container">
          <div className="score-box">
            <div className="score-label">Score</div>
            <div className="score-value">{score.toLocaleString()}</div>
          </div>
          <div className="score-box">
            <div className="score-label">Best</div>
            <div className="score-value">{bestScore.toLocaleString()}</div>
          </div>
        </div>

        <div className="game-grid">
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`game-cell ${cell === 0 ? 'empty' : ''}`}
                style={cell !== 0 ? {
                  backgroundColor: getTileColor(cell),
                  color: getTextColor(cell),
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                } : {}}
              >
                {cell !== 0 && cell}
              </div>
            ))
          )}
        </div>

        <div className="instructions">
          <h3>🎮 How to Play</h3>
          <p>Use arrow keys to move tiles. When two tiles with the same number touch, they merge into one!</p>
          <p><strong>Goal:</strong> Reach the 2048 tile to win!</p>
        </div>

        {gameWon && (
          <div className="game-won-overlay">
            <div className="overlay-content">
              <h2 className="overlay-title won">🎉 You Win!</h2>
              <p className="overlay-message">You reached 2048! Keep playing to get an even higher score!</p>
              <div className="overlay-buttons">
                <button onClick={() => setGameWon(false)} className="overlay-btn continue">
                  Continue Playing
                </button>
                <button onClick={initializeGame} className="overlay-btn">
                  New Game
                </button>
              </div>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="game-over-overlay">
            <div className="overlay-content">
              <h2 className="overlay-title lost">💀 Game Over!</h2>
              <p className="overlay-message">No more moves available!</p>
              <p className="overlay-message">Final Score: {score.toLocaleString()}</p>
              <div className="overlay-buttons">
                <button onClick={initializeGame} className="overlay-btn">
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Game2048;