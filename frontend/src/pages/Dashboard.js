import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';
import { useNavigate } from 'react-router-dom';
import { getUserProperties, updateProperty, deleteProperty } from '../services/api';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', price: '', city: '', type: '', features: '', images: [], description: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const refreshProperties = async () => {
    if (!user) return;
    
    try {
      const res = await getUserProperties(user.id);
      setProperties(res.data);
    } catch (err) {
      console.error('Error refreshing properties:', err);
    }
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setError('Please log in to view your dashboard.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    getUserProperties(user.id)
      .then(res => {
        console.log('Fetched properties for user:', user.email);
        console.log('Properties:', res.data);
        setProperties(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching properties:', err);
        setError('Failed to load your properties. Please try again.');
        setLoading(false);
      });
  }, [user]);

  // Summary
  const total = properties.length;
  const buyCount = properties.filter(p => p.type === 'Buy').length;
  const rentCount = properties.filter(p => p.type === 'Rent').length;

  // Greeting
  const userName = user?.first_name || user?.name || 'User';

  // CRUD Handlers
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(id);
        // Refresh the properties list from the backend
        await refreshProperties();
      } catch (err) {
        console.error('Error deleting property:', err);
        alert('Failed to delete property. Please try again.');
      }
    }
  };

  const handleEdit = (property) => {
    console.log('Editing property:', property);
    console.log('Current user:', user);
    setEditId(property.id);
    // Handle features data that can come in different formats
    const featureNames = property.features?.map(f => typeof f === 'string' ? f : f.name) || [];
    setEditForm({
      ...property,
      features: featureNames.join(', '),
      images: property.images || [],
      description: property.description || '',
    });
    setShowEditModal(true);
  };

  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    setEditLoading(true);
    
    try {
      const propertyData = {
        title: editForm.title,
        price: parseFloat(editForm.price),
        city: editForm.city,
        type: editForm.type,
        description: editForm.description,
        features: editForm.features,
        images: editForm.images || []
      };

      console.log('Sending update data:', propertyData);
      console.log('Property ID being updated:', editId);

      const updatedProperty = await updateProperty(editId, propertyData);
      
      console.log('Update response:', updatedProperty);
      
      // Refresh the properties list from the backend to ensure we have the latest data
      await refreshProperties();
      
      setShowEditModal(false);
      setEditId(null);
      setEditForm({ title: '', price: '', city: '', type: '', features: '', images: [], description: '' });
    } catch (err) {
      console.error('Error updating property:', err);
      console.error('Error response:', err.response?.data);
      alert('Failed to update property. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleAddProperty = () => {
    navigate('/add-property');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-100 to-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Log In</h1>
          <p className="text-lg text-gray-700 mb-8">You need to be logged in to view your dashboard.</p>
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
      <div className="container mx-auto">
        {/* Greeting */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {userName}!</h1>
        <p className="text-lg text-gray-700 mb-8">Here is your property dashboard.</p>
        
        {/* Summary Section */}
        <div className="flex flex-wrap gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex-1 min-w-[180px] border border-teal-100">
            <div className="text-2xl font-bold text-teal-600">{total}</div>
            <div className="text-gray-700">Total Listings</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex-1 min-w-[180px] border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{buyCount}</div>
            <div className="text-gray-700">Buy</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex-1 min-w-[180px] border border-pink-100">
            <div className="text-2xl font-bold text-pink-600">{rentCount}</div>
            <div className="text-gray-700">Rent</div>
          </div>
          <button onClick={handleAddProperty} className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-4 rounded-xl font-bold shadow hover:scale-105 transition min-w-[180px]">+ Add New Property</button>
        </div>

        {/* Listings */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Listings</h2>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            {properties.length ? properties.map(property => (
              <motion.div key={property.id} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
                <PropertyCard property={property} />
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleEdit(property)} className="bg-gradient-to-r from-blue-400 to-teal-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:scale-105 transition">Edit</button>
                  <button onClick={() => handleDelete(property.id)} className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:scale-105 transition">Delete</button>
                </div>
              </motion.div>
            )) : (
              <div className="text-gray-700 col-span-3 text-center py-16">
                <p className="text-xl font-semibold mb-4">No listings found.</p>
                <p className="text-gray-500 mb-6">Start by adding your first property!</p>
                <button 
                  onClick={handleAddProperty} 
                  className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
                >
                  Add Your First Property
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg relative">
              <button onClick={() => setShowEditModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl">&times;</button>
              <h3 className="text-xl font-bold mb-4">Edit Property</h3>
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                <input name="title" value={editForm.title} onChange={handleEditChange} placeholder="Title" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required />
                <input name="price" value={editForm.price} onChange={handleEditChange} placeholder="Price" type="number" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required />
                <input name="city" value={editForm.city} onChange={handleEditChange} placeholder="City" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required />
                <select name="type" value={editForm.type} onChange={handleEditChange} className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required>
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
                <input name="features" value={editForm.features} onChange={handleEditChange} placeholder="Features (comma separated)" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" />
                <textarea name="description" value={editForm.description} onChange={handleEditChange} placeholder="Description" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" />
                <button 
                  type="submit" 
                  disabled={editLoading}
                  className="bg-gradient-to-r from-blue-400 to-teal-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editLoading ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 