import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { fetchMenuItems } from '../Services/menuServices';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchMenuItems();
        setMenuItems(items);
      } catch (err) {
        console.error("Failed to fetch menu items:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-10">
        <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-10">
          🍽 Explore Our Menu
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {menuItems.map(item => (
  <div
    key={item._id}
    className="relative group border border-white hover:border-orange-500 rounded-xl overflow-hidden shadow-lg h-80 transition-all duration-300"
  >
    {/* Background Image */}
    <img
      src={`http://localhost:3002/uploads/${item.image}`}
      alt={item.name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    {/* Gradient for text readability */}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white z-10">
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p className="text-orange-300 font-semibold">Rs. {item.price}</p>
      <p className="text-sm">{item.description}</p>
      <p className="text-xs italic text-gray-300">Category: {item.category}</p>
    </div>

    {/* Order Now Button - bottom right, visible only on hover */}
    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
      <button
              onClick={() => navigate('/place-order')}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Order Now
            </button>
    </div>
  </div>
))}


        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Menu;
