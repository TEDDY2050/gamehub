import { Link, useNavigate } from 'react-router-dom';
import { FaPlay, FaStar, FaTrophy, FaFire, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import '../styles/FeaturedGames.css';
import snakeImg from '../assets/snake.png';
import tictactoeImg from '../assets/tictactoe.png';
import rpsImg from '../assets/rps.png';

function FeaturedGames() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
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

  const featuredGames = [
    {
      id: 'snake',
      title: 'Snake Game',
      description: 'Classic arcade game with modern twists',
      image: snakeImg,
      category: 'arcade',
      rating: '4.8',
      plays: '125K',
      link: '/game/snake',
      featured: true,
      badges: ['Most Popular', 'Classic']
    },
    {
      id: 'tictactoe',
      title: 'Tic Tac Toe',
      description: 'Strategic battle of X\'s and O\'s with AI opponent',
      image: tictactoeImg,
      category: 'puzzle',
      rating: '4.7',
      plays: '89K',
      link: '/game/tictactoe',
      featured: true,
      badges: ['Strategy', 'AI Powered']
    },
    {
      id: 'rps',
      title: 'Rock Paper Scissors',
      description: 'Battle against AI in this classic hand game!',
      image: rpsImg,
      category: 'arcade',
      rating: '4.6',
      plays: '102K',
      link: '/game/rps',
      featured: true,
      badges: ['Fun', 'Quick Play']
    },
  ];

  return (
    <>
      <section className="featured-games-section">
        <div className="featured-container">
          <div className="featured-header">
            <div className="featured-title-section">
              <h2 className="featured-title">
                <FaTrophy className="featured-icon" />
                Featured Games
              </h2>
              <p className="featured-subtitle">
                Handpicked games that are trending and loved by our community
              </p>
              {!isLoggedIn() && (
                <p className="text-amber-600 font-medium mt-2">
                  <FaLock className="inline mr-2" />
                  Login required to play games
                </p>
              )}
            </div>
            <Link to="/games" className="view-all-button">
              View All Games
            </Link>
          </div>

          <div className="featured-grid">
            {featuredGames.map((game, index) => (
              <div 
                key={game.id} 
                className={`featured-card ${index === 0 ? 'featured-primary' : ''} ${!isLoggedIn() ? 'cursor-not-allowed opacity-75' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="featured-image-container">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="featured-image"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(game.title)}`;
                    }}
                  />
                  
                  {/* Featured Overlay */}
                  <div className="featured-overlay">
                    {isLoggedIn() ? (
                      <Link to={game.link} className="featured-play-button">
                        <FaPlay />
                        <span>Play Now</span>
                      </Link>
                    ) : (
                      <button 
                        onClick={(e) => handleGameClick(game.link, e)}
                        className="featured-play-button opacity-75"
                      >
                        <FaLock />
                        <span>Login to Play</span>
                      </button>
                    )}
                  </div>

                  {/* Login Required Badge */}
                  {!isLoggedIn() && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <FaLock />
                      Login Required
                    </div>
                  )}

                  {/* Game Badges */}
                  <div className="featured-badges">
                    {game.badges.map((badge, idx) => (
                      <span key={idx} className="featured-badge">
                        {badge === 'Most Popular' && <FaFire />}
                        {badge === 'Editor\'s Choice' && <FaTrophy />}
                        {badge === 'Trending' && <FaFire />}
                        {badge === 'Strategy' && <FaTrophy />}
                        {badge === 'AI Powered' && <FaFire />}
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Rating Badge */}
                  <div className="featured-rating">
                    <FaStar className="rating-star" />
                    <span>{game.rating}</span>
                  </div>
                </div>
                
                <div className="featured-info">
                  <h3 className="featured-game-title">{game.title}</h3>
                  <p className="featured-game-description">{game.description}</p>
                  
                  <div className="featured-meta">
                    <div className="featured-stats">
                      <span className="play-count">{game.plays} plays</span>
                      <span className="category-tag">{game.category}</span>
                    </div>
                    
                    {isLoggedIn() ? (
                      <Link to={game.link} className="featured-play-link">
                        Play
                      </Link>
                    ) : (
                      <button 
                        onClick={(e) => handleGameClick(game.link, e)}
                        className="featured-play-link opacity-75"
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
        </div>
      </section>
      
      <LoginModal />
    </>
  );
}

export default FeaturedGames;