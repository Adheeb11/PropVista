import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createProperty } from '../services/api';
import MapPicker from '../components/MapPicker';

const AddProperty = ({ user }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    title: '', 
    price: '', 
    city: '', 
    address: '',
    area: '',
    latitude: '',
    longitude: '',
    type: '', 
    features: '', 
    images: [], 
    description: '' 
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleLocationChange = (locationData) => {
    setForm(f => ({
      ...f,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      address: locationData.address || f.address,
      area: locationData.area || f.area,
      city: locationData.city || f.city
    }));
  };

  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    setForm(f => ({ ...f, images: files }));
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user) {
      setError('Please log in to add a property.');
      setLoading(false);
      return;
    }

    try {
      // Convert files to URLs (for demo purposes, using placeholder URLs)
      // In a real app, you'd upload files to a service like AWS S3
      const imageUrls = form.images.map((file, index) => {
        // For demo, using placeholder images based on index
        const placeholders = [
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80'
        ];
        return placeholders[index % placeholders.length];
      });

      const propertyData = {
        title: form.title,
        price: parseFloat(form.price),
        city: form.city,
        address: form.address,
        area: form.area,
        latitude: form.latitude ? parseFloat(form.latitude) : null,
        longitude: form.longitude ? parseFloat(form.longitude) : null,
        type: form.type,
        description: form.description,
        features: form.features,
        images: imageUrls,
        owner: user.id
      };

      await createProperty(propertyData);
      alert('Property added successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-100 to-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Log In</h1>
          <p className="text-lg text-gray-700 mb-8">You need to be logged in to add properties.</p>
          <button 
            onClick={() => navigate('/login')} 
            className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-100 to-white py-20 px-4">
      <div className="container mx-auto max-w-4xl bg-white rounded-2xl shadow-xl p-8 border border-teal-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Property</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <motion.form onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Property Title" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required />
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required />
            <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required />
            <select name="type" value={form.type} onChange={handleChange} className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required>
              <option value="">Property Type</option>
              <option value="Buy">Buy</option>
              <option value="Rent">Rent</option>
              <option value="Commercial">Commercial</option>
              <option value="PG">PG/Co-living</option>
              <option value="Plot">Plots/Land</option>
              <option value="Luxury">Luxury</option>
              <option value="ShortStay">Short Stay</option>
              <option value="New">New Projects</option>
            </select>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">📍 Location Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="address" value={form.address} onChange={handleChange} placeholder="Street Address" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" />
              <input name="area" value={form.area} onChange={handleChange} placeholder="Area/Locality (e.g., Bandra West)" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="latitude" value={form.latitude} onChange={handleChange} placeholder="Latitude (auto-filled from map)" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" readOnly />
              <input name="longitude" value={form.longitude} onChange={handleChange} placeholder="Longitude (auto-filled from map)" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" readOnly />
            </div>
          </div>

          {/* Map Picker */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">🗺️ Set Property Location</h3>
            <MapPicker
              latitude={form.latitude}
              longitude={form.longitude}
              address={form.address}
              onLocationChange={handleLocationChange}
              height="400px"
            />
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">📝 Additional Information</h3>
            <input name="features" value={form.features} onChange={handleChange} placeholder="Features (comma separated: 3 BHK, Gym, Parking)" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Property Description" rows="4" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required />
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">📸 Property Images</h3>
            <label className="block">
              <span className="block mb-2 text-teal-700 font-semibold">Upload Images</span>
              <input type="file" multiple accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-teal-200 rounded-lg cursor-pointer bg-teal-50 focus:outline-none" />
            </label>
            <div className="flex gap-2 flex-wrap">
              {imagePreviews.map((src, i) => (
                <img key={i} src={src} alt="preview" className="h-20 w-20 object-cover rounded border-2 border-teal-400" />
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding Property...' : 'Submit Property'}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default AddProperty; 