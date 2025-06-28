import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';

const featuredProperties = [
  {
    id: 1,
    title: 'Luxury Apartment in Mumbai',
    price: 12000000,
    city: 'Mumbai',
    type: 'Buy',
    features: ['3 BHK', 'Sea View', 'Gym', 'Parking'],
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80'],
  },
  {
    id: 2,
    title: 'Modern Villa in Bangalore',
    price: 25000000,
    city: 'Bangalore',
    type: 'Buy',
    features: ['4 BHK', 'Garden', 'Pool', 'Parking'],
    images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80'],
  },
  {
    id: 3,
    title: 'Cozy Studio in Pune',
    price: 18000,
    city: 'Pune',
    type: 'Rent',
    features: ['Studio', 'Furnished', 'WiFi'],
    images: ['https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=600&q=80'],
  },
  {
    id: 4,
    title: 'Commercial Office in Noida',
    price: 35000000,
    city: 'Noida',
    type: 'Commercial',
    features: ['Office Space', 'Central AC', 'Parking'],
    images: ['https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80'],
  },
  {
    id: 5,
    title: 'PG for Girls in Chennai',
    price: 9000,
    city: 'Chennai',
    type: 'PG',
    features: ['2 Sharing', 'WiFi', 'Meals Included'],
    images: ['https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80'],
  },
  {
    id: 6,
    title: 'Luxury Penthouse in Gurgaon',
    price: 42000000,
    city: 'Gurgaon',
    type: 'Luxury',
    features: ['5 BHK', 'Terrace', 'Private Pool'],
    images: ['https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80'],
  },
  {
    id: 7,
    title: 'Plot for Sale in Hyderabad',
    price: 8000000,
    city: 'Hyderabad',
    type: 'Plot',
    features: ['2000 sqft', 'Gated Community'],
    images: ['https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80'],
  },
  {
    id: 8,
    title: 'Short Stay Apartment in Goa',
    price: 3500,
    city: 'Goa',
    type: 'ShortStay',
    features: ['1 BHK', 'Near Beach', 'Furnished'],
    images: ['https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80'],
  },
  {
    id: 9,
    title: 'New Project Flat in Ahmedabad',
    price: 6500000,
    city: 'Ahmedabad',
    type: 'New',
    features: ['2 BHK', 'Clubhouse', 'Kids Play Area'],
    images: ['https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80'],
  },
  {
    id: 10,
    title: 'Family Home in Lucknow',
    price: 9500000,
    city: 'Lucknow',
    type: 'Buy',
    features: ['3 BHK', 'Garden', 'Parking'],
    images: ['https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80'],
  },
];

const categories = [
  { label: 'Buy', icon: '🏠', desc: 'Find your dream home to buy', link: '/listings?type=Buy' },
  { label: 'Rent', icon: '🏢', desc: 'Browse rental properties', link: '/listings?type=Rent' },
  { label: 'Commercial', icon: '🏬', desc: 'Offices, shops & more', link: '/listings?type=Commercial' },
  { label: 'PG/Co-living', icon: '🛏️', desc: 'Shared & PG spaces', link: '/listings?type=PG' },
  { label: 'Plots/Land', icon: '🌳', desc: 'Plots and land for investment', link: '/listings?type=Plot' },
  { label: 'Luxury', icon: '💎', desc: 'Premium & luxury properties', link: '/listings?type=Luxury' },
  { label: 'Short Stay', icon: '🛎️', desc: 'Vacation & short-term rentals', link: '/listings?type=ShortStay' },
  { label: 'New Projects', icon: '🏗️', desc: 'Upcoming & new launches', link: '/listings?type=New' },
];

