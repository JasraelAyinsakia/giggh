import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, UserPlus, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { authAPI } from '../services/api';

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null);
  
  // Customer form data
  const [customerData, setCustomerData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
  });

  // Performer form data
  const [performerData, setPerformerData] = useState({
    // Account info
    username: '',
    email: '',
    phone: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    // Performer profile (Step 2)
    name: '',
    category: '',
    sub_category: '',
    price_tier: '',
    exact_price: '',
    years_experience: '',
    location: '',
    bio: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Choose user type
  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setStep(2);
    setError('');
  };

  // Step 2: Customer signup
  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (customerData.password !== customerData.password_confirm) {
      setError('Passwords do not match');
      return;
    }

    if (customerData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const registrationData = {
        username: customerData.username,
        email: customerData.email,
        password: customerData.password,
        password_confirm: customerData.password_confirm,
        first_name: customerData.first_name,
        last_name: customerData.last_name,
        phone: customerData.phone,
        user_type: 'customer',
      };

      await authAPI.register(registrationData);
      navigate('/login?registered=true&type=customer');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Performer account creation
  const handlePerformerAccountSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (performerData.password !== performerData.password_confirm) {
      setError('Passwords do not match');
      return;
    }

    if (performerData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const registrationData = {
        username: performerData.username,
        email: performerData.email,
        password: performerData.password,
        password_confirm: performerData.password_confirm,
        first_name: performerData.first_name,
        last_name: performerData.last_name,
        phone: performerData.phone,
        user_type: 'performer',
      };

      await authAPI.register(registrationData);
      // Move to step 3 to create performer profile
      setStep(3);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Performer profile creation
  const handlePerformerProfileSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!performerData.name || !performerData.category || !performerData.sub_category || 
        !performerData.price_tier || !performerData.exact_price || !performerData.location || 
        !performerData.bio) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // First login to get token
      const loginResponse = await authAPI.login({
        username: performerData.username,
        password: performerData.password,
      });

      // Store token
      localStorage.setItem('access_token', loginResponse.data.access);
      localStorage.setItem('refresh_token', loginResponse.data.refresh);

      // Create performer profile
      const { performersAPI } = await import('../services/api');
      await performersAPI.create({
        name: performerData.name,
        bio: performerData.bio,
        category: performerData.category,
        sub_category: performerData.sub_category,
        price_tier: performerData.price_tier,
        exact_price: parseFloat(performerData.exact_price),
        years_experience: parseInt(performerData.years_experience) || 0,
        location: performerData.location,
        areas_served: [performerData.location],
        video_urls: [],
        skills: [],
      });

      navigate('/dashboard/performer?profile_created=true');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.detail || 'Failed to create performer profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Choose user type
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-purple-600 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                <Music className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">GigGH</div>
                <div className="text-xs text-gray-500">Connecting talent with celebrations</div>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">Join GigGH</h2>
            <p className="mt-2 text-gray-600">Choose how you want to use the platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Card */}
            <button
              onClick={() => handleUserTypeSelect('customer')}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all text-left border-2 border-transparent hover:border-purple-300 group"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <UserPlus className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">I'm a Customer</h3>
              <p className="text-gray-600 mb-4">
                Looking for talented performers for my events
              </p>
              <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </button>

            {/* Performer Card */}
            <button
              onClick={() => handleUserTypeSelect('performer')}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all text-left border-2 border-transparent hover:border-orange-300 group"
            >
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <Music className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">I'm a Performer</h3>
              <p className="text-gray-600 mb-4">
                Want to offer my entertainment services
              </p>
              <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-purple-600 hover:text-purple-700">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Customer signup form
  if (step === 2 && userType === 'customer') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-purple-600 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                <Music className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">GigGH</div>
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">Create Customer Account</h2>
            <p className="mt-2 text-gray-600">Sign up to book talented performers</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleCustomerSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerData.first_name}
                    onChange={(e) => setCustomerData({ ...customerData, first_name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerData.last_name}
                    onChange={(e) => setCustomerData({ ...customerData, last_name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={customerData.username}
                  onChange={(e) => setCustomerData({ ...customerData, username: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={customerData.email}
                  onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                  placeholder="+233 XX XXX XXXX"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={customerData.password}
                  onChange={(e) => setCustomerData({ ...customerData, password: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={customerData.password_confirm}
                  onChange={(e) => setCustomerData({ ...customerData, password_confirm: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <span>Creating account...</span>
                  ) : (
                    <>
                      <span>Sign Up</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Performer account signup
  if (step === 2 && userType === 'performer') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-purple-600 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                <Music className="w-7 h-7 text-white" />
              </div>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">Step 1: Create Account</h2>
            <p className="mt-2 text-gray-600">Create your account first</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handlePerformerAccountSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={performerData.first_name}
                    onChange={(e) => setPerformerData({ ...performerData, first_name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={performerData.last_name}
                    onChange={(e) => setPerformerData({ ...performerData, last_name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={performerData.username}
                  onChange={(e) => setPerformerData({ ...performerData, username: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={performerData.email}
                  onChange={(e) => setPerformerData({ ...performerData, email: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={performerData.phone}
                  onChange={(e) => setPerformerData({ ...performerData, phone: e.target.value })}
                  placeholder="+233 XX XXX XXXX"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={performerData.password}
                  onChange={(e) => setPerformerData({ ...performerData, password: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={performerData.password_confirm}
                  onChange={(e) => setPerformerData({ ...performerData, password_confirm: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <span>Creating...</span>
                  ) : (
                    <>
                      <span>Next: Create Profile</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Performer profile creation
  if (step === 3 && userType === 'performer') {
    const categories = {
      Musicians: ['Keyboardist', 'Violinist', 'Guitarist', 'Saxophonist', 'Drummer', 'DJ', 'Live Band', 'Solo Singer', 'Choir/Group', 'Traditional Instruments'],
      Dancers: ['Afrobeat', 'Hip-hop', 'Traditional Ghanaian', 'Contemporary', 'Cultural Dance Troupe', 'Solo Dancer', 'Dance Crew'],
      Comedians: ['Stand-up Comedian', 'MC/Event Host', 'Comedy Skits', 'Improv/Interactive'],
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Step 2: Create Performer Profile</h2>
            <p className="mt-2 text-gray-600">Tell us about your talent</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handlePerformerProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Stage/Performance Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={performerData.name}
                  onChange={(e) => setPerformerData({ ...performerData, name: e.target.value })}
                  placeholder="Your stage name or performance name"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={performerData.category}
                    onChange={(e) => {
                      setPerformerData({ ...performerData, category: e.target.value, sub_category: '' });
                    }}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  >
                    <option value="">Select category</option>
                    {Object.keys(categories).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Sub-Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={performerData.sub_category}
                    onChange={(e) => setPerformerData({ ...performerData, sub_category: e.target.value })}
                    disabled={!performerData.category}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none disabled:bg-gray-100"
                  >
                    <option value="">Select sub-category</option>
                    {performerData.category && categories[performerData.category]?.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Price Tier <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={performerData.price_tier}
                    onChange={(e) => setPerformerData({ ...performerData, price_tier: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  >
                    <option value="">Select tier</option>
                    <option value="Basic">Basic (GH₵500+)</option>
                    <option value="Standard">Standard (GH₵1,500+)</option>
                    <option value="Premium">Premium (GH₵7,000+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Exact Price (GH₵) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={performerData.exact_price}
                    onChange={(e) => setPerformerData({ ...performerData, exact_price: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={performerData.years_experience}
                    onChange={(e) => setPerformerData({ ...performerData, years_experience: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={performerData.location}
                    onChange={(e) => setPerformerData({ ...performerData, location: e.target.value })}
                    placeholder="e.g., East Legon, Accra"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Bio/Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="4"
                  value={performerData.bio}
                  onChange={(e) => setPerformerData({ ...performerData, bio: e.target.value })}
                  placeholder="Tell us about your style, experience, and what makes you unique..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> You can add photos, videos, and more details later in your dashboard.
                </p>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <span>Creating profile...</span>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Complete Signup</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SignUp;
