import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SudokuGame = () => {
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [initialGrid, setInitialGrid] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [errors, setErrors] = useState(new Set());
  const [gameWon, setGameWon] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [hints, setHints] = useState(3);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const difficulties = {
    easy: 40,    // 40 pre-filled cells
    medium: 30,  // 30 pre-filled cells
    hard: 25     // 25 pre-filled cells
  };

  // Generate a complete valid Sudoku grid
  const generateCompleteGrid = () => {
    const grid = Array(9).fill().map(() => Array(9).fill(0));
    
    const isValid = (grid, row, col, num) => {
      // Check row
      for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) return false;
      }
      
      // Check column
      for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) return false;
      }
      
      // Check 3x3 box
      const startRow = row - row % 3;
      const startCol = col - col % 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[i + startRow][j + startCol] === num) return false;
        }
      }
      return true;
    };

    const fillGrid = (grid) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === 0) {
            const numbers = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
            for (let num of numbers) {
              if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                if (fillGrid(grid)) return true;
                grid[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    fillGrid(grid);
    return grid;
  };

  // Create puzzle by removing numbers from complete grid
  const createPuzzle = (completeGrid, cellsToFill) => {
    const puzzle = completeGrid.map(row => [...row]);
    const cellsToRemove = 81 - cellsToFill;
    
    for (let i = 0; i < cellsToRemove; i++) {
      let row, col;
      do {
        row = Math.floor(Math.random() * 9);
        col = Math.floor(Math.random() * 9);
      } while (puzzle[row][col] === 0);
      
      puzzle[row][col] = 0;
    }
    
    return puzzle;
  };

  // Initialize new game
  const initializeGame = () => {
    const completeGrid = generateCompleteGrid();
    const puzzle = createPuzzle(completeGrid, difficulties[difficulty]);
    
    setGrid(puzzle.map(row => [...row]));
    setInitialGrid(puzzle.map(row => [...row]));
    setSelectedCell({ row: null, col: null });
    setErrors(new Set());
    setGameWon(false);
    setHints(3);
    setTime(0);
    setIsPlaying(true);
  };

  // Check if number placement is valid
  const isValidMove = (grid, row, col, num) => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (x !== col && grid[row][x] === num) return false;
    }
    
    // Check column
    for (let x = 0; x < 9; x++) {
      if (x !== row && grid[x][col] === num) return false;
    }
    
    // Check 3x3 box
    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if ((i + startRow !== row || j + startCol !== col) && 
            grid[i + startRow][j + startCol] === num) return false;
      }
    }
    return true;
  };

  // Handle number input
  const handleNumberInput = (num) => {
    if (selectedCell.row === null || !isPlaying || gameWon) return;
    if (initialGrid[selectedCell.row][selectedCell.col] !== 0) return; // Can't change initial numbers

    const newGrid = grid.map(row => [...row]);
    newGrid[selectedCell.row][selectedCell.col] = num;
    
    // Update errors
    const newErrors = new Set();
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (newGrid[row][col] !== 0 && !isValidMove(newGrid, row, col, newGrid[row][col])) {
          newErrors.add(`${row}-${col}`);
        }
      }
    }
    
    setGrid(newGrid);
    setErrors(newErrors);
    
    // Check if game is won
    if (newErrors.size === 0 && newGrid.every(row => row.every(cell => cell !== 0))) {
      setGameWon(true);
      setIsPlaying(false);
    }
  };

  // Use hint
  const useHint = () => {
    if (hints <= 0 || selectedCell.row === null || !isPlaying) return;
    if (grid[selectedCell.row][selectedCell.col] !== 0) return;

    // Find correct number for selected cell
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(grid, selectedCell.row, selectedCell.col, num)) {
        handleNumberInput(num);
        setHints(prev => prev - 1);
        break;
      }
    }
  };

  // Clear cell
  const clearCell = () => {
    if (selectedCell.row === null || !isPlaying) return;
    if (initialGrid[selectedCell.row][selectedCell.col] !== 0) return;
    
    handleNumberInput(0);
  };

  // Handle keyboard input
  const handleKeyDown = (e) => {
    if (!isPlaying || selectedCell.row === null) return;

    const num = parseInt(e.key);
    if (num >= 1 && num <= 9) {
      handleNumberInput(num);
    } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
      clearCell();
    } else if (e.key === 'h' || e.key === 'H') {
      useHint();
    }

    // Arrow key navigation
    const { row, col } = selectedCell;
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setSelectedCell({ row: Math.max(0, row - 1), col });
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedCell({ row: Math.min(8, row + 1), col });
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setSelectedCell({ row, col: Math.max(0, col - 1) });
        break;
      case 'ArrowRight':
        e.preventDefault();
        setSelectedCell({ row, col: Math.min(8, col + 1) });
        break;
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, isPlaying]);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  return (
    <>
      <style>{`
        .sudoku-game {
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
          background: linear-gradient(45deg, #059669, #10b981);
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
          align-items: center;
        }

        .difficulty-selector {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .difficulty-btn {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .difficulty-btn.active {
          background: rgba(5, 150, 105, 0.3);
          border-color: rgba(5, 150, 105, 0.5);
        }

        .difficulty-btn:hover {
          background: rgba(255, 255, 255, 0.2);
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
          color: #10b981;
        }

        .game-container {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
          flex-wrap: wrap;
          justify-content: center;
        }

        .sudoku-grid {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 2px;
          background: rgba(255, 255, 255, 0.3);
          padding: 8px;
          border-radius: 15px;
          border: 3px solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(10px);
          position: relative;
        }

        .sudoku-grid::before {
          content: '';
          position: absolute;
          top: calc(33.33% - 1px);
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(255, 255, 255, 0.6);
        }

        .sudoku-grid::after {
          content: '';
          position: absolute;
          top: calc(66.66% - 1px);
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(255, 255, 255, 0.6);
        }

        .sudoku-grid .vertical-line-1 {
          position: absolute;
          left: calc(33.33% - 1px);
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(255, 255, 255, 0.6);
        }

        .sudoku-grid .vertical-line-2 {
          position: absolute;
          left: calc(66.66% - 1px);
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(255, 255, 255, 0.6);
        }

        .sudoku-cell {
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .sudoku-cell:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.05);
        }

        .sudoku-cell.selected {
          background: rgba(16, 185, 129, 0.3);
          border-color: #10b981;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
        }

        .sudoku-cell.initial {
          background: rgba(99, 102, 241, 0.2);
          color: #1e1b4b;
          font-weight: 900;
        }

        .sudoku-cell.error {
          background: rgba(239, 68, 68, 0.3);
          border-color: #ef4444;
          color: #7f1d1d;
        }

        .sudoku-cell.empty {
          color: transparent;
        }

        .number-pad {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .number-btn {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .number-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.75rem 1rem;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .action-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .hint-btn {
          background: rgba(245, 158, 11, 0.2);
          border-color: rgba(245, 158, 11, 0.3);
        }

        .clear-btn {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .instructions {
          background: rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 15px;
          text-align: center;
          max-width: 400px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          margin-top: 2rem;
        }

        .instructions h3 {
          margin: 0 0 1rem 0;
          color: #10b981;
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
          color: #10b981;
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
        }

        .overlay-message {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
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
          .sudoku-game {
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

          .sudoku-cell {
            width: 35px;
            height: 35px;
            font-size: 1rem;
          }

          .number-pad {
            align-self: center;
          }

          .game-stats {
            gap: 1rem;
          }
        }
      `}</style>

      <div className="sudoku-game">
        <div className="game-header">
          <Link to="/" className="home-btn">🏠 Back to Games</Link>
          <h1 className="game-title">🔢 Sudoku</h1>
          <button onClick={initializeGame} className="control-btn">🔄 New Game</button>
        </div>

        <div className="game-controls">
          <div className="difficulty-selector">
            <span>Difficulty:</span>
            {Object.keys(difficulties).map(level => (
              <button
                key={level}
                className={`difficulty-btn ${difficulty === level ? 'active' : ''}`}
                onClick={() => setDifficulty(level)}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="game-stats">
          <div className="stat-box">
            <div className="stat-label">Time</div>
            <div className="stat-value">{formatTime(time)}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Hints</div>
            <div className="stat-value">{hints}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Errors</div>
            <div className="stat-value" style={{ color: errors.size > 0 ? '#ef4444' : '#10b981' }}>
              {errors.size}
            </div>
          </div>
        </div>

        <div className="game-container">
          <div className="sudoku-grid">
            <div className="vertical-line-1"></div>
            <div className="vertical-line-2"></div>
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell ${
                    selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'selected' : ''
                  } ${
                    initialGrid[rowIndex][colIndex] !== 0 ? 'initial' : ''
                  } ${
                    errors.has(`${rowIndex}-${colIndex}`) ? 'error' : ''
                  } ${
                    cell === 0 ? 'empty' : ''
                  }`}
                  onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                >
                  {cell !== 0 ? cell : ''}
                </div>
              ))
            )}
          </div>

          <div className="number-pad">
            {[1,2,3,4,5,6,7,8,9].map(num => (
              <button
                key={num}
                className="number-btn"
                onClick={() => handleNumberInput(num)}
              >
                {num}
              </button>
            ))}
            <div className="action-buttons">
              <button
                className="action-btn hint-btn"
                onClick={useHint}
                disabled={hints <= 0 || selectedCell.row === null}
              >
                💡 Hint ({hints})
              </button>
              <button
                className="action-btn clear-btn"
                onClick={clearCell}
                disabled={selectedCell.row === null}
              >
                🗑️ Clear
              </button>
            </div>
          </div>
        </div>

        <div className="instructions">
          <h3>🎮 How to Play</h3>
          <p>Fill the 9×9 grid so each row, column, and 3×3 box contains digits 1-9</p>
          <p>Click a cell to select, then click a number or use keyboard (1-9)</p>
          <p>Use arrow keys to navigate • Press H for hint • Backspace to clear</p>
        </div>

        {gameWon && (
          <div className="game-overlay">
            <div className="overlay-content">
              <h2 className="overlay-title">🎉 Congratulations!</h2>
              <p className="overlay-message">
                You solved the Sudoku puzzle!<br/>
                Time: {formatTime(time)}<br/>
                Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
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

export default SudokuGame;