const trendingLocations = [
  { city: 'Mumbai', img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80' },
  { city: 'Bangalore', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { city: 'Delhi', img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80' },
  { city: 'Pune', img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80' },
  { city: 'Hyderabad', img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { city: 'Chennai', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { city: 'Kolkata', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { city: 'Ahmedabad', img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80' },
  { city: 'Noida', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { city: 'Gurgaon', img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { city: 'Thane', img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80' },
  { city: 'Lucknow', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
];

const agents = [
  { name: 'Rohit Sharma', img: 'https://randomuser.me/api/portraits/men/45.jpg', rating: 4.9, city: 'Mumbai' },
  { name: 'Anjali Mehra', img: 'https://randomuser.me/api/portraits/women/47.jpg', rating: 4.8, city: 'Bangalore' },
  { name: 'Vikram Singh', img: 'https://randomuser.me/api/portraits/men/52.jpg', rating: 4.7, city: 'Delhi' },
];

const faqs = [
  { q: 'How do I list my property?', a: 'Sign up and use the Add Property page to post your listing for free.' },
  { q: 'Is there a fee for buyers?', a: 'No, PropVista is free for buyers and renters.' },
  { q: 'How do I contact property owners?', a: 'Each property page has a contact form to reach the owner or agent directly.' },
  { q: 'How do I find PG/Co-living spaces?', a: 'Use the PG/Co-living category to browse shared accommodation options.' },
  { q: 'Can I list commercial properties?', a: 'Yes, you can list offices, shops, and other commercial spaces.' },
  { q: 'How do I contact top agents?', a: 'Visit the Top Agents section and use the contact button.' },
];

const news = [
  { title: 'Real Estate Market Trends 2024', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', link: '#' },
  { title: 'Tips for First-Time Home Buyers', img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80', link: '#' },
  { title: 'How to Choose the Right Rental', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', link: '#' },
  { title: 'Commercial Real Estate: What to Know', img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', link: '#' },
  { title: 'Luxury Property Investment Guide', img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80', link: '#' },
  { title: 'PG/Co-living: Pros & Cons', img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80', link: '#' },
];

const partners = [
  { name: 'HDFC', logo: '/images/hdfc.png' },
  { name: 'LIC', logo: '/images/lic.png' },
  { name: 'SBI', logo: '/images/sbi.png' },
  { name: 'ICICI', logo: '/images/icici.png' },
  { name: 'MagicBricks', logo: '/images/magicbricks.png' },
  { name: 'NoBroker', logo: '/images/nobroker.png' },
  { name: '99acres', logo: '/images/99acres.png' },
  { name: 'Housing.com', logo: '/images/housing.png' },
  { name: 'Axis Bank', logo: '/images/axisbank.png' },
  { name: 'Indiabulls', logo: '/images/indiabulls.png' },
];
const testimonials = [
  {
    name: 'Amit S.',
    text: 'PropVista made finding my dream home effortless. The interface is beautiful and easy to use!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Priya R.',
    text: 'I listed my property and got great responses within days. Highly recommend PropVista!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Rahul D.',
    text: 'The best real estate platform I have used. The search and filters are top-notch.',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
];

const Home = () => {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/listings?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate('/listings');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-100 to-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-24 px-4 text-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="hero" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" />
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 drop-shadow-lg relative z-10"
        >
          Find Your Dream Property with <span className="text-teal-600">PropVista</span>
        </motion.h1>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="w-full max-w-xl relative z-10"
        >
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search by city, type, or keyword..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-6 py-4 rounded-l-full bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-xl text-lg"
            />
            <button type="submit" className="px-8 py-4 rounded-r-full bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold text-lg shadow-xl hover:scale-105 transition">Search</button>
          </form>
        </motion.div>
        <Link
          to="/listings"
          className="mt-8 inline-block bg-gradient-to-r from-teal-400 to-blue-500 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition text-lg relative z-10"
        >
          Browse All Listings
        </Link>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8 relative z-10">
          <span className="inline-block bg-white/80 text-teal-700 px-6 py-2 rounded-full font-semibold shadow">Over 10,000+ properties listed!</span>
        </motion.div>
      </section>

      {/* Property Categories */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Explore by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categories.map(cat => (
            <Link to={cat.link} key={cat.label} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
              <span className="text-4xl mb-2">{cat.icon}</span>
              <span className="font-semibold text-lg text-gray-900 mb-1">{cat.label}</span>
              <span className="text-gray-600 text-sm text-center">{cat.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Locations */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Trending Locations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trendingLocations.map(loc => (
            <Link to={`/listings?city=${loc.city}`} key={loc.city} className="relative group rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
              <img src={loc.img} alt={loc.city} className="h-32 w-full object-cover" />
              <span className="absolute bottom-2 left-2 bg-white/80 text-teal-700 px-3 py-1 rounded font-semibold shadow text-sm group-hover:bg-teal-500 group-hover:text-white transition">{loc.city}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose PropVista?</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">PropVista is your trusted partner in real estate. Whether you are looking to buy, rent, or sell, our platform offers a seamless, secure, and visually stunning experience. Discover properties with advanced filters, beautiful galleries, and instant contact with owners or agents.</p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 w-64 flex flex-col items-center">
            <span className="text-4xl mb-2">🏡</span>
            <h3 className="font-semibold text-lg mb-1">Verified Listings</h3>
            <p className="text-gray-600 text-sm">All properties are verified for your peace of mind.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 w-64 flex flex-col items-center">
            <span className="text-4xl mb-2">⚡</span>
            <h3 className="font-semibold text-lg mb-1">Instant Search</h3>
            <p className="text-gray-600 text-sm">Find your dream home with our blazing fast search and filters.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 w-64 flex flex-col items-center">
            <span className="text-4xl mb-2">💬</span>
            <h3 className="font-semibold text-lg mb-1">Direct Contact</h3>
            <p className="text-gray-600 text-sm">Contact property owners or agents directly, no middlemen.</p>
          </div>
        </div>
      </section>

      {/* Top Agents */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top Rated Agents</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {agents.map(agent => (
            <div key={agent.name} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center w-64">
              <img src={agent.img} alt={agent.name} className="w-20 h-20 rounded-full mb-3 border-4 border-teal-200 object-cover" />
              <span className="font-semibold text-lg text-gray-900 mb-1">{agent.name}</span>
              <span className="text-teal-600 font-semibold mb-1">{agent.city}</span>
              <span className="text-yellow-400 text-lg mb-2">{'★'.repeat(Math.round(agent.rating))} <span className="text-gray-500 text-sm">({agent.rating})</span></span>
              <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition mt-2">Contact</button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs (collapsible) */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition hover:shadow-2xl" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <h3 className="font-semibold text-lg text-teal-700 mb-2 flex items-center justify-between">
                {faq.q}
                <span className="ml-2 text-xl">{openFaq === i ? '−' : '+'}</span>
              </h3>
              {openFaq === i && <p className="text-gray-600 mt-2 transition-all duration-300">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Partner/Brand Logos */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Trusted Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((p, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4 flex items-center justify-center h-20 w-40">
              <img src={p.logo} alt={p.name} className="h-12 object-contain grayscale hover:grayscale-0 transition duration-300 mx-auto" title={p.name} />
            </div>
          ))}
        </div>
      </section>

      {/* News/Blog */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Latest in Real Estate</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((n, i) => (
            <a key={i} href={n.link} className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition block">
              <img src={n.img} alt={n.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{n.title}</h3>
                <span className="text-teal-600 font-semibold">Read More &rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-r from-teal-100 to-blue-100 py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Our Customers Say</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} className="bg-white rounded-xl shadow-lg p-6 w-80 flex flex-col items-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-3 border-4 border-teal-200 object-cover" />
              <p className="text-gray-700 italic mb-2">"{t.text}"</p>
              <span className="font-semibold text-teal-700">{t.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to find your next home?</h2>
        <p className="text-lg text-gray-700 mb-8">Sign up now and start exploring the best properties in your city!</p>
        <Link to="/register" className="inline-block bg-gradient-to-r from-blue-400 to-teal-500 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition text-lg">
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home; 