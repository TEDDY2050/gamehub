import Hero from '../components/Hero';
import GameGrid from '../components/GamesGrid';


function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
     <Hero/>
     <GameGrid/>
    </div>
)
}

export default Home;