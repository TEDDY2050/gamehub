import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CARD_EMOJIS = ['🎮', '🎯', '🎲', '🎪', '🎭', '🎨', '🎵', '🎸'];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const shuffleCards = () => {
    const duplicatedCards = [...CARD_EMOJIS, ...CARD_EMOJIS];
    const shuffled = duplicatedCards
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false }));
    return shuffled;
  };

  const initializeGame = () => {
    setCards(shuffleCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
    setTime(0);
    setIsPlaying(true);
  };

  const handleCardClick = (clickedCard) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.some(card => card.id === clickedCard.id) ||
      matchedCards.some(card => card.id === clickedCard.id) ||
      gameWon
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      if (newFlippedCards[0].emoji === newFlippedCards[1].emoji) {
        setMatchedCards([...matchedCards, ...newFlippedCards]);
        setFlippedCards([]);
        
        if (matchedCards.length + 2 === cards.length) {
          setGameWon(true);
          setIsPlaying(false);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const isCardFlipped = (card) => {
    return flippedCards.some(flipped => flipped.id === card.id) ||
           matchedCards.some(matched => matched.id === card.id);
  };

  const isCardMatched = (card) => {
    return matchedCards.some(matched => matched.id === card.id);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <style>{`
        .memory-game {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 2rem;
        }

        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
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

        .game-stats {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
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
          display: block;
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .memory-card {
          aspect-ratio: 1;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          backdrop-filter: blur(10px);
        }

        .memory-card:hover {
          transform: scale(1.05);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .memory-card.flipped {
          background: rgba(255, 255, 255, 0.2);
          transform: rotateY(0deg);
        }

        .memory-card.matched {
          background: rgba(34, 197, 94, 0.3);
          border-color: rgb(34, 197, 94);
          animation: bounce 0.6s ease;
        }

        .memory-card.back {
          background: rgba(99, 102, 241, 0.3);
          border-color: rgb(99, 102, 241);
        }

        .memory-card.back::before {
          content: '?';
          font-size: 3rem;
          font-weight: bold;
          color: white;
        }

        .game-won {
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

        .win-content {
          background: rgba(255, 255, 255, 0.1);
          padding: 3rem;
          border-radius: 20px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
        }

        .win-title {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #fbbf24;
          text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
        }

        .win-stats {
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

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @media (max-width: 768px) {
          .memory-game {
            padding: 1rem;
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

          .cards-grid {
            max-width: 400px;
            gap: 0.5rem;
          }

          .memory-card {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="memory-game">
        <div className="game-header">
          <Link to="/" className="home-btn">🏠 Back to Games</Link>
          <h1 className="game-title">🧠 Memory Game</h1>
          <button onClick={initializeGame} className="control-btn">🔄 New Game</button>
        </div>

        <div className="game-stats">
          <div className="stat-box">
            <span className="stat-label">Time</span>
            <span className="stat-value">{formatTime(time)}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Moves</span>
            <span className="stat-value">{moves}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Pairs Found</span>
            <span className="stat-value">{matchedCards.length / 2}/{CARD_EMOJIS.length}</span>
          </div>
        </div>

        <div className="cards-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`memory-card ${
                isCardFlipped(card) ? 'flipped' : 'back'
              } ${isCardMatched(card) ? 'matched' : ''}`}
              onClick={() => handleCardClick(card)}
            >
              {isCardFlipped(card) && card.emoji}
            </div>
          ))}
        </div>

        {gameWon && (
          <div className="game-won">
            <div className="win-content">
              <h2 className="win-title">🎉 You Won!</h2>
              <div className="win-stats">
                <p>Time: {formatTime(time)}</p>
                <p>Moves: {moves}</p>
                <p>Perfect Game: {moves === CARD_EMOJIS.length ? 'Yes! 🏆' : 'Try for fewer moves!'}</p>
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
}

export default MemoryGame;