import { createContext, useContext, useState } from 'react';
import performersData from '../data/performers.json';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Ensure performersData is an array
  const performersArray = Array.isArray(performersData) ? performersData : [];
  const [performers] = useState(performersArray);
  
  // Debug log
  if (performersArray.length === 0) {
    console.warn('No performers data loaded! Check performers.json file.');
  } else {
    console.log(`Loaded ${performersArray.length} performers`);
  }
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    subCategory: '',
    priceTier: '',
    location: '',
    rating: '',
  });
  const [sortBy, setSortBy] = useState('rating');

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      subCategory: '',
      priceTier: '',
      location: '',
      rating: '',
    });
    setSearchQuery('');
  };

  const filteredPerformers = performers.filter(performer => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        performer.name.toLowerCase().includes(query) ||
        performer.category.toLowerCase().includes(query) ||
        performer.subCategory.toLowerCase().includes(query) ||
        performer.bio.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.category && performer.category !== filters.category) {
      return false;
    }

    // Sub-category filter
    if (filters.subCategory && performer.subCategory !== filters.subCategory) {
      return false;
    }

    // Price tier filter
    if (filters.priceTier && performer.priceTier !== filters.priceTier) {
      return false;
    }

    // Location filter
    if (filters.location) {
      if (!performer.areasServed.includes(filters.location)) {
        return false;
      }
    }

    // Rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      if (performer.rating < minRating) {
        return false;
      }
    }

    return true;
  });

  // Sort performers
  const sortedPerformers = [...filteredPerformers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.exactPrice - b.exactPrice;
      case 'price-high':
        return b.exactPrice - a.exactPrice;
      case 'experience':
        return b.yearsExperience - a.yearsExperience;
      case 'recent':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  // Get unique values for filters
  const categories = [...new Set(performers.map(p => p.category))];
  const subCategories = filters.category
    ? [...new Set(performers.filter(p => p.category === filters.category).map(p => p.subCategory))]
    : [...new Set(performers.map(p => p.subCategory))];
  const locations = [...new Set(performers.flatMap(p => p.areasServed))].sort();
  const priceTiers = [...new Set(performers.map(p => p.priceTier))];

  return (
    <AppContext.Provider
      value={{
        performers,
        filteredPerformers: sortedPerformers,
        searchQuery,
        setSearchQuery,
        filters,
        updateFilter,
        clearFilters,
        sortBy,
        setSortBy,
        categories,
        subCategories,
        locations,
        priceTiers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

