import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationLinks = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Careers', path: '/careers' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-lg border-b-2 border-purple-200 sticky top-0 z-50">
        <div className="max-w-full mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo with Gaming Elements */}
            <Link to="/" className="flex items-center group">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="text-4xl font-black text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text tracking-wide">
                  GAMEHUB
                </div>
                <div className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
                  PRO
                </div>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation with Underline Effects */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group text-gray-700 hover:text-purple-600 font-bold text-xl transition-colors uppercase tracking-wide py-2"
                >
                  {link.name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Enhanced Search Bar with Gaming Style */}
            <div className="hidden md:flex items-center">
              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-20 group-focus-within:opacity-40 transition-opacity"></div>
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="relative w-80 px-4 py-3 pl-12 pr-16 text-sm border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                />
                <svg className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button type="submit" className="absolute right-2 top-2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Enhanced Login Button and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* User Stats/Score */}
              <div className="hidden lg:flex items-center space-x-4 bg-gray-50 px-4 py-2 rounded-full">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-600">Online</span>
                </div>
                <div className="text-sm font-bold text-purple-600">1,250+ Users</div>
              </div>

              <Link
                to="/login"
                className="hidden md:flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>LOGIN</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-gray-700 hover:text-purple-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t-2 border-purple-200">
            <div className="px-6 py-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-10 text-sm border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <svg className="absolute left-3 top-4 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </form>
              </div>

              {/* Mobile User Stats */}
              <div className="flex justify-center mb-4 bg-gray-50 px-4 py-3 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-600">Online</span>
                  </div>
                  <div className="text-sm font-bold text-purple-600">1,250+ Users Playing</div>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block py-3 px-4 text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-bold text-lg rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/login"
                  className="block py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-lg transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  LOGIN
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;