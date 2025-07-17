import React from 'react';
import salad from '../assets/img1.png';
import chicken from '../assets/img2.png';
import croissant from '../assets/img3.png';
import crepe from '../assets/img4.png';
import { useNavigate } from 'react-router-dom';

const Found = () => {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate('/menu');
  };
  return (
    <section className="bg-[#fdf6e3] pt-5">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <p className="text-orange-500 uppercase font-semibold text-2xl tracking-wide mb-2">Founded in 1998</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          More Than Drinks <br className="hidden sm:block" />
          Crafted Moments Await
        </h1>
      </div>

      {/* Cards */}
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {/* Item 1 */}
        <div>
          <img
            src={salad}
            alt="Spring Salad"
            className="w-39 h-39 mx-auto object-cover rounded-full shadow-md border-4 border-white"
          />
          <h3 className="text-lg font-semibold mt-4 text-gray-800">Spring Salad</h3>
          <p className="text-orange-500 mt-1 font-medium">$20.00</p>
        </div>

        {/* Item 2 */}
        <div>
          <img
            src={chicken}
            alt="Chicken Fry"
            className="w-39 h-39 mx-auto object-cover rounded-full shadow-md border-4 border-white"
          />
          <h3 className="text-lg font-semibold mt-4 text-gray-800">Chicken Fry</h3>
          <p className="text-orange-500 mt-1 font-medium">$25.00</p>
        </div>

        {/* Item 3 */}
        <div>
          <img
            src={croissant}
            alt="Croissant"
            className="w-39 h-39 mx-auto object-cover rounded-full shadow-md border-4 border-white"
          />
          <h3 className="text-lg font-semibold mt-4 text-gray-800">Croissant</h3>
          <p className="text-orange-500 mt-1 font-medium">$10.00</p>
        </div>

        {/* Item 4 */}
        <div>
          <img
            src={crepe}
            alt="Le Crepe"
            className="w-39 h-39 mx-auto object-cover rounded-full shadow-md border-4 border-white"
          />
          <h3 className="text-lg font-semibold mt-4 text-gray-800">Le Crepe</h3>
          <p className="text-orange-500 mt-1 font-medium">$20.00</p>
        </div>
      </div>
      <div className='flex justify-center items-center mt-10 py-5'>
        <button onClick={handleclick} className="bg-black border-black border-1 cursor-pointer hover:bg-white hover:text-black text-white px-6 py-2 transition duration-300">
          Menue
        </button>
      </div>
    </section>
  );
};

export default Found;
