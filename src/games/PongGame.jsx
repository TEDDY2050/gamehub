import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 10;
const PADDLE_SPEED = 5;
const INITIAL_BALL_SPEED = 3;

const PongGame = () => {
  const [gameState, setGameState] = useState({
    leftPaddle: { y: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2, speed: 0 },
    rightPaddle: { y: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2, speed: 0 },
    ball: {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
      dx: INITIAL_BALL_SPEED,
      dy: INITIAL_BALL_SPEED
    },
    leftScore: 0,
    rightScore: 0
  });
  
  const [gameMode, setGameMode] = useState('ai'); // 'ai' or 'human'
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [ballSpeed, setBallSpeed] = useState(INITIAL_BALL_SPEED);
  
  const gameLoopRef = useRef();
  const canvasRef = useRef();
  const keysPressed = useRef({});

  const resetBall = () => {
    return {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
      dx: Math.random() > 0.5 ? ballSpeed : -ballSpeed,
      dy: (Math.random() - 0.5) * ballSpeed
    };
  };

  const initializeGame = () => {
    setGameState({
      leftPaddle: { y: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2, speed: 0 },
      rightPaddle: { y: GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2, speed: 0 },
      ball: resetBall(),
      leftScore: 0,
      rightScore: 0
    });
    setIsPlaying(false);
    setGameOver(false);
    setWinner('');
    setBallSpeed(INITIAL_BALL_SPEED);
  };

  const updateGame = useCallback(() => {
    if (!isPlaying || gameOver) return;

    setGameState(prevState => {
      const newState = { ...prevState };

      // Update ball position
      newState.ball.x += newState.ball.dx;
      newState.ball.y += newState.ball.dy;

      // Ball collision with top/bottom walls
      if (newState.ball.y <= 0 || newState.ball.y >= GAME_HEIGHT - BALL_SIZE) {
        newState.ball.dy = -newState.ball.dy;
      }

      // Ball collision with paddles
      const ballLeft = newState.ball.x;
      const ballRight = newState.ball.x + BALL_SIZE;
      const ballTop = newState.ball.y;
      const ballBottom = newState.ball.y + BALL_SIZE;

      // Left paddle collision
      if (
        ballLeft <= PADDLE_WIDTH &&
        ballBottom >= newState.leftPaddle.y &&
        ballTop <= newState.leftPaddle.y + PADDLE_HEIGHT &&
        newState.ball.dx < 0
      ) {
        newState.ball.dx = -newState.ball.dx;
        const paddleCenter = newState.leftPaddle.y + PADDLE_HEIGHT / 2;
        const ballCenter = newState.ball.y + BALL_SIZE / 2;
        const angle = (ballCenter - paddleCenter) / (PADDLE_HEIGHT / 2);
        newState.ball.dy = angle * Math.abs(newState.ball.dx);
      }

      // Right paddle collision
      if (
        ballRight >= GAME_WIDTH - PADDLE_WIDTH &&
        ballBottom >= newState.rightPaddle.y &&
        ballTop <= newState.rightPaddle.y + PADDLE_HEIGHT &&
        newState.ball.dx > 0
      ) {
        newState.ball.dx = -newState.ball.dx;
        const paddleCenter = newState.rightPaddle.y + PADDLE_HEIGHT / 2;
        const ballCenter = newState.ball.y + BALL_SIZE / 2;
        const angle = (ballCenter - paddleCenter) / (PADDLE_HEIGHT / 2);
        newState.ball.dy = angle * Math.abs(newState.ball.dx);
      }

      // Scoring
      if (newState.ball.x < 0) {
        newState.rightScore++;
        newState.ball = resetBall();
        setBallSpeed(prev => Math.min(prev + 0.2, 8));
      } else if (newState.ball.x > GAME_WIDTH) {
        newState.leftScore++;
        newState.ball = resetBall();
        setBallSpeed(prev => Math.min(prev + 0.2, 8));
      }

      // Check for game end (first to 7 wins)
      if (newState.leftScore >= 7 || newState.rightScore >= 7) {
        setWinner(newState.leftScore >= 7 ? 'Player' : gameMode === 'ai' ? 'AI' : 'Player 2');
        setGameOver(true);
        setIsPlaying(false);
      }

      // Update paddles
      if (gameMode === 'human') {
        // Human vs Human
        if (keysPressed.current['KeyW'] && newState.leftPaddle.y > 0) {
          newState.leftPaddle.y -= PADDLE_SPEED;
        }
        if (keysPressed.current['KeyS'] && newState.leftPaddle.y < GAME_HEIGHT - PADDLE_HEIGHT) {
          newState.leftPaddle.y += PADDLE_SPEED;
        }
        if (keysPressed.current['ArrowUp'] && newState.rightPaddle.y > 0) {
          newState.rightPaddle.y -= PADDLE_SPEED;
        }
        if (keysPressed.current['ArrowDown'] && newState.rightPaddle.y < GAME_HEIGHT - PADDLE_HEIGHT) {
          newState.rightPaddle.y += PADDLE_SPEED;
        }
      } else {
        // Human vs AI
        if (keysPressed.current['KeyW'] && newState.leftPaddle.y > 0) {
          newState.leftPaddle.y -= PADDLE_SPEED;
        }
        if (keysPressed.current['KeyS'] && newState.leftPaddle.y < GAME_HEIGHT - PADDLE_HEIGHT) {
          newState.leftPaddle.y += PADDLE_SPEED;
        }

        // AI for right paddle
        const paddleCenter = newState.rightPaddle.y + PADDLE_HEIGHT / 2;
        const ballCenter = newState.ball.y + BALL_SIZE / 2;
        const aiSpeed = PADDLE_SPEED * 0.7; // Make AI slightly slower

        if (ballCenter < paddleCenter - 10 && newState.rightPaddle.y > 0) {
          newState.rightPaddle.y -= aiSpeed;
        } else if (ballCenter > paddleCenter + 10 && newState.rightPaddle.y < GAME_HEIGHT - PADDLE_HEIGHT) {
          newState.rightPaddle.y += aiSpeed;
        }
      }

      return newState;
    });
  }, [isPlaying, gameOver, gameMode, ballSpeed]);

  const handleKeyDown = useCallback((e) => {
    keysPressed.current[e.code] = true;
    
    if (e.code === 'Space') {
      e.preventDefault();
      if (!isPlaying && !gameOver) {
        setIsPlaying(true);
      } else if (isPlaying) {
        setIsPlaying(false);
      }
    }
  }, [isPlaying, gameOver]);

  const handleKeyUp = useCallback((e) => {
    keysPressed.current[e.code] = false;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, GAME_WIDTH, GAME_HEIGHT);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Draw center line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(GAME_WIDTH / 2, 0);
    ctx.lineTo(GAME_WIDTH / 2, GAME_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles with glow effect
    ctx.shadowColor = '#00f5ff';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#00f5ff';
    
    // Left paddle
    ctx.fillRect(0, gameState.leftPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    
    // Right paddle
    ctx.fillRect(GAME_WIDTH - PADDLE_WIDTH, gameState.rightPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Draw ball with glow effect
    ctx.shadowColor = '#ff6b6b';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(gameState.ball.x, gameState.ball.y, BALL_SIZE, BALL_SIZE);

    // Reset shadow
    ctx.shadowBlur = 0;
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(updateGame, 16); // ~60 FPS
    } else {
      clearInterval(gameLoopRef.current);
    }

    return () => clearInterval(gameLoopRef.current);
  }, [updateGame, isPlaying, gameOver]);

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
  }, [gameMode]);

  return (
    <>
      <style>{`
        .pong-game {
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
          background: linear-gradient(45deg, #00f5ff, #0099cc);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .game-controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .mode-btn {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .mode-btn.active {
          background: rgba(0, 245, 255, 0.3);
          border-color: rgba(0, 245, 255, 0.5);
        }

        .mode-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .start-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .start-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(16, 185, 129, 0.4);
        }

        .start-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
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

        .scoreboard {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 3rem;
          font-size: 3rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.8);
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }

        .score {
          text-align: center;
        }

        .game-status {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          pointer-events: none;
        }

        .status-text {
          font-size: 2rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          margin-bottom: 1rem;
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
          color: #00f5ff;
          font-size: 1.3rem;
        }

        .controls-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .control-section {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 10px;
        }

        .control-title {
          font-weight: bold;
          color: #fbbf24;
          margin-bottom: 0.5rem;
        }

        .control-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 0.9rem;
        }

        .control-list li {
          margin-bottom: 0.25rem;
          opacity: 0.9;
        }

        .game-over-overlay {
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
          color: #10b981;
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
        }

        .overlay-message {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .final-score {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: #fbbf24;
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

        @media (max-width: 768px) {
          .pong-game {
            padding: 0.5rem;
          }

          .game-header {
            flex-direction: column;
            text-align: center;
          }

          .game-title {
            font-size: 2rem;
          }

          .game-canvas {
            width: 100%;
            max-width: 400px;
            height: 200px;
          }

          .scoreboard {
            font-size: 2rem;
            gap: 2rem;
          }

          .status-text {
            font-size: 1.5rem;
          }

          .controls-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="pong-game">
        <div className="game-header">
          <Link to="/" className="home-btn">🏠 Back to Games</Link>
          <h1 className="game-title">🏓 Pong</h1>
          <button onClick={initializeGame} className="control-btn">🔄 Reset</button>
        </div>

        <div className="game-controls">
          <button
            className={`mode-btn ${gameMode === 'ai' ? 'active' : ''}`}
            onClick={() => setGameMode('ai')}
          >
            🤖 vs AI
          </button>
          <button
            className={`mode-btn ${gameMode === 'human' ? 'active' : ''}`}
            onClick={() => setGameMode('human')}
          >
            👥 vs Human
          </button>
          <button
            className="start-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={gameOver}
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Start'}
          </button>
        </div>

        <div className="game-area">
          <canvas
            ref={canvasRef}
            className="game-canvas"
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
          />
          
          <div className="scoreboard">
            <div className="score">{gameState.leftScore}</div>
            <div className="score">{gameState.rightScore}</div>
          </div>

          {!isPlaying && !gameOver && (
            <div className="game-status">
              <div className="status-text">Press SPACE to Start</div>
            </div>
          )}

          {isPlaying && (
            <div className="game-status">
              <div className="status-text" style={{ opacity: 0.3 }}>
                First to 7 wins!
              </div>
            </div>
          )}
        </div>

        <div className="instructions">
          <h3>🎮 Game Controls</h3>
          <div className="controls-grid">
            <div className="control-section">
              <div className="control-title">Player 1 (Left Paddle)</div>
              <ul className="control-list">
                <li>W - Move Up</li>
                <li>S - Move Down</li>
              </ul>
            </div>
            
            {gameMode === 'human' && (
              <div className="control-section">
                <div className="control-title">Player 2 (Right Paddle)</div>
                <ul className="control-list">
                  <li>↑ - Move Up</li>
                  <li>↓ - Move Down</li>
                </ul>
              </div>
            )}

            {gameMode === 'ai' && (
              <div className="control-section">
                <div className="control-title">AI Opponent</div>
                <ul className="control-list">
                  <li>Automatic Movement</li>
                  <li>Adjustable Difficulty</li>
                </ul>
              </div>
            )}

            <div className="control-section">
              <div className="control-title">Game Controls</div>
              <ul className="control-list">
                <li>SPACE - Start/Pause</li>
                <li>First to 7 points wins!</li>
              </ul>
            </div>
          </div>
        </div>

        {gameOver && (
          <div className="game-over-overlay">
            <div className="overlay-content">
              <h2 className="overlay-title">🏆 {winner} Wins!</h2>
              <div className="final-score">
                Final Score: {gameState.leftScore} - {gameState.rightScore}
              </div>
              <p className="overlay-message">
                {winner === 'Player' ? 'Congratulations!' : 
                 winner === 'AI' ? 'Better luck next time!' : 
                 'Great match!'}
              </p>
              <button onClick={initializeGame} className="overlay-btn">
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PongGame;