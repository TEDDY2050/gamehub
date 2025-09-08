import { useState, useEffect } from 'react';

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('story');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { label: 'Games Available', value: '1000+', icon: '🎮' },
    { label: 'Active Players', value: '50K+', icon: '👥' },
    { label: 'Hours Played', value: '2M+', icon: '⏰' },
    { label: 'User Rating', value: '4.8★', icon: '⭐' }
  ];

  const features = [
    {
      title: 'Instant Play',
      description: 'No downloads, no installations. Click and play immediately in your browser.',
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Cross-Platform',
      description: 'Seamlessly play on desktop, tablet, or mobile. Your progress syncs everywhere.',
      icon: '🌐',
      color: 'from-blue-400 to-purple-500'
    },
    {
      title: 'Free to Play',
      description: 'Enjoy thousands of games completely free. Premium features available.',
      icon: '🎁',
      color: 'from-green-400 to-teal-500'
    },
    {
      title: 'Social Gaming',
      description: 'Challenge friends, join tournaments, and climb global leaderboards.',
      icon: '🏆',
      color: 'from-pink-400 to-rose-500'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Founded with a vision to make gaming accessible to everyone, everywhere.'
    },
    {
      year: '2021',
      title: 'First 100 Games',
      description: 'Reached our first milestone with classic arcade and puzzle games.'
    },
    {
      year: '2022',
      title: 'Mobile Revolution',
      description: 'Launched mobile-optimized platform, tripling our user base.'
    },
    {
      year: '2023',
      title: 'Social Features',
      description: 'Introduced multiplayer capabilities and social gaming features.'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Implemented smart game recommendations and adaptive difficulty.'
    },
    {
      year: '2025',
      title: 'The Future',
      description: 'Expanding into VR gaming and next-generation interactive experiences.'
    }
  ];

  const team = [
    {
      name: 'Makwana Priyanshu',
      role: 'Founder & CEO',
      description: 'Gaming industry veteran with 15+ years experience.',
      avatar: '👨‍💼'
    },
    {
      name: 'Yesha Mayani',
      role: 'CTO',
      description: 'Expert in web technologies and game engine development.',
      avatar: '👩‍💻'
    },
    {
      name: 'Yash Kananai',
      role: 'Head of Design',
      description: 'Creative visionary behind Gamehub\'s stunning user experience.',
      avatar: '👨‍🎨'
    },
    {
      name: 'Mantra Manya',
      role: 'Community Manager',
      description: 'Building and nurturing our amazing gaming community.',
      avatar: '👩‍🎮'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text mb-6">
              About Gamehub
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
              We're revolutionizing the way people experience games. From classic arcade adventures to cutting-edge multiplayer experiences, 
              Gamehub is your gateway to unlimited gaming entertainment.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
              {[
                { id: 'story', label: 'Our Story', icon: '📖' },
                { id: 'features', label: 'Features', icon: '⚡' },
                { id: 'timeline', label: 'Timeline', icon: '🕒' },
                { id: 'team', label: 'Team', icon: '👥' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 mr-2 ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-600 shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Our Story Tab */}
          {activeTab === 'story' && (
            <div className="space-y-16">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white mb-8">The Gamehub Story</h2>
                <div className="max-w-4xl mx-auto">
                  <p className="text-xl text-white/90 mb-8 leading-relaxed">
                    Born from a simple frustration: why should great gaming require expensive hardware, lengthy downloads, or complex installations? 
                    In 2020, we set out to democratize gaming, making it accessible to anyone with an internet connection.
                  </p>
                  <p className="text-xl text-white/90 mb-8 leading-relaxed">
                    What started as a small collection of browser games has evolved into a comprehensive gaming ecosystem. 
                    We've partnered with indie developers, AAA studios, and creative minds worldwide to bring you experiences that push the boundaries of what's possible in a web browser.
                  </p>
                  <p className="text-xl text-white/90 leading-relaxed">
                    Today, Gamehub isn't just a platform—it's a community. A place where casual players discover their new favorite time-killer, 
                    where competitive gamers clash in tournaments, and where developers showcase their creativity to a global audience.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    To break down barriers in gaming by creating an inclusive, accessible platform where anyone can discover, 
                    play, and connect through the universal language of games. We believe gaming should be instant, social, and available to all.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6">Our Vision</h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    A world where gaming transcends devices, budgets, and technical limitations. Where creativity thrives, 
                    communities flourish, and every player finds their perfect gaming experience just one click away.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-16">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white mb-8">Why Choose Gamehub?</h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  We've built more than just a gaming platform—we've created an ecosystem designed around the modern gamer's needs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-white/90 text-lg leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-12 border border-white/20 backdrop-blur-lg">
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-white mb-6">Advanced Gaming Technology</h3>
                  <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto">
                    Our cutting-edge web technology ensures smooth gameplay, minimal loading times, and seamless cross-device synchronization. 
                    Experience console-quality gaming right in your browser.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-4xl mb-3">🚀</div>
                      <h4 className="text-xl font-bold text-white mb-2">Lightning Fast</h4>
                      <p className="text-white/80">Optimized loading and gameplay</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-3">🔒</div>
                      <h4 className="text-xl font-bold text-white mb-2">Secure & Safe</h4>
                      <p className="text-white/80">Protected gaming environment</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-3">🎯</div>
                      <h4 className="text-xl font-bold text-white mb-2">Smart Matching</h4>
                      <p className="text-white/80">AI-powered game recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="space-y-16">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white mb-8">Our Journey</h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  From startup to industry leader—here's how we've evolved to serve millions of gamers worldwide.
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"></div>
                
                {timeline.map((item, index) => (
                  <div key={index} className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <div className="text-3xl font-bold text-purple-400 mb-2">{item.year}</div>
                        <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                        <p className="text-white/90 text-lg">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full border-4 border-white shadow-lg"></div>
                    </div>
                    
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="space-y-16">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white mb-8">Meet the Team</h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  The passionate individuals behind Gamehub's success—each bringing unique expertise to create the ultimate gaming experience.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {team.map((member, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group text-center"
                  >
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{member.avatar}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <div className="text-purple-400 font-semibold mb-4">{member.role}</div>
                    <p className="text-white/90 text-sm">{member.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-12 border border-white/20 backdrop-blur-lg text-center">
                <h3 className="text-4xl font-bold text-white mb-6">Join Our Growing Team</h3>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  We're always looking for talented individuals who share our passion for gaming and innovation. 
                  If you're ready to help shape the future of browser-based gaming, we'd love to hear from you.
                </p>
                <a 
                  href="/careers"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span>View Open Positions</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-3xl p-12 border border-white/20 backdrop-blur-lg">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Gaming?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join millions of players worldwide and discover your next favorite game. No downloads, no waiting—just pure gaming fun.
            </p>
            <a 
              href="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Start Playing Now</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-9V3a1 1 0 011-1h1a1 1 0 011 1v2M7 21h10a2 2 0 002-2V9a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;