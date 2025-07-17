import React from 'react'
import Hero from '../Components/Hero'
import Navbar from '../Components/Navbar'
import We from '../Components/We'
import MealCards from '../Components/MealCards'
import Found from '../Components/Found'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <>
    <Navbar />
    <Hero />
    <We />
    <MealCards />
    <Found />
    <Footer />
    </>
  )
}

export default Home
