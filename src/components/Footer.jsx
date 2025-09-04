import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaDiscord, FaTwitch } from 'react-icons/fa';
import { useState } from 'react';
import '../styles/Footer.css';

function Footer() {
  const [email, setEmail] = useState('');

  const gameCategories = [
    'Action Games', 'Puzzle Games', 'Racing Games', 'Sports Games',
    'Strategy Games', 'Arcade Games', 'IO Games', 'Multiplayer Games'
  ];

  const popularGames = [
    'Snake Game', 'Tetris', '2048', 'Pac-Man',
    'Flappy Bird', 'Super Mario', 'Chess', 'Agar.io'
  ];

  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Careers', path: '/careers' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'For Developers', path: '/developers' }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('Newsletter subscription:', email);
      setEmail('');
      // Add notification logic here
    }
  };

  return (
    <footer className="enhanced-footer">
      <div className="footer-container">
        {/* Gaming Stats Section */}
        <div className="gaming-stats">
          <div className="stat-card">
            <div className="stat-icon">🎮</div>
            <div className="stat-info">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Games Available</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Active Players</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-info">
              <div className="stat-number">100%</div>
              <div className="stat-label">Free to Play</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <div className="stat-number">4.8★</div>
              <div className="stat-label">User Rating</div>
            </div>
          </div>
        </div>
        <br />

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <h3 className="newsletter-title">🎮 Stay Updated</h3>
          <p className="newsletter-description">
            Get notified about new games, updates, and exclusive gaming content!
          </p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-brand">
              <div className="footer-logo">Gamehub</div>
              <div className="footer-tagline">Ultimate Gaming Hub</div>
            </div>
            <p className="footer-description">
              The ultimate destination for free online games. Play thousands of games 
              instantly without downloads or registration. Your gaming adventure starts here!
            </p>
            <div className="social-links">
              <a href="#" className="social-link" title="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-link" title="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link" title="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" title="YouTube">
                <FaYoutube />
              </a>
              <a href="#" className="social-link" title="Discord">
                <FaDiscord />
              </a>
              <a href="#" className="social-link" title="Twitch">
                <FaTwitch />
              </a>
            </div>
          </div>

          {/* Game Categories */}
          <div className="footer-section">
            <h3 className="footer-section-title">🎯 Game Categories</h3>
            <div className="footer-links">
              {gameCategories.map((category) => (
                <Link 
                  key={category}
                  to={`/category/${category.toLowerCase().replace(' games', '').replace(' ', '-')}`}
                  className="footer-link"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Games */}
          <div className="footer-section">
            <h3 className="footer-section-title">🏆 Popular Games</h3>
            <div className="footer-links">
              {popularGames.map((game) => (
                <Link 
                  key={game}
                  to={`/game/${game.toLowerCase().replace(' ', '-')}`}
                  className="footer-link"
                >
                  {game}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="footer-section">
            <h3 className="footer-section-title">🏢 Company</h3>
            <div className="footer-links">
              {companyLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className="footer-link"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2025 HUZZ Games. All rights reserved. Made with ❤️ for gamers worldwide.
            </p>
            <div className="footer-badges">
              <div className="footer-badge">
                <span className="badge-icon">🎮</span>
                <span>Free Gaming</span>
              </div>
              <div className="footer-badge">
                <span className="badge-icon">⚡</span>
                <span>Instant Play</span>
              </div>
              <div className="footer-badge">
                <span className="badge-icon">🔒</span>
                <span>Safe & Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;