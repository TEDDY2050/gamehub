import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('human');
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [gameOver, setGameOver] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const calculateAIMove = (squares) => {
    const availableSpots = squares.map((square, index) => square === null ? index : null).filter(val => val !== null);
    
    for (let spot of availableSpots) {
      const tempSquares = [...squares];
      tempSquares[spot] = 'O';
      if (calculateWinner(tempSquares)?.winner === 'O') {
        return spot;
      }
    }
    
    for (let spot of availableSpots) {
      const tempSquares = [...squares];
      tempSquares[spot] = 'X';
      if (calculateWinner(tempSquares)?.winner === 'X') {
        return spot;
      }
    }
    
    if (availableSpots.includes(4)) {
      return 4;
    }
    
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(corner => availableSpots.includes(corner));
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    return availableSpots[Math.floor(Math.random() * availableSpots.length)];
  };

  const handleClick = (index) => {
    if (board[index] || winner || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result);
      setGameOver(true);
      setScores(prev => ({
        ...prev,
        [result.winner]: prev[result.winner] + 1
      }));
    } else if (newBoard.every(square => square !== null)) {
      setGameOver(true);
      setScores(prev => ({
        ...prev,
        draws: prev.draws + 1
      }));
    } else {
      setIsXNext(!isXNext);
    }
  };

  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !winner && !gameOver) {
      const timer = setTimeout(() => {
        const aiMove = calculateAIMove(board);
        if (aiMove !== undefined) {
          handleClick(aiMove);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, gameMode, winner, gameOver]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameOver(false);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
  };

  const renderSquare = (index) => {
    const isWinningSquare = winner?.line?.includes(index);
    return (
      <button
        key={index}
        className={`square ${isWinningSquare ? 'winning' : ''} ${board[index] ? 'filled' : ''}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="tic-tac-toe-game">
      <div className="game-header">
        <Link to="/" className="home-btn">
          🏠 Back to Games
        </Link>
        <h1 className="game-title">Tic Tac Toe</h1>
        <button onClick={resetGame} className="control-btn">
          🔄 New Game
        </button>
      </div>

      <div className="game-container">
        <div className="game-sidebar">
          <div className="mode-selection">
            <h3>🎮 Game Mode</h3>
            <div className="mode-buttons">
              <button
                className={`mode-btn ${gameMode === 'human' ? 'active' : ''}`}
                onClick={() => {
                  setGameMode('human');
                  resetGame();
                }}
              >
                👥 vs Human
              </button>
              <button
                className={`mode-btn ${gameMode === 'ai' ? 'active' : ''}`}
                onClick={() => {
                  setGameMode('ai');
                  resetGame();
                }}
              >
                🤖 vs AI
              </button>
            </div>
          </div>

          <div className="scoreboard">
            <h3>🏆 Scoreboard</h3>
            <div className="score-item">
              <span className="score-label">Player X:</span>
              <span className="score-value">{scores.X}</span>
            </div>
            <div className="score-item">
              <span className="score-label">{gameMode === 'ai' ? 'AI (O):' : 'Player O:'}</span>
              <span className="score-value">{scores.O}</span>
            </div>
            <div className="score-item">
              <span className="score-label">Draws:</span>
              <span className="score-value">{scores.draws}</span>
            </div>
            <button onClick={resetScores} className="reset-scores-btn">
              Reset Scores
            </button>
          </div>

          <div className="game-status">
            {winner ? (
              <div className="status-winner">
                🎉 {winner.winner} Wins!
              </div>
            ) : gameOver ? (
              <div className="status-draw">
                🤝 It's a Draw!
              </div>
            ) : (
              <div className="status-turn">
                {gameMode === 'ai' && !isXNext ? 
                  '🤖 AI is thinking...' : 
                  `${isXNext ? 'X' : 'O'}'s Turn`
                }
              </div>
            )}
          </div>
        </div>

        <div className="game-board-container">
          <div className="game-board">
            {board.map((_, index) => renderSquare(index))}
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default TicTacToe;