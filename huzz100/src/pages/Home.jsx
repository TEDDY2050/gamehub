import Hero from '../components/Hero';
import FeaturedGames from '../components/FeaturedGames';
import GameGrid from '../components/GamesGrid';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Hero />
      <FeaturedGames />
      <GameGrid />
    </div>
  );
}

export default Home;