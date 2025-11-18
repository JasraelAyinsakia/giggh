import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';

const PerformerCard = ({ performer, viewMode = 'grid' }) => {
  const getTierColor = (tier) => {
    switch (tier) {
      case 'Premium':
        return 'bg-yellow-500 text-white';
      case 'Standard':
        return 'bg-purple-600 text-white';
      case 'Basic':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // List View
  if (viewMode === 'list') {
    return (
      <Link
        to={`/performer/${performer.id}`}
        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col md:flex-row"
      >
        <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
          <img
            src={performer.profilePhoto}
            alt={performer.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ imageRendering: 'crisp-edges', backfaceVisibility: 'hidden' }}
          />
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {performer.name}
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${getTierColor(performer.priceTier)}`}>
                    {performer.priceTier}
                  </div>
                </div>
                <p className="text-sm text-purple-600 font-semibold mb-3 uppercase tracking-wide">
                  {performer.category} • {performer.subCategory}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-gray-900">{performer.rating}</span>
                <span className="text-gray-500">({performer.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{performer.yearsExperience} years experience</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{performer.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-3xl font-bold text-purple-600">
                GH₵{performer.exactPrice.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">per event</p>
            </div>
            <div className="flex items-center space-x-2 text-purple-600 font-semibold group-hover:translate-x-1 transition-transform">
              <span>View Profile</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid View (default)
  return (
    <Link
      to={`/performer/${performer.id}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-200"
    >
      <div className="relative">
          <img
            src={performer.profilePhoto}
            alt={performer.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ imageRendering: 'crisp-edges', backfaceVisibility: 'hidden' }}
          />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${getTierColor(performer.priceTier)}`}>
          {performer.priceTier}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
          {performer.name}
        </h3>
        <p className="text-sm text-purple-600 font-semibold mb-4 uppercase tracking-wide">
          {performer.category} • {performer.subCategory}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-gray-900">{performer.rating}</span>
            <span className="text-xs text-gray-500">({performer.reviewCount})</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600 text-sm">
            <Clock className="w-4 h-4" />
            <span>{performer.yearsExperience} years</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-gray-600 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span>{performer.location}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-2xl font-bold text-purple-600">
              GH₵{performer.exactPrice.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">per event</p>
          </div>
          <div className="flex items-center space-x-2 text-purple-600 font-semibold group-hover:translate-x-1 transition-transform">
            <span className="text-sm">View</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PerformerCard;
