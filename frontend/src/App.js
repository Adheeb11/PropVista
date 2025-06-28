import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import AddProperty from './pages/AddProperty';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import { useState } from 'react';

function App() {
  // User state for authentication
  const [user, setUser] = useState(null); // { name, email }
  const isAuthenticated = !!user;

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} user={user} setUser={setUser} />
      <div className="pt-0 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/add-property" element={<AddProperty user={user} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
          </Route>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
