import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, Play, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BookingModal from '../components/BookingModal';

const PerformerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { performers } = useApp();
  const performer = performers.find((p) => p.id === parseInt(id));
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (!performer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-4">Performer not found</p>
          <button
            onClick={() => navigate('/browse')}
            className="px-6 py-2 bg-[#7C3AED] text-white rounded-lg"
          >
            Browse Performers
          </button>
        </div>
      </div>
    );
  }

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Premium':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 'Standard':
        return 'bg-[#7C3AED] text-white';
      case 'Basic':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleBookingSubmit = (formData) => {
    console.log('Booking submitted:', formData);
    // In Phase 2, this will send to API
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="text-[#7C3AED] hover:text-[#6D28D9] mb-4 inline-flex items-center space-x-2"
          >
            <span>← Back</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={performer.profilePhoto}
                    alt={performer.name}
                    className="w-full md:w-48 h-48 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                          {performer.name}
                        </h1>
                        <p className="text-lg text-[#7C3AED] font-medium mb-2">
                          {performer.category} • {performer.subCategory}
                        </p>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-1">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span className="text-lg font-semibold">{performer.rating}</span>
                            <span className="text-gray-500">
                              ({performer.reviewCount} reviews)
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{performer.yearsExperience} years experience</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getTierColor(
                          performer.priceTier
                        )}`}
                      >
                        {performer.priceTier}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{performer.location}</span>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Areas Served:</h3>
                      <div className="flex flex-wrap gap-2">
                        {performer.areasServed.map((area) => (
                          <span
                            key={area}
                            className="px-3 py-1 bg-purple-100 text-[#7C3AED] rounded-full text-sm"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                      <p className="text-gray-700 leading-relaxed">{performer.bio}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-2">Skills & Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        {performer.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-orange-100 text-[#FF6B35] rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Videos Section */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {performer.videoUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => setSelectedVideo(url)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-medium">Video {index + 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Reviews ({performer.reviews.length})
                </h2>
                <div className="space-y-6">
                  {performer.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                          <p className="text-sm text-gray-500">{review.eventType}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{review.review}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-[#7C3AED] mb-2">
                    GH₵{performer.exactPrice.toLocaleString()}
                  </div>
                  <p className="text-gray-500">per event</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Price Tier</span>
                    <span className="font-semibold">{performer.priceTier}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{performer.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold">{performer.yearsExperience} years</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Reviews</span>
                    <span className="font-semibold">{performer.reviewCount}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full px-6 py-4 bg-[#FF6B35] text-white rounded-lg font-semibold text-lg hover:bg-[#e55a2b] transition-colors"
                >
                  Book Now
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  GigGH team will contact you within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X size={32} />
            </button>
            <div className="aspect-video">
              <iframe
                src={selectedVideo}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        performer={performer}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
};

export default PerformerProfile;

