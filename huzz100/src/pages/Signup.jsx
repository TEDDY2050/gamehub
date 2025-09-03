import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash, FaCheck, FaGamepad, FaArrowLeft } from 'react-icons/fa';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'Contains number', met: /\d/.test(formData.password) },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { username, password } = formData;

    if (!username || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      setLoading(false);
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service');
      setLoading(false);
      return;
    }

    try{ 
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password })
      })

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong');
        setLoading(false);
        return;
      }
      setLoading(false);
      alert('Account Created Successfully! Welcome to HUZZ!');
    } catch (error) {
      setError('Failed to create account');
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Sign up with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
              <FaGamepad className="text-white text-xl group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              HUZZ
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Join the Adventure</h2>
          <p className="text-gray-400">Create your account and join millions of players worldwide</p>
        </div>

        {/* Signup Form */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSignup}>
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm backdrop-blur-xl">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-xl border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-700/70 transition-all duration-300"
                placeholder="Choose a unique username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 bg-gray-700/50 backdrop-blur-xl border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-700/70 transition-all duration-300"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-3 space-y-2">
                  {passwordRequirements.map((requirement, index) => (
                    <div key={index} className={`flex items-center gap-2 text-xs transition-colors duration-300 ${
                      requirement.met ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        requirement.met ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        {requirement.met && <FaCheck className="text-xs" />}
                      </div>
                      {requirement.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start gap-3">
              <input
                id="agree-terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
              />
              <label htmlFor="agree-terms" className="text-sm text-gray-300 leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Social Signup */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-800/50 text-gray-400">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleSocialSignup('Google')}
                  className="flex items-center justify-center gap-2 py-3 bg-gray-700/50 backdrop-blur-xl border border-gray-600/50 rounded-xl text-gray-300 hover:bg-gray-600/50 hover:text-white transition-all duration-300"
                >
                  <FaGoogle className="text-red-500" />
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialSignup('Facebook')}
                  className="flex items-center justify-center gap-2 py-3 bg-gray-700/50 backdrop-blur-xl border border-gray-600/50 rounded-xl text-gray-300 hover:bg-gray-600/50 hover:text-white transition-all duration-300"
                >
                  <FaFacebook className="text-blue-600" />
                  <span>Facebook</span>
                </button>
              </div>
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-300">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Games */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaArrowLeft />
            <span>Back to Games</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;