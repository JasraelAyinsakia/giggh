import { Link } from 'react-router-dom';
import { Search, Music, Sparkles, Smile, ArrowRight, Star, Users, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import PerformerCard from '../components/PerformerCard';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { performers } = useApp();
  const featuredPerformers = performers
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % featuredPerformers.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + featuredPerformers.length) % featuredPerformers.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#7C3AED] via-purple-600 to-[#FF6B35] text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Perfect Entertainment for Your Celebration
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-purple-100">
              Connect with talented musicians, dancers, and comedians in Ghana
            </p>
            <div className="max-w-2xl mx-auto mb-10">
              <SearchBar />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/browse"
                className="px-8 py-4 bg-[#FF6B35] text-white rounded-lg font-bold text-lg hover:bg-[#e55a2b] transition-all inline-flex items-center space-x-2 shadow-lg"
              >
                <span>Browse All Performers</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/browse?category=Musicians"
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl hover:shadow-xl transition-all duration-300 group border-2 border-purple-100 hover:border-purple-300"
            >
              <div className="bg-[#7C3AED] w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Musicians</h3>
              <p className="text-gray-600 mb-4">
                Keyboardists, violinists, DJs, live bands, and more
              </p>
              <span className="text-[#7C3AED] font-semibold inline-flex items-center space-x-1 group-hover:translate-x-2 transition-transform">
                <span>Explore</span>
                <ArrowRight size={16} />
              </span>
            </Link>

            <Link
              to="/browse?category=Dancers"
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl hover:shadow-xl transition-all duration-300 group border-2 border-orange-100 hover:border-orange-300"
            >
              <div className="bg-[#FF6B35] w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Dancers</h3>
              <p className="text-gray-600 mb-4">
                Afrobeat, traditional, hip-hop, and contemporary dancers
              </p>
              <span className="text-[#FF6B35] font-semibold inline-flex items-center space-x-1 group-hover:translate-x-2 transition-transform">
                <span>Explore</span>
                <ArrowRight size={16} />
              </span>
            </Link>

            <Link
              to="/browse?category=Comedians"
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl hover:shadow-xl transition-all duration-300 group border-2 border-purple-100 hover:border-purple-300"
            >
              <div className="bg-[#7C3AED] w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Smile className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Comedians</h3>
              <p className="text-gray-600 mb-4">
                Stand-up comedians, MCs, and comedy skit performers
              </p>
              <span className="text-[#7C3AED] font-semibold inline-flex items-center space-x-1 group-hover:translate-x-2 transition-transform">
                <span>Explore</span>
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section - ON HOME PAGE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#7C3AED] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Browse</h3>
              <p className="text-gray-600">
                Explore talented entertainers by category, location, and price
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#FF6B35] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Book</h3>
              <p className="text-gray-600">
                Submit a booking request and our team will confirm within 24 hours
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#7C3AED] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Celebrate</h3>
              <p className="text-gray-600">
                Enjoy your event and rate your experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured/Top-rated Performers CAROUSEL */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Top-Rated Performers</h2>
            <Link
              to="/browse"
              className="text-[#7C3AED] font-semibold hover:text-[#6D28D9] inline-flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
              >
                {featuredPerformers.map((performer) => (
                  <div key={performer.id} className="min-w-full px-4">
                    <div className="max-w-md mx-auto">
                      <PerformerCard performer={performer} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredPerformers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCarouselIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === carouselIndex ? 'bg-[#7C3AED] w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gradient-to-r from-[#7C3AED] to-[#FF6B35] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">{performers.length}+</h3>
              <p className="text-purple-100">Talented Performers</p>
            </div>
            <div>
              <Calendar className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-purple-100">Successful Events</p>
            </div>
            <div>
              <Star className="w-12 h-12 mx-auto mb-4 fill-yellow-300 text-yellow-300" />
              <h3 className="text-3xl font-bold mb-2">4.7</h3>
              <p className="text-purple-100">Average Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
