import React from 'react';
import qualityImg from '../assets/we.png'; // Import the CSS file for animation

const We = () => {
  return (
    <section className="bg-[#FFF9E5] py-16">
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-10">
        
        {/* Image Section */}
        <div className="lg:w-1/2 w-full slide-in-left">
          <img
            src={qualityImg}
            alt="High Quality Food"
            className="rounded-lg  w-[500px] object-cover max-h-[500px]"
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 w-full text-center lg:text-left">
          <p className="text-orange-500 font-semibold text-2xl uppercase tracking-wide mb-2">
            Flavors For Royalty
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            We Ensure Healthy & High-Quality Foods
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We’re committed to providing you with food that’s not only delicious but also packed with essential nutrients.
            Our high standards ensure each ingredient is fresh, high-quality, and supports your well-being.
          </p>
          <button className="bg-black border-black border-1 cursor-pointer hover:bg-white hover:text-black text-white px-6 py-2 transition duration-300">
            About Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default We;
