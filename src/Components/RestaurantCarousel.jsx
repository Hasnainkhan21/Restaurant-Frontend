import React, { useState, useEffect } from 'react';
import coziamb from '../assets/ambiance.jpg'
import special from '../assets/special.jpg'
import ingrediants from '../assets/ing.jpeg'
import happy from '../assets/happy.jpg'

const images = [
  {
    src: special,
    alt: 'Delicious Signature Dish',
    title: 'Savor the Flavors',
    description: 'Experience our chef\'s special creations, crafted with passion and the finest ingredients.',
  },
  {
    src: coziamb,
    alt: 'Restaurant Interior Ambiance',
    title: 'A Perfect Dining Experience',
    description: 'Relax in our cozy and elegant atmosphere, ideal for any occasion.',
  },
  {
    src: ingrediants,
    alt: 'Freshly Sourced Ingredients',
    title: 'Farm to Table Freshness',
    description: 'We pride ourselves on sourcing the freshest local produce and premium ingredients.',
  },
  {
    src: happy,
    alt: 'Happy Customers Dining',
    title: 'Your Delight, Our Priority',
    description: 'Join us and create unforgettable memories with delightful food and service.',
  },
];

const RestaurantCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [totalSlides]);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-gray-900 my-12">
      {/* Carousel slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-[400px] md:h-[370px] lg:h-[550px]">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover opacity-70" // Slightly dimmed image for text readability
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x600/333333/ffffff?text=Image+Load+Error'; }}
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent flex flex-col justify-end items-center p-8 text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#fdf6e3] mb-3 drop-shadow-lg">
                {image.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-md">
                {image.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-[#fdf6e3] p-3 rounded-full shadow-lg hover:bg-opacity-90 transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#fdf6e3] focus:ring-opacity-75"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-[#fdf6e3] p-3 rounded-full shadow-lg hover:bg-opacity-90 transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#fdf6e3] focus:ring-opacity-75"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#fdf6e3] focus:ring-offset-2 focus:ring-offset-gray-900 ${
              index === currentSlide ? 'bg-[#fdf6e3]' : 'bg-gray-400 bg-opacity-60 hover:bg-opacity-80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default RestaurantCarousel;