import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 30;

const TETROMINOES = {
  I: [
    [1, 1, 1, 1]
  ],
  O: [
    [1, 1],
    [1, 1]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1]
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1]
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1]
  ]
};

const COLORS = {
  I: '#00f5ff',
  O: '#ffd700',
  T: '#da70d6',
  S: '#32cd32',
  Z: '#ff6347',
  J: '#1e90ff',
  L: '#ff8c00'
};

const TetrisGame = () => {
  const [board, setBoard] = useState(Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)));
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dropTime, setDropTime] = useState(1000);
  
  const gameLoopRef = useRef();

  const createPiece = useCallback(() => {
    const pieceTypes = Object.keys(TETROMINOES);
    const type = pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
    return {
      shape: TETROMINOES[type],
      type,
      x: Math.floor(BOARD_WIDTH / 2) - Math.ceil(TETROMINOES[type][0].length / 2),
      y: 0
    };
  }, []);

  const initializeGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)));
    setCurrentPiece(createPiece());
    setNextPiece(createPiece());
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setDropTime(1000);
    setIsPlaying(true);
  };

  const rotatePiece = (piece) => {
    const rotated = piece.shape[0].map((_, i) =>
      piece.shape.map(row => row[i]).reverse()
    );
    return { ...piece, shape: rotated };
  };

  const isValidMove = (piece, board, dx = 0, dy = 0) => {
    return piece.shape.every((row, y) =>
      row.every((cell, x) => {
        if (cell === 0) return true;
        const newX = piece.x + x + dx;
        const newY = piece.y + y + dy;
        return newX >= 0 && newX < BOARD_WIDTH && newY < BOARD_HEIGHT &&
               (newY < 0 || board[newY][newX] === 0);
      })
    );
  };

  const placePiece = (piece, board) => {
    const newBoard = board.map(row => [...row]);
    piece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell && piece.y + y >= 0) {
          newBoard[piece.y + y][piece.x + x] = piece.type;
        }
      });
    });
    return newBoard;
  };

  const clearLines = (board) => {
    const newBoard = board.filter(row => row.some(cell => cell === 0));
    const clearedLines = BOARD_HEIGHT - newBoard.length;
    const emptyRows = Array(clearedLines).fill().map(() => Array(BOARD_WIDTH).fill(0));
    return { board: [...emptyRows, ...newBoard], clearedLines };
  };

  const movePiece = (dx, dy) => {
    if (!currentPiece || gameOver || !isPlaying) return;

    if (isValidMove(currentPiece, board, dx, dy)) {
      setCurrentPiece(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    } else if (dy > 0) {
      // Piece can't move down, place it
      const newBoard = placePiece(currentPiece, board);
      const { board: clearedBoard, clearedLines } = clearLines(newBoard);
      
      setBoard(clearedBoard);
      setLines(prev => prev + clearedLines);
      setScore(prev => prev + clearedLines * 100 * level + 10);
      setLevel(Math.floor(lines / 10) + 1);
      
      const newPiece = nextPiece;
      if (!isValidMove(newPiece, clearedBoard)) {
        setGameOver(true);
        setIsPlaying(false);
        return;
      }
      
      setCurrentPiece(newPiece);
      setNextPiece(createPiece());
    }
  };

  const rotatePieceHandler = () => {
    if (!currentPiece || gameOver || !isPlaying) return;
    
    const rotated = rotatePiece(currentPiece);
    if (isValidMove(rotated, board)) {
      setCurrentPiece(rotated);
    }
  };

  const handleKeyPress = useCallback((e) => {
    if (!isPlaying || gameOver) return;

    switch (e.key) {
      case 'ArrowLeft':
        movePiece(-1, 0);
        break;
      case 'ArrowRight':
        movePiece(1, 0);
        break;
      case 'ArrowDown':
        movePiece(0, 1);
        break;
      case 'ArrowUp':
        rotatePieceHandler();
        break;
      case ' ':
        e.preventDefault();
        // Hard drop
        if (currentPiece) {
          let dropDistance = 0;
          while (isValidMove(currentPiece, board, 0, dropDistance + 1)) {
            dropDistance++;
          }
          movePiece(0, dropDistance);
        }
        break;
    }
  }, [isPlaying, gameOver, currentPiece, board]);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    // Add current piece to display board
    if (currentPiece) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell && currentPiece.y + y >= 0) {
            displayBoard[currentPiece.y + y][currentPiece.x + x] = currentPiece.type;
          }
        });
      });
    }

    return displayBoard.map((row, y) => (
      <div key={y} style={{ display: 'flex' }}>
        {row.map((cell, x) => (
          <div
            key={x}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: cell ? COLORS[cell] : 'rgba(255, 255, 255, 0.05)',
              boxShadow: cell ? `inset 0 0 10px rgba(255, 255, 255, 0.2)` : 'none'
            }}
          />
        ))}
      </div>
    ));
  };

  const renderNextPiece = () => {
    if (!nextPiece) return null;
    
    return nextPiece.shape.map((row, y) => (
      <div key={y} style={{ display: 'flex' }}>
        {row.map((cell, x) => (
          <div
            key={x}
            style={{
              width: 20,
              height: 20,
              border: cell ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
              backgroundColor: cell ? COLORS[nextPiece.type] : 'transparent',
              margin: '1px'
            }}
          />
        ))}
      </div>
    ));
  };

  // Game loop
  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(() => {
        movePiece(0, 1);
      }, dropTime);
    }
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameOver, dropTime, currentPiece, board]);

  // Update drop time based on level
  useEffect(() => {
    setDropTime(Math.max(50, 1000 - (level - 1) * 50));
  }, [level]);

  // Keyboard controls
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!currentPiece && !gameOver) {
      initializeGame();
    }
  }, []);

  return (
    <>
      <style>{`
        .tetris-game {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
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
        }

        .game-container {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
          flex-wrap: wrap;
          justify-content: center;
        }

        .game-board {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          padding: 10px;
        }

        .game-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-width: 200px;
        }

        .stats-panel, .next-panel, .controls-panel {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .stats-panel h3, .next-panel h3, .controls-panel h3 {
          margin: 0 0 1rem 0;
          font-size: 1.2rem;
          text-align: center;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }

        .stat-value {
          font-weight: bold;
          color: #ffd700;
        }

        .next-piece-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          padding: 1rem;
        }

        .controls-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 0.9rem;
        }

        .controls-list li {
          margin-bottom: 0.5rem;
          padding: 0.25rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
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

        .game-over-content {
          background: rgba(255, 255, 255, 0.1);
          padding: 3rem;
          border-radius: 20px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
        }

        .game-over-title {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #ff6b6b;
          text-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
        }

        .final-stats {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .play-again-btn {
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

        .play-again-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(16, 185, 129, 0.4);
        }

        @media (max-width: 768px) {
          .tetris-game {
            padding: 0.5rem;
          }

          .game-header {
            flex-direction: column;
            text-align: center;
          }

          .game-title {
            font-size: 2rem;
          }

          .game-container {
            flex-direction: column;
            gap: 1rem;
          }

          .game-sidebar {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }

          .stats-panel, .next-panel, .controls-panel {
            flex: 1;
            min-width: 150px;
          }
        }
      `}</style>

      <div className="tetris-game">
        <div className="game-header">
          <Link to="/" className="home-btn">🏠 Back to Games</Link>
          <h1 className="game-title">🧱 Tetris</h1>
          <button onClick={initializeGame} className="control-btn">🔄 New Game</button>
        </div>

        <div className="game-container">
          <div className="game-board">
            {renderBoard()}
          </div>

          <div className="game-sidebar">
            <div className="stats-panel">
              <h3>📊 Stats</h3>
              <div className="stat-row">
                <span>Score:</span>
                <span className="stat-value">{score.toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span>Lines:</span>
                <span className="stat-value">{lines}</span>
              </div>
              <div className="stat-row">
                <span>Level:</span>
                <span className="stat-value">{level}</span>
              </div>
            </div>

            <div className="next-panel">
              <h3>🔮 Next Piece</h3>
              <div className="next-piece-container">
                {renderNextPiece()}
              </div>
            </div>

            <div className="controls-panel">
              <h3>🎮 Controls</h3>
              <ul className="controls-list">
                <li>← → Move</li>
                <li>↓ Soft Drop</li>
                <li>↑ Rotate</li>
                <li>Space Hard Drop</li>
              </ul>
            </div>
          </div>
        </div>

        {gameOver && (
          <div className="game-over-overlay">
            <div className="game-over-content">
              <h2 className="game-over-title">💀 Game Over!</h2>
              <div className="final-stats">
                <p>Final Score: {score.toLocaleString()}</p>
                <p>Lines Cleared: {lines}</p>
                <p>Level Reached: {level}</p>
              </div>
              <button onClick={initializeGame} className="play-again-btn">
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TetrisGame;