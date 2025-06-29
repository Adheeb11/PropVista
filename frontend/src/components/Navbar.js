import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Navbar = ({ isAuthenticated, user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = user && user.email && user.email.includes('.devconnect');

  const navLinks = [
    { to: '/', label: 'Home', show: true },
    { to: '/listings', label: 'Listings', show: true },
    { to: '/add-property', label: 'Add Property', show: isAuthenticated },
    { to: '/dashboard', label: 'Dashboard', show: isAuthenticated },
    { to: '/login', label: 'Login/Register', show: !isAuthenticated },
  ];

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-50 to-teal-50 shadow sticky top-0 w-full z-50"
      style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900">
          <img src="/logo.png" alt="PropVista logo" className="h-8 w-8" />
          PropVista
        </Link>
        <div className="space-x-6 hidden md:flex items-center">
          {navLinks.filter(l => l.show).map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-3 py-1 font-medium transition text-gray-900 hover:text-teal-600 ${location.pathname === link.to ? 'text-teal-600 after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-teal-400 after:to-blue-500 after:rounded-full after:content-[" "]' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && user && (
            <div className="flex items-center gap-3 ml-4">
              <span className="bg-teal-500 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-lg">
                {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?'}
              </span>
              <span className="font-semibold text-gray-900 flex items-center gap-2">
                {user.name}
                {isAdmin && <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded-full font-bold ml-1">ADMIN</span>}
              </span>
              <button onClick={handleLogout} className="ml-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white px-4 py-1 rounded-full font-semibold shadow hover:scale-105 transition">Logout</button>
            </div>
          )}
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center py-6 gap-4 md:hidden z-40"
            >
              {navLinks.filter(l => l.show).map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-lg font-medium text-gray-900 hover:text-teal-600 transition ${location.pathname === link.to ? 'text-teal-600 underline' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && user && (
                <div className="flex flex-col items-center gap-2 mt-4">
                  <span className="bg-teal-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                    {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?'}
                  </span>
                  <span className="font-semibold text-gray-900 flex items-center gap-2">
                    {user.name}
                    {isAdmin && <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded-full font-bold ml-1">ADMIN</span>}
                  </span>
                  <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="mt-1 bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition">Logout</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; 