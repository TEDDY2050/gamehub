import { Link } from 'react-router-dom';
import { FaPlay, FaStar } from 'react-icons/fa';

function FeaturedGames() {
  const featuredGames = [
    {
      id: 'snake',
      title: 'Snake Game',
      description: 'Classic snake game with modern graphics',
      image: '/api/placeholder/400/300',
      rating: 4.5,
      plays: '125K',
      link: '/game/snake',
      featured: true
    },
    {
      id: 'flappy-bird',
      title: 'Flappy Bird',
      description: 'Navigate through pipes in this challenging game',
      image: '/api/placeholder/400/300',
      rating: 4.2,
      plays: '89K',
      link: '/game/flappybird',
      featured: true
    },
    {
      id: '2048',
      title: '2048',
      description: 'Combine numbers to reach 2048',
      image: '/api/placeholder/400/300',
      rating: 4.7,
      plays: '200K',
      link: '/game/2048',
      featured: true
    },
    {
      id: 'tetris',
      title: 'Tetris',
      description: 'The classic block-stacking puzzle game',
      image: '/api/placeholder/400/300',
      rating: 4.8,
      plays: '350K',
      link: '/game/tetris',
      featured: true
    }
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Games</h2>
          <Link 
            to="/featured" 
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            View All Featured →
          </Link>
        </div>

        {/* Large Featured Game */}
        <div className="mb-8">
          <div className="relative bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg overflow-hidden h-80">
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-3xl mx-auto px-8 text-white">
                <div className="flex items-center space-x-2 mb-4">
                  <FaStar className="text-yellow-400" />
                  <span className="font-medium">Editor's Pick</span>
                </div>
                <h3 className="text-4xl font-bold mb-4">{featuredGames[0].title}</h3>
                <p className="text-xl mb-6 opacity-90">{featuredGames[0].description}</p>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-yellow-400" />
                    <span>{featuredGames[0].rating}</span>
                  </div>
                  <span>{featuredGames[0].plays} plays</span>
                </div>
                <Link
                  to={featuredGames[0].link}
                  className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  <FaPlay />
                  <span>Play Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGames.slice(1).map((game) => (
            <div key={game.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Link
                    to={game.link}
                    className="opacity-0 group-hover:opacity-100 bg-white text-purple-600 p-3 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300"
                  >
                    <FaPlay />
                  </Link>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{game.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{game.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="text-sm font-medium">{game.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{game.plays} plays</span>
                  </div>
                  
                  <Link
                    to={game.link}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    Play →
                  </Link>
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