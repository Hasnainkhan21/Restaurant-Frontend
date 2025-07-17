import React, { useState, useEffect } from "react";
import { FaUser, FaBars, FaTimes, FaUtensils } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-black text-white shadow-md px-4 py-3 fixed border-white border-b w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-400">Tasty Bites</Link>

        {/* Hamburger (Mobile) */}
        <div className="lg:hidden text-orange-400 text-2xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Menu */}
        <ul className={`lg:flex lg:items-center gap-6 absolute lg:static top-full left-0 w-full lg:w-auto bg-black lg:bg-transparent p-4 lg:p-0 transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'}`}>
  <li>
    <Link to="/" className="block py-2 px-4 hover:text-orange-400">Home</Link>
  </li>
  <li>
    <Link to="/menu" className="block py-2 px-4 hover:text-orange-400">Menu</Link>
  </li>
  <li>
    <Link to="/about" className="block py-2 px-4 hover:text-orange-400">About Us</Link>
  </li>

  {/* Cart */}
  <li className="relative">
        <Link to="/order" className="py-2 px-4 hover:text-orange-400 flex items-center gap-2">
        <FaUtensils className="text-lg text-white hover:text-orange-300" />
        </Link>
 </li>

  {/* Auth Buttons (mobile) */}
  <li className="block lg:hidden">
    {!isLoggedIn ? (
      <Link to="/login" className="block py-2 px-4 text-orange-400 hover:text-white">Login</Link>
    ) : (
      <button onClick={handleLogout} className="block w-full text-left py-2 px-4 text-orange-400 hover:text-white">Logout</button>
    )}
  </li>
</ul>


        {/* Right-side Auth (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4">
          {!isLoggedIn ? (
            <Link to="/login" className="hover:text-orange-400">Login</Link>
          ) : (
            <div className="flex items-center space-x-3">
              <FaUser className="text-orange-300" />
              <span className="text-orange-300 font-medium">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="border border-orange-400 text-orange-400 px-3 py-1 rounded-full hover:bg-orange-500 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
