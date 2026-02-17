import React, { useState, useEffect } from 'react';

const ChessGame = () => {
  const [board, setBoard] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [validMoves, setValidMoves] = useState([]);
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });
  const [gameStatus, setGameStatus] = useState('playing');
  const [checkStatus, setCheckStatus] = useState(null);

  const pieceSymbols = {
    white: { king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙' },
    black: { king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟' }
  };

  // Initialize board
  const initializeBoard = () => {
    const newBoard = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Black pieces
    newBoard[0] = [
      { type: 'rook', color: 'black' }, { type: 'knight', color: 'black' },
      { type: 'bishop', color: 'black' }, { type: 'queen', color: 'black' },
      { type: 'king', color: 'black' }, { type: 'bishop', color: 'black' },
      { type: 'knight', color: 'black' }, { type: 'rook', color: 'black' }
    ];
    newBoard[1] = Array(8).fill({ type: 'pawn', color: 'black' });
    
    // White pieces
    newBoard[6] = Array(8).fill({ type: 'pawn', color: 'white' });
    newBoard[7] = [
      { type: 'rook', color: 'white' }, { type: 'knight', color: 'white' },
      { type: 'bishop', color: 'white' }, { type: 'queen', color: 'white' },
      { type: 'king', color: 'white' }, { type: 'bishop', color: 'white' },
      { type: 'knight', color: 'white' }, { type: 'rook', color: 'white' }
    ];
    
    setBoard(newBoard);
    setCurrentPlayer('white');
    setSelectedSquare(null);
    setValidMoves([]);
    setCapturedPieces({ white: [], black: [] });
    setGameStatus('playing');
    setCheckStatus(null);
  };

  // Get valid moves for a piece
  const getValidMoves = (row, col, piece, boardState = board) => {
    const moves = [];
    
    if (!piece) return moves;

    const isValidSquare = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;
    const isEmptyOrEnemy = (r, c) => {
      if (!isValidSquare(r, c)) return false;
      const target = boardState[r][c];
      return !target || target.color !== piece.color;
    };

    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        // Forward move
        if (isValidSquare(row + direction, col) && !boardState[row + direction][col]) {
          moves.push([row + direction, col]);
          // Double move from start
          if (row === startRow && !boardState[row + 2 * direction][col]) {
            moves.push([row + 2 * direction, col]);
          }
        }
        
        // Captures
        [-1, 1].forEach(dc => {
          const newRow = row + direction;
          const newCol = col + dc;
          if (isValidSquare(newRow, newCol)) {
            const target = boardState[newRow][newCol];
            if (target && target.color !== piece.color) {
              moves.push([newRow, newCol]);
            }
          }
        });
        break;

      case 'knight':
        const knightMoves = [
          [-2, -1], [-2, 1], [-1, -2], [-1, 2],
          [1, -2], [1, 2], [2, -1], [2, 1]
        ];
        knightMoves.forEach(([dr, dc]) => {
          const newRow = row + dr;
          const newCol = col + dc;
          if (isEmptyOrEnemy(newRow, newCol)) {
            moves.push([newRow, newCol]);
          }
        });
        break;

      case 'bishop':
        const bishopDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        bishopDirs.forEach(([dr, dc]) => {
          let r = row + dr;
          let c = col + dc;
          while (isValidSquare(r, c)) {
            if (!boardState[r][c]) {
              moves.push([r, c]);
            } else {
              if (boardState[r][c].color !== piece.color) {
                moves.push([r, c]);
              }
              break;
            }
            r += dr;
            c += dc;
          }
        });
        break;

      case 'rook':
        const rookDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        rookDirs.forEach(([dr, dc]) => {
          let r = row + dr;
          let c = col + dc;
          while (isValidSquare(r, c)) {
            if (!boardState[r][c]) {
              moves.push([r, c]);
            } else {
              if (boardState[r][c].color !== piece.color) {
                moves.push([r, c]);
              }
              break;
            }
            r += dr;
            c += dc;
          }
        });
        break;

      case 'queen':
        const queenDirs = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1], [0, 1],
          [1, -1], [1, 0], [1, 1]
        ];
        queenDirs.forEach(([dr, dc]) => {
          let r = row + dr;
          let c = col + dc;
          while (isValidSquare(r, c)) {
            if (!boardState[r][c]) {
              moves.push([r, c]);
            } else {
              if (boardState[r][c].color !== piece.color) {
                moves.push([r, c]);
              }
              break;
            }
            r += dr;
            c += dc;
          }
        });
        break;

      case 'king':
        const kingMoves = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1], [0, 1],
          [1, -1], [1, 0], [1, 1]
        ];
        kingMoves.forEach(([dr, dc]) => {
          const newRow = row + dr;
          const newCol = col + dc;
          if (isEmptyOrEnemy(newRow, newCol)) {
            moves.push([newRow, newCol]);
          }
        });
        break;
    }

    return moves;
  };

  // Check if king is in check
  const isKingInCheck = (color, boardState) => {
    // Find king position
    let kingPos = null;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = boardState[r][c];
        if (piece && piece.type === 'king' && piece.color === color) {
          kingPos = [r, c];
          break;
        }
      }
      if (kingPos) break;
    }

    if (!kingPos) return false;

    // Check if any enemy piece can attack the king
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = boardState[r][c];
        if (piece && piece.color !== color) {
          const moves = getValidMoves(r, c, piece, boardState);
          if (moves.some(([mr, mc]) => mr === kingPos[0] && mc === kingPos[1])) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Handle square click
  const handleSquareClick = (row, col) => {
    if (gameStatus !== 'playing') return;

    const clickedPiece = board[row][col];

    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const isValidMove = validMoves.some(([r, c]) => r === row && c === col);

      if (isValidMove) {
        // Make the move
        const newBoard = board.map(r => [...r]);
        const movingPiece = newBoard[selectedRow][selectedCol];
        const capturedPiece = newBoard[row][col];

        newBoard[row][col] = movingPiece;
        newBoard[selectedRow][selectedCol] = null;

        // Check if this move would put own king in check
        if (isKingInCheck(currentPlayer, newBoard)) {
          // Invalid move - would put king in check
          setSelectedSquare(null);
          setValidMoves([]);
          return;
        }

        // Capture piece
        if (capturedPiece) {
          setCapturedPieces(prev => ({
            ...prev,
            [capturedPiece.color]: [...prev[capturedPiece.color], capturedPiece.type]
          }));
        }

        setBoard(newBoard);

        // Check if opponent king is in check
        const nextPlayer = currentPlayer === 'white' ? 'black' : 'white';
        if (isKingInCheck(nextPlayer, newBoard)) {
          setCheckStatus(nextPlayer);
          
          // Check for checkmate
          let hasValidMove = false;
          for (let r = 0; r < 8 && !hasValidMove; r++) {
            for (let c = 0; c < 8 && !hasValidMove; c++) {
              const piece = newBoard[r][c];
              if (piece && piece.color === nextPlayer) {
                const moves = getValidMoves(r, c, piece, newBoard);
                for (const [mr, mc] of moves) {
                  const testBoard = newBoard.map(row => [...row]);
                  testBoard[mr][mc] = piece;
                  testBoard[r][c] = null;
                  if (!isKingInCheck(nextPlayer, testBoard)) {
                    hasValidMove = true;
                    break;
                  }
                }
              }
            }
          }
          
          if (!hasValidMove) {
            setGameStatus(`checkmate-${currentPlayer}`);
          }
        } else {
          setCheckStatus(null);
        }

        setCurrentPlayer(nextPlayer);
        setSelectedSquare(null);
        setValidMoves([]);
      } else if (clickedPiece && clickedPiece.color === currentPlayer) {
        // Select different piece
        setSelectedSquare([row, col]);
        setValidMoves(getValidMoves(row, col, clickedPiece));
      } else {
        // Deselect
        setSelectedSquare(null);
        setValidMoves([]);
      }
    } else if (clickedPiece && clickedPiece.color === currentPlayer) {
      // Select piece
      setSelectedSquare([row, col]);
      setValidMoves(getValidMoves(row, col, clickedPiece));
    }
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  const isLightSquare = (row, col) => (row + col) % 2 === 0;
  const isSelected = selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
  const isValidMoveSquare = (row, col) => validMoves.some(([r, c]) => r === row && c === col);

  return (
    <>
      <style>{`
        .chess-game {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 700px;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .game-title {
          font-size: 2.5rem;
          font-weight: 900;
          text-align: center;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          margin: 0;
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .control-btn {
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

        .control-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .game-info {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
        }

        .player-turn {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem 2rem;
          border-radius: 15px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .turn-label {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          font-weight: 600;
        }

        .turn-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #fbbf24;
          text-transform: capitalize;
        }

        .check-indicator {
          background: rgba(239, 68, 68, 0.2);
          padding: 1rem 2rem;
          border-radius: 15px;
          border: 2px solid #ef4444;
          backdrop-filter: blur(10px);
          font-weight: bold;
          color: #fca5a5;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .chess-board-container {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(15px);
          margin-bottom: 2rem;
        }

        .chess-board {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 0;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          overflow: hidden;
        }

        .chess-square {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          user-select: none;
        }

        .chess-square.light {
          background: #eee4da;
        }

        .chess-square.dark {
          background: #bbada0;
        }

        .chess-square.selected {
          background: #fbbf24 !important;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
        }

        .chess-square.valid-move {
          position: relative;
        }

        .chess-square.valid-move::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          background: rgba(16, 185, 129, 0.6);
          border-radius: 50%;
          pointer-events: none;
        }

        .chess-square.valid-move.has-piece::after {
          width: 100%;
          height: 100%;
          border-radius: 0;
          background: rgba(239, 68, 68, 0.4);
          border: 3px solid #ef4444;
        }

        .chess-square:hover {
          filter: brightness(1.1);
        }

        .captured-pieces {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .captured-box {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          min-width: 200px;
        }

        .captured-label {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          font-weight: 600;
        }

        .captured-pieces-list {
          font-size: 2rem;
          min-height: 2rem;
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
          color: #fbbf24;
          text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
        }

        .overlay-message {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          text-transform: capitalize;
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
          .chess-game {
            padding: 1rem;
          }

          .game-title {
            font-size: 2rem;
          }

          .chess-square {
            width: 45px;
            height: 45px;
            font-size: 2rem;
          }

          .chess-board-container {
            padding: 10px;
          }
        }
      `}</style>

      <div className="chess-game">
        <div className="game-header">
          <div></div>
          <h1 className="game-title">♔ Chess ♚</h1>
          <button onClick={initializeBoard} className="control-btn">🔄 New Game</button>
        </div>

        <div className="game-info">
          <div className="player-turn">
            <div className="turn-label">Current Turn</div>
            <div className="turn-value">{currentPlayer}</div>
          </div>
          {checkStatus && gameStatus === 'playing' && (
            <div className="check-indicator">
              ⚠️ {checkStatus.toUpperCase()} IS IN CHECK!
            </div>
          )}
        </div>

        <div className="chess-board-container">
          <div className="chess-board">
            {board.map((row, rowIndex) =>
              row.map((piece, colIndex) => {
                const isLight = isLightSquare(rowIndex, colIndex);
                const selected = selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex;
                const validMove = isValidMoveSquare(rowIndex, colIndex);
                const hasPiece = board[rowIndex][colIndex];

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`chess-square ${isLight ? 'light' : 'dark'} ${selected ? 'selected' : ''} ${validMove ? 'valid-move' : ''} ${validMove && hasPiece ? 'has-piece' : ''}`}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                  >
                    {piece && pieceSymbols[piece.color][piece.type]}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="captured-pieces">
          <div className="captured-box">
            <div className="captured-label">White Captured</div>
            <div className="captured-pieces-list">
              {capturedPieces.white.map((type, i) => (
                <span key={i}>{pieceSymbols.white[type]}</span>
              ))}
            </div>
          </div>
          <div className="captured-box">
            <div className="captured-label">Black Captured</div>
            <div className="captured-pieces-list">
              {capturedPieces.black.map((type, i) => (
                <span key={i}>{pieceSymbols.black[type]}</span>
              ))}
            </div>
          </div>
        </div>

        {gameStatus.startsWith('checkmate') && (
          <div className="game-over-overlay">
            <div className="overlay-content">
              <h2 className="overlay-title">👑 Checkmate!</h2>
              <p className="overlay-message">
                {gameStatus.split('-')[1]} wins!
              </p>
              <button onClick={initializeBoard} className="overlay-btn">
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChessGame;