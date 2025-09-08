import { useState, useEffect } from 'react';

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactMethods = [
    {
      title: 'Live Chat Support',
      description: 'Get instant help from our support team',
      icon: '💬',
      availability: '24/7 Available',
      action: 'Start Chat',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Email Support',
      description: 'Send us detailed questions or feedback',
      icon: '📧',
      availability: 'Response within 4 hours',
      action: 'Send Email',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other players and get help',
      icon: '🌐',
      availability: 'Community-driven',
      action: 'Visit Forum',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Video Call',
      description: 'Schedule a face-to-face meeting',
      icon: '📹',
      availability: 'Business hours only',
      action: 'Schedule Call',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const supportCategories = [
    {
      id: 'general',
      name: 'General Inquiry',
      icon: '💭',
      description: 'General questions about Gamehub'
    },
    {
      id: 'technical',
      name: 'Technical Support',
      icon: '🔧',
      description: 'Having trouble with games or the platform?'
    },
    {
      id: 'account',
      name: 'Account Issues',
      icon: '👤',
      description: 'Problems with your account or login'
    },
    {
      id: 'billing',
      name: 'Billing & Payments',
      icon: '💳',
      description: 'Questions about subscriptions or payments'
    },
    {
      id: 'feedback',
      name: 'Feedback',
      icon: '⭐',
      description: 'Share your thoughts and suggestions'
    },
    {
      id: 'partnership',
      name: 'Business Partnership',
      icon: '🤝',
      description: 'Interested in partnering with us?'
    }
  ];

  const faqData = [
    {
      category: 'Account',
      questions: [
        {
          q: 'How do I create a Gamehub account?',
          a: 'Click the "Sign Up" button in the top right corner, fill in your details, and verify your email address. You\'ll be gaming in minutes!'
        },
        {
          q: 'I forgot my password. How do I reset it?',
          a: 'Go to the login page and click "Forgot Password". Enter your email address and we\'ll send you a reset link.'
        },
        {
          q: 'Can I change my username?',
          a: 'Yes! Go to Account Settings > Profile and you can update your display name. Note that usernames can only be changed once every 30 days.'
        }
      ]
    },
    {
      category: 'Gaming',
      questions: [
        {
          q: 'Do I need to download anything to play games?',
          a: 'No downloads required! All our games run directly in your web browser. Just click and play instantly.'
        },
        {
          q: 'Which browsers are supported?',
          a: 'Gamehub works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend Chrome for the best experience.'
        },
        {
          q: 'Can I play on mobile devices?',
          a: 'Absolutely! Our games are optimized for mobile play on both iOS and Android devices through your mobile browser.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          q: 'Games are running slowly. What can I do?',
          a: 'Try closing other browser tabs, clearing your browser cache, or switching to a different browser. Make sure you have a stable internet connection.'
        },
        {
          q: 'I\'m having audio issues in games.',
          a: 'Check that your browser allows audio for our site, ensure your device volume is up, and try refreshing the game page.'
        },
        {
          q: 'My game progress isn\'t saving.',
          a: 'Make sure you\'re logged into your account and that cookies are enabled in your browser. Progress is automatically saved for registered users.'
        }
      ]
    }
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '123 Gaming Street, SOMA District',
      country: 'USA',
      timezone: 'PST',
      phone: '+1 (555) 123-4567',
      type: 'Headquarters'
    },
    {
      city: 'London',
      address: '456 Tech Avenue, Shoreditch',
      country: 'United Kingdom',
      timezone: 'GMT',
      phone: '+44 20 1234 5678',
      type: 'European Office'
    },
    {
      city: 'Tokyo',
      address: '789 Innovation Plaza, Shibuya',
      country: 'Japan',
      timezone: 'JST',
      phone: '+81 3 1234 5678',
      type: 'Asia Pacific'
    },
    {
      city: 'Remote Workers',
      address: 'Working from 25+ countries worldwide',
      country: 'Global',
      timezone: 'All Zones',
      phone: 'Via Slack/Teams',
      type: 'Distributed Team'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'normal'
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
              Have questions, feedback, or need support? Our team is here to help 24/7. 
              Choose how you'd like to connect with us below.
            </p>
            
            {/* Response Time Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">&lt;4hrs</div>
                <div className="text-white/70 text-sm">Email Response</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-white/70 text-sm">Live Chat</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-white/70 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-8">How Would You Like to Connect?</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Choose the method that works best for you. Our support team is ready to help across all channels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 text-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform mx-auto`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{method.title}</h3>
                <p className="text-white/90 mb-4 leading-relaxed">{method.description}</p>
                <p className="text-sm text-white/70 mb-6">{method.availability}</p>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-full font-bold hover:scale-105 transition-all duration-300">
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-8">Send Us a Message</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Fill out the form below and we'll get back to you as soon as possible. 
              The more details you provide, the better we can help you.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
            {/* Category Selection */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">What can we help you with?</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {supportCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                      formData.category === category.id
                        ? 'bg-purple-600/30 border-purple-400 text-white'
                        : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-semibold">{category.name}</span>
                    </div>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-3">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-3">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-3">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Brief description of your inquiry"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-3">Priority Level</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="low" className="bg-gray-800">Low - General inquiry</option>
                    <option value="normal" className="bg-gray-800">Normal - Standard support</option>
                    <option value="high" className="bg-gray-800">High - Urgent issue</option>
                    <option value="critical" className="bg-gray-800">Critical - Service disruption</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="8"
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Please provide as much detail as possible about your question or issue. Include any error messages, steps you've already tried, and your device/browser information if relevant."
                  required
                ></textarea>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/20">
                <div className="flex items-start space-x-3">
                  <div className="text-xl">💡</div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Pro Tip for Faster Support:</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• Include your browser name and version</li>
                      <li>• Mention what device you're using (desktop/mobile)</li>
                      <li>• Describe the exact steps that led to the issue</li>
                      <li>• Attach screenshots if possible (you can email them to us)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 rounded-xl font-bold text-lg uppercase tracking-wide transition-all duration-300 shadow-lg ${
                  isSubmitting
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending Message...</span>
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Find quick answers to common questions. Can't find what you're looking for? Contact our support team.
            </p>
          </div>

          <div className="space-y-8">
            {faqData.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">{section.category}</h3>
                <div className="space-y-6">
                  {section.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-xl font-semibold text-white mb-3 flex items-start">
                        <span className="text-purple-400 mr-3">Q:</span>
                        {faq.q}
                      </h4>
                      <div className="text-white/90 leading-relaxed flex items-start">
                        <span className="text-green-400 mr-3 mt-1">A:</span>
                        <span>{faq.a}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-white/80 mb-6">Still have questions?</p>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300">
              Contact Support Team
            </button>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-8">Our Global Presence</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              With offices around the world and a distributed remote team, we're always here to support our global gaming community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {officeLocations.map((office, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{office.city}</h3>
                  <span className="inline-block bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full text-sm font-semibold">
                    {office.type}
                  </span>
                </div>

                <div className="space-y-4 text-white/90">
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-400">📍</span>
                    <div>
                      <div className="font-medium">{office.address}</div>
                      <div className="text-sm text-white/70">{office.country}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">🕒</span>
                    <span>{office.timezone}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">📞</span>
                    <span className="font-mono text-sm">{office.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-600/30 to-orange-600/30 rounded-3xl p-12 border border-red-400/30 backdrop-blur-lg text-center">
            <div className="text-6xl mb-6">🚨</div>
            <h2 className="text-4xl font-bold text-white mb-6">Critical Issues?</h2>
            <p className="text-xl text-white/90 mb-8">
              If you're experiencing a critical service disruption or security concern that affects gameplay or account safety, 
              contact our emergency support line immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+1-555-GAMEHUB"
                className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>📞</span>
                <span>Emergency Hotline</span>
              </a>
              <button className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <span>⚡</span>
                <span>Priority Chat</span>
              </button>
            </div>
            <p className="text-white/70 text-sm mt-6">
              Emergency support is available 24/7 for critical issues only. 
              For general inquiries, please use the regular contact methods above.
            </p>
          </div>
        </div>
      </section>

      {/* Social Media & Community */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-8">Join Our Community</h2>
          <p className="text-xl text-white/90 mb-12">
            Connect with fellow gamers, get the latest updates, and be part of the Gamehub family on social media.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { name: 'Discord', icon: '💬', users: '25K+', color: 'from-indigo-500 to-purple-500' },
              { name: 'Twitter', icon: '🐦', users: '50K+', color: 'from-blue-500 to-cyan-500' },
              { name: 'Reddit', icon: '🔥', users: '15K+', color: 'from-orange-500 to-red-500' },
              { name: 'YouTube', icon: '📺', users: '100K+', color: 'from-red-500 to-pink-500' }
            ].map((social, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${social.color} flex items-center justify-center text-xl mb-4 mx-auto`}>
                  {social.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{social.name}</h3>
                <p className="text-white/70 text-sm">{social.users} followers</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-3xl p-8 border border-white/20 backdrop-blur-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-white/90 mb-6">
              Subscribe to our newsletter for game updates, exclusive content, and community highlights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;