import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { registerUser } from '../services/api';

const Register = ({ setUser }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await registerUser(form.name, form.email, form.password);
      setUser(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-100 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-teal-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Register for PropVista</h1>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <motion.form onSubmit={handleSubmit} className="flex flex-col gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" />
          <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required />
          <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="px-4 py-2 rounded bg-teal-50 text-gray-900 border border-teal-200" required />
          <button type="submit" className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </motion.form>
        <span className="text-gray-500 text-sm">Already have an account? <a href="/login" className="text-teal-500 hover:underline">Login</a></span>
      </div>
    </div>
  );
};

export default Register; 