import Hero from '../components/Hero';
import FeaturedGames from '../components/FeaturedGames';
import GameGrid from '../components/GamesGrid';

function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Hero />
      <FeaturedGames />
      <div id="games-section">
        <GameGrid />
      </div>
    </div>
  );
}

export default Home;