import { useState, useEffect } from 'react';
import { FaPlay, FaGamepad, FaTrophy, FaUsers, FaArrowDown, FaFire, FaStar } from 'react-icons/fa';

function Hero() {
  const [currentGame, setCurrentGame] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const featuredGames = [
    {
      title: "Snake Legends",
      description: "The classic snake game reimagined with stunning visuals and power-ups",
      image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      gradient: "from-emerald-600 to-teal-600"
    },
    {
      title: "Flappy Adventure",
      description: "Navigate through challenging obstacles in this addictive endless runner",
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      title: "Puzzle Master",
      description: "Test your mind with brain-bending puzzle challenges and mysteries",
      image: "https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGame((prev) => (prev + 1) % featuredGames.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToGames = () => {
    document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${featuredGames[currentGame].image})`,
            filter: 'brightness(0.3) saturate(1.2)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/60 to-blue-900/80" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Mouse Follow Effect */}
        <div 
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl transition-all duration-300 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Hero Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-purple-500/30 rounded-full text-white font-semibold animate-fadeIn">
          <FaTrophy className="text-yellow-400 animate-pulse" />
          <span>100+ Premium Games • 1M+ Players • 4.9★ Rating</span>
        </div>

        {/* Main Title */}
        <div className="mb-8 animate-slideInUp">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4">
            <span className="block text-gray-300 text-3xl md:text-4xl lg:text-5xl font-light mb-2">Welcome to</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
              HUZZ
            </span>
            <span className="block text-gray-400 text-2xl md:text-3xl lg:text-4xl font-light mt-2 tracking-widest uppercase">
              Gaming Universe
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-slideInUp" style={{animationDelay: '0.3s'}}>
          Immerse yourself in the ultimate gaming experience with our collection of 
          <span className="text-purple-400 font-semibold"> premium games</span>. 
          No downloads, no limits, just pure entertainment at your fingertips.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slideInUp" style={{animationDelay: '0.6s'}}>
          <button 
            onClick={scrollToGames}
            className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-3">
              <FaPlay className="group-hover:scale-110 transition-transform duration-300" />
              <span>Start Playing Now</span>
            </div>
          </button>
          
          <button className="group px-12 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold text-lg rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-105">
            <div className="flex items-center gap-3">
              <FaGamepad className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Explore Categories</span>
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slideInUp" style={{animationDelay: '0.9s'}}>
          <div className="group text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              100+
            </div>
            <div className="text-gray-400 font-medium uppercase tracking-wider">Premium Games</div>
          </div>
          
          <div className="group text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              1M+
            </div>
            <div className="text-gray-400 font-medium uppercase tracking-wider">Active Players</div>
          </div>
          
          <div className="group text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              4.9★
            </div>
            <div className="text-gray-400 font-medium uppercase tracking-wider">Player Rating</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 cursor-pointer animate-bounce hover:text-white transition-colors duration-300"
        onClick={scrollToGames}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">Scroll to explore</span>
          <FaArrowDown className="text-xl" />
        </div>
      </div>

      {/* Game Carousel Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3">
        {featuredGames.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentGame 
                ? 'bg-purple-400 scale-125 shadow-lg shadow-purple-400/50' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => setCurrentGame(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;