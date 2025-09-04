import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import Home from './pages/Home';
import SnakeGame from './games/SnakeGame';
import FlappyBird from './games/FlappyBird';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/game/snake" element={<SnakeGame />} />
        <Route path="/game/flappybird" element={<FlappyBird />} />
      </Routes>
    </Router>
  );
}

export default App;