@@ .. @@
-import '../styles/hero.css';
+import { FaPlay, FaGamepad, FaStar, FaUsers, FaTrophy } from 'react-icons/fa';
+import { Link } from 'react-router-dom';
+import '../styles/Hero.css';

 function Hero({ onExploreClick }) {
+  const featuredGames = [
+    { id: 'snake', title: 'Snake', image: '/api/placeholder/120/80' },
+    { id: 'tetris', title: 'Tetris', image: '/api/placeholder/120/80' },
+    { id: '2048', title: '2048', image: '/api/placeholder/120/80' },
+    { id: 'flappy', title: 'Flappy Bird', image: '/api/placeholder/120/80' }
+  ];
+
+  const scrollToGames = () => {
+    const gamesSection = document.getElementById('games-section');
+    if (gamesSection) {
+      gamesSection.scrollIntoView({ behavior: 'smooth' });
+    }
+  };
+
   return (
-     <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
-        <div className="max-w-7xl mx-auto px-4 text-center">
-          <h1 className="text-5xl font-bold mb-4">Play Free Online Games</h1>
-          <p className="text-xl mb-8 opacity-90">
-            Thousands of games to play for free. No downloads, no ads, just pure fun!
-          </p>
-          <button 
-            onClick={() => document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' })}
-            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
-          >
-            Start Playing Now
-          </button>
+    <section className="hero-section">
+      <div className="hero-background">
+        <div className="hero-particles">
+          <div className="particle"></div>
+          <div className="particle"></div>
+          <div className="particle"></div>
+          <div className="particle"></div>
+          <div className="particle"></div>
         </div>
       </div>
+      
+      <div className="hero-container">
+        <div className="hero-content">
+          <div className="hero-badge">
+            <FaTrophy />
+            <span>World's Best Gaming Platform</span>
+          </div>
+          
+          <h1 className="hero-title">
+            Play <span className="hero-title-gradient">1000+</span> Free Games
+          </h1>
+          
+          <p className="hero-subtitle">
+            Discover the ultimate gaming experience with our massive collection of 
+            free online games. No downloads, no registration, just instant fun!
+          </p>
+          
+          <div className="hero-actions">
+            <Link to="#games-section" className="hero-cta" onClick={scrollToGames}>
+              <FaPlay />
+              <span>Start Playing Now</span>
+            </Link>
+            
+            <Link to="/featured" className="hero-secondary">
+              <FaGamepad />
+              <span>Browse Games</span>
+            </Link>
+          </div>
+          
+          <div className="hero-stats">
+            <div className="hero-stat">
+              <span className="hero-stat-number">1000+</span>
+              <span className="hero-stat-label">Free Games</span>
+            </div>
+            <div className="hero-stat">
+              <span className="hero-stat-number">50M+</span>
+              <span className="hero-stat-label">Players</span>
+            </div>
+            <div className="hero-stat">
+              <span className="hero-stat-number">4.8★</span>
+              <span className="hero-stat-label">Rating</span>
+            </div>
+          </div>
+        </div>
+      </div>
+      
+      <div className="hero-games-preview">
+        {featuredGames.map((game) => (
+          <Link key={game.id} to={`/game/${game.id}`} className="hero-game-card">
+            <div className="hero-game-image" style={{ backgroundImage: `url(${game.image})` }}></div>
+            <div className="hero-game-title">{game.title}</div>
+          </Link>
+        ))}
+      </div>
+      
+      <div className="hero-scroll-indicator" onClick={scrollToGames}>
+        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
+          <path d="M12 2L12 20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
+        </svg>
+      </div>
+    </section>
   );
 }