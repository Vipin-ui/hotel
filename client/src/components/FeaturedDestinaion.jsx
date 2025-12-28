import React from 'react'
// import {roomsDummyData} from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function FeaturedDestinaion() {
  const {rooms} =useAppContext()
  const navigate=useNavigate()
  

  return rooms.length > 0 &&(
    <div className="flex flex-col itmes-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <Title
        title="Featured Destination"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />
      <div className="flex flex-wrap itmes-center justify-center gap-6 mt-20">
        {rooms.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
      <button
        className=" block  my-16 mx-auto px-6 py-2 w-32 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
        onClick={() => {
          navigate("/rooms ");
          scrollTo(0, 0);
        }}
      >
        View All Destinations
      </button>
    </div>
  );
}

export default FeaturedDestinaion
