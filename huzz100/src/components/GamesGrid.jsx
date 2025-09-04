import { Link } from 'react-router-dom';
import { FaPlay, FaStar, FaGamepad, FaSpinner, FaExclamationTriangle, FaFire, FaEye, FaHeart, FaCrown } from 'react-icons/fa';
import { useState, useMemo, useEffect } from 'react';

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
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400 opacity-50" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-600" />);
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
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <FaSpinner className="text-6xl text-purple-500 animate-spin mx-auto" />
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Loading Epic Games...</h3>
          <p className="text-gray-400 text-lg">Preparing your ultimate gaming experience</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-8" />
          <h3 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h3>
          <p className="text-gray-400 text-lg mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="games-section" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="flex items-center justify-center gap-4 text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            <FaGamepad className="text-purple-500 animate-pulse" />
            All Games
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover thousands of amazing games across all genres. From classic arcade to modern adventures.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-6 justify-between items-center mb-12 p-6 bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/20 animate-slideInUp">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaFire className="text-orange-400" />
              <span className="text-white font-semibold">Showing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-purple-400">{filteredGames.length}</span>
              <span className="text-gray-400">games</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-white font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-xl text-white font-medium cursor-pointer focus:outline-none focus:border-purple-500 transition-all duration-300"
            >
              <option value="popular">🔥 Most Popular</option>
              <option value="rating">⭐ Highest Rated</option>
              <option value="newest">🆕 Newest</option>
              <option value="name">📝 A-Z</option>
            </select>
          </div>

          <div className="flex bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-xl p-1">
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setViewMode('grid')}
            >
              ⊞ Grid
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setViewMode('list')}
            >
              ☰ List
            </button>
          </div>
        </div>

        {/* Games Grid */}
        <div className={`grid gap-8 mb-16 ${
          viewMode === 'list' 
            ? 'grid-cols-1' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {currentGames.map((game, index) => (
            <div 
              key={game.id} 
              className={`group relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fadeIn ${
                game.type === 'built-in' ? 'ring-2 ring-purple-500/50 bg-gradient-to-br from-purple-900/20 to-blue-900/20' : ''
              } ${
                viewMode === 'list' ? 'flex h-32' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Premium Badge */}
              {game.type === 'built-in' && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold rounded-full animate-pulse">
                  <FaCrown />
                  PREMIUM
                </div>
              )}

              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'w-48 h-32' : 'h-48'
              }`}>
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = `https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800`;
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <Link 
                    to={game.link} 
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-purple-600 text-xl hover:scale-110 transition-transform duration-300 shadow-xl"
                  >
                    <FaPlay />
                  </Link>
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-xl ${
                    game.type === 'built-in' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30' :
                    game.type === 'trivia' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30' :
                    game.type === 'cards' ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/30' :
                    'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                  }`}>
                    {game.type === 'built-in' ? '⭐ Premium' : 
                     game.type === 'trivia' ? '🧠 Trivia' :
                     game.type === 'cards' ? '🃏 Cards' : '🌐 Online'}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1 px-3 py-1 bg-black/90 backdrop-blur-xl text-white text-sm font-semibold rounded-full border border-purple-500/30">
                  <FaStar className="text-yellow-400" />
                  <span>{game.rating}</span>
                </div>
              </div>
              
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-1">
                      {game.title}
                    </h3>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-md border border-purple-500/30">
                      {game.genre}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {game.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.tags?.slice(0, 3).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-md border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  {/* Meta Info */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {renderStars(parseFloat(game.rating))}
                      </div>
                      <span className="text-white font-bold text-sm">{game.rating}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <FaEye />
                      <span className="font-semibold">{game.plays}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link 
                      to={game.link} 
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                    >
                      <FaPlay />
                      Play
                    </Link>
                    <button className="w-12 h-12 bg-black/60 border border-purple-500/30 rounded-xl text-gray-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all duration-300 hover:scale-110 flex items-center justify-center">
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 animate-fadeIn">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-black/60 backdrop-blur-xl border border-purple-500/30 text-white font-semibold rounded-xl hover:bg-purple-600/20 hover:border-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className={`w-12 h-12 font-bold rounded-xl transition-all duration-300 ${
                      currentPage === page 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30' 
                        : 'bg-black/60 backdrop-blur-xl border border-purple-500/30 text-gray-300 hover:bg-purple-600/20 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (
                page === currentPage - 3 ||
                page === currentPage + 3
              ) {
                return <span key={page} className="text-gray-500 font-bold">...</span>;
              }
              return null;
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-black/60 backdrop-blur-xl border border-purple-500/30 text-white font-semibold rounded-xl hover:bg-purple-600/20 hover:border-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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