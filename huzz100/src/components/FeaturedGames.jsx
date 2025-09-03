import { Link } from 'react-router-dom';
import { FaPlay, FaStar, FaFire, FaHeart, FaEye, FaCrown, FaTrophy } from 'react-icons/fa';
import { useState } from 'react';

function FeaturedGames() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const featuredGames = [
    {
      id: 'snake',
      title: 'Snake Legends',
      description: 'The classic snake game with modern graphics, power-ups, and multiplayer modes',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      plays: '2.5M',
      link: '/game/snake',
      featured: true,
      category: 'Arcade',
      tags: ['Classic', 'Retro', 'Addictive'],
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      id: 'flappy-bird',
      title: 'Flappy Adventure',
      description: 'Navigate through challenging pipes in this addictive endless runner with stunning visuals',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      plays: '1.8M',
      link: '/game/flappybird',
      featured: true,
      category: 'Action',
      tags: ['Challenging', 'Endless', 'Skill'],
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: '2048',
      title: 'Number Fusion',
      description: 'Combine numbers strategically to reach the ultimate goal in this mind-bending puzzle',
      image: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      plays: '3.2M',
      link: '/game/2048',
      featured: true,
      category: 'Puzzle',
      tags: ['Strategy', 'Math', 'Brain'],
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      id: 'tetris',
      title: 'Block Master',
      description: 'The timeless block-stacking puzzle that never gets old, now with modern effects',
      image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      plays: '4.1M',
      link: '/game/tetris',
      featured: true,
      category: 'Puzzle',
      tags: ['Classic', 'Timeless', 'Puzzle'],
      gradient: 'from-indigo-600 to-blue-600'
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400 opacity-50" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-600" />);
    }
    
    return stars;
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-3 px-6 py-3 mb-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-xl border border-orange-500/30 rounded-full">
            <FaFire className="text-orange-400 animate-pulse" />
            <span className="text-white font-semibold">Editor's Choice</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Featured Games
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Hand-picked games that deliver the ultimate gaming experience with stunning graphics and addictive gameplay
          </p>
        </div>

        {/* Hero Featured Game */}
        <div className="relative mb-20 group animate-slideInUp">
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900 to-blue-900">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ 
                backgroundImage: `url(${featuredGames[0].image})`,
                filter: 'brightness(0.4) saturate(1.2)'
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-purple-900/60 to-transparent" />
            
            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-2xl px-8 md:px-16">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-black font-bold text-sm animate-pulse">
                  <FaCrown />
                  <span>GAME OF THE WEEK</span>
                </div>
                
                <h3 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                  {featuredGames[0].title}
                </h3>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {featuredGames[0].description}
                </p>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {renderStars(featuredGames[0].rating)}
                    </div>
                    <span className="text-white font-bold text-lg">{featuredGames[0].rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaEye />
                    <span className="font-semibold">{featuredGames[0].plays} plays</span>
                  </div>
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-white font-semibold">
                    {featuredGames[0].category}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    to={featuredGames[0].link}
                    className="group flex items-center gap-3 px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <FaPlay className="group-hover:scale-110 transition-transform duration-300" />
                    <span>Play Now</span>
                  </Link>
                  <button className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-white hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all duration-300 hover:scale-110">
                    <FaHeart className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slideInUp" style={{animationDelay: '0.3s'}}>
          {featuredGames.slice(1).map((game, index) => (
            <div 
              key={game.id} 
              className="group relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              onMouseEnter={() => setHoveredCard(game.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <Link
                    to={game.link}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-purple-600 text-xl hover:scale-110 transition-transform duration-300 shadow-xl"
                  >
                    <FaPlay />
                  </Link>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-xl text-white text-xs font-bold rounded-full border border-white/20">
                  {game.category}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-black/80 backdrop-blur-xl text-white text-sm font-semibold rounded-full">
                  <FaStar className="text-yellow-400" />
                  <span>{game.rating}</span>
                </div>
              </div>
              
              {/* Game Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                  {game.title}
                </h3>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full border border-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {game.description}
                </p>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {renderStars(game.rating)}
                    </div>
                    <span className="text-white font-bold">{game.rating}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaEye />
                    <span className="font-semibold">{game.plays}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    to={game.link}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    <FaPlay />
                    Play
                  </Link>
                  <button className="w-12 h-12 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all duration-300 hover:scale-110 flex items-center justify-center">
                    <FaHeart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16 animate-fadeIn" style={{animationDelay: '0.6s'}}>
          <Link 
            to="/featured" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 text-white font-bold text-lg rounded-full hover:from-purple-600/30 hover:to-blue-600/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
          >
            <FaTrophy className="text-yellow-400" />
            <span>View All Featured Games</span>
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedGames;