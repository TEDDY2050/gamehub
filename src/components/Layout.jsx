import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle scroll effect for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-32 h-32 border-8 border-purple-300 border-t-white rounded-full animate-spin mb-8"></div>
            <div className="absolute inset-0 w-32 h-32 border-8 border-transparent border-t-cyan-300 rounded-full animate-spin animation-reverse"></div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 animate-pulse">Gamehub</h2>
          <p className="text-white/80 text-xl">Loading your gaming experience...</p>
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-container min-h-screen bg-gray-50 flex flex-col">
      {/* Enhanced Navbar with Scroll Effect */}
      <div className={`navbar-container fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}>
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative">
        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B5CF6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Page Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Scroll to Top Button */}
        {isScrolled && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 group"
          >
            <svg 
              className="w-6 h-6 group-hover:-translate-y-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
      </main>

      {/* Enhanced Footer */}
      <Footer />

      {/* Global Styles */}
      <style jsx>{`
        .loading-screen {
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%);
        }
        
        .animation-reverse {
          animation-direction: reverse;
        }
        
        .navbar-container {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        @media (max-width: 768px) {
          .layout-container {
            padding-top: 0;
          }
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #8B5CF6, #06B6D4);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #7C3AED, #0891B2);
        }
      `}</style>
    </div>
  );
}

export default Layout;