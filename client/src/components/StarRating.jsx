import React from "react";

const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i} // ✅ unique key for each star
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.194a1 1 0 00.95.69h4.41c.969 0 1.371 1.24.588 1.81l-3.57 2.593a1 1 0 00-.364 1.118l1.357 4.194c.3.921-.755 1.688-1.54 1.118l-3.57-2.593a1 1 0 00-1.175 0l-3.57 2.593c-.784.57-1.838-.197-1.539-1.118l1.357-4.194a1 1 0 00-.364-1.118L2.744 9.62c-.783-.57-.38-1.81.588-1.81h4.41a1 1 0 00.95-.69l1.357-4.194z"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;

// import React from 'react'
// import { assets } from '../assets/assets';

// const StarRating =({rating=4})=> {
//   return (
//     <>
//       {Array(5).fill('') .map((_, index) => (

//         <img src={rating > index ? assets.starIconFilled:assets.starIconOutlined} alt="star-icon"
//         className='w-4.5 h-4.5'/>

//         ))}
//     </>
//   );
// }

// export default StarRating
