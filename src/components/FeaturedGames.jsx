import { Link } from 'react-router-dom';
import { FaPlay, FaStar, FaTrophy, FaFire } from 'react-icons/fa';
import '../styles/FeaturedGames.css';

function FeaturedGames() {
  const featuredGames = [
    {
      id: 'snake',
      title: 'Snake Game',
      description: 'Classic arcade game with modern twists',
      image: '/assets/snake.png',
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
      image: '',
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
      image: 'https://via.placeholder.com/400x300/9333ea/ffffff?text=✊+✋+✌',
      category: 'arcade',
      rating: '4.6',
      plays: '102K',
      link: '/game/rps',
      featured: true,
      badges: ['Fun', 'Quick Play']
    },
  ];

  return (
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
          </div>
          <Link to="/games" className="view-all-button">
            View All Games
          </Link>
        </div>

        <div className="featured-grid">
          {featuredGames.map((game, index) => (
            <div 
              key={game.id} 
              className={`featured-card ${index === 0 ? 'featured-primary' : ''}`}
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
                  <Link to={game.link} className="featured-play-button">
                    <FaPlay />
                    <span>Play Now</span>
                  </Link>
                </div>

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
                  
                  <Link to={game.link} className="featured-play-link">
                    Play
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedGames;
