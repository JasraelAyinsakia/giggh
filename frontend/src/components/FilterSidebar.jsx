import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const FilterSidebar = ({ isOpen, onClose }) => {
  const {
    filters,
    updateFilter,
    clearFilters,
    categories,
    subCategories,
    locations,
    priceTiers,
  } = useApp();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-80 md:w-full bg-white border-r-2 border-gray-200 md:border-r-0 shadow-xl md:shadow-none z-50 md:z-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 md:p-0">
          <div className="flex items-center justify-between mb-6 md:hidden">
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none bg-white font-medium"
              >
                <option value="">All Categories</option>
                {categories && categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories available</option>
                )}
              </select>
            </div>

            {/* Sub-Category Filter */}
            {filters.category && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sub-Category
                </label>
                <select
                  value={filters.subCategory}
                  onChange={(e) => updateFilter('subCategory', e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none bg-white font-medium"
                >
                <option value="">All Sub-Categories</option>
                {subCategories && subCategories.length > 0 ? (
                  subCategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))
                ) : (
                  <option disabled>No sub-categories available</option>
                )}
                </select>
              </div>
            )}

            {/* Price Tier Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price Tier
              </label>
              <select
                value={filters.priceTier}
                onChange={(e) => updateFilter('priceTier', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none bg-white font-medium"
              >
                <option value="">All Price Tiers</option>
                {priceTiers && priceTiers.length > 0 ? (
                  priceTiers.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))
                ) : (
                  <option disabled>No price tiers available</option>
                )}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => updateFilter('location', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none bg-white font-medium"
              >
                <option value="">All Locations</option>
                {locations && locations.length > 0 ? (
                  locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))
                ) : (
                  <option disabled>No locations available</option>
                )}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Minimum Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => updateFilter('rating', e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none bg-white font-medium"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3.0">3.0+ Stars</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;

