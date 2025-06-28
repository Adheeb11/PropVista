import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PropertyCard = ({ property }) => {
  // Handle features data that can come in different formats
  const getFeatureNames = (features) => {
    if (!features) return [];
    if (Array.isArray(features)) {
      return features.map(f => typeof f === 'string' ? f : f.name);
    }
    return [];
  };

  const featureNames = getFeatureNames(property.features);

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', backgroundColor: '#f0fdfa' }}
      className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col border border-teal-100"
    >
      <Link to={`/property/${property.id}`}>
        <img
          src={property.images?.[0]?.image || property.images?.[0] || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'}
          alt={property.title}
          className="h-48 w-full object-cover"
        />
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{property.title}</h3>
          <p className="text-teal-600 font-bold text-xl mb-2">₹{property.price.toLocaleString()}</p>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{property.city}</span>
            <span>{property.type}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 mb-4">
            {featureNames.map((feature, i) => (
              <span key={i} className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">
                {feature}
              </span>
            ))}
          </div>
          <button className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 rounded-full font-semibold shadow hover:scale-105 transition">View Details</button>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard; 