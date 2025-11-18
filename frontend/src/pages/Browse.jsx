import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PerformerCard from '../components/PerformerCard';
import FilterSidebar from '../components/FilterSidebar';
import SearchBar from '../components/SearchBar';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const { performers, filteredPerformers, sortBy, setSortBy, updateFilter, clearFilters } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Handle URL query parameters
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      updateFilter('category', category);
    }
  }, [searchParams, updateFilter]);

  // Debug: Log performers count
  useEffect(() => {
    console.log('Total performers:', performers.length);
    console.log('Filtered performers:', filteredPerformers.length);
  }, [performers.length, filteredPerformers.length]);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b-2 border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">Browse Performers</h1>
              <p className="text-gray-600">Discover talented entertainers for your event</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block flex-1 max-w-md">
                <SearchBar />
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden px-5 py-2.5 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg"
              >
                <Filter size={20} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          <div className="md:hidden mb-6">
            <SearchBar />
          </div>

          <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
            <p className="text-gray-700 font-semibold">
              <span className="text-2xl font-extrabold text-purple-600">
                {filteredPerformers.length > 0 ? filteredPerformers.length : performers.length}
              </span>{' '}
              performer{(filteredPerformers.length > 0 ? filteredPerformers.length : performers.length) !== 1 ? 's' : ''} found
              {filteredPerformers.length < performers.length && filteredPerformers.length > 0 && (
                <span className="text-sm text-gray-500 ml-2 font-normal">
                  (of {performers.length} total)
                </span>
              )}
            </p>
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-600 outline-none font-semibold bg-white shadow-md"
              >
                <option value="rating">Sort by Rating</option>
                <option value="price-low">Sort by Price: Low to High</option>
                <option value="price-high">Sort by Price: High to Low</option>
                <option value="experience">Sort by Experience</option>
                <option value="recent">Sort by Recent</option>
              </select>
              <div className="hidden md:flex items-center space-x-2 border-2 border-gray-300 rounded-xl p-1 bg-white shadow-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className="hidden md:block w-72 flex-shrink-0">
            <FilterSidebar isOpen={true} onClose={() => {}} />
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

          {/* Performers Grid */}
          <div className="flex-1">
            {performers.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Filter className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Loading Performers...</h3>
                  <p className="text-gray-600">Please wait while we load the performers</p>
                </div>
              </div>
            ) : filteredPerformers.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                    : 'space-y-6'
                }
              >
                {filteredPerformers.map((performer) => (
                  <PerformerCard key={performer.id} performer={performer} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Filter className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No performers found</h3>
                  <p className="text-gray-600 mb-4">
                    We found {performers.length} total performers, but none match your current filters.
                  </p>
                  <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search query</p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
