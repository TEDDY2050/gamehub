import { Link } from 'react-router-dom';
import { FaPlay, FaStar, FaGamepad, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { useState, useMemo, useEffect } from 'react';
import '../styles/GameGrid.css';


function GameGrid({ selectedCategory = 'all' }) {
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gamesPerPage = 24;

  // Fetch games from multiple APIs
  useEffect(() => {
    const fetchGamesFromAPIs = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const gamePromises = [
          fetchFreeToGameAPI(),
          fetchTriviaGames(),
          fetchCardGames(),
          fetchBuiltInGames()
        ];

        const gameArrays = await Promise.allSettled(gamePromises);
        const allGames = gameArrays
          .filter(result => result.status === 'fulfilled')
          .flatMap(result => result.value);

        setGames(allGames);
      } catch (err) {
        setError('Failed to load games. Please try again later.');
        console.error('Error fetching games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGamesFromAPIs();
  }, []);

  // FreeToGame API
  const fetchFreeToGameAPI = async () => {
    try {
      const response = await fetch('https://www.freetogame.com/api/games?platform=browser');
      const data = await response.json();
      
      return data.slice(0, 20).map(game => ({
        id: `ftg-${game.id}`,
        title: game.title,
        image: game.thumbnail,
        category: mapCategory(game.genre),
        rating: (4.0 + Math.random() * 1).toFixed(1),
        plays: generatePlayCount(),
        link: `/game/ftg-${game.id}`,
        type: 'online',
        description: game.short_description || 'Free-to-play browser game',
        genre: game.genre,
        developer: game.developer,
        release_date: game.release_date
      }));
    } catch (error) {
      console.error('FreeToGame API error:', error);
      return [];
    }
  };

  // Trivia Games from Open Trivia DB
  const fetchTriviaGames = async () => {
    try {
      const categories = await fetch('https://opentdb.com/api_category.php');
      const categoryData = await categories.json();
      
      return categoryData.trivia_categories.slice(0, 5).map((cat, index) => ({
        id: `trivia-${cat.id}`,
        title: `${cat.name} Trivia`,
        image: `https://via.placeholder.com/300x200/8B5CF6/ffffff?text=${encodeURIComponent(cat.name)}`,
        category: 'puzzle',
        rating: (4.2 + Math.random() * 0.6).toFixed(1),
        plays: generatePlayCount(),
        link: `/game/trivia-${cat.id}`,
        type: 'trivia',
        description: `Test your knowledge in ${cat.name}`,
        genre: 'Trivia',
        developer: 'Open Trivia DB',
        release_date: '2024'
      }));
    } catch (error) {
      console.error('Trivia API error:', error);
      return [];
    }
  };

  // Card Games
  const fetchCardGames = () => {
    const cardGames = [
      {
        id: 'blackjack',
        title: 'Blackjack 21',
        image: 'https://via.placeholder.com/300x200/DC2626/ffffff?text=♠♥+Blackjack+♣♦',
        category: 'cards',
        rating: '4.6',
        plays: generatePlayCount(),
        link: '/game/blackjack',
        type: 'cards',
        description: 'Classic casino card game',
        genre: 'Card Game',
        developer: 'Deck of Cards API',
        release_date: '2024'
      },
      {
        id: 'poker',
        title: 'Texas Hold\'em Poker',
        image: 'https://via.placeholder.com/300x200/059669/ffffff?text=♠+Poker+♥',
        category: 'cards',
        rating: '4.5',
        plays: generatePlayCount(),
        link: '/game/poker',
        type: 'cards',
        description: 'Popular poker variant',
        genre: 'Card Game',
        developer: 'Deck of Cards API',
        release_date: '2024'
      },
      {
        id: 'solitaire',
        title: 'Klondike Solitaire',
        image: 'https://via.placeholder.com/300x200/7C3AED/ffffff?text=♦+Solitaire+♣',
        category: 'cards',
        rating: '4.4',
        plays: generatePlayCount(),
        link: '/game/solitaire',
        type: 'cards',
        description: 'Classic single-player card game',
        genre: 'Card Game',
        developer: 'Deck of Cards API',
        release_date: '2024'
      }
    ];
    
    return Promise.resolve(cardGames);
  };

  // Built-in Games
  const fetchBuiltInGames = () => {
    const builtInGames = [
      {
        id: 'snake',
        title: 'Snake Game',
        image: 'https://via.placeholder.com/300x200/10B981/ffffff?text=🐍+Snake',
        category: 'arcade',
        rating: '4.5',
        plays: '125K',
        link: '/game/snake',
        type: 'built-in',
        description: 'Classic snake game',
        genre: 'Arcade',
        developer: 'Built-in',
        release_date: '2024'
      },
      {
        id: 'tetris',
        title: 'Tetris',
        image: 'https://via.placeholder.com/300x200/3B82F6/ffffff?text=◼+Tetris',
        category: 'puzzle',
        rating: '4.8',
        plays: '350K',
        link: '/game/tetris',
        type: 'built-in',
        description: 'Block puzzle classic',
        genre: 'Puzzle',
        developer: 'Built-in',
        release_date: '2024'
      },
      {
        id: '2048',
        title: '2048',
        image: 'https://via.placeholder.com/300x200/EC4899/ffffff?text=2048',
        category: 'puzzle',
        rating: '4.7',
        plays: '200K',
        link: '/game/2048',
        type: 'built-in',
        description: 'Number combining puzzle',
        genre: 'Puzzle',
        developer: 'Built-in',
        release_date: '2024'
      }
    ];
    
    return Promise.resolve(builtInGames);
  };

  // Helper functions
  const mapCategory = (genre) => {
    const categoryMap = {
      'MMORPG': 'multiplayer',
      'Shooter': 'action',
      'Strategy': 'strategy',
      'Battle Royale': 'action',
      'Card Game': 'cards',
      'Racing': 'racing',
      'Sports': 'sports',
      'Fighting': 'action',
      'Social': 'multiplayer',
      'MOBA': 'strategy'
    };
    return categoryMap[genre] || 'arcade';
  };

  const generatePlayCount = () => {
    const counts = ['45K', '67K', '89K', '123K', '156K', '234K', '345K', '456K', '567K', '678K'];
    return counts[Math.floor(Math.random() * counts.length)];
  };

  // Filter and sort games
  const filteredGames = useMemo(() => {
    let filteredData = selectedCategory === 'all' 
      ? games 
      : games.filter(game => game.category === selectedCategory);

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
  }, [games, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const currentGames = filteredGames.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="loading-spinner" />
        <p>Loading awesome games...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <FaExclamationTriangle className="error-icon" />
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="game-grid-container">
      {/* Filters */}
      <div className="game-grid-header">
        <div className="games-count">
          Showing {filteredGames.length} games
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
        {currentGames.map((game) => (
          <div key={game.id} className="game-card">
            <div className="game-image-container">
              <img 
                src={game.image} 
                alt={game.title}
                className="game-image"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x200/6366f1/ffffff?text=${encodeURIComponent(game.title)}`;
                }}
              />
              
              {/* Play Button Overlay */}
              <div className="play-overlay">
                <Link to={game.link} className="play-button">
                  <FaPlay />
                </Link>
              </div>

              {/* Game Type Badge */}
              <div className="type-badge">
                <span className={`badge badge-${game.type}`}>
                  {game.type === 'built-in' ? 'Built-in' : 
                   game.type === 'trivia' ? 'Trivia' :
                   game.type === 'cards' ? 'Cards' : 'Online'}
                </span>
              </div>

              {/* Rating Badge */}
              <div className="rating-badge">
                <FaStar className="star-icon" />
                <span>{game.rating}</span>
              </div>
            </div>
            
            <div className="game-info">
              <h3 className="game-title">{game.title}</h3>
              <p className="game-description">{game.description}</p>
              
              <div className="game-meta">
                <div className="play-count">
                  <FaGamepad className="gamepad-icon" />
                  <span>{game.plays}</span>
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
    </div>
  );
}

export default GameGrid;
