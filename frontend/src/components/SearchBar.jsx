import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSelect }) => {
  const { performers, searchQuery, setSearchQuery } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const results = performers.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.subCategory.toLowerCase().includes(query)
      ).slice(0, 5);
      setFilteredResults(results);
      setIsOpen(true);
    } else {
      setFilteredResults([]);
      setIsOpen(false);
    }
  }, [searchQuery, performers]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (performer) => {
    setSearchQuery('');
    setIsOpen(false);
    if (onSelect) {
      onSelect(performer);
    } else {
      navigate(`/performer/${performer.id}`);
    }
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <div className="relative">
        <div className="relative bg-white rounded-2xl shadow-xl border-2 border-gray-200">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, category, or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsOpen(false);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {isOpen && filteredResults.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-96 overflow-y-auto">
          {filteredResults.map((performer) => (
            <button
              key={performer.id}
              onClick={() => handleSelect(performer)}
              className="w-full px-6 py-4 text-left hover:bg-gradient-to-r hover:from-purple-50 hover:to-orange-50 transition-all border-b border-gray-100 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={performer.profilePhoto}
                  alt={performer.name}
                  className="w-14 h-14 rounded-xl object-cover shadow-md"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{performer.name}</p>
                  <p className="text-sm text-gray-600">
                    {performer.category} • {performer.subCategory}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">GH₵{performer.exactPrice.toLocaleString()}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
