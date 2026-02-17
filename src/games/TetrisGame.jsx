import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 20;

const TETROMINOES = {
  I: [[1, 1, 1, 1]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  Z: [[1, 1, 0], [0, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]]
};

const COLORS = {
  I: '#edc22e',
  O: '#edc850',
  T: '#f2b179',
  S: '#f67c5f',
  Z: '#f59563',
  J: '#ede0c8',
  L: '#edcf72'
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
  const [bestScore, setBestScore] = useState(0);
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
    const first = createPiece();
    const next = createPiece();
    setCurrentPiece(first);
    setNextPiece(next);
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

  const movePiece = useCallback((dx, dy) => {
    if (!currentPiece || gameOver || !isPlaying) return;

    if (isValidMove(currentPiece, board, dx, dy)) {
      setCurrentPiece(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    } else if (dy > 0) {
      const newBoard = placePiece(currentPiece, board);
      const { board: clearedBoard, clearedLines } = clearLines(newBoard);
      
      setBoard(clearedBoard);
      const newLines = lines + clearedLines;
      setLines(newLines);
      const points = clearedLines * 100 * level + 10;
      const newScore = score + points;
      setScore(newScore);
      setLevel(Math.floor(newLines / 10) + 1);
      
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
      
      const newPiece = nextPiece;
      if (!isValidMove(newPiece, clearedBoard)) {
        setGameOver(true);
        setIsPlaying(false);
        return;
      }
      
      setCurrentPiece(newPiece);
      setNextPiece(createPiece());
    }
  }, [currentPiece, board, gameOver, isPlaying, score, lines, level, nextPiece, bestScore, createPiece]);

  const rotatePieceHandler = useCallback(() => {
    if (!currentPiece || gameOver || !isPlaying) return;
    
    const rotated = rotatePiece(currentPiece);
    if (isValidMove(rotated, board)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, board, gameOver, isPlaying]);

  const handleKeyPress = useCallback((e) => {
    if (!isPlaying || gameOver) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        movePiece(-1, 0);
        break;
      case 'ArrowRight':
        e.preventDefault();
        movePiece(1, 0);
        break;
      case 'ArrowDown':
        e.preventDefault();
        movePiece(0, 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        rotatePieceHandler();
        break;
      case ' ':
        e.preventDefault();
        if (currentPiece) {
          let dropDistance = 0;
          while (isValidMove(currentPiece, board, 0, dropDistance + 1)) {
            dropDistance++;
          }
          movePiece(0, dropDistance);
        }
        break;
    }
  }, [isPlaying, gameOver, currentPiece, board, movePiece, rotatePieceHandler]);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    if (currentPiece) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell && currentPiece.y + y >= 0 && currentPiece.y + y < BOARD_HEIGHT) {
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
              backgroundColor: cell ? COLORS[cell] : '#cdc1b4',
              border: cell ? 'none' : '1px solid #bbada0',
              borderRadius: cell ? '3px' : '0',
              margin: cell ? '1px' : '0',
              boxShadow: cell ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none'
            }}
          />
        ))}
      </div>
    ));
  };

  const renderNextPiece = () => {
    if (!nextPiece) return null;
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
        {nextPiece.shape.map((row, y) => (
          <div key={y} style={{ display: 'flex', gap: '2px' }}>
            {row.map((cell, x) => (
              <div
                key={x}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: cell ? COLORS[nextPiece.type] : 'transparent',
                  borderRadius: cell ? '3px' : '0',
                  boxShadow: cell ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none'
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

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
  }, [isPlaying, gameOver, dropTime, movePiece]);

  useEffect(() => {
    setDropTime(Math.max(50, 1000 - (level - 1) * 50));
  }, [level]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const saved = localStorage.getItem('tetris-best-score');
    if (saved) {
      setBestScore(parseInt(saved));
    }
  }, []);

  useEffect(() => {
    if (bestScore > 0) {
      localStorage.setItem('tetris-best-score', bestScore.toString());
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

        .tetris-game {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 580px;
          margin-bottom: 1rem;
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
          font-size: 1.75rem;
          font-weight: 900;
          text-align: center;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          margin: 0;
          color: #fbbf24;
        }

        .game-content {
          display: flex;
          gap: 1rem;
          max-width: 580px;
          width: 100%;
          align-items: flex-start;
        }
        
        .left-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

d: #bbada0;
          padding: 3px;
          border-radius: 6px;
        }

        .game-sidebar {
          display: contents;
        }

        .info-panel {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.75rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .next-panel {
          grid-column: 2;
          grid-row: 1;
        }
        
        .controls-panel {
          grid-column: 2;
          grid-row: 2;
        }

        .panel-title {
          margin: 0 0 0.5rem 0;
          font-size: 0.8rem;
          text-align: center;
          color: #fbbf24;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .score-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.4rem;
        }

        .score-item {
          text-align: center;
        }

        .score-label {
          font-size: 0.7rem;
          opacity: 0.8;
          margin-bottom: 0.2rem;
        }

        .score-value {
          font-size: 1.1rem;
          font-weight: bold;
          color: #fbbf24;
        }

        .next-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 70px;
          background: rgba(187, 173, 160, 0.3);
          border-radius: 6px;
          padding: 0.5rem;
        }

        .controls-text {
          font-size: 0.75rem;
          line-height: 1.5;
          opacity: 0.9;
          margin: 0;
        }

        .game-over-overlay {
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

        .game-over-content {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          max-width: 350px;
        }

        .game-over-title {
          font-size: 2.5rem;
          margin: 0 0 1rem 0;
          color: #ef4444;
        }

        .final-stats {
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .final-stats p {
          margin: 0.5rem 0;
        }

        .play-again-btn {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border: none;
          color: white;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .play-again-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(245, 158, 11, 0.4);
        }

        @media (max-width: 640px) {
          .tetris-game {
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
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
          }
          
          .left-section {
            grid-row: 1 / 2;
            grid-column: 1;
          }
          
          .next-panel {
            grid-column: 1;
            grid-row: 2;
          }
          
          .controls-panel {
            grid-column: 1;
            grid-row: 3;
          }
        }
      `}</style>

      <div className="tetris-game">
        <div className="game-header">
          <Link to="/" className="home-btn">🏠 Back</Link>
          <h1 className="game-title">🧱 Tetris</h1>
          <button onClick={initializeGame} className="control-btn">🔄 New Game</button>
        </div>

        <div className="game-content">
          <div className="left-section">
            <div className="game-board">
              <div className="board-inner">
                {renderBoard()}
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
                <div className="score-item">
                  <div className="score-label">Lines</div>
                  <div className="score-value">{lines}</div>
                </div>
                <div className="score-item">
                  <div className="score-label">Level</div>
                  <div className="score-value">{level}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="game-sidebar">

            <div className="info-panel">
              <h3 className="panel-title">Next</h3>
              <div className="next-container">
                {renderNextPiece()}
              </div>
            </div>

            <div className="info-panel">
              <h3 className="panel-title">Controls</h3>
              <p className="controls-text">
                ← → Move<br/>
                ↓ Soft Drop<br/>
                ↑ Rotate<br/>
                SPACE Hard Drop
              </p>
            </div>
          </div>
        </div>

        {gameOver && (
          <div className="game-over-overlay">
            <div className="game-over-content">
              <h2 className="game-over-title">Game Over!</h2>
              <div className="final-stats">
                <p><strong>Score:</strong> {score.toLocaleString()}</p>
                <p><strong>Lines:</strong> {lines}</p>
                <p><strong>Level:</strong> {level}</p>
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