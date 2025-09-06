import React, { useState, useEffect, useCallback, useRef } from 'react';

const BOARD_SIZE = 20;
const CELL_SIZE = 25;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const GAME_SPEED = 150;

const ModernSnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [particles, setParticles] = useState([]);
  
  const gameLoopRef = useRef();
  const canvasRef = useRef();
  const lastDirectionRef = useRef(INITIAL_DIRECTION);

  // Generate random food position
  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  // Create particle effects
  const createParticles = useCallback((x, y, color, count = 6) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Math.random(),
        x: x * CELL_SIZE + CELL_SIZE / 2,
        y: y * CELL_SIZE + CELL_SIZE / 2,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        color,
        life: 1,
        decay: 0.02 + Math.random() * 0.02
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Reset game state
  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood({ x: 15, y: 15 });
    setDirection(INITIAL_DIRECTION);
    setGameRunning(false);
    setGameOver(false);
    setScore(0);
    setParticles([]);
    lastDirectionRef.current = INITIAL_DIRECTION;
  };

  // Start game
  const startGame = () => {
    if (!gameRunning && !gameOver) {
      setGameRunning(true);
    } else if (gameOver) {
      resetGame();
      setGameRunning(true);
    }
  };

  // Main game loop
  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      // Move head
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true);
        setGameRunning(false);
        createParticles(head.x, head.y, '#ef4444', 12);
        if (score > highScore) {
          setHighScore(score);
        }
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        createParticles(head.x, head.y, '#ef4444', 12);
        if (score > highScore) {
          setHighScore(score);
        }
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        createParticles(food.x, food.y, '#10b981', 8);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, gameRunning, gameOver, food, score, highScore, createParticles, generateFood]);

  // Handle keyboard input
  const handleKeyPress = useCallback((e) => {
    if (!gameRunning && e.key !== ' ') return;

    const newDirection = { ...lastDirectionRef.current };
    let validMove = false;

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (lastDirectionRef.current.y === 0) {
          newDirection.x = 0;
          newDirection.y = -1;
          validMove = true;
        }
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (lastDirectionRef.current.y === 0) {
          newDirection.x = 0;
          newDirection.y = 1;
          validMove = true;
        }
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (lastDirectionRef.current.x === 0) {
          newDirection.x = -1;
          newDirection.y = 0;
          validMove = true;
        }
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (lastDirectionRef.current.x === 0) {
          newDirection.x = 1;
          newDirection.y = 0;
          validMove = true;
        }
        break;
      case ' ':
        e.preventDefault();
        gameRunning ? setGameRunning(false) : startGame();
        break;
    }

    if (validMove) {
      setDirection(newDirection);
      lastDirectionRef.current = newDirection;
    }
  }, [gameRunning, startGame]);

  // Draw game on canvas
  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const time = Date.now() * 0.003;
    
    // Clear canvas with animated gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${220 + Math.sin(time) * 20}, 70%, ${10 + Math.sin(time * 0.5) * 5}%)`);
    gradient.addColorStop(1, `hsl(${280 + Math.cos(time) * 20}, 60%, ${15 + Math.cos(time * 0.7) * 5}%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw subtle grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= BOARD_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, BOARD_SIZE * CELL_SIZE);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(BOARD_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw snake with gradient and glow
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      
      ctx.save();
      
      if (isHead) {
        // Head with glow effect
        const headGradient = ctx.createRadialGradient(
          segment.x * CELL_SIZE + CELL_SIZE/2, segment.y * CELL_SIZE + CELL_SIZE/2, 0,
          segment.x * CELL_SIZE + CELL_SIZE/2, segment.y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE
        );
        headGradient.addColorStop(0, '#00f5ff');
        headGradient.addColorStop(1, '#0099cc');
        ctx.fillStyle = headGradient;
        ctx.shadowColor = '#00f5ff';
        ctx.shadowBlur = 20;
      } else {
        // Body segments with fading effect
        const intensity = 1 - (index / snake.length) * 0.6;
        const bodyGradient = ctx.createLinearGradient(
          segment.x * CELL_SIZE, segment.y * CELL_SIZE,
          segment.x * CELL_SIZE + CELL_SIZE, segment.y * CELL_SIZE + CELL_SIZE
        );
        bodyGradient.addColorStop(0, `rgba(0, 200, 255, ${intensity})`);
        bodyGradient.addColorStop(1, `rgba(0, 150, 200, ${intensity * 0.8})`);
        ctx.fillStyle = bodyGradient;
        ctx.shadowColor = `rgba(0, 200, 255, ${intensity * 0.5})`;
        ctx.shadowBlur = 10;
      }
      
      // Draw rounded rectangle for snake segments
      const x = segment.x * CELL_SIZE + 2;
      const y = segment.y * CELL_SIZE + 2;
      const width = CELL_SIZE - 4;
      const height = CELL_SIZE - 4;
      const radius = 8;
      
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
      ctx.fill();
      
      ctx.restore();
    });

    // Draw food with pulsing animation
    const foodPulse = Math.sin(Date.now() * 0.008) * 0.3 + 0.8;
    const foodGradient = ctx.createRadialGradient(
      food.x * CELL_SIZE + CELL_SIZE/2, food.y * CELL_SIZE + CELL_SIZE/2, 0,
      food.x * CELL_SIZE + CELL_SIZE/2, food.y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE * foodPulse
    );
    foodGradient.addColorStop(0, '#ff6b6b');
    foodGradient.addColorStop(0.7, '#ff4757');
    foodGradient.addColorStop(1, '#c44569');
    
    ctx.fillStyle = foodGradient;
    ctx.shadowColor = '#ff6b6b';
    ctx.shadowBlur = 25;
    
    const foodSize = (CELL_SIZE - 6) * foodPulse;
    const foodOffset = (CELL_SIZE - foodSize) / 2;
    ctx.beginPath();
    ctx.roundRect(
      food.x * CELL_SIZE + foodOffset,
      food.y * CELL_SIZE + foodOffset,
      foodSize,
      foodSize,
      foodSize / 4
    );
    ctx.fill();

    // Draw particles
    particles.forEach(particle => {
      ctx.fillStyle = `${particle.color}${Math.floor(particle.life * 255).toString(16).padStart(2, '0')}`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3 * particle.life, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.shadowBlur = 0;
  }, [snake, food, particles]);

  // Update particles
  useEffect(() => {
    const updateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: Math.max(0, particle.life - particle.decay),
        vx: particle.vx * 0.95,
        vy: particle.vy * 0.95 + 0.1 // gravity
      })).filter(particle => particle.life > 0));
    };

    const interval = setInterval(updateParticles, 16);
    return () => clearInterval(interval);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameRunning) {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
    } else {
      clearInterval(gameLoopRef.current);
    }
    return () => clearInterval(gameLoopRef.current);
  }, [moveSnake, gameRunning]);

  // Draw game
  useEffect(() => {
    const draw = () => {
      drawGame();
      requestAnimationFrame(draw);
    };
    draw();
  }, [drawGame]);

  // Keyboard events
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div style={styles.container}>
      <div style={styles.gameWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>🐍 SNAKE GAME</h1>
          <div style={styles.scores}>
            <div style={styles.scoreBox}>
              <span style={styles.scoreLabel}>Score</span>
              <span style={styles.scoreValue}>{score}</span>
            </div>
            <div style={styles.scoreBox}>
              <span style={styles.scoreLabel}>Best</span>
              <span style={styles.scoreValue}>{highScore}</span>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div style={styles.gameBoard}>
          <canvas
            ref={canvasRef}
            width={BOARD_SIZE * CELL_SIZE}
            height={BOARD_SIZE * CELL_SIZE}
            style={styles.canvas}
          />
          
          {/* Game Over Overlay */}
          {gameOver && (
            <div style={styles.overlay}>
              <div style={styles.overlayContent}>
                <h2 style={styles.gameOverTitle}>Game Over!</h2>
                <p style={styles.finalScore}>Final Score: {score}</p>
                <button style={styles.playButton} onClick={startGame}>
                  🔄 Play Again
                </button>
              </div>
            </div>
          )}

          {/* Start Overlay */}
          {!gameRunning && !gameOver && (
            <div style={styles.overlay}>
              <div style={styles.overlayContent}>
                <h2 style={styles.startTitle}>Ready to Play?</h2>
                <p style={styles.instructions}>
                  Use arrow keys or WASD to move<br/>
                  Press SPACE to pause
                </p>
                <button style={styles.playButton} onClick={startGame}>
                  ▶️ Start Game
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <button 
            style={{...styles.controlButton, opacity: gameRunning ? 1 : 0.5}} 
            onClick={() => setGameRunning(!gameRunning)}
            disabled={gameOver}
          >
            {gameRunning ? '⏸️ Pause' : '▶️ Resume'}
          </button>
          <button style={styles.controlButton} onClick={resetGame}>
            🔄 Reset
          </button>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.hint}>
            🎮 Arrow Keys / WASD to move • SPACE to pause • Length: {snake.length}
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px'
  },
  gameWrapper: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    maxWidth: '600px',
    width: '100%'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  title: {
    color: 'white',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: 0,
    textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
  },
  scores: {
    display: 'flex',
    gap: '15px'
  },
  scoreBox: {
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    padding: '10px 15px',
    textAlign: 'center',
    minWidth: '70px'
  },
  scoreLabel: {
    display: 'block',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '12px',
    fontWeight: '500',
    marginBottom: '2px'
  },
  scoreValue: {
    display: 'block',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
  },
  gameBoard: {
    position: 'relative',
    margin: '0 auto',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    border: '2px solid rgba(255, 255, 255, 0.2)'
  },
  canvas: {
    display: 'block',
    background: 'transparent'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(5px)'
  },
  overlayContent: {
    textAlign: 'center',
    color: 'white'
  },
  gameOverTitle: {
    fontSize: '36px',
    color: '#ff6b6b',
    marginBottom: '10px',
    textShadow: '0 0 20px rgba(255, 107, 107, 0.8)'
  },
  startTitle: {
    fontSize: '36px',
    color: '#00f5ff',
    marginBottom: '15px',
    textShadow: '0 0 20px rgba(0, 245, 255, 0.8)'
  },
  finalScore: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#ffd700'
  },
  instructions: {
    fontSize: '16px',
    marginBottom: '25px',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.5'
  },
  playButton: {
    background: 'linear-gradient(135deg, #00f5ff, #0099cc)',
    border: 'none',
    borderRadius: '25px',
    color: 'white',
    padding: '15px 30px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(0, 245, 255, 0.4)'
  },
  controls: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '20px'
  },
  controlButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    color: 'white',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center'
  },
  hint: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px',
    margin: 0
  }
};

export default ModernSnakeGame;