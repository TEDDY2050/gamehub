import { Link } from 'react-router-dom';
import { FaPlay, FaStar, FaGamepad, FaSpinner, FaExclamationTriangle, FaFire, FaEye, FaHeart } from 'react-icons/fa';
import { useState, useMemo, useEffect } from 'react';
import '../styles/GameGrid.css';

function GameGrid({ selectedCategory = 'all' }) {
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
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
        release_date: game.release_date,
        tags: generateTags(game.genre)
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
        image: `https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=800`,
        category: 'puzzle',
        rating: (4.2 + Math.random() * 0.6).toFixed(1),
        plays: generatePlayCount(),
        link: `/game/trivia-${cat.id}`,
        type: 'trivia',
        description: `Test your knowledge in ${cat.name}`,
        genre: 'Trivia',
        developer: 'HUZZ Games',
        release_date: '2024',
        tags: ['Knowledge', 'Quiz', 'Educational']
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
        image: 'https://images.pexels.com/photos/1871508/pexels-photo-1871508.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'cards',
        rating: '4.6',
        plays: generatePlayCount(),
        link: '/game/blackjack',
        type: 'cards',
        description: 'Classic casino card game with realistic gameplay',
        genre: 'Card Game',
        developer: 'HUZZ Games',
        release_date: '2024',
        tags: ['Casino', 'Strategy', 'Classic']
      },
      {
        id: 'poker',
        title: 'Texas Hold\'em Poker',
        image: 'https://images.pexels.com/photos/1871508/pexels-photo-1871508.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'cards',
        rating: '4.5',
        plays: generatePlayCount(),
        link: '/game/poker',
        type: 'cards',
        description: 'Popular poker variant with multiplayer support',
        genre: 'Card Game',
        developer: 'HUZZ Games',
        release_date: '2024',
        tags: ['Multiplayer', 'Strategy', 'Casino']
      },
      {
        id: 'solitaire',
        title: 'Klondike Solitaire',
        image: 'https://images.pexels.com/photos/1871508/pexels-photo-1871508.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'cards',
        rating: '4.4',
        plays: generatePlayCount(),
        link: '/game/solitaire',
        type: 'cards',
        description: 'Classic single-player card game',
        genre: 'Card Game',
        developer: 'HUZZ Games',
        release_date: '2024',
        tags: ['Singleplayer', 'Relaxing', 'Classic']
      }
    ];
    
    return Promise.resolve(cardGames);
  };

  // Built-in Games
  const fetchBuiltInGames = () => {
    const builtInGames = [
      {
        id: 'snake',
        title: 'Snake Legends',
        image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'arcade',
        rating: '4.8',
        plays: '2.5M',
        link: '/game/snake',
        type: 'built-in',
        description: 'Classic snake game with modern graphics',
        genre: 'Arcade',
        developer: 'HUZZ Games',
        release_date: '2024',
        tags: ['Classic', 'Retro', 'Addictive']
      },
      {
        id: 'tetris',
        title: 'Block Master',
        image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'puzzle',
        rating: '4.9',
        plays: '4.1M',
        link: '/game/tetris',
        type: 'built-in',
        description: 'Timeless block puzzle classic',
        genre: 'Puzzle',
        developer: 'HUZZ Games',
        release_date: '2024',
        tags: ['Classic', 'Puzzle', 'Timeless']
      },
      {
        id: '2048',
        title: 'Number Fusion',
        image: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'puzzle',
        rating: '4.7',
        plays: '3.2M',
        link: '/game/2048',
        type: 'built-in',
        description: 'Strategic number combining puzzle',
        genre: 'Puzzle',
        developer: 'HUZZ Games',
        release_date: '2024',
        tags: ['Strategy', 'Math', 'Brain']
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
    const counts = ['450K', '670K', '890K', '1.2M', '1.5M', '2.3M', '3.4M', '4.5M', '5.6M', '6.7M'];
    return counts[Math.floor(Math.random() * counts.length)];
  };

  const generateTags = (genre) => {
    const tagMap = {
      'MMORPG': ['Multiplayer', 'RPG', 'Adventure'],
      'Shooter': ['Action', 'Combat', 'Multiplayer'],
      'Strategy': ['Strategy', 'Tactical', 'Planning'],
      'Battle Royale': ['Action', 'Survival', 'Multiplayer'],
      'Card Game': ['Cards', 'Strategy', 'Classic'],
      'Racing': ['Racing', 'Speed', 'Competition'],
      'Sports': ['Sports', 'Competition', 'Skill'],
      'Fighting': ['Action', 'Combat', 'Skill'],
      'Social': ['Social', 'Multiplayer', 'Fun'],
      'MOBA': ['Strategy', 'Multiplayer', 'Competitive']
    };
    return tagMap[genre] || ['Fun', 'Casual', 'Entertainment'];
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star half" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star empty" />);
    }
    
    return stars;
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
          const aPlays = parseFloat(a.plays.replace(/[KM]/g, '')) * (a.plays.includes('M') ? 1000 : 1);
          const bPlays = parseFloat(b.plays.replace(/[KM]/g, '')) * (b.plays.includes('M') ? 1000 : 1);
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
      <section className="game-grid-section">
        <div className="game-grid-container">
          <div className="loading-state">
            <FaSpinner className="loading-spinner" />
            <h3 className="loading-title">Loading Epic Games...</h3>
            <p className="loading-message">Preparing your gaming experience</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="game-grid-section">
        <div className="game-grid-container">
          <div className="error-state">
            <FaExclamationTriangle className="error-icon" />
            <h3 className="error-title">Oops! Something went wrong</h3>
            <p className="error-message">{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="game-grid-section">
      <div className="game-grid-container">
        {/* Section Header */}
        <div className="game-grid-header">
          <h2 className="section-title">
            <FaGamepad className="title-icon" />
            All Games
          </h2>
          <p className="section-subtitle">
            Discover thousands of amazing games across all genres. From classic arcade to modern adventures.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="filter-controls">
          <div className="filter-group">
            <span className="filter-label">
              <FaFire className="filter-icon" />
              Showing
            </span>
            <div className="games-count">
              <span className="count-number">{filteredGames.length}</span>
              <span>games</span>
            </div>
          </div>
          
          <div className="filter-group">
            <span className="filter-label">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="popular">🔥 Most Popular</option>
              <option value="rating">⭐ Highest Rated</option>
              <option value="newest">🆕 Newest</option>
              <option value="name">📝 A-Z</option>
            </select>
          </div>

          <div className="view-toggle">
            <button
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              ⊞
            </button>
            <button
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Games Grid */}
        <div className={`games-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
          {currentGames.map((game, index) => (
            <div 
              key={game.id} 
              className={`game-card ${game.type === 'built-in' ? 'featured' : ''} ${viewMode === 'list' ? 'list-card' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="game-image-container">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="game-image"
                  onError={(e) => {
                    e.target.src = `https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800`;
                  }}
                />
                
                <div className="game-overlay" />
                
                {/* Play Button Overlay */}
                <div className="play-overlay">
                  <Link to={game.link} className="play-button">
                    <FaPlay />
                  </Link>
                </div>

                {/* Game Type Badge */}
                <div className="type-badge">
                  <span className={`badge badge-${game.type}`}>
                    {game.type === 'built-in' ? '⭐ Premium' : 
                     game.type === 'trivia' ? '🧠 Trivia' :
                     game.type === 'cards' ? '🃏 Cards' : '🌐 Online'}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="rating-badge">
                  <FaStar className="star-icon" />
                  <span>{game.rating}</span>
                </div>
              </div>
              
              <div className="game-info">
                <div className="game-header">
                  <h3 className="game-title">{game.title}</h3>
                  <span className="game-category">{game.genre}</span>
                </div>
                
                <p className="game-description">{game.description}</p>
                
                <div className="game-tags">
                  {game.tags?.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="game-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="game-meta">
                  <div className="game-rating">
                    <div className="rating-stars">
                      {renderStars(parseFloat(game.rating))}
                    </div>
                    <span className="rating-number">{game.rating}</span>
                  </div>
                  
                  <div className="play-count">
                    <FaEye className="eye-icon" />
                    <span>{game.plays}</span>
                  </div>
                </div>
                
                <div className="game-actions">
                  <Link to={game.link} className="game-action-btn primary">
                    <FaPlay />
                    Play Now
                  </Link>
                  <button className="game-action-btn secondary">
                    <FaHeart />
                  </button>
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
              ← Previous
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
                    className={`pagination-button ${currentPage === page ? 'active' : ''}`}
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
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default GameGrid;