import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/h.jpg'; // Ensure this path and filename are correct

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat mt-10 h-[530px] flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >

      {/* Content */}
      <div className="relative z-10 text-center px-4 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-outline">
  Welcome to Tasty Bites
</h1>

        <p className="text-lg md:text-xl text-white mb-6 max-w-xl mx-auto">
          Enjoy the finest flavors crafted with passion and love. Order your favorite dishes online or visit us for a delicious experience.
        </p>
        <div className="space-x-4">
          <button className="bg-black hover:bg-gray-900 text-white px-6 py-2 transition">
          <Link to='/place-order'>Place Order</Link>
          </button>
          <button className="border border-white text-white px-6 py-2 hover:bg-black hover:border-none hover:text-white transition">
            View Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
