@@ .. @@
 import { Link } from 'react-router-dom';
-import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
+import { 
+  FaFacebook, 
+  FaTwitter, 
+  FaInstagram, 
+  FaYoutube, 
+  FaDiscord,
+  FaTiktok,
+  FaGamepad,
+  FaStar,
+  FaUsers,
+  FaTrophy,
+  FaArrowUp,
+  FaEnvelope
+} from 'react-icons/fa';
+import { useState, useEffect } from 'react';
+import '../styles/Footer.css';

 function Footer() {
+  const [showBackToTop, setShowBackToTop] = useState(false);
+  const [email, setEmail] = useState('');
+
+  useEffect(() => {
+    const handleScroll = () => {
+      setShowBackToTop(window.scrollY > 300);
+    };
+
+    window.addEventListener('scroll', handleScroll);
+    return () => window.removeEventListener('scroll', handleScroll);
+  }, []);
+
+  const scrollToTop = () => {
+    window.scrollTo({ top: 0, behavior: 'smooth' });
+  };
+
+  const handleNewsletterSubmit = (e) => {
+    e.preventDefault();
+    if (email.trim()) {
+      console.log('Newsletter signup:', email);
+      setEmail('');
+      alert('Thank you for subscribing!');
+    }
+  };
+
   const gameCategories = [
-    'Action Games', 'Puzzle Games', 'Racing Games', 'Sports Games',
-    'Strategy Games', 'Arcade Games', 'IO Games', 'Multiplayer Games'
+    { name: 'Action Games', slug: 'action' },
+    { name: 'Puzzle Games', slug: 'puzzle' },
+    { name: 'Racing Games', slug: 'racing' },
+    { name: 'Sports Games', slug: 'sports' },
+    { name: 'Strategy Games', slug: 'strategy' },
+    { name: 'Arcade Games', slug: 'arcade' },
+    { name: 'Card Games', slug: 'cards' },
+    { name: 'Multiplayer Games', slug: 'multiplayer' }
   ];

   const popularGames = [
-    'Snake Game', 'Tetris', '2048', 'Pac-Man',
-    'Flappy Bird', 'Super Mario', 'Chess', 'Agar.io'
+    { name: 'Snake Game', slug: 'snake' },
+    { name: 'Tetris', slug: 'tetris' },
+    { name: '2048', slug: '2048' },
+    { name: 'Flappy Bird', slug: 'flappybird' },
+    { name: 'Chess', slug: 'chess' },
+    { name: 'Solitaire', slug: 'solitaire' },
+    { name: 'Pac-Man', slug: 'pacman' },
+    { name: 'Breakout', slug: 'breakout' }
   ];

   return (
-    <footer className="bg-white border-t border-gray-200 mt-16">
-      <div className="max-w-7xl mx-auto px-4 py-12">
-        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
-          {/* Company Info */}
-          <div>
-            <div className="text-2xl font-bold text-purple-600 mb-4">HUZZ</div>
-            <p className="text-gray-600 mb-4">
-              The ultimate destination for free online games. Play thousands of games 
-              instantly without downloads or registration.
-            </p>
-            <div className="flex space-x-4">
-              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
+    <>
+      <footer className="footer">
+        <div className="footer-container">
+          {/* Newsletter Section */}
+          <div className="newsletter-section">
+            <div className="newsletter-content">
+              <h3 className="newsletter-title">Stay Updated with New Games!</h3>
+              <p className="newsletter-description">
+                Get notified about the latest games, updates, and exclusive content.
+              </p>
+              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
+                <input
+                  type="email"
+                  value={email}
+                  onChange={(e) => setEmail(e.target.value)}
+                  placeholder="Enter your email address"
+                  className="newsletter-input"
+                  required
+                />
+                <button type="submit" className="newsletter-button">
+                  Subscribe
+                </button>
+              </form>
+            </div>
+          </div>
+
+          {/* Footer Stats */}
+          <div className="footer-stats">
+            <div className="footer-stat">
+              <span className="footer-stat-number">1000+</span>
+              <span className="footer-stat-label">Free Games</span>
+            </div>
+            <div className="footer-stat">
+              <span className="footer-stat-number">50M+</span>
+              <span className="footer-stat-label">Players</span>
+            </div>
+            <div className="footer-stat">
+              <span className="footer-stat-number">4.8★</span>
+              <span className="footer-stat-label">Rating</span>
+            </div>
+            <div className="footer-stat">
+              <span className="footer-stat-number">24/7</span>
+              <span className="footer-stat-label">Available</span>
+            </div>
+          </div>
+
+          {/* Main Footer Content */}
+          <div className="footer-main">
+            {/* Company Section */}
+            <div className="footer-company">
+              <Link to="/" className="footer-logo">
+                <div className="footer-logo-icon">
+                  <FaGamepad />
+                </div>
+                <span className="footer-logo-text">HUZZ</span>
+              </Link>
+              
+              <p className="footer-description">
+                The ultimate destination for free online games. Play thousands of games 
+                instantly without downloads or registration. Join millions of players 
+                worldwide and discover your next favorite game.
+              </p>
+              
+              <div className="footer-social">
+                <a href="#" className="social-link" aria-label="Facebook">
+                  <FaFacebook />
+                </a>
+                <a href="#" className="social-link" aria-label="Twitter">
+                  <FaTwitter />
+                </a>
+                <a href="#" className="social-link" aria-label="Instagram">
+                  <FaInstagram />
+                </a>
+                <a href="#" className="social-link" aria-label="YouTube">
+                  <FaYoutube />
+                </a>
+                <a href="#" className="social-link" aria-label="Discord">
+                  <FaDiscord />
+                </a>
+                <a href="#" className="social-link" aria-label="TikTok">
+                  <FaTiktok />
+                </a>
+              </div>
+            </div>
+
+            {/* Game Categories */}
+            <div className="footer-section">
+              <h3 className="footer-section-title">Game Categories</h3>
+              <div className="footer-links">
+                {gameCategories.map((category) => (
+                  <Link
+                    key={category.slug}
+                    to={`/category/${category.slug}`}
+                    className="footer-link"
+                  >
+                    {category.name}
+                  </Link>
+                ))}
+              </div>
+            </div>
+
+            {/* Popular Games */}
+            <div className="footer-section">
+              <h3 className="footer-section-title">Popular Games</h3>
+              <div className="footer-links">
+                {popularGames.map((game) => (
+                  <Link
+                    key={game.slug}
+                    to={`/game/${game.slug}`}
+                    className="footer-link"
+                  >
+                    {game.name}
+                  </Link>
+                ))}
+              </div>
+            </div>
+
+            {/* Company Links */}
+            <div className="footer-section">
+              <h3 className="footer-section-title">Company</h3>
+              <div className="footer-links">
+                <Link to="/about" className="footer-link">About Us</Link>
+                <Link to="/contact" className="footer-link">Contact</Link>
+                <Link to="/careers" className="footer-link">Careers</Link>
+                <Link to="/blog" className="footer-link">Blog</Link>
+                <Link to="/press" className="footer-link">Press</Link>
+                <Link to="/developers" className="footer-link">For Developers</Link>
+                <Link to="/support" className="footer-link">Support</Link>
+                <Link to="/feedback" className="footer-link">Feedback</Link>
+              </div>
+            </div>
+          </div>
+
+          {/* Footer Bottom */}
+          <div className="footer-bottom">
+            <div className="footer-copyright">
+              © 2025 HUZZ Games. All rights reserved. Made with ❤️ for gamers worldwide.
+            </div>
+            
+            <div className="footer-legal">
+              <Link to="/privacy" className="footer-legal-link">Privacy Policy</Link>
+              <Link to="/terms" className="footer-legal-link">Terms of Service</Link>
+              <Link to="/cookies" className="footer-legal-link">Cookie Policy</Link>
+              <Link to="/dmca" className="footer-legal-link">DMCA</Link>
+            </div>
+            
+            <div className="footer-badges">
+              <div className="footer-badge">
+                <FaGamepad className="footer-badge-icon" />
+                <span>1000+ Games</span>
+              </div>
+              <div className="footer-badge">
+                <FaStar className="footer-badge-icon" />
+                <span>4.8/5 Rating</span>
+              </div>
+              <div className="footer-badge">
+                <FaUsers className="footer-badge-icon" />
+                <span>50M+ Players</span>
+              </div>
+            </div>
+          </div>
+        </div>
+      </footer>
+
+      {/* Back to Top Button */}
+      <button
+        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
+        onClick={scrollToTop}
+        aria-label="Back to top"
+      >
+        <FaArrowUp />
+      </button>
+    </>
+  );
+}
+
+export default Footer;
+