import '../styles/hero.css';

function Hero({ onExploreClick }) {
  return (
     <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Play Free Online Games</h1>
          <p className="text-xl mb-8 opacity-90">
            Thousands of games to play for free. No downloads, no ads, just pure fun!
          </p>
          <button 
            onClick={() => document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Playing Now
          </button>
        </div>
      </div>
  );
}

export default Hero;