import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './components/Contact';
import Careers from './components/Careers';
import About from './components/About'; 
import Layout from './components/Layout';
import Home from './pages/Home';
import SnakeGame from './games/SnakeGame';
import RockPaperScissors from './games/RockPaperScissors';
import TicTacToe from './games/TicTacToe';
import AdminDashboard from './components/AdminDashboard';
import MemoryGame from './games/MemoryGame';
import Game2048 from './games/Game2048';
import PacManGame from './games/PacManGame';
import PongGame from './games/PongGame';
import TetrisGame from './games/TetrisGame';
import BreakoutGame from './games/BreakoutGame'; 

// Protected Route Component for Admin
function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  try {
    // Check if user info exists and has admin role
    const userStr = localStorage.getItem('userInfo');
    
    if (!userStr) {
      return <Navigate to="/login" replace />;
    }
    
    const user = JSON.parse(userStr);
    if (user.role !== 'admin') {
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error('Error parsing user info:', error);
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/game/snake" element={<SnakeGame />} />
        <Route path="/game/rps" element={<RockPaperScissors />} />
        <Route path="/game/tictactoe" element={<TicTacToe />} />
        <Route path="/game/memory" element={<MemoryGame />} />
        <Route path="/game/2048" element={<Game2048 />} />
        <Route path="/game/pacman" element={<PacManGame />} />
        <Route path="/game/pong" element={<PongGame />} />
        <Route path="/game/tetris" element={<TetrisGame />} />
        <Route path='/game/breakout' element={<BreakoutGame />} />

        
        {/* Admin Route */}
        <Route
          path="/admin" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;