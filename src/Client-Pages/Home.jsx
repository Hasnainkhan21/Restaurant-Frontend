import React from 'react'
import Hero from '../Components/Hero'
import Navbar from '../Components/Navbar'
import We from '../Components/We'
import MealCards from '../Components/MealCards'
import Found from '../Components/Found'
import Footer from '../Components/Footer'
import RestaurantCarousel from '../Components/restaurantCarousel'

const Home = () => {
  return (
    <>
    <Navbar />
    <Hero />
    <We />
    <RestaurantCarousel />
    <Found />
    <MealCards />
    <Footer />
    </>
  )
}

export default Home
