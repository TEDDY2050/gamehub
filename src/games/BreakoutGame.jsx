import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const BALL_RADIUS = 8;
const BRICK_ROWS = 6;
const BRICK_COLS = 10;
const BRICK_WIDTH = CANVAS_WIDTH / BRICK_COLS;
const BRICK_HEIGHT = 20;

const BreakoutGame = () => {
  const canvasRef = useRef();
  const gameLoopRef = useRef();
  const [gameState, setGameState] = useState({
    paddle: { x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2, y: CANVAS_HEIGHT - 30 },
    ball: { 
      x: CANVAS_WIDTH / 2, 
      y: CANVAS_HEIGHT - 50, 
      dx: 4, 
      dy: -4 
    },
    bricks: [],
    score: 0,
    lives: 3,
    level: 1,
    ballSpeed: 4
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [keys, setKeys] = useState({});

  const initializeBricks = (level = 1) => {
    const bricks = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        if (Math.random() > 0.1 || level > 1) { // Some empty spots on level 1
          bricks.push({
            x: col * BRICK_WIDTH,
            y: 50 + row * BRICK_HEIGHT,
            width: BRICK_WIDTH - 2,
            height: BRICK_HEIGHT - 2,
            color: colors[row],
            hits: level > 2 ? Math.floor(Math.random() * 2) + 1 : 1,
            maxHits: level > 2 ? Math.floor(Math.random() * 2) + 1 : 1
          });
        }
      }
    }
    return bricks;
  };

  const initializeGame = () => {
    setGameState({
      paddle: { x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2, y: CANVAS_HEIGHT - 30 },
      ball: { 
        x: CANVAS_WIDTH / 2, 
        y: CANVAS_HEIGHT - 50, 
        dx: 4, 
        dy: -4 
      },
      bricks: initializeBricks(1),
      score: 0,
      lives: 3,
      level: 1,
      ballSpeed: 4
    });
    setIsPlaying(false);
    setGameOver(false);
    setGameWon(false);
  };

  const nextLevel = () => {
    setGameState(prev => ({
      ...prev,
      level: prev.level + 1,
      ballSpeed: Math.min(prev.ballSpeed + 0.5, 8),
      ball: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - 50,
        dx: prev.ballSpeed + 0.5,
        dy: -(prev.ballSpeed + 0.5)
      },
      bricks: initializeBricks(prev.level + 1),
      lives: prev.lives + 1 // Bonus life for new level
    }));
    setIsPlaying(false);
  };

  const updateGame = useCallback(() => {
    if (!isPlaying || gameOver || gameWon) return;

    setGameState(prev => {
      const newState = { ...prev };

      // Move paddle
      if (keys['ArrowLeft'] && newState.paddle.x > 0) {
        newState.paddle.x -= 8;
      }
      if (keys['ArrowRight'] && newState.paddle.x < CANVAS_WIDTH - PADDLE_WIDTH) {
        newState.paddle.x += 8;
      }

      // Move ball
      newState.ball.x += newState.ball.dx;
      newState.ball.y += newState.ball.dy;

      // Ball collision with walls
      if (newState.ball.x <= BALL_RADIUS || newState.ball.x >= CANVAS_WIDTH - BALL_RADIUS) {
        newState.ball.dx = -newState.ball.dx;
      }
      if (newState.ball.y <= BALL_RADIUS) {
        newState.ball.dy = -newState.ball.dy;
      }

      // Ball collision with paddle
      if (
        newState.ball.y + BALL_RADIUS >= newState.paddle.y &&
        newState.ball.x >= newState.paddle.x &&
        newState.ball.x <= newState.paddle.x + PADDLE_WIDTH &&
        newState.ball.dy > 0
      ) {
        const hitPos = (newState.ball.x - newState.paddle.x) / PADDLE_WIDTH;
        const angle = (hitPos - 0.5) * Math.PI / 3; // Max 60 degree angle
        const speed = Math.sqrt(newState.ball.dx * newState.ball.dx + newState.ball.dy * newState.ball.dy);
        
        newState.ball.dx = Math.sin(angle) * speed;
        newState.ball.dy = -Math.cos(angle) * speed;
      }

      // Ball collision with bricks
      newState.bricks = newState.bricks.filter(brick => {
        if (
          newState.ball.x + BALL_RADIUS >= brick.x &&
          newState.ball.x - BALL_RADIUS <= brick.x + brick.width &&
          newState.ball.y + BALL_RADIUS >= brick.y &&
          newState.ball.y - BALL_RADIUS <= brick.y + brick.height
        ) {
          brick.hits--;
          newState.score += 10 * newState.level;
          
          // Determine collision side
          const ballCenterX = newState.ball.x;
          const ballCenterY = newState.ball.y;
          const brickCenterX = brick.x + brick.width / 2;
          const brickCenterY = brick.y + brick.height / 2;
          
          const deltaX = Math.abs(ballCenterX - brickCenterX);
          const deltaY = Math.abs(ballCenterY - brickCenterY);
          
          if (deltaX / brick.width > deltaY / brick.height) {
            newState.ball.dx = -newState.ball.dx;
          } else {
            newState.ball.dy = -newState.ball.dy;
          }
          
          return brick.hits > 0; // Keep brick if it has hits left
        }
        return true;
      });

      // Check if ball fell below paddle
      if (newState.ball.y > CANVAS_HEIGHT) {
        newState.lives--;
        if (newState.lives <= 0) {
          setGameOver(true);
          setIsPlaying(false);
        } else {
          // Reset ball position
          newState.ball = {
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT - 50,
            dx: newState.ballSpeed,
            dy: -newState.ballSpeed
          };
          setIsPlaying(false);
        }
      }

      // Check win condition
      if (newState.bricks.length === 0) {
        setGameWon(true);
        setIsPlaying(false);
      }

      return newState;
    });
  }, [isPlaying, gameOver, gameWon, keys]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw bricks with glow effect
    gameState.bricks.forEach(brick => {
      ctx.save();
      ctx.shadowColor = brick.color;
      ctx.shadowBlur = 10;
      
      // Color intensity based on hits remaining
      const intensity = brick.hits / brick.maxHits;
      const rgb = hexToRgb(brick.color);
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.3 + intensity * 0.7})`;
      
      ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
      ctx.restore();
    });

    // Draw paddle with glow
    ctx.save();
    ctx.shadowColor = '#00f5ff';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#00f5ff';
    ctx.fillRect(gameState.paddle.x, gameState.paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.restore();

    // Draw ball with glow
    ctx.save();
    ctx.shadowColor = '#ff6b6b';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(gameState.ball.x, gameState.ball.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }, [gameState]);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const handleKeyDown = useCallback((e) => {
    setKeys(prev => ({ ...prev, [e.key]: true }));
    
    if (e.key === ' ') {
      e.preventDefault();
      if (!isPlaying && !gameOver && gameState.lives > 0) {
        setIsPlaying(true);
      } else if (isPlaying) {
        setIsPlaying(false);
      }
    }
  }, [isPlaying, gameOver, gameState.lives]);

  const handleKeyUp = useCallback((e) => {
    setKeys(prev => ({ ...prev, [e.key]: false }));
  }, []);

  // Game loop
  useEffect(() => {
    if (isPlaying) {
      gameLoopRef.current = setInterval(updateGame, 16); // ~60 FPS
    } else {
      clearInterval(gameLoopRef.current);
    }
    return () => clearInterval(gameLoopRef.current);
  }, [updateGame, isPlaying]);

  // Drawing loop
  useEffect(() => {
    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };
    animate();
  }, [draw]);

  // Event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <>
      <style>{`
        .breakout-game {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
          max-width: 800px;
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
          background: linear-gradient(45deg, #ef4444, #dc2626);
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

        .level-display {
          color: #10b981;
        }

        .game-area {
          position: relative;
          margin-bottom: 1rem;
        }

        .game-canvas {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 15px;
          background: transparent;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .game-status {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          pointer-events: none;
          background: rgba(0, 0, 0, 0.7);
          padding: 2rem;
          border-radius: 15px;
          backdrop-filter: blur(10px);
        }

        .status-text {
          font-size: 2rem;
          font-weight: bold;
          color: white;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          margin-bottom: 1rem;
        }

        .status-subtitle {
          font-size: 1.2rem;
          opacity: 0.8;
        }

        .controls-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .controls-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(16, 185, 129, 0.4);
        }

        .instructions {
          background: rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 15px;
          text-align: center;
          max-width: 800px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .instructions h3 {
          margin: 0 0 1rem 0;
          color: #ef4444;
          font-size: 1.3rem;
        }

        .instructions p {
          margin: 0.5rem 0;
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

        .overlay-btn.next {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .overlay-btn.next:hover {
          box-shadow: 0 5px 20px rgba(245, 158, 11, 0.4);
        }

        @media (max-width: 768px) {
          .breakout-game {
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

          .game-canvas {
            width: 100%;
            max-width: 400px;
            height: 250px;
          }

          .status-text {
            font-size: 1.5rem;
          }

          .overlay-title {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="breakout-game">
        <div className="game-header">
          <Link to="/" className="home-btn">🏠 Back to Games</Link>
          <h1 className="game-title">🧱 Breakout</h1>
          <button onClick={initializeGame} className="control-btn">🔄 Reset</button>
        </div>

        <div className="game-stats">
          <div className="stat-box">
            <div className="stat-label">Score</div>
            <div className="stat-value">{gameState.score.toLocaleString()}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Lives</div>
            <div className="stat-value lives-display">{'❤️'.repeat(gameState.lives)}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Level</div>
            <div className="stat-value level-display">{gameState.level}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Bricks</div>
            <div className="stat-value">{gameState.bricks.length}</div>
          </div>
        </div>

        <div className="game-area">
          <canvas
            ref={canvasRef}
            className="game-canvas"
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
          />
          
          {!isPlaying && !gameOver && !gameWon && (
            <div className="game-status">
              <div className="status-text">
                {gameState.lives < 3 ? 'Life Lost!' : 'Ready to Play?'}
              </div>
              <div className="status-subtitle">Press SPACE to Start</div>
            </div>
          )}
        </div>

        <div className="instructions">
          <h3>🎮 How to Play</h3>
          <p>Use ← → arrow keys to move the paddle</p>
          <p>Press SPACE to start/pause the game</p>
          <p>Break all bricks to advance to the next level!</p>
          <p>Don't let the ball fall below the paddle!</p>
        </div>

        {gameWon && (
          <div className="game-overlay">
            <div className="overlay-content">
              <h2 className="overlay-title won">🎉 Level Complete!</h2>
              <p className="overlay-message">
                Great job! You cleared level {gameState.level}!<br/>
                Score: {gameState.score.toLocaleString()}
              </p>
              <div className="overlay-buttons">
                <button onClick={nextLevel} className="overlay-btn next">
                  Next Level
                </button>
                <button onClick={initializeGame} className="overlay-btn">
                  Restart Game
                </button>
              </div>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="game-overlay">
            <div className="overlay-content">
              <h2 className="overlay-title lost">💀 Game Over!</h2>
              <p className="overlay-message">
                You reached level {gameState.level}<br/>
                Final Score: {gameState.score.toLocaleString()}
              </p>
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

export default BreakoutGame;