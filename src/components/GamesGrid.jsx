import { Link, useNavigate } from 'react-router-dom';
import { FaPlay, FaStar, FaGamepad, FaTrophy, FaFire, FaLock } from 'react-icons/fa';
import { useState, useMemo } from 'react';
import '../styles/GameGrid.css';
import snakeImg from '../assets/snake.png';
import tictactoeImg from '../assets/tictactoe.png';
import tetrisImg from '../assets/tetris.png';
import game2048Img from '../assets/2048.png';
import pacmanImg from '../assets/pacman.png';
import chessImg from '../assets/chess.png';
import breakoutImg from '../assets/breakout.png';
import sudokuImg from '../assets/sudoku.png';
import checkersImg from '../assets/checkers.png';
import rpsImg from '../assets/rps.png';

function GameGrid({ selectedCategory = 'all' }) {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const gamesPerPage = 12;

  const isLoggedIn = () => {
    const token = localStorage.getItem('authToken');
    const userInfo = localStorage.getItem('userInfo');
    return token && userInfo;
  };

  const handleGameClick = (gameLink, e) => {
    if (!isLoggedIn()) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  const LoginModal = () => (
    showLoginModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowLoginModal(false)}>
        <div className="bg-white rounded-lg p-8 max-w-md mx-4" onClick={e => e.stopPropagation()}>
          <div className="text-center">
            <FaLock className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h3>
            <p className="text-gray-600 mb-6">Please log in to play games and access all features.</p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/login')}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Sign Up
              </button>
            </div>
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );

  // Built-in Games Only
  const allGames = [
    {
      id: 'snake',
      title: 'Snake Game',
      image: snakeImg,
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
      image: tictactoeImg,
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
      image: tetrisImg,
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
      image: game2048Img,
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
      id: 'pacman',
      title: 'Pac-Man',
      image: pacmanImg,
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
      image: chessImg,
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
    // {
    //   id: 'pong',
    //   title: 'Pong',
    //   image: pongImg,
    //   category: 'arcade',
    //   rating: '4.3',
    //   plays: '67K',
    //   link: '/game/pong',
    //   type: 'built-in',
    //   description: 'Retro table tennis game - the classic that started it all',
    //   genre: 'Arcade',
    //   developer: 'Built-in',
    //   release_date: '2024',
    //   badges: ['Retro', 'Original']
    // },
    {
      id: 'breakout',
      title: 'Breakout',
      image: breakoutImg,
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
      image: sudokuImg,
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
      image: checkersImg,
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
    // {
    //   id: 'memory',
    //   title: 'Memory Game',
    //   image: memoryImg,
    //   category: 'puzzle',
    //   rating: '4.4',
    //   plays: '76K',
    //   link: '/game/memory',
    //   type: 'built-in',
    //   description: 'Test your memory by matching pairs of cards',
    //   genre: 'Puzzle',
    //   developer: 'Built-in',
    //   release_date: '2024',
    //   badges: ['Memory', 'Family']
    // },
    {
      id: 'rps',
      title: 'Rock Paper Scissors',
      image: rpsImg,
      category: 'arcade',
      rating: '4.6',
      plays: '102K',
      link: '/game/rps',
      type: 'built-in',
      description: 'Battle against AI in this classic hand game!',
      genre: 'Arcade',
      developer: 'Built-in',
      release_date: '2024',
      badges: ['Fun', 'Quick Play']
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
    <>
      <section className="game-grid-container">
        <div className="game-grid-header">
          <div className="games-count">
            <FaTrophy className="featured-icon" />
            All Games
            {!isLoggedIn() && (
              <span className="text-amber-600 font-medium text-sm ml-2">
                (Login required to play)
              </span>
            )}
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
              className={`game-card ${!isLoggedIn() ? 'cursor-not-allowed opacity-75' : ''}`}
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
                  {isLoggedIn() ? (
                    <Link to={game.link} className="play-button">
                      <FaPlay />
                    </Link>
                  ) : (
                    <button 
                      onClick={(e) => handleGameClick(game.link, e)}
                      className="play-button opacity-75"
                    >
                      <FaLock />
                    </button>
                  )}
                </div>

                {/* Login Required Badge */}
                {!isLoggedIn() && (
                  <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <FaLock />
                    Login
                  </div>
                )}

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
                  
                  {isLoggedIn() ? (
                    <Link to={game.link} className="play-link">
                      Play
                    </Link>
                  ) : (
                    <button 
                      onClick={(e) => handleGameClick(game.link, e)}
                      className="play-link opacity-75"
                    >
                      <FaLock className="mr-1" />
                      Login
                    </button>
                  )}
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
      
      <LoginModal />
    </>
  );
}

export default GameGrid;