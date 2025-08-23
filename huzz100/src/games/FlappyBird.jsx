import React, { useEffect, useState, useRef } from 'react';
import birdImg from '../assets/download.png'; 
import '../styles/FlappyBird.css';

function FlappyBird() {
  const canvasRef = useRef(null);
  const [birdY, setBirdY] = useState(window.innerHeight / 2);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gravity = 0.5;
  const pipeGap = 250;
  const pipeWidth = 100;
  const birdX = 150;
  const birdSize = 30;

  const resetGame = () => {
    setBirdY(window.innerHeight / 2);
    setVelocity(0);
    setPipes([]);
    setScore(0);
    setGameOver(false);
  };

  const jump = () => {
    if (!gameOver) setVelocity(-10);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === 'Space') jump();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameOver]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) return;

      setVelocity((v) => v + gravity);
      setBirdY((y) => y + velocity);

      setPipes((prevPipes) => {
        let newPipes = prevPipes.map(pipe => ({
          ...pipe,
          x: pipe.x - 4
        })).filter(pipe => pipe.x + pipeWidth > 0);

        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < window.innerWidth - 400) {
          const topHeight = Math.floor(Math.random() * (window.innerHeight / 2)) + 50;
          newPipes.push({
            x: window.innerWidth,
            topHeight
          });
        }

        newPipes.forEach(pipe => {
          if (pipe.x + pipeWidth === birdX) {
            setScore(s => s + 1);
          }
        });

        return newPipes;
      });

    }, 20);

    return () => clearInterval(interval);
  }, [velocity, gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Clear screen
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load and draw bird image
    const birdImage = new Image();
    birdImage.src = birdImg;
    birdImage.onload = () => {
      ctx.drawImage(birdImage, birdX - birdSize, birdY - birdSize, birdSize * 2, birdSize * 2);

      // Draw pipes
      ctx.fillStyle = 'lime';
      pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        ctx.fillRect(pipe.x, pipe.topHeight + pipeGap, pipeWidth, canvas.height);
      });

      // Collision detection
      if (
        birdY < 0 ||
        birdY > window.innerHeight ||
        pipes.some(pipe => (
          birdX > pipe.x && birdX < pipe.x + pipeWidth &&
          (birdY < pipe.topHeight || birdY > pipe.topHeight + pipeGap)
        ))
      ) {
        setGameOver(true);
      }
    };
  }, [birdY, pipes]);

  return (
    <div className="flappy-page">
      <div className="score-board">Score: {score}</div>

      {gameOver && (
        <div className="game-over-menu">
          <p>Game Over</p>
          <button onClick={resetGame} className="restart-button">Restart</button>
        </div>
      )}

      <canvas ref={canvasRef} className="flappy-canvas" />
    </div>
  );
}

export default FlappyBird;
