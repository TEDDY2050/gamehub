@@ .. @@
 import { Link } from 'react-router-dom';
-import { FaPlay, FaStar } from 'react-icons/fa';
+import { FaPlay, FaStar, FaHeart, FaGamepad, FaFire, FaCrown, FaUsers, FaEye } from 'react-icons/fa';
+import '../styles/FeaturedGames.css';

 function FeaturedGames() {
   const featuredGames = [
     {
       id: 'snake',
       title: 'Snake Game',
-      description: 'Classic snake game with modern graphics',
+      description: 'Classic snake game with modern graphics and smooth gameplay',
       image: '/api/placeholder/400/300',
       rating: 4.5,
       plays: '125K',
       link: '/game/snake',
-      featured: true
+      featured: true,
+      category: 'Arcade',
+      tags: ['Classic', 'Retro', 'Addictive']
     },
     {
       id: 'flappy-bird',
       title: 'Flappy Bird',
-      description: 'Navigate through pipes in this challenging game',
+      description: 'Navigate through pipes in this challenging and addictive game',
       image: '/api/placeholder/400/300',
       rating: 4.2,
       plays: '89K',
       link: '/game/flappybird',
-      featured: true
+      featured: true,
+      category: 'Arcade',
+      tags: ['Challenging', 'Skill', 'Endless']
     },
     {
       id: '2048',
       title: '2048',
-      description: 'Combine numbers to reach 2048',
+      description: 'Combine numbers to reach 2048 in this addictive puzzle game',
       image: '/api/placeholder/400/300',
       rating: 4.7,
       plays: '200K',
       link: '/game/2048',
-      featured: true
+      featured: true,
+      category: 'Puzzle',
+      tags: ['Strategy', 'Numbers', 'Brain']
     },
     {
       id: 'tetris',
       title: 'Tetris',
-      description: 'The classic block-stacking puzzle game',
+      description: 'The legendary block-stacking puzzle game that never gets old',
       image: '/api/placeholder/400/300',
       rating: 4.8,
       plays: '350K',
       link: '/game/tetris',
-      featured: true
+      featured: true,
+      category: 'Puzzle',
+      tags: ['Classic', 'Blocks', 'Timeless']
+    },
+    {
+      id: 'chess',
+      title: 'Chess Master',
+      description: 'Play chess against AI or challenge friends online',
+      image: '/api/placeholder/400/300',
+      rating: 4.6,
+      plays: '180K',
+      link: '/game/chess',
+      featured: true,
+      category: 'Strategy',
+      tags: ['Strategy', 'Classic', 'Multiplayer']
+    },
+    {
+      id: 'solitaire',
+      title: 'Solitaire',
+      description: 'The classic card game that everyone loves',
+      image: '/api/placeholder/400/300',
+      rating: 4.4,
+      plays: '220K',
+      link: '/game/solitaire',
+      featured: true,
+      category: 'Cards',
+      tags: ['Cards', 'Relaxing', 'Classic']
     }
   ];

+  const renderStars = (rating) => {
+    const stars = [];
+    const fullStars = Math.floor(rating);
+    const hasHalfStar = rating % 1 !== 0;
+    
+    for (let i = 0; i < fullStars; i++) {
+      stars.push(<FaStar key={i} className="featured-star" />);
+    }
+    
+    if (hasHalfStar) {
+      stars.push(<FaStar key="half" className="featured-star" style={{ opacity: 0.5 }} />);
+    }
+    
+    const remainingStars = 5 - Math.ceil(rating);
+    for (let i = 0; i < remainingStars; i++) {
+      stars.push(<FaStar key={`empty-${i}`} className="featured-star empty" />);
+    }
+    
+    return stars;
+  };
+
   return (
-    <section className="bg-white py-12">
-      <div className="max-w-7xl mx-auto px-4">
-        <div className="flex items-center justify-between mb-8">
-          <h2 className="text-3xl font-bold text-gray-900">Featured Games</h2>
-          <Link 
-            to="/featured" 
-            className="text-purple-600 hover:text-purple-700 font-medium"
-          >
-            View All Featured →
-          </Link>
+    <section className="featured-games-section">
+      <div className="featured-container">
+        <div className="featured-header">
+          <div>
+            <h2 className="featured-title">Featured Games</h2>
+            <p className="featured-subtitle">Hand-picked games that players love the most</p>
+          </div>
+          <Link to="/featured" className="view-all-link">
+            <span>View All Featured</span>
+            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
+              <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
+            </svg>
+          </Link>
         </div>

-        {/* Large Featured Game */}
-        <div className="mb-8">
-          <div className="relative bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg overflow-hidden h-80">
-            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
-            <div className="absolute inset-0 flex items-center">
-              <div className="max-w-3xl mx-auto px-8 text-white">
-                <div className="flex items-center space-x-2 mb-4">
-                  <FaStar className="text-yellow-400" />
-                  <span className="font-medium">Editor's Pick</span>
-                </div>
-                <h3 className="text-4xl font-bold mb-4">{featuredGames[0].title}</h3>
-                <p className="text-xl mb-6 opacity-90">{featuredGames[0].description}</p>
-                <div className="flex items-center space-x-6 mb-6">
-                  <div className="flex items-center space-x-1">
-                    <FaStar className="text-yellow-400" />
-                    <span>{featuredGames[0].rating}</span>
-                  </div>
-                  <span>{featuredGames[0].plays} plays</span>
-                </div>
-                <Link
-                  to={featuredGames[0].link}
-                  className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
-                >
-                  <FaPlay />
-                  <span>Play Now</span>
-                </Link>
+        {/* Hero Featured Game */}
+        <div className="hero-featured">
+          <div className="hero-featured-bg" style={{ backgroundImage: `url(${featuredGames[0].image})` }}></div>
+          <div className="hero-featured-overlay"></div>
+          <div className="hero-featured-content">
+            <div className="hero-featured-info">
+              <div className="hero-featured-badge">
+                <FaCrown />
+                <span>Editor's Choice</span>
+              </div>
+              
+              <h3 className="hero-featured-title">{featuredGames[0].title}</h3>
+              <p className="hero-featured-description">{featuredGames[0].description}</p>
+              
+              <div className="hero-featured-meta">
+                <div className="hero-meta-item">
+                  <FaStar />
+                  <span>{featuredGames[0].rating}/5</span>
+                </div>
+                <div className="hero-meta-item">
+                  <FaUsers />
+                  <span>{featuredGames[0].plays} players</span>
+                </div>
+                <div className="hero-meta-item">
+                  <FaGamepad />
+                  <span>{featuredGames[0].category}</span>
+                </div>
+              </div>
+              
+              <div className="hero-featured-actions">
+                <Link to={featuredGames[0].link} className="hero-play-btn">
+                  <FaPlay />
+                  <span>Play Now</span>
+                </Link>
+                <button className="hero-favorite-btn">
+                  <FaHeart />
+                </button>
               </div>
             </div>
           </div>
         </div>

-        {/* Featured Games Grid */}
-        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
+        {/* Featured Games Grid */}
+        <div className="featured-grid">
           {featuredGames.slice(1).map((game) => (
-            <div key={game.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
-              <div className="relative">
-                <img 
-                  src={game.image} 
-                  alt={game.title}
-                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
-                />
-                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
-                  <Link
-                    to={game.link}
-                    className="opacity-0 group-hover:opacity-100 bg-white text-purple-600 p-3 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300"
-                  >
+            <div key={game.id} className="featured-card">
+              <div className="featured-image-container">
+                <img src={game.image} alt={game.title} className="featured-image" />
+                <div className="featured-overlay"></div>
+                <div className="featured-play-overlay">
+                  <Link to={game.link} className="featured-play-button">
                     <FaPlay />
                   </Link>
                 </div>
+                <div className="featured-badge">HOT</div>
               </div>
               
-              <div className="p-4">
-                <h3 className="font-semibold text-lg mb-2 text-gray-900">{game.title}</h3>
-                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{game.description}</p>
+              <div className="featured-info">
+                <div className="featured-header-info">
+                  <div>
+                    <h3 className="featured-game-title">{game.title}</h3>
+                    <span className="featured-category">{game.category}</span>
+                  </div>
+                </div>
+                
+                <p className="featured-description">{game.description}</p>
+                
+                <div className="featured-meta">
+                  <div className="featured-rating">
+                    <div className="featured-stars">
+                      {renderStars(game.rating)}
+                    </div>
+                    <span className="featured-rating-number">{game.rating}</span>
+                  </div>
+                  
+                  <div className="featured-plays">
+                    <FaEye />
+                    <span>{game.plays}</span>
+                  </div>
+                </div>
                 
-                <div className="flex items-center justify-between">
-                  <div className="flex items-center space-x-4">
-                    <div className="flex items-center space-x-1">
-                      <FaStar className="text-yellow-400 text-sm" />
-                      <span className="text-sm font-medium">{game.rating}</span>
-                    </div>
-                    <span className="text-sm text-gray-500">{game.plays} plays</span>
+                <div className="featured-actions">
+                  <Link to={game.link} className="featured-action-btn primary">
+                    <FaPlay />
+                    <span>Play</span>
+                  </Link>
+                  <button className="featured-action-btn secondary">
+                    <FaHeart />
                   </div>
-                  
-                  <Link
-                    to={game.link}
-                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
-                  >
-                    Play →
-                  </Link>
                 </div>
               </div>
             </div>
           ))}
         </div>
+        
+        {/* Trending Games Section */}
+        <div className="trending-section">
+          <div className="trending-header">
+            <h3 className="trending-title">
+              <FaFire style={{ color: '#f59e0b', marginRight: '8px' }} />
+              Trending Now
+            </h3>
+            <div className="carousel-controls">
+              <button className="carousel-btn">
+                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
+                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
+                </svg>
+              </button>
+              <button className="carousel-btn">
+                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
+                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
+                </svg>
+              </button>
+            </div>
+          </div>
+          
+          <div className="trending-carousel">
+            {featuredGames.slice(0, 4).map((game) => (
+              <Link key={`trending-${game.id}`} to={game.link} className="trending-card">
+                <div className="featured-image-container" style={{ height: '120px' }}>
+                  <img src={game.image} alt={game.title} className="featured-image" />
+                </div>
+                <div className="featured-info" style={{ padding: '12px' }}>
+                  <h4 className="featured-game-title" style={{ fontSize: '0.875rem', marginBottom: '4px' }}>
+                    {game.title}
+                  </h4>
+                  <div className="featured-rating">
+                    <div className="featured-stars">
+                      {renderStars(game.rating)}
+                    </div>
+                    <span className="featured-rating-number">{game.rating}</span>
+                  </div>
+                </div>
+              </Link>
+            ))}
+          </div>
+        </div>
       </div>
     </section>
   );