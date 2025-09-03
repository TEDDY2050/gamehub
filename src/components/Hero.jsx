import { useState, useEffect } from 'react';
import { FaPlay, FaGamepad, FaTrophy, FaUsers, FaArrowDown } from 'react-icons/fa';
import '../styles/Hero.css';

function Hero() {
  const [currentGame, setCurrentGame] = useState(0);
  
  const featuredGames = [
    {
      title: "Snake Legends",
      description: "The classic snake game reimagined with stunning visuals",
      image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Flappy Adventure",
      description: "Navigate through challenging obstacles in this addictive game",
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Puzzle Master",
      description: "Test your mind with brain-bending puzzle challenges",
      image: "https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGame((prev) => (prev + 1) % featuredGames.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToGames = () => {
    document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      {/* Animated Background */}
      <div className="hero-background">
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }} />
          ))}
        </div>
        
        {/* Dynamic Background Image */}
        <div 
          className="hero-bg-image"
          style={{
            backgroundImage: `url(${featuredGames[currentGame].image})`
          }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Hero Badge */}
          <div className="hero-badge">
            <FaTrophy className="text-yellow-400" />
            <span>100+ Premium Games Available</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            <span className="hero-title-main">Welcome to</span>
            <span className="hero-title-brand">HUZZ</span>
            <span className="hero-title-sub">Gaming Universe</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Immerse yourself in the ultimate gaming experience with our collection of 
            premium games. No downloads, no limits, just pure entertainment.
          </p>

          {/* Action Buttons */}
          <div className="hero-actions">
            <button onClick={scrollToGames} className="hero-cta">
              <FaPlay />
              <span>Start Playing</span>
            </button>
            <button className="hero-secondary">
              <FaGamepad />
              <span>Browse Games</span>
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">100+</span>
              <span className="hero-stat-label">Games</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">1M+</span>
              <span className="hero-stat-label">Players</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">4.9★</span>
              <span className="hero-stat-label">Rating</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator" onClick={scrollToGames}>
          <FaArrowDown />
        </div>
      </div>

      {/* Game Carousel Indicators */}
      <div className="hero-indicators">
        {featuredGames.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentGame ? 'active' : ''}`}
            onClick={() => setCurrentGame(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;