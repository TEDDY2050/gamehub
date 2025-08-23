import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Action', slug: 'action' },
    { name: 'Puzzle', slug: 'puzzle' },
    { name: 'Racing', slug: 'racing' },
    { name: 'Sports', slug: 'sports' },
    { name: 'Strategy', slug: 'strategy' },
    { name: 'Arcade', slug: 'arcade' },
    { name: 'IO Games', slug: 'io' },
    { name: 'Multiplayer', slug: 'multiplayer' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-purple-600">
                HUZZ
              </div>
            </Link>

            
            <div className="hidden lg:flex items-center space-x-8">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            
            <div className="hidden md:flex items-center">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </form>
            </div>

           
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Login</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-gray-700 hover:text-purple-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2">
              
              <div className="mb-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </form>
              </div>

              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    className="block py-2 text-gray-700 hover:text-purple-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
                <Link
                  to="/login"
                  className="block py-2 text-gray-700 hover:text-purple-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-4 py-3 overflow-x-auto scrollbar-hide">
            <Link
              to="/"
              className="flex-shrink-0 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
            >
              All Games
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="flex-shrink-0 px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200"
              >
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