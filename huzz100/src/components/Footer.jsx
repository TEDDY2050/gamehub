import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  const gameCategories = [
    'Action Games', 'Puzzle Games', 'Racing Games', 'Sports Games',
    'Strategy Games', 'Arcade Games', 'IO Games', 'Multiplayer Games'
  ];

  const popularGames = [
    'Snake Game', 'Tetris', '2048', 'Pac-Man',
    'Flappy Bird', 'Super Mario', 'Chess', 'Agar.io'
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-purple-600 mb-4">HUZZ</div>
            <p className="text-gray-600 mb-4">
              The ultimate destination for free online games. Play thousands of games 
              instantly without downloads or registration.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Game Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Game Categories</h3>
            <ul className="space-y-2">
              {gameCategories.map((category) => (
                <li key={category}>
                  <Link 
                    to={`/category/${category.toLowerCase().replace(' games', '').replace(' ', '-')}`}
                    className="text-gray-600 hover:text-purple-600 transition-colors text-sm"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Games */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Popular Games</h3>
            <ul className="space-y-2">
              {popularGames.map((game) => (
                <li key={game}>
                  <Link 
                    to={`/game/${game.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-600 hover:text-purple-600 transition-colors text-sm"
                  >
                    {game}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/developers" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                  For Developers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © 2025 HUZZ Games. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <p className="text-gray-600 text-sm">
                🎮 Over 1000+ Free Games Available
              </p>
              <p className="text-gray-600 text-sm">
                ⭐ Rated 4.8/5 by players
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;