import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaBell, FaGamepad, FaBars, FaTimes, FaFire } from 'react-icons/fa';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const categories = [
    { name: 'Action', slug: 'action', icon: '⚡', color: 'from-red-500 to-orange-500' },
    { name: 'Puzzle', slug: 'puzzle', icon: '🧩', color: 'from-green-500 to-emerald-500' },
    { name: 'Racing', slug: 'racing', icon: '🏎️', color: 'from-blue-500 to-cyan-500' },
    { name: 'Sports', slug: 'sports', icon: '⚽', color: 'from-yellow-500 to-orange-500' },
    { name: 'Strategy', slug: 'strategy', icon: '🎯', color: 'from-purple-500 to-pink-500' },
    { name: 'Arcade', slug: 'arcade', icon: '🕹️', color: 'from-indigo-500 to-purple-500' },
    { name: 'IO Games', slug: 'io', icon: '🌐', color: 'from-teal-500 to-green-500' },
    { name: 'Multiplayer', slug: 'multiplayer', icon: '👥', color: 'from-pink-500 to-rose-500' }
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-xl border-b border-purple-500/30 shadow-2xl shadow-purple-500/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-4 transition-transform duration-300 hover:scale-105">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
                  <FaGamepad className="text-white text-xl group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse" />
              </div>
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                HUZZ
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className={`relative px-4 py-2 font-semibold transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'text-purple-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
                {location.pathname === '/' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                )}
              </Link>
              {categories.slice(0, 4).map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className={`relative flex items-center gap-2 px-4 py-2 font-semibold transition-all duration-300 ${
                    location.pathname === `/category/${category.slug}` 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  {category.name}
                  {location.pathname === `/category/${category.slug}` && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center relative">
              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <input
                  type="text"
                  placeholder="Search 100+ games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 px-6 py-3 pl-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 group">
                <FaBell className="group-hover:animate-pulse" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
                  3
                </div>
              </button>
              
              <Link 
                to="/login" 
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
              >
                <FaUser />
                <span className="hidden sm:inline">Login</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-gray-300 hover:text-white transition-all duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-purple-500/30 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <div className="px-6 py-8">
            {/* Mobile Search */}
            <div className="mb-8">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-3 pl-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </form>
            </div>
            
            <div className="space-y-4">
              <Link
                to="/"
                className="flex items-center gap-4 p-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-xl">🏠</span>
                <span className="font-semibold">Home</span>
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="flex items-center gap-4 p-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-semibold">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Category Pills */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-4 py-4 overflow-x-auto scrollbar-hide">
            <Link
              to="/"
              className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
              }`}
            >
              <FaFire className={location.pathname === '/' ? 'text-yellow-400' : ''} />
              All Games
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
                  location.pathname === `/category/${category.slug}` 
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;