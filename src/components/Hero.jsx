import React, { useState, useEffect } from 'react';
import { FaPlay, FaGamepad, FaChevronDown } from 'react-icons/fa';
import '../styles/hero.css';

function Hero({ onExploreClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hero carousel slides
  const heroSlides = [
    {
      title: "Welcome to the Ultimate Gaming Hub",
      subtitle: "Thousands of free games at your fingertips - No downloads required!",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "Start Playing Now",
      accent: "🎮"
    },
    {
      title: "Play Instantly in Your Browser",
      subtitle: "Zero downloads, zero wait time - Just pure gaming excitement",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", 
      cta: "Explore Games",
      accent: "⚡"
    },
    {
      title: "Join Millions of Gamers",
      subtitle: "Connect, compete, and conquer with players from around the world",
      image: "https://images.unsplash.com/photo-1556736114-f6e7ad150ca3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      cta: "Join Community",
      accent: "👥"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const scrollToGames = () => {
    const gamesSection = document.getElementById('games-section') || document.getElementById('featured-games');
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (onExploreClick) onExploreClick();
  };

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-enhanced relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Carousel */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-110'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Enhanced Overlay with Animated Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/85 via-blue-900/75 to-indigo-900/85"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className={`relative z-10 text-center text-white max-w-5xl mx-auto px-6 transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        {/* Welcome Badge */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full text-lg font-semibold border border-white/20 shadow-xl">
            <span className="text-2xl animate-pulse">{heroSlides[currentSlide].accent}</span>
            Welcome to Gamehub
          </span>
        </div>

        {/* Main Title with Gradient Animation */}
        <h1 className="hero-title text-6xl md:text-8xl font-black mb-8 leading-tight">
          <span className="hero-gradient-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient">
            {heroSlides[currentSlide].title}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-3xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed font-medium">
          {heroSlides[currentSlide].subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button
            onClick={scrollToGames}
            className="hero-cta-primary group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl flex items-center gap-4 min-w-[250px] justify-center"
          >
            <FaPlay className="group-hover:translate-x-1 transition-transform duration-300" />
            {heroSlides[currentSlide].cta}
          </button>
          
          <button 
            onClick={scrollToCategories}
            className="hero-cta-secondary bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 hover:border-white/50 transition-all duration-500 flex items-center gap-4 min-w-[250px] justify-center"
          >
            <FaGamepad className="animate-pulse" />
            Browse Categories
          </button>
        </div>

        {/* Gaming Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { number: '1000+', label: 'Free Games' },
            { number: '50K+', label: 'Players' },
            { number: '0', label: 'Downloads' },
            { number: '4.8★', label: 'Rating' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.number}</div>
              <div className="text-white/80 font-medium text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide 
                ? 'w-8 h-3 bg-white shadow-lg' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={scrollToGames}>
        <div className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors duration-300">
          <span className="text-sm font-medium">Scroll to explore</span>
          <FaChevronDown className="text-2xl animate-pulse" />
        </div>
      </div>

      {/* Side Navigation Hints */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col gap-4">
        {heroSlides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-16 h-16 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-2xl ${
              index === currentSlide
                ? 'bg-white/20 border-white text-white scale-110'
                : 'bg-white/5 border-white/30 text-white/60 hover:bg-white/10 hover:border-white/50'
            }`}
            title={slide.title}
          >
            {slide.accent}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Hero;