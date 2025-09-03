import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaBell, FaGamepad, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const categories = [
    { name: 'Action', slug: 'action', icon: '⚡' },
    { name: 'Puzzle', slug: 'puzzle', icon: '🧩' },
    { name: 'Racing', slug: 'racing', icon: '🏎️' },
    { name: 'Sports', slug: 'sports', icon: '⚽' },
    { name: 'Strategy', slug: 'strategy', icon: '🎯' },
    { name: 'Arcade', slug: 'arcade', icon: '🕹️' },
    { name: 'IO Games', slug: 'io', icon: '🌐' },
    { name: 'Multiplayer', slug: 'multiplayer', icon: '👥' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-content">
            {/* Logo */}
            <Link to="/" className="navbar-logo">
              <div className="logo-icon">
                <FaGamepad />
              </div>
              <div className="logo-text">HUZZ</div>
            </Link>

            {/* Desktop Navigation */}
            <div className="navbar-nav">
              <Link
                to="/"
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
              {categories.slice(0, 5).map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className={`nav-link ${location.pathname === `/category/${category.slug}` ? 'active' : ''}`}
                >
                  <span className="nav-icon">{category.icon}</span>
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <div className="navbar-search">
              <form onSubmit={handleSearch} className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search 100+ games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </form>
            </div>

            {/* User Actions */}
            <div className="navbar-actions">
              <button className="action-button">
                <FaBell />
                <span className="notification-badge">3</span>
              </button>
              
              <Link to="/login" className="user-avatar">
                <FaUser />
              </Link>

              {/* Mobile Menu Button */}
              <button
                className={`mobile-menu-button ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="mobile-menu-line"></span>
                <span className="mobile-menu-line"></span>
                <span className="mobile-menu-line"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-nav">
            <div className="mobile-search">
              <form onSubmit={handleSearch} className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </form>
            </div>
            
            <div className="mobile-nav-links">
              <Link
                to="/"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.icon} {category.name}
                </Link>
              ))}
              <Link
                to="/login"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                👤 Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Category Pills */}
      <div className="category-nav">
        <div className="category-container">
          <div className="category-pills">
            <Link
              to="/"
              className={`category-pill ${location.pathname === '/' ? 'active' : ''}`}
            >
              🎮 All Games
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className={`category-pill ${location.pathname === `/category/${category.slug}` ? 'active' : ''}`}
              >
                {category.icon} {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;