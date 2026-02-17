import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const GAME_SPEED = 150;

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  
  const gameLoopRef = useRef();

  const generateFood = useCallback((snakeBody) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = () => {
    const newSnake = INITIAL_SNAKE;
    setSnake(newSnake);
    setFood(generateFood(newSnake));
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const gameLoop = useCallback(() => {
    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y
      };

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true);
        setIsPlaying(false);
        if (score > bestScore) {
          setBestScore(score);
        }
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        setIsPlaying(false);
        if (score > bestScore) {
          setBestScore(score);
        }
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood(newSnake));
        return newSnake;
      } else {
        newSnake.pop();
        return newSnake;
      }
    });
  }, [direction, food, score, bestScore, generateFood]);

  const handleKeyPress = useCallback((e) => {
    if (gameOver && e.key !== ' ') return;

    const key = e.key;
    
    if (key === ' ') {
      e.preventDefault();
      if (gameOver) {
        resetGame();
      } else {
        setIsPlaying(prev => !prev);
      }
      return;
    }

    if (!isPlaying) return;

    let newDirection = { ...nextDirection };

    if ((key === 'ArrowUp' || key === 'w' || key === 'W') && direction.y === 0) {
      newDirection = { x: 0, y: -1 };
    } else if ((key === 'ArrowDown' || key === 's' || key === 'S') && direction.y === 0) {
      newDirection = { x: 0, y: 1 };
    } else if ((key === 'ArrowLeft' || key === 'a' || key === 'A') && direction.x === 0) {
      newDirection = { x: -1, y: 0 };
    } else if ((key === 'ArrowRight' || key === 'd' || key === 'D') && direction.x === 0) {
      newDirection = { x: 1, y: 0 };
    }

    if (newDirection.x !== nextDirection.x || newDirection.y !== nextDirection.y) {
      setNextDirection(newDirection);
      e.preventDefault();
    }
  }, [direction, nextDirection, isPlaying, gameOver]);

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnake = snake.some(segment => segment.x === x && segment.y === y);
        const isHead = snake[0].x === x && snake[0].y === y;
        const isFood = food.x === x && food.y === y;
        
        cells.push(
          <div
            key={`${x}-${y}`}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: isFood ? '#edc22e' : isSnake ? (isHead ? '#776e65' : '#8f7a66') : '#cdc1b4',
              borderRadius: (isSnake || isFood) ? '3px' : '0',
              border: (isSnake || isFood) ? 'none' : '1px solid #bbada0',
              margin: (isSnake || isFood) ? '1px' : '0',
              boxShadow: (isSnake || isFood) ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none'
            }}
          />
        );
      }
    }
    return cells;
  };

  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(gameLoop, GAME_SPEED);
    }
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameOver, gameLoop]);

  useEffect(() => {
    if (isPlaying) {
      setDirection(nextDirection);
    }
  }, [nextDirection, isPlaying]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const saved = localStorage.getItem('snake-best-score');
    if (saved) {
      setBestScore(parseInt(saved));
    }
  }, []);

  useEffect(() => {
    if (bestScore > 0) {
      localStorage.setItem('snake-best-score', bestScore.toString());
    }
  }, [bestScore]);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          overflow-x: hidden;
        }

        .snake-game {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 1.5rem;
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
          margin-bottom: 1.5rem;
          gap: 1rem;
        }

        .home-btn, .control-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .home-btn:hover, .control-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .game-title {
          font-size: 2rem;
          font-weight: 900;
          text-align: center;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          margin: 0;
          color: #10b981;
        }

        .game-content {
          display: flex;
          gap: 1.5rem;
          max-width: 650px;
          width: 100%;
          align-items: flex-start;
        }
        
        .left-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .game-board {
          background: rgba(255, 255, 255, 0.1);
          padding: 10px;
          border-radius: 10px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(15px);
        }

        .grid-container {
          background: #bbada0;
          padding: 3px;
          border-radius: 6px;
          display: grid;
          grid-template-columns: repeat(20, ${CELL_SIZE}px);
          gap: 0;
        }

        .game-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
        }

        .info-panel {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .panel-title {
          margin: 0 0 0.75rem 0;
          font-size: 0.85rem;
          text-align: center;
          color: #10b981;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .score-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .score-item {
          text-align: center;
        }

        .score-label {
          font-size: 0.75rem;
          opacity: 0.8;
          margin-bottom: 0.25rem;
        }

        .score-value {
          font-size: 1.25rem;
          font-weight: bold;
          color: #10b981;
        }

        .controls-text {
          font-size: 0.8rem;
          line-height: 1.6;
          opacity: 0.9;
          margin: 0;
        }

        .game-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(5px);
          z-index: 1000;
        }

        .overlay-content {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          max-width: 350px;
        }

        .overlay-title {
          font-size: 2.5rem;
          margin: 0 0 1rem 0;
        }

        .overlay-title.game-over {
          color: #ef4444;
        }

        .overlay-title.start {
          color: #10b981;
        }

        .overlay-message {
          font-size: 1rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .overlay-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          color: white;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .overlay-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(16, 185, 129, 0.4);
        }

        @media (max-width: 640px) {
          .snake-game {
            padding: 1rem;
          }

          .game-header {
            flex-wrap: wrap;
            justify-content: center;
          }

          .game-title {
            font-size: 1.5rem;
            width: 100%;
            order: -1;
            margin-bottom: 0.5rem;
          }

          .game-content {
            flex-direction: column;
            align-items: center;
          }

          .game-sidebar {
            width: 100%;
            max-width: 430px;
          }
        }
      `}</style>

      <div className="snake-game">
        <div className="game-header">
          <Link to="/" className="home-btn">🏠 Back</Link>
          <h1 className="game-title">🐍 Snake</h1>
          <button onClick={resetGame} className="control-btn">🔄 New Game</button>
        </div>

        <div className="game-content">
          <div className="left-section">
            <div className="game-board">
              <div className="grid-container">
                {renderGrid()}
              </div>
            </div>
            
            <div className="info-panel">
              <h3 className="panel-title">Score</h3>
              <div className="score-grid">
                <div className="score-item">
                  <div className="score-label">Current</div>
                  <div className="score-value">{score}</div>
                </div>
                <div className="score-item">
                  <div className="score-label">Best</div>
                  <div className="score-value">{bestScore}</div>
                </div>
                <div className="score-item" style={{ gridColumn: 'span 2' }}>
                  <div className="score-label">Length</div>
                  <div className="score-value">{snake.length}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="game-sidebar">

            <div className="info-panel">
              <h3 className="panel-title">Controls</h3>
              <p className="controls-text">
                ← → ↑ ↓ or WASD<br/>
                to move the snake<br/>
                <br/>
                SPACE to pause/resume<br/>
                <br/>
                Eat food to grow!<br/>
                Don't hit walls or yourself!
              </p>
            </div>
          </div>
        </div>

        {gameOver && (
          <div className="game-overlay">
            <div className="overlay-content">
              <h2 className="overlay-title game-over">Game Over!</h2>
              <div className="overlay-message">
                <p><strong>Score:</strong> {score}</p>
                <p><strong>Length:</strong> {snake.length}</p>
                {score === bestScore && score > 0 && <p>🎉 New Best!</p>}
              </div>
              <button onClick={resetGame} className="overlay-btn">
                Play Again (SPACE)
              </button>
            </div>
          </div>
        )}

        {!isPlaying && !gameOver && (
          <div className="game-overlay">
            <div className="overlay-content">
              <h2 className="overlay-title start">Ready?</h2>
              <div className="overlay-message">
                Use arrow keys or WASD<br/>
                Eat food to grow longer!<br/>
                Avoid walls and yourself
              </div>
              <button onClick={() => setIsPlaying(true)} className="overlay-btn">
                Start Game (SPACE)
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SnakeGame;