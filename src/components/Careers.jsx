import { useState, useEffect } from 'react';

function Careers() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    position: '',
    resume: null,
    coverLetter: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const departments = [
    { id: 'all', name: 'All Departments', icon: '🏢' },
    { id: 'engineering', name: 'Engineering', icon: '⚙️' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'product', name: 'Product', icon: '📱' },
    { id: 'marketing', name: 'Marketing', icon: '📈' },
    { id: 'community', name: 'Community', icon: '👥' }
  ];

  const openPositions = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'engineering',
      location: 'Remote / San Francisco',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Build cutting-edge web gaming experiences using React, WebGL, and modern JavaScript frameworks.',
      requirements: [
        'Expert knowledge of React, JavaScript/TypeScript, and CSS',
        'Experience with WebGL, Canvas, or game development frameworks',
        'Understanding of browser performance optimization',
        'Experience with real-time multiplayer systems',
        'Knowledge of WebRTC and WebSocket technologies'
      ],
      benefits: ['Stock options', 'Health insurance', 'Flexible hours', 'Game development budget']
    },
    {
      id: 2,
      title: 'Game Designer',
      department: 'design',
      location: 'Remote / Los Angeles',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Create engaging gameplay mechanics and user experiences for browser-based games.',
      requirements: [
        'Experience in game design and prototyping',
        'Knowledge of Unity, Unreal, or web-based game engines',
        'Strong understanding of game mechanics and player psychology',
        'Experience with multiplayer game design',
        'Portfolio of shipped games or prototypes'
      ],
      benefits: ['Creative freedom', 'Conference budget', 'Latest gaming hardware', 'Unlimited PTO']
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Scale our gaming infrastructure to support millions of concurrent players worldwide.',
      requirements: [
        'Experience with AWS, Docker, and Kubernetes',
        'Knowledge of CDN optimization for gaming content',
        'Experience with real-time analytics and monitoring',
        'Understanding of low-latency networking',
        'Experience with auto-scaling gaming infrastructure'
      ],
      benefits: ['Equity package', 'Home office setup', '401k matching', 'Learning budget']
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      department: 'design',
      location: 'New York / Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Design intuitive interfaces that make gaming accessible to players of all skill levels.',
      requirements: [
        'Proficiency in Figma, Sketch, or similar design tools',
        'Experience with responsive web design',
        'Knowledge of accessibility standards',
        'Understanding of gaming UX patterns',
        'Experience with user research and testing'
      ],
      benefits: ['Design conference budget', 'Latest Apple hardware', 'Flexible schedule', 'Health & dental']
    },
    {
      id: 5,
      title: 'Product Manager - Gaming',
      department: 'product',
      location: 'San Francisco / Remote',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Drive product strategy for new gaming features and platform improvements.',
      requirements: [
        'Experience in gaming or entertainment products',
        'Strong analytical skills with data-driven decision making',
        'Knowledge of game monetization strategies',
        'Experience with A/B testing and user analytics',
        'Understanding of gaming market trends'
      ],
      benefits: ['Equity participation', 'Premium health plan', 'Gaming industry events', 'Growth budget']
    },
    {
      id: 6,
      title: 'Community Manager',
      department: 'community',
      location: 'Remote',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Build and nurture our gaming community across social platforms and in-game interactions.',
      requirements: [
        'Experience managing online gaming communities',
        'Strong social media and content creation skills',
        'Understanding of gaming culture and trends',
        'Experience with community tools and platforms',
        'Excellent communication and interpersonal skills'
      ],
      benefits: ['Work from anywhere', 'Gaming equipment allowance', 'Professional development', 'Stock options']
    },
    {
      id: 7,
      title: 'Marketing Manager - Growth',
      department: 'marketing',
      location: 'Los Angeles / Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Lead user acquisition and growth initiatives to expand our global gaming audience.',
      requirements: [
        'Experience with digital marketing and user acquisition',
        'Knowledge of gaming advertising platforms',
        'Experience with influencer and content marketing',
        'Strong analytical skills and ROI optimization',
        'Understanding of viral marketing in gaming'
      ],
      benefits: ['Marketing budget control', 'Conference travel', 'Performance bonuses', 'Comprehensive benefits']
    },
    {
      id: 8,
      title: 'Backend Engineer - Real-time Systems',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Build scalable backend systems for real-time multiplayer gaming experiences.',
      requirements: [
        'Experience with Node.js, Python, or Go',
        'Knowledge of WebSocket and real-time communication',
        'Experience with database optimization for gaming',
        'Understanding of anti-cheat and security systems',
        'Experience with microservices architecture'
      ],
      benefits: ['Top-tier salary', 'Equity package', 'Tech conference budget', 'Flexible work environment']
    }
  ];

  const perks = [
    {
      title: 'Unlimited Gaming Budget',
      description: 'Play and research games on company time and budget',
      icon: '🎮',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Flexible Work Environment',
      description: 'Work from anywhere with flexible hours that suit your lifestyle',
      icon: '🌍',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Equity & Stock Options',
      description: 'Own a piece of the gaming revolution with competitive equity packages',
      icon: '📈',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Learning & Development',
      description: 'Annual budget for courses, conferences, and skill development',
      icon: '📚',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Health & Wellness',
      description: 'Comprehensive health coverage plus wellness stipends',
      icon: '🏥',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Latest Tech & Equipment',
      description: 'Top-of-the-line hardware and software for optimal productivity',
      icon: '💻',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const companyValues = [
    {
      title: 'Player First',
      description: 'Every decision we make puts our gaming community at the center.',
      icon: '🎯'
    },
    {
      title: 'Innovation Mindset',
      description: 'We constantly push boundaries and embrace new technologies.',
      icon: '🚀'
    },
    {
      title: 'Inclusive Gaming',
      description: 'Creating games that welcome players from all backgrounds and skill levels.',
      icon: '🌈'
    },
    {
      title: 'Quality Excellence',
      description: 'We ship polished experiences that exceed player expectations.',
      icon: '⭐'
    }
  ];

  const filteredPositions = selectedDepartment === 'all' 
    ? openPositions 
    : openPositions.filter(pos => pos.department === selectedDepartment);

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted! We\'ll get back to you soon.');
    setApplicationData({
      name: '',
      email: '',
      position: '',
      resume: null,
      coverLetter: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text mb-6">
              Join the Team
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
              Help us revolutionize gaming for millions of players worldwide. We're building the future of browser-based entertainment, 
              and we want passionate, talented individuals to join our mission.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-white/70 text-sm">Team Members</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">12</div>
                <div className="text-white/70 text-sm">Open Positions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">15+</div>
                <div className="text-white/70 text-sm">Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
                <div className="text-white/70 text-sm">Employee Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-8">Our Values</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              These core principles guide everything we do and help create an environment where everyone can thrive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-white/90 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks & Benefits */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-8">Why Work With Us?</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We believe in taking care of our team with comprehensive benefits and unique perks that you won't find anywhere else.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <div 
                key={index}
                className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${perk.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  {perk.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{perk.title}</h3>
                <p className="text-white/90 leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-8">Open Positions</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              Ready to make your mark in the gaming industry? Explore our current openings and find your perfect role.
            </p>

            {/* Department Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedDepartment === dept.id
                      ? 'bg-white text-purple-600 shadow-lg'
                      : 'bg-white/10 text-white/80 hover:text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  <span>{dept.icon}</span>
                  <span>{dept.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-8">
            {filteredPositions.map((position) => (
              <div 
                key={position.id}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-white/80">
                      <span className="bg-purple-600/30 px-3 py-1 rounded-full">{position.department}</span>
                      <span className="bg-blue-600/30 px-3 py-1 rounded-full">{position.location}</span>
                      <span className="bg-green-600/30 px-3 py-1 rounded-full">{position.type}</span>
                      <span className="bg-orange-600/30 px-3 py-1 rounded-full">{position.experience}</span>
                    </div>
                  </div>
                  <button className="mt-4 lg:mt-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                    Apply Now
                  </button>
                </div>

                <p className="text-white/90 text-lg mb-6 leading-relaxed">{position.description}</p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Requirements:</h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-3 text-white/90">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {position.benefits.map((benefit, index) => (
                        <span key={index} className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white px-3 py-1 rounded-full text-sm border border-white/20">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-8">Ready to Apply?</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Don't see the perfect position? Send us your information anyway! We're always looking for exceptional talent to join our team.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
            <form onSubmit={handleApplicationSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-3">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={applicationData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-3">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Position of Interest</label>
                <select
                  name="position"
                  value={applicationData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select a position</option>
                  {openPositions.map((position) => (
                    <option key={position.id} value={position.title} className="bg-gray-800">
                      {position.title}
                    </option>
                  ))}
                  <option value="other" className="bg-gray-800">Other - I'll specify in cover letter</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Resume/Portfolio</label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Cover Letter</label>
                <textarea
                  name="coverLetter"
                  value={applicationData.coverLetter}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about yourself, your experience, and why you want to join Gamehub..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-xl font-bold text-lg uppercase tracking-wide hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact HR */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-3xl p-12 border border-white/20 backdrop-blur-lg">
            <h2 className="text-4xl font-bold text-white mb-6">Questions About Working Here?</h2>
            <p className="text-xl text-white/90 mb-8">
              Our HR team is here to help! Reach out with any questions about positions, benefits, culture, or the application process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:careers@gamehub.com"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>📧</span>
                <span>Email HR Team</span>
              </a>
              <a 
                href="#"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>💬</span>
                <span>Schedule Call</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Careers;