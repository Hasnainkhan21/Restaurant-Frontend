import React from 'react';
import Navbar from '../Components/Navbar'; // Assuming you have a Navbar component
import Footer from '../Components/Footer'; // Assuming you have a Footer component

// You might want to replace these with actual images from your restaurant
// For a dark theme, consider images with good contrast or darker tones that blend well
import teamPhoto from '../assets/we.png'; // Example: A photo of your team or chefs
import restaurantInterior from '../assets/res.jpg'; // Example: A photo of your restaurant's ambiance

const About = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23a0aec0\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zm1 5v1H5zM6 0H5v1z\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '6px 6px',
        }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-[#fdf6e3] animate-fadeInUp">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-300 animate-fadeIn">
            Crafting Culinary Journeys, One Dish at a Time.
          </p>
        </div>
      </section>

      {/* About Us Content Sections */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

        {/* Section 1: Our Philosophy / Who We Are */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="md:order-2">
            <img
              src={restaurantInterior}
              alt="Tasty Bites Restaurant Interior"
              className="rounded-xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="md:order-1 text-gray-200">
            <h2 className="text-4xl font-bold text-[#fdf6e3] mb-6">
              More Than Just Food
            </h2>
            <p className="mb-4 leading-relaxed text-lg">
              At **Tasty Bites**, we believe that dining is an experience that engages all senses. Founded in 20XX in the heart of Dargai, our journey began with a simple yet profound vision: to create a space where authentic flavors meet unparalleled hospitality. Every ingredient is carefully selected, and every dish is prepared with a passion that transcends the plate.
            </p>
            <p className="leading-relaxed text-lg">
              We are committed to delivering not just a meal, but a memory, blending traditional techniques with innovative approaches to bring you a culinary adventure you won't forget.
            </p>
          </div>
        </section>

        {/* --- */}

        {/* Section 2: Meet Our Team / The People Behind the Magic */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src={teamPhoto}
              alt="Our Talented Team at Tasty Bites"
              className="rounded-xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="text-gray-200">
            <h2 className="text-4xl font-bold text-[#fdf6e3] mb-6">
              The Heart of Our Kitchen
            </h2>
            <p className="mb-4 leading-relaxed text-lg">
              Behind every delicious creation at Tasty Bites is a team of dedicated chefs and passionate individuals. Led by **Chef [Chef's Name]**, whose culinary expertise spans two decades, our kitchen is a hub of creativity and precision. Our staff, from the front-of-house warmth to the meticulous hands in the kitchen, are all united by a shared love for food and a commitment to your satisfaction.
            </p>
            <p className="leading-relaxed text-lg">
              We're more than just colleagues; we're a family dedicated to making your dining experience truly exceptional.
            </p>
          </div>
        </section>

        {/* --- */}

        {/* Section 3: Our Ingredients / Commitment to Quality (or a CTA) */}
        <section className="text-center bg-gray-800 p-12 rounded-xl shadow-2xl">
          <h2 className="text-4xl font-bold text-[#fdf6e3] mb-6">
            Our Commitment to Quality
          </h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300 mb-8">
            We believe that extraordinary food begins with extraordinary ingredients. We meticulously source the freshest local produce, premium meats, and authentic spices to ensure every bite is bursting with flavor and integrity. Our commitment extends from farm to fork, guaranteeing a dining experience that is not only delicious but also wholesome.
          </p>
          {/* Optional: Add a subtle animation or unique divider */}
          <div className="w-24 h-1 bg-[#fdf6e3] mx-auto rounded-full mt-8"></div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;