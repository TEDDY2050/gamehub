import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaDiscord, FaTwitch, FaGamepad, FaArrowUp, FaEnvelope } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter signup:', email);
      setEmail('');
      alert('Thanks for subscribing!');
    }
  };

  const gameCategories = [
    { name: 'Action Games', slug: 'action', count: '25+' },
    { name: 'Puzzle Games', slug: 'puzzle', count: '30+' },
    { name: 'Racing Games', slug: 'racing', count: '15+' },
    { name: 'Sports Games', slug: 'sports', count: '20+' },
    { name: 'Strategy Games', slug: 'strategy', count: '18+' },
    { name: 'Arcade Games', slug: 'arcade', count: '35+' }
  ];

  const popularGames = [
    { name: 'Snake Legends', slug: 'snake', plays: '2.5M' },
    { name: 'Block Master', slug: 'tetris', plays: '4.1M' },
    { name: 'Number Fusion', slug: '2048', plays: '3.2M' },
    { name: 'Flappy Adventure', slug: 'flappybird', plays: '1.8M' },
    { name: 'Puzzle Quest', slug: 'puzzle-quest', plays: '1.2M' },
    { name: 'Speed Racer', slug: 'racing', plays: '900K' }
  ];

  const companyLinks = [
    { name: 'About HUZZ', slug: '/about' },
    { name: 'Contact Us', slug: '/contact' },
    { name: 'Careers', slug: '/careers' },
    { name: 'Press Kit', slug: '/press' },
    { name: 'Developer API', slug: '/developers' },
    { name: 'Partnerships', slug: '/partners' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', slug: '/privacy' },
    { name: 'Terms of Service', slug: '/terms' },
    { name: 'Cookie Policy', slug: '/cookies' },
    { name: 'DMCA', slug: '/dmca' }
  ];

  return (
    <>
      <footer className="footer">
        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <h3 className="newsletter-title">Stay in the Game</h3>
            <p className="newsletter-description">
              Get the latest game releases, exclusive content, and special offers delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-button">
                <FaEnvelope />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Stats Section */}
        <div className="footer-stats">
          <div className="footer-stat">
            <span className="footer-stat-number">100+</span>
            <span className="footer-stat-label">Games Available</span>
          </div>
          <div className="footer-stat">
            <span className="footer-stat-number">1M+</span>
            <span className="footer-stat-label">Active Players</span>
          </div>
          <div className="footer-stat">
            <span className="footer-stat-number">4.9★</span>
            <span className="footer-stat-label">Average Rating</span>
          </div>
          <div className="footer-stat">
            <span className="footer-stat-number">24/7</span>
            <span className="footer-stat-label">Support</span>
          </div>
        </div>

        <div className="footer-container">
          <div className="footer-main">
            {/* Company Info */}
            <div className="footer-company">
              <Link to="/" className="footer-logo">
                <div className="footer-logo-icon">
                  <FaGamepad />
                </div>
                <div className="footer-logo-text">HUZZ</div>
              </Link>
              <p className="footer-description">
                The ultimate destination for premium online gaming. Experience the best collection 
                of games with stunning graphics, smooth gameplay, and endless entertainment. 
                Join millions of players worldwide in the HUZZ gaming universe.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <FaYoutube />
                </a>
                <a href="#" className="social-link" aria-label="Discord">
                  <FaDiscord />
                </a>
                <a href="#" className="social-link" aria-label="Twitch">
                  <FaTwitch />
                </a>
              </div>
            </div>

            {/* Game Categories */}
            <div className="footer-section">
              <h3 className="footer-section-title">Game Categories</h3>
              <div className="footer-links">
                {gameCategories.map((category) => (
                  <Link 
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    className="footer-link"
                  >
                    <span>{category.name}</span>
                    <span className="link-count">({category.count})</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Games */}
            <div className="footer-section">
              <h3 className="footer-section-title">Popular Games</h3>
              <div className="footer-links">
                {popularGames.map((game) => (
                  <Link 
                    key={game.slug}
                    to={`/game/${game.slug}`}
                    className="footer-link"
                  >
                    <span>{game.name}</span>
                    <span className="link-plays">{game.plays} plays</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div className="footer-section">
              <h3 className="footer-section-title">Company</h3>
              <div className="footer-links">
                {companyLinks.map((link) => (
                  <Link 
                    key={link.slug}
                    to={link.slug}
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
            <div className="footer-copyright">
              <p>© 2025 HUZZ Games. All rights reserved. Made with ❤️ for gamers worldwide.</p>
            </div>
            
            <div className="footer-legal">
              {legalLinks.map((link) => (
                <Link 
                  key={link.slug}
                  to={link.slug}
                  className="footer-legal-link"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="footer-badges">
              <div className="footer-badge">
                <FaGamepad className="footer-badge-icon" />
                <span>100+ Games</span>
              </div>
              <div className="footer-badge">
                <span>⭐</span>
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </>
  );
}

export default Footer;