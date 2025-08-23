import React, { useState, useEffect, useRef } from 'react';
import '../styles/SnakeGame.css';

function SnakeGame() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);

  const gridSize = 25;
  const tileCount = 25;

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDir({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
    setPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') return setPaused(!paused);

      switch (e.key) {
        case 'ArrowUp': if (dir.y === 0) setDir({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (dir.y === 0) setDir({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (dir.x === 0) setDir({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (dir.x === 0) setDir({ x: 1, y: 0 }); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dir, paused]);

  useEffect(() => {
    if (gameOver || paused) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const newHead = {
          x: prevSnake[0].x + dir.x,
          y: prevSnake[0].y + dir.y,
        };

        if (
          newHead.x < 0 ||
          newHead.y < 0 ||
          newHead.x >= tileCount ||
          newHead.y >= tileCount ||
          prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
          });
          setScore((prev) => prev + 10);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [dir, food, gameOver, paused]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = '#0a0f1c';
    ctx.fillRect(0, 0, gridSize * tileCount, gridSize * tileCount);

    ctx.fillStyle = '#00ff4c';
    snake.forEach((segment) => {
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    ctx.fillStyle = '#ff4040';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
  }, [snake, food]);

  return (
    <div className="snake-game-page">
      <h2>Snake Game</h2>
      <div className="score-panel">
        <p>Score: {score}</p>
        <button onClick={() => setPaused(!paused)}>
          {paused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={resetGame}>Restart</button>
      </div>
      {gameOver && <p className="game-over-text">Game Over!</p>}
      <canvas
        ref={canvasRef}
        width={gridSize * tileCount}
        height={gridSize * tileCount}
        className="snake-canvas"
      ></canvas>
    </div>
  );
}

export default SnakeGame;
