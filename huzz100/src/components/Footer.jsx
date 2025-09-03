import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaDiscord, FaTwitch, FaGamepad, FaArrowUp, FaEnvelope, FaHeart, FaCode, FaShield } from 'react-icons/fa';
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
      alert('Thanks for subscribing to HUZZ updates!');
    }
  };

  const gameCategories = [
    { name: 'Action Games', slug: 'action', count: '25+', icon: '⚡' },
    { name: 'Puzzle Games', slug: 'puzzle', count: '30+', icon: '🧩' },
    { name: 'Racing Games', slug: 'racing', count: '15+', icon: '🏎️' },
    { name: 'Sports Games', slug: 'sports', count: '20+', icon: '⚽' },
    { name: 'Strategy Games', slug: 'strategy', count: '18+', icon: '🎯' },
    { name: 'Arcade Games', slug: 'arcade', count: '35+', icon: '🕹️' }
  ];

  const popularGames = [
    { name: 'Snake Legends', slug: 'snake', plays: '2.5M', rating: '4.8' },
    { name: 'Block Master', slug: 'tetris', plays: '4.1M', rating: '4.9' },
    { name: 'Number Fusion', slug: '2048', plays: '3.2M', rating: '4.7' },
    { name: 'Flappy Adventure', slug: 'flappybird', plays: '1.8M', rating: '4.6' },
    { name: 'Puzzle Quest', slug: 'puzzle-quest', plays: '1.2M', rating: '4.5' },
    { name: 'Speed Racer', slug: 'racing', plays: '900K', rating: '4.4' }
  ];

  const companyLinks = [
    { name: 'About HUZZ', slug: '/about', icon: '🏢' },
    { name: 'Contact Us', slug: '/contact', icon: '📧' },
    { name: 'Careers', slug: '/careers', icon: '💼' },
    { name: 'Press Kit', slug: '/press', icon: '📰' },
    { name: 'Developer API', slug: '/developers', icon: '⚙️' },
    { name: 'Partnerships', slug: '/partners', icon: '🤝' }
  ];

  return (
    <>
      <footer className="relative bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        {/* Newsletter Section */}
        <div className="relative z-10 py-20 border-b border-gray-800/50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-purple-500/30 rounded-full text-purple-300 font-semibold">
              <FaEnvelope />
              Stay Updated
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Never Miss a Game
            </h3>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Get the latest game releases, exclusive content, and special offers delivered straight to your inbox.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300"
                required
              />
              <button 
                type="submit" 
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative z-10 py-16 border-b border-gray-800/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  100+
                </div>
                <div className="text-gray-400 font-semibold uppercase tracking-wider">Games Available</div>
              </div>
              <div className="group">
                <div className="text-4xl font-black mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  1M+
                </div>
                <div className="text-gray-400 font-semibold uppercase tracking-wider">Active Players</div>
              </div>
              <div className="group">
                <div className="text-4xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  4.9★
                </div>
                <div className="text-gray-400 font-semibold uppercase tracking-wider">Average Rating</div>
              </div>
              <div className="group">
                <div className="text-4xl font-black mb-2 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-gray-400 font-semibold uppercase tracking-wider">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <Link to="/" className="inline-flex items-center gap-4 mb-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
                    <FaGamepad className="text-white text-2xl group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    HUZZ
                  </div>
                </Link>
                
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                  The ultimate destination for premium online gaming. Experience the best collection 
                  of games with stunning graphics, smooth gameplay, and endless entertainment. 
                  Join millions of players worldwide in the HUZZ gaming universe.
                </p>
                
                {/* Social Links */}
                <div className="flex gap-4">
                  {[
                    { icon: FaFacebook, color: 'hover:text-blue-500', label: 'Facebook' },
                    { icon: FaTwitter, color: 'hover:text-sky-400', label: 'Twitter' },
                    { icon: FaInstagram, color: 'hover:text-pink-500', label: 'Instagram' },
                    { icon: FaYoutube, color: 'hover:text-red-500', label: 'YouTube' },
                    { icon: FaDiscord, color: 'hover:text-indigo-400', label: 'Discord' },
                    { icon: FaTwitch, color: 'hover:text-purple-500', label: 'Twitch' }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href="#" 
                      className={`w-12 h-12 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                      aria-label={social.label}
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>

              {/* Game Categories */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FaGamepad className="text-purple-400" />
                  Game Categories
                </h3>
                <div className="space-y-3">
                  {gameCategories.map((category) => (
                    <Link 
                      key={category.slug}
                      to={`/category/${category.slug}`}
                      className="group flex items-center justify-between p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-xs font-bold text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Games */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FaFire className="text-orange-400" />
                  Popular Games
                </h3>
                <div className="space-y-3">
                  {popularGames.map((game) => (
                    <Link 
                      key={game.slug}
                      to={`/game/${game.slug}`}
                      className="group block p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold">{game.name}</span>
                        <div className="flex items-center gap-1 text-xs">
                          <FaStar className="text-yellow-400" />
                          <span>{game.rating}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <FaEye />
                        <span>{game.plays} plays</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative z-10 py-8 border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6 text-gray-400">
                <p className="flex items-center gap-2">
                  © 2025 HUZZ Games. Made with 
                  <FaHeart className="text-red-500 animate-pulse" /> 
                  for gamers worldwide.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-6">
                <Link to="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2">
                  <FaShield />
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link to="/developers" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2">
                  <FaCode />
                  Developers
                </Link>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-purple-500/30 rounded-full text-purple-300 font-semibold">
                  <FaGamepad />
                  <span>100+ Games</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border border-yellow-500/30 rounded-full text-yellow-300 font-semibold">
                  <span>⭐</span>
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        className={`fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl shadow-purple-500/30 transition-all duration-300 z-50 ${
          showBackToTop ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-75'
        } hover:scale-110 hover:shadow-purple-500/50`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaArrowUp className="mx-auto" />
      </button>
    </>
  );
}

export default Footer;