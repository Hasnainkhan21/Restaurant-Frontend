import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-6"> {/* Even less vertical padding */}
      <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center justify-center space-y-4"> {/* Centered and tightly spaced */}

        {/* Brand Name */}
        <h2 className="text-2xl font-extrabold text-[#fdf6e3] tracking-wide">
          Tasty Bites
        </h2>

        {/* Social Icons */}
        <div className="flex space-x-4 text-xl">
          <a href="#" className="text-gray-400 hover:text-[#fdf6e3] transform hover:scale-110 transition duration-300 ease-in-out">
            <FaFacebookF />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#fdf6e3] transform hover:scale-110 transition duration-300 ease-in-out">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#fdf6e3] transform hover:scale-110 transition duration-300 ease-in-out">
            <FaTwitter />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-2 pt-3 border-t border-gray-700 text-center text-xs text-gray-500 w-full"> {/* Full width border and copyright */}
          &copy; {new Date().getFullYear()} Tasty Bites. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;