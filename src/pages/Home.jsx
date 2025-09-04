  
import Hero from '../components/Hero';
import FeaturedGames from '../components/FeaturedGames';
import GameGrid from '../components/GamesGrid';


function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
     <Hero/>
     <FeaturedGames />
     <div id="games-section">
       <GameGrid/>
     </div>
    </div>
)
}

export default Home;