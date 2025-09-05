import React, { useState, useEffect, useCallback } from 'react';
import '../styles/SnakeGame.css';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION = { x: 0, y: -1 };

const GAME_MODES = {
  easy: { speed: 200, label: '🐌 Easy' },
  medium: { speed: 150, label: '🚀 Medium' },
  hard: { speed: 100, label: '⚡ Hard' }
};

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameMode, setGameMode] = useState('medium');

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameRunning(false);
    setGameOver(false);
    setScore(0);
  };

  const startGame = () => {
    resetGame();
    setGameRunning(true);
  };

  const checkCollision = useCallback((head) => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    
    // Self collision
    for (let segment of snake) {
      if (head.x === segment.x && head.y === segment.y) {
        return true;
      }
    }
    
    return false;
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      if (checkCollision(head)) {
        setGameOver(true);
        setGameRunning(false);
        if (score > highScore) {
          setHighScore(score);
        }
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameRunning, gameOver, score, highScore, checkCollision, generateFood]);

  // Game loop
  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_MODES[gameMode].speed);
    return () => clearInterval(gameInterval);
  }, [moveSnake, gameMode]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameRunning) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setDirection(current => current.y === 1 ? current : { x: 0, y: -1 });
          break;
        case 'ArrowDown':
          e.preventDefault();
          setDirection(current => current.y === -1 ? current : { x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setDirection(current => current.x === 1 ? current : { x: -1, y: 0 });
          break;
        case 'ArrowRight':
          e.preventDefault();
          setDirection(current => current.x === -1 ? current : { x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameRunning]);

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        let cellClass = 'grid-cell';
        
        // Check if cell is snake head
        if (snake[0] && snake[0].x === x && snake[0].y === y) {
          cellClass += ' snake-head';
        }
        // Check if cell is snake body
        else if (snake.some((segment, index) => index > 0 && segment.x === x && segment.y === y)) {
          cellClass += ' snake-body';
        }
        // Check if cell is food
        else if (food.x === x && food.y === y) {
          cellClass += ' food';
        }

        cells.push(
          <div
            key={`${x}-${y}`}
            className={cellClass}
          />
        );
      }
    }
    return cells;
  };

  return (
    <div className="snake-game-container">
      <div className="game-header">
        <h1 className="game-title">🐍 SNAKE GAME</h1>
        <button className="back-btn">🎮 Back to Games</button>
      </div>

      <div className="game-content">
        <div className="left-panel">
          <div className="game-mode-panel glass-panel">
            <h3 className="panel-title">🎯 Game Mode</h3>
            <div className="mode-buttons">
              {Object.entries(GAME_MODES).map(([key, mode]) => (
                <button
                  key={key}
                  className={`mode-btn ${gameMode === key ? 'active' : ''}`}
                  onClick={() => setGameMode(key)}
                  disabled={gameRunning}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div className="scoreboard glass-panel">
            <h3 className="panel-title">🏆 Scoreboard</h3>
            <div className="score-item">
              <span className="score-label">Score:</span>
              <span className="score-value">{score}</span>
            </div>
            <div className="score-item">
              <span className="score-label">High Score:</span>
              <span className="score-value">{highScore}</span>
            </div>
            <button 
              className="reset-btn"
              onClick={resetGame}
            >
              🔄 Reset Scores
            </button>
          </div>

          <div className="controls glass-panel">
            <h3 className="panel-title">🎮 Controls</h3>
            <div className="controls-info">
              <p>Use arrow keys to move</p>
              <div className="arrow-keys">
                <div className="arrow-key">↑</div>
                <div className="arrow-row">
                  <div className="arrow-key">←</div>
                  <div className="arrow-key">↓</div>
                  <div className="arrow-key">→</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="game-area">
          <div className="game-board glass-panel">
            {!gameRunning && !gameOver && (
              <div className="game-overlay">
                <h2>🐍 Ready to Play?</h2>
                <p>Press Start Game to begin!</p>
                <button className="start-btn" onClick={startGame}>
                  🚀 Start Game
                </button>
              </div>
            )}

            {gameOver && (
              <div className="game-overlay game-over">
                <h2>💀 Game Over!</h2>
                <p>Final Score: {score}</p>
                {score === highScore && score > 0 && (
                  <p className="new-record">🎉 New High Score!</p>
                )}
                <button className="start-btn" onClick={startGame}>
                  🔄 Play Again
                </button>
              </div>
            )}

            <div className="grid">
              {renderGrid()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;