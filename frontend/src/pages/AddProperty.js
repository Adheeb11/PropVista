import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createProperty } from '../services/api';

const AddProperty = ({ user }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', price: '', city: '', type: '', features: '', images: [], description: '' });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
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
      <div className="container mx-auto max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-teal-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Property</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <motion.form onSubmit={handleSubmit} className="flex flex-col gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required />
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required />
          <select name="type" value={form.type} onChange={handleChange} className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required>
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
          <input name="features" value={form.features} onChange={handleChange} placeholder="Features (comma separated)" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required />
          <label className="block">
            <span className="block mb-2 text-teal-700 font-semibold">Upload Images</span>
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-teal-200 rounded-lg cursor-pointer bg-teal-50 focus:outline-none" />
          </label>
          <div className="flex gap-2 flex-wrap">
            {imagePreviews.map((src, i) => (
              <img key={i} src={src} alt="preview" className="h-20 w-20 object-cover rounded border-2 border-teal-400" />
            ))}
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding Property...' : 'Submit Property'}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default AddProperty; 