import { Link } from 'react-router-dom';
import { FaPlay, FaStar, FaFire, FaHeart, FaEye } from 'react-icons/fa';
import { useState } from 'react';

function FeaturedGames() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const featuredGames = [
    {
      id: 'snake',
      title: 'Snake Legends',
      description: 'The classic snake game with modern graphics and power-ups',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      plays: '2.5M',
      link: '/game/snake',
      featured: true,
      category: 'Arcade',
      tags: ['Classic', 'Retro', 'Addictive']
    },
    {
      id: 'flappy-bird',
      title: 'Flappy Adventure',
      description: 'Navigate through pipes in this challenging endless runner',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      plays: '1.8M',
      link: '/game/flappybird',
      featured: true,
      category: 'Action',
      tags: ['Challenging', 'Endless', 'Skill']
    },
    {
      id: '2048',
      title: 'Number Fusion',
      description: 'Combine numbers strategically to reach the ultimate goal',
      image: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      plays: '3.2M',
      link: '/game/2048',
      featured: true,
      category: 'Puzzle',
      tags: ['Strategy', 'Math', 'Brain']
    },
    {
      id: 'tetris',
      title: 'Block Master',
      description: 'The timeless block-stacking puzzle that never gets old',
      image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      plays: '4.1M',
      link: '/game/tetris',
      featured: true,
      category: 'Puzzle',
      tags: ['Classic', 'Timeless', 'Puzzle']
    }
  ];

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

  return (
    <section className="featured-games-section">
      <div className="featured-container">
        {/* Section Header */}
        <div className="featured-header">
          <div>
            <h2 className="featured-title">
              <FaFire className="title-icon" />
              Featured Games
            </h2>
            <p className="featured-subtitle">
              Hand-picked games that deliver the ultimate gaming experience
            </p>
          </div>
          <Link to="/featured" className="view-all-link">
            <span>View All Featured</span>
            <span className="arrow">→</span>
          </Link>
        </div>

        {/* Hero Featured Game */}
        <div className="hero-featured">
          <div 
            className="hero-featured-bg"
            style={{ backgroundImage: `url(${featuredGames[0].image})` }}
          />
          <div className="hero-featured-overlay" />
          
          <div className="hero-featured-content">
            <div className="hero-featured-info">
              <div className="hero-featured-badge">
                <FaFire />
                <span>Editor's Choice</span>
              </div>
              
              <h3 className="hero-featured-title">{featuredGames[0].title}</h3>
              <p className="hero-featured-description">{featuredGames[0].description}</p>
              
              <div className="hero-featured-meta">
                <div className="hero-meta-item">
                  <div className="rating-stars">
                    {renderStars(featuredGames[0].rating)}
                  </div>
                  <span className="rating-number">{featuredGames[0].rating}</span>
                </div>
                <div className="hero-meta-item">
                  <FaEye />
                  <span>{featuredGames[0].plays} plays</span>
                </div>
                <div className="hero-meta-item">
                  <span className="category-badge">{featuredGames[0].category}</span>
                </div>
              </div>
              
              <div className="hero-featured-actions">
                <Link to={featuredGames[0].link} className="hero-play-btn">
                  <FaPlay />
                  <span>Play Now</span>
                </Link>
                <button className="hero-favorite-btn">
                  <FaHeart />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Games Grid */}
        <div className="featured-grid">
          {featuredGames.slice(1).map((game, index) => (
            <div 
              key={game.id} 
              className="featured-card"
              onMouseEnter={() => setHoveredCard(game.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="featured-image-container">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="featured-image"
                />
                <div className="featured-overlay" />
                
                {/* Play Overlay */}
                <div className="featured-play-overlay">
                  <Link to={game.link} className="featured-play-button">
                    <FaPlay />
                  </Link>
                </div>

                {/* Category Badge */}
                <div className="featured-badge">
                  {game.category}
                </div>

                {/* Rating Badge */}
                <div className="featured-rating-badge">
                  <FaStar />
                  <span>{game.rating}</span>
                </div>
              </div>
              
              <div className="featured-info">
                <div className="featured-header-info">
                  <div>
                    <h3 className="featured-game-title">{game.title}</h3>
                    <div className="featured-tags">
                      {game.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="featured-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="featured-description">{game.description}</p>
                
                <div className="featured-meta">
                  <div className="featured-rating">
                    <div className="rating-stars">
                      {renderStars(game.rating)}
                    </div>
                    <span className="featured-rating-number">{game.rating}</span>
                  </div>
                  
                  <div className="featured-plays">
                    <FaEye />
                    <span>{game.plays}</span>
                  </div>
                </div>
                
                <div className="featured-actions">
                  <Link to={game.link} className="featured-action-btn primary">
                    <FaPlay />
                    Play Now
                  </Link>
                  <button className="featured-action-btn secondary">
                    <FaHeart />
                  </button>
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