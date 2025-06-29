import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPropertyById, sendContactMessage } from '../services/api';
import PropertyMap from '../components/PropertyMap';

const Spinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [imgIdx, setImgIdx] = useState(0);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    setLoading(true);
    getPropertyById(id)
      .then(res => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Property not found.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner />;
  if (error || !property) return <div className="text-gray-700 p-8 text-center text-xl">{error || 'Property not found.'}</div>;

  // Handle images data that can come in different formats
  const getImageUrls = (images) => {
    if (!images) return [];
    if (Array.isArray(images)) {
      return images.map(img => typeof img === 'string' ? img : img.image);
    }
    return [];
  };

  // Handle features data that can come in different formats
  const getFeatureNames = (features) => {
    if (!features) return [];
    if (Array.isArray(features)) {
      return features.map(f => typeof f === 'string' ? f : f.name);
    }
    return [];
  };

  const images = getImageUrls(property.images);
  const features = getFeatureNames(property.features);

  const nextImg = (e) => {
    e.preventDefault();
    setImgIdx((imgIdx + 1) % images.length);
  };
  const prevImg = (e) => {
    e.preventDefault();
    setImgIdx((imgIdx - 1 + images.length) % images.length);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('');
    try {
      await sendContactMessage({
        property: property.id,
        name: contact.name,
        email: contact.email,
        message: contact.message,
      });
      setSubmitStatus('Message sent successfully!');
      setContact({ name: '', email: '', message: '' });
    } catch (err) {
      setSubmitStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-100 to-white py-20 px-4">
      <div className="container mx-auto bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8 border border-teal-100">
        {/* Image Gallery */}
        <motion.div className="md:w-1/2 flex flex-col items-center" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
          <div className="relative w-full flex justify-center mb-4">
            {images.length > 0 && (
              <img src={images[imgIdx]} alt={property.title} className="h-64 w-full object-cover rounded-xl border-2 border-teal-100 shadow" />
            )}
            {images.length > 1 && (
              <>
                <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-teal-100 text-teal-700 rounded-full p-2 shadow-md z-10">
                  &#8592;
                </button>
                <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-teal-100 text-teal-700 rounded-full p-2 shadow-md z-10">
                  &#8594;
                </button>
              </>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            {images.map((img, i) => (
              <img key={i} src={img} alt={property.title} className={`h-12 w-12 object-cover rounded border-2 ${i === imgIdx ? 'border-teal-400' : 'border-teal-100'} cursor-pointer`} onClick={() => setImgIdx(i)} />
            ))}
          </div>
        </motion.div>
        {/* Details */}
        <motion.div className="md:w-1/2 text-gray-900" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
          <p className="text-teal-600 text-2xl font-semibold mb-2">₹{Number(property.price).toLocaleString()}</p>
          <div className="flex gap-4 mb-2">
            <span className="bg-teal-100 px-3 py-1 rounded text-sm">{property.city}</span>
            <span className="bg-blue-100 px-3 py-1 rounded text-sm">{property.type}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {features.map((f, i) => (
              <span key={i} className="bg-teal-50 px-2 py-1 rounded text-xs text-teal-700 border border-teal-100">{f}</span>
            ))}
          </div>
          <p className="mb-4 text-gray-600">{property.description}</p>
          
          {/* Property Map */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">📍 Property Location</h3>
            <PropertyMap
              latitude={property.latitude}
              longitude={property.longitude}
              address={property.full_address}
              title={property.title}
              className="w-full"
            />
          </div>
          
          {/* Contact Form */}
          <form className="bg-teal-50 rounded-lg p-4 flex flex-col gap-3 border border-teal-100" onSubmit={handleContactSubmit}>
            <h3 className="text-lg font-semibold mb-2 text-teal-700">Contact Owner</h3>
            <input type="text" placeholder="Your Name" value={contact.name} onChange={e => setContact(c => ({ ...c, name: e.target.value }))} className="px-4 py-2 rounded bg-white text-gray-900 border border-teal-200" required />
            <input type="email" placeholder="Your Email" value={contact.email} onChange={e => setContact(c => ({ ...c, email: e.target.value }))} className="px-4 py-2 rounded bg-white text-gray-900 border border-teal-200" required />
            <textarea placeholder="Message" value={contact.message} onChange={e => setContact(c => ({ ...c, message: e.target.value }))} className="px-4 py-2 rounded bg-white text-gray-900 border border-teal-200" required />
            <button type="submit" className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded font-semibold hover:scale-105 transition">Send</button>
            {submitStatus && <div className={`mt-2 text-sm ${submitStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{submitStatus}</div>}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyDetail; 