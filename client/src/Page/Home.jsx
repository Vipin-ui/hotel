import React from 'react'
import Hero from '../components/Hero.jsx';
import FeaturedDestinaion from '../components/FeaturedDestinaion.jsx';
import ExclusiveOffers from '../components/ExclusiveOffers.jsx';
import Testimonial from '../components/Testimonial.jsx';
import NewsLettr from '../components/NewsLettr.jsx';
import RecommendedHotels from '../components/ExclusiveOffers.jsx';

function Home() {
  return (
    <>
     <Hero></Hero>
      <RecommendedHotels/>
     <FeaturedDestinaion/>
      <ExclusiveOffers/>
      <Testimonial/>
      <NewsLettr/>
    </>
  )
}

export default Home
