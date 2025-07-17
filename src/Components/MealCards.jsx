import React from 'react';
import { FaCoffee, FaUtensils, FaDrumstickBite } from 'react-icons/fa';

const MealCards = () => {
  return (
    <section className="py-16 bg-[#18181b]">
      <div className="container mx-auto px-4 text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Meal Times</h2>
        <p className="text-gray-300">Freshly prepared meals to suit every time of day.</p>
      </div>

      <div className="container mx-auto px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Breakfast */}
        <div className="bg-[#23232a] rounded-2xl shadow-md  p-8 hover:shadow-gray-300 transition-all duration-500 text-center">
          <FaCoffee className="text-gray-300  text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Breakfast</h3>
          <p className="text-gray-300">
            Start your day right with our healthy and hearty breakfast options, served fresh every morning.
          </p>
        </div>

        {/* Lunch */}
        <div className="bg-[#23232a] rounded-2xl shadow-md p-8 hover:shadow-gray-300  transition-all duration-500 text-center">
          <FaUtensils className="text-gray-300  text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Lunch</h3>
          <p className="text-gray-300">
            Fuel your afternoon with balanced, flavorful meals made with premium ingredients.
          </p>
        </div>

        {/* Dinner */}
        <div className="bg-[#23232a] rounded-2xl shadow-md p-8 hover:shadow-gray-300  transition-all duration-500 text-center">
          <FaDrumstickBite className="text-gray-300 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Dinner</h3>
          <p className="text-gray-300">
            Unwind with rich and satisfying dinner dishes that bring people together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MealCards;
