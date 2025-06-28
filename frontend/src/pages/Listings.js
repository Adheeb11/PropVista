import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';
import { useLocation } from 'react-router-dom';
import { getProperties } from '../services/api';

const amenitiesList = ['Gym', 'Parking', 'Pool', 'Sea View', 'Garden', 'WiFi', 'Furnished'];

const Spinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Listings = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialType = params.get('type') || '';
  const initialCity = params.get('city') || '';
  const searchQuery = params.get('search') || '';
  const [filters, setFilters] = useState({ city: initialCity, type: initialType, minPrice: '', maxPrice: '', amenities: [] });
  const [sort, setSort] = useState('date');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProperties()
      .then(res => {
        setProperties(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load properties.');
        setLoading(false);
      });
  }, []);

  const handleAmenityChange = (amenity) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // Helper function to get feature names from different data structures
  const getFeatureNames = (features) => {
    if (!features) return [];
    if (Array.isArray(features)) {
      return features.map(f => typeof f === 'string' ? f : f.name);
    }
    return [];
  };

  let filtered = properties.filter((p) => {
    if (filters.city && p.city !== filters.city) return false;
    if (filters.type && p.type !== filters.type) return false;
    if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
    
    // Handle amenities filtering
    if (filters.amenities.length) {
      const propertyFeatures = getFeatureNames(p.features);
      if (!filters.amenities.every(a => propertyFeatures.includes(a))) return false;
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const inTitle = p.title.toLowerCase().includes(q);
      const inCity = p.city.toLowerCase().includes(q);
      const inType = p.type.toLowerCase().includes(q);
      const inDesc = (p.description || '').toLowerCase().includes(q);
      const propertyFeatures = getFeatureNames(p.features);
      const inFeatures = propertyFeatures.some(f => f.toLowerCase().includes(q));
      if (!(inTitle || inCity || inType || inDesc || inFeatures)) return false;
    }
    return true;
  });

  if (sort === 'price') filtered = filtered.sort((a, b) => a.price - b.price);
  else filtered = filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-100 to-white py-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Properties</h1>
        {/* Filters */}
        <motion.div className="bg-white rounded-2xl p-8 mb-8 flex flex-wrap gap-4 items-center shadow-lg border border-teal-100" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <input type="text" placeholder="City" value={filters.city} onChange={e => setFilters(f => ({ ...f, city: e.target.value }))} className="px-4 py-2 rounded bg-teal-50 text-gray-900 focus:ring-2 focus:ring-teal-400 border border-teal-200" />
          <select value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))} className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200">
            <option value="">Type</option>
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
            <option value="Commercial">Commercial</option>
            <option value="PG">PG/Co-living</option>
            <option value="Plot">Plots/Land</option>
            <option value="Luxury">Luxury</option>
            <option value="ShortStay">Short Stay</option>
            <option value="New">New Projects</option>
          </select>
          <input type="number" placeholder="Min Price" value={filters.minPrice} onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value }))} className="px-4 py-2 rounded bg-teal-50 text-gray-900 w-32 border border-teal-200" />
          <input type="number" placeholder="Max Price" value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))} className="px-4 py-2 rounded bg-teal-50 text-gray-900 w-32 border border-teal-200" />
          <div className="flex gap-2 flex-wrap">
            {amenitiesList.map(a => (
              <label key={a} className="flex items-center text-gray-700 text-xs bg-teal-100 px-2 py-1 rounded cursor-pointer border border-teal-200">
                <input type="checkbox" checked={filters.amenities.includes(a)} onChange={() => handleAmenityChange(a)} className="mr-1 accent-teal-400" />
                {a}
              </label>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200">
            <option value="date">Sort by Date</option>
            <option value="price">Sort by Price</option>
          </select>
          <button className="ml-auto bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition">Apply Filters</button>
        </motion.div>
        {/* Property List */}
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-red-500 col-span-3">{error}</div>
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            {filtered.length ? filtered.map(property => (
              <motion.div key={property.id} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
                <PropertyCard property={property} />
              </motion.div>
            )) : <div className="text-gray-700 col-span-3 text-center w-full py-16 text-xl font-semibold">No properties found. Try adjusting your filters or check back later!</div>}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Listings; 