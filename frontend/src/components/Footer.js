import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-white via-blue-50 to-teal-50 text-gray-700 py-10 mt-12 border-t border-teal-100"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-bold text-teal-600">PropVista</span>
          <span className="text-sm">&copy; {new Date().getFullYear()} PropVista. All rights reserved.</span>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-900">Quick Links</span>
            <a href="/" className="hover:text-teal-600 transition text-sm">Home</a>
            <a href="/listings" className="hover:text-teal-600 transition text-sm">Listings</a>
            <a href="/add-property" className="hover:text-teal-600 transition text-sm">Add Property</a>
            <a href="/dashboard" className="hover:text-teal-600 transition text-sm">Dashboard</a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-900">Contact</span>
            <span className="text-sm">Email: support@propvista.com</span>
            <span className="text-sm">Phone: +91 98765 43210</span>
          </div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-teal-600 transition" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0016.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 01-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0024 4.557z" /></svg>
            </a>
            <a href="#" className="hover:text-teal-600 transition" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .592 0 1.326v21.348C0 23.406.597 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.406 24 22.674V1.326C24 .592 23.403 0 22.675 0" /></svg>
            </a>
            <a href="#" className="hover:text-teal-600 transition" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.13 4.602.402 3.635 1.37 2.668 2.338 2.396 3.511 2.338 4.788.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.058 1.277.33 2.45 1.298 3.418.968.968 2.141 1.24 3.418 1.298C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.45-.33 3.418-1.298.968-.968 1.24-2.141 1.298-3.418.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.33-2.45-1.298-3.418-.968-.968-2.141-1.24-3.418-1.298C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer; 