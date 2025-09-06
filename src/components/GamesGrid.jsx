import { Link } from 'react-router-dom';
import { FaPlay, FaStar, FaGamepad, FaTrophy, FaFire } from 'react-icons/fa';
import { useState, useMemo } from 'react';
import '../styles/GameGrid.css';

function GameGrid({ selectedCategory = 'all' }) {
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;

  // Built-in Games Only
  const allGames = [
    {
      id: 'snake',
      title: 'Snake Game',
      image: 'https://via.placeholder.com/400x300/10B981/ffffff?text=🐍+Snake+Game',
      category: 'arcade',
      rating: '4.8',
      plays: '125K',
      link: '/game/snake',
      type: 'built-in',
      description: 'Enhanced snake game with power-ups, difficulty levels, and high scores',
      genre: 'Arcade',
      developer: 'Built-in',
      release_date: '2024',
      badges: ['Most Popular', 'Enhanced']
    },
    {
      id: 'tictactoe',
      title: 'Tic Tac Toe',
      image: 'https://via.placeholder.com/400x300/8B5CF6/ffffff?text=⚡+Tic+Tac+Toe',
      category: 'puzzle',
      rating: '4.7',
      plays: '89K',
      link: '/game/tictactoe',
      type: 'built-in',
      description: 'Strategic battle of X\'s and O\'s with AI opponent',
      genre: 'Strategy',
      developer: 'Built-in',
      release_date: '2024',
      badges: ['Strategy', 'AI Powered']
    },
    {
      id: 'tetris',
      title: 'Tetris',
      image: 'https://via.placeholder.com/400x300/3B82F6/ffffff?text=◼+Tetris',
      category: 'puzzle',
      rating: '4.9',
      plays: '350K',
      link: '/game/tetris',
      type: 'built-in',
      description: 'The ultimate block puzzle challenge with modern graphics',
      genre: 'Puzzle',
      developer: 'Built-in',
      release_date: '2024',
      badges: ['Editor\'s Choice', 'Trending']
    },
    {
      id: '2048',
      title: '2048',
      image: 'https://via.placeholder.com/400x300/EC4899/ffffff?text=2048',
      category: 'puzzle',
      rating: '4.7',
      plays: '200K',
      link: '/game/2048',
      type: 'built-in',
      description: 'Addictive number combining puzzle game',
      genre: 'Puzzle',
      developer: 'Built-in',
      release_date: '2024',
      badges: ['Brain Training', 'Addictive']
    },
    {
      id: 'flappybird',
      title: 'Flappy Bird',
      image: 'https://via.placeholder.com/400x300/F59E0B/ffffff?text=🐦+Flappy+Bird',
      category: 'arcade',
      rating: '4.5',
      plays: '178K',
      link: '/game/flappybird',
      type: 'built-in',
      description: 'Navigate through pipes in this challenging arcade game',
      genre: 'Arcade',
      developer: 'Built-in',
      release_date: '2024',
      badges: ['Challenging', 'Retro']
    },
    {
      id: 'pacman',
      title: 'Pac-Man',
      image: 'https://via.placeholder.com/400x300/FBBF24/ffffff?text=👻+Pac-Man',
      category: 'arcade',
      rating: '4.6',
      plays: '267K',
      link: '/game/pacman',
      type: 'built-in',
      description: 'Classic arcade game - eat dots and avoid ghosts',
      genre: 'Arcade',
      developer: 'Built-in',
      release_date: '2024',
      badges: ['Classic', 'Iconic']
    },
    {
      id: 'chess',
      title: 'Chess',
      image: 'https://via.placeholder.com/400x300/374151/ffffff?text=♔+Chess',
      category: 'strategy',
      rating: '4.9',
      plays: '145K',
      link: '/game/chess',
      type: 'built-in',
      description: 'The ultimate strategy game with AI opponent',
      genre: 'Strategy',
      developer: 'Built-in',
      release_date: '2024',
      badges: ['Intellectual', 'Timeless']
    },
    {
      id: 'pong',
      title: 'Pong',
      image: 'https://via.placeholder.com/400x300/6B7280/ffffff?text=🏓+Pong',
      category: 'arcade',
      rating: '4.3',
      plays: '67K',
      link: '/game/pong',
      type: 'built-in',
      description: 'Retro table tennis game - the classic that started it all',
      genre: 'Arcade',
      developer: 'Built-in',
      release_date: '2024',
      badges: ['Retro', 'Original']
    },
    {
      id: 'breakout',
      title: 'Breakout',
      image: 'https://via.placeholder.com/400x300/EF4444/ffffff?text=🧱+Breakout',
      category: 'arcade',
      rating: '4.4',
      plays: '98K',
      link: '/game/breakout',
      type: 'built-in',
      description: 'Break all the bricks with your ball and paddle',
      genre: 'Arcade',
      developer: 'Built-in',
      release_date: '2024',
      badges: ['Classic', 'Addictive']
    },
    {
      id: 'sudoku',
      title: 'Sudoku',
      image: 'https://via.placeholder.com/400x300/059669/ffffff?text=🔢+Sudoku',
      category: 'puzzle',
      rating: '4.6',
      plays: '134K',
      link: '/game/sudoku',
      type: 'built-in',
      description: 'Number placement puzzle to challenge your mind',
      genre: 'Puzzle',
      developer: 'Built-in',
      release_date: '2024',
      badges: ['Brain Training', 'Logic']
    },
    {
      id: 'checkers',
      title: 'Checkers',
      image: 'https://via.placeholder.com/400x300/DC2626/ffffff?text=⚫+Checkers',
      category: 'strategy',
      rating: '4.5',
      plays: '87K',
      link: '/game/checkers',
      type: 'built-in',
      description: 'Classic board game of strategy and tactics',
      genre: 'Strategy',
      developer: 'Built-in',
      release_date: '2024',
      badges: ['Classic', 'Strategy']
    },
    {
      id: 'memory',
      title: 'Memory Game',
      image: 'https://via.placeholder.com/400x300/7C3AED/ffffff?text=🧠+Memory',
      category: 'puzzle',
      rating: '4.4',
      plays: '76K',
      link: '/game/memory',
      type: 'built-in',
      description: 'Test your memory by matching pairs of cards',
      genre: 'Puzzle',
      developer: 'Built-in',
      release_date: '2024',
      badges: ['Memory', 'Family']
    }
  ];

  // Filter and sort games
  const filteredGames = useMemo(() => {
    let filteredData = selectedCategory === 'all' 
      ? allGames 
      : allGames.filter(game => game.category === selectedCategory);

    // Sort games
    switch (sortBy) {
      case 'popular':
        filteredData = filteredData.sort((a, b) => {
          const aPlays = parseInt(a.plays.replace(/[KM]/g, ''));
          const bPlays = parseInt(b.plays.replace(/[KM]/g, ''));
          return bPlays - aPlays;
        });
        break;
      case 'rating':
        filteredData = filteredData.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'newest':
        filteredData = filteredData.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        break;
      case 'name':
        filteredData = filteredData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filteredData;
  }, [selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const currentGames = filteredGames.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  return (
    <section className="game-grid-container">
      <div className="game-grid-header">
        <div className="games-count">
          <FaTrophy className="featured-icon" />
          All Games
        </div>
        <div className="sort-controls">
          <span className="sort-label">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
            <option value="name">A-Z</option>
          </select>
        </div>
      </div>

      {/* Games Grid */}
      <div className="games-grid">
        {currentGames.map((game, index) => (
          <div 
            key={game.id} 
            className="game-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="game-image-container">
              <img 
                src={game.image} 
                alt={game.title}
                className="game-image"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(game.title)}`;
                }}
              />
              
              {/* Featured Overlay */}
              <div className="play-overlay">
                <Link to={game.link} className="play-button">
                  <FaPlay />
                </Link>
              </div>

              {/* Game Badges */}
              <div className="game-badges">
                {game.badges.map((badge, idx) => (
                  <span key={idx} className="game-badge">
                    {badge === 'Most Popular' && <FaFire />}
                    {badge === 'Editor\'s Choice' && <FaTrophy />}
                    {badge === 'Trending' && <FaFire />}
                    {badge === 'Strategy' && <FaTrophy />}
                    {badge === 'AI Powered' && <FaFire />}
                    {badge === 'Enhanced' && <FaFire />}
                    {badge}
                  </span>
                ))}
              </div>

              {/* Rating Badge */}
              <div className="rating-badge">
                <FaStar className="star-icon" />
                <span>{game.rating}</span>
              </div>
            </div>
            
            <div className="game-info">
              <h3 className="game-titles">{game.title}</h3>
              <p className="game-description">{game.description}</p>
              
              <div className="game-meta">
                <div className="game-stats">
                  <span className="play-count">
                    <FaGamepad className="gamepad-icon" />
                    {game.plays} plays
                  </span>
                  <span className="category-tag">{game.category}</span>
                </div>
                
                <Link to={game.link} className="play-link">
                  Play
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 2 && page <= currentPage + 2)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              );
            } else if (
              page === currentPage - 3 ||
              page === currentPage + 3
            ) {
              return <span key={page} className="pagination-dots">...</span>;
            }
            return null;
          })}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export default GameGrid;