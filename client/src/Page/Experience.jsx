import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Experience = () => {
  const navigate = useNavigate();

  const experienceCategories = [
    {
      id: 1,
      title: 'Spa & Wellness',
      description: 'Rejuvenate your mind and body with our luxurious spa treatments and wellness programs.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      icon: '🧘',
      
    },
    {
      id: 2,
      title: 'Fine Dining',
      description: 'Savor exquisite culinary experiences crafted by world-renowned chefs.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      icon: '🍽️',
      
    },
    {
      id: 3,
      title: 'Adventure Activities',
      description: 'Embark on thrilling adventures and explore the beauty of nature around you.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      icon: '⛰️',
      
    },
    {
      id: 4,
      title: 'Cultural Tours',
      description: 'Discover local culture, traditions, and hidden gems with our guided tours.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
      icon: '🏛️',
      
    },
  ];

  const featuredExperiences = [
    {
      id: 1,
      title: 'Sunset Yoga Session',
      category: 'Wellness',
      location: 'Beachfront',
      duration: '1 Hour',
      price: '$75',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
      rating: 4.9,
      reviews: 127,
    },
    {
      id: 2,
      title: 'Wine Tasting Evening',
      category: 'Dining',
      location: 'Sky Lounge',
      duration: '2 Hours',
      price: '$120',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
      rating: 4.8,
      reviews: 89,
    },
    {
      id: 3,
      title: 'Mountain Hiking Adventure',
      category: 'Adventure',
      location: 'Nature Trail',
      duration: '4 Hours',
      price: '$150',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
      rating: 5.0,
      reviews: 203,
    },
    {
      id: 4,
      title: 'City Heritage Walk',
      category: 'Culture',
      location: 'Historic District',
      duration: '3 Hours',
      price: '$65',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&q=80',
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 5,
      title: 'Luxury Spa Package',
      category: 'Wellness',
      location: 'Spa Center',
      duration: '3 Hours',
      price: '$250',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
      rating: 4.9,
      reviews: 312,
    },
    {
      id: 6,
      title: 'Cooking Masterclass',
      category: 'Dining',
      location: 'Chef\'s Kitchen',
      duration: '2.5 Hours',
      price: '$95',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
      rating: 4.8,
      reviews: 198,
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      text: 'The spa experience was absolutely incredible! The staff was professional and the facilities were top-notch. A perfect way to unwind.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Singapore',
      rating: 5,
      text: 'The wine tasting evening exceeded all expectations. Great selection of wines and amazing food pairings. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    },
    {
      id: 3,
      name: 'Emma Williams',
      location: 'London, UK',
      rating: 5,
      text: 'The hiking adventure was the highlight of our trip! Beautiful scenery and excellent guides. Worth every penny.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    },
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <img
            key={i}
            src={i < Math.floor(rating) ? assets.starIconFilled : assets.starIconOutlined}
            alt="star"
            className="w-4 h-4"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative text-white py-20 md:py-32 px-4 md:px-16 lg:px-24 xl:px-32 overflow-hidden"
        style={{ 
          backgroundImage: 'url(https://i.pinimg.com/1200x/53/9b/bf/539bbfba6deedd455432072e0ac7b8ab.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay with OKLCH gradient */}
        <div 
          className="absolute inset-0"
          style={{ 
            // background: 'linear-gradient(to right, oklch(0.85 0.05 312.28 / 0.9), oklch(0.7 0.1 312.28 / 0.85))'
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block mb-6">
            <p className="text-sm font-medium">Unforgettable Experiences</p>
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-3xl">
            Discover Extraordinary Hotel Experiences
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
            From luxurious spa treatments to thrilling adventures, immerse yourself in curated experiences that create lasting memories.
          </p>
          <button
            onClick={() => navigate('/rooms')}
            className="bg-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ color: 'oklch(0.3 0.15 312.28)' }}
          >
            Explore Hotels
          </button>
        </div>
      </div>

      {/* Experience Categories */}
      <div className="py-16 md:py-20 px-4 md:px-16 lg:px-24 xl:px-32">
        <Title
          title="Experience Categories"
          subTitle="Choose from a variety of curated experiences designed to enhance your stay"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-7xl mx-auto">
          {experienceCategories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div 
                  className="absolute inset-0 opacity-80"
                  style={{ background: 'linear-gradient(to top, oklch(0.6 0.1 312.28), transparent)' }}
                />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-playfair text-2xl font-bold">{category.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Experiences */}
      <div className="py-16 md:py-20 px-4 md:px-16 lg:px-24 xl:px-32 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Title
            title="Featured Experiences"
            subTitle="Handpicked experiences that promise to make your stay unforgettable"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {featuredExperiences.map((experience) => (
              <div
                key={experience.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <p className="text-xs font-semibold text-gray-800">{experience.category}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <p className="text-sm font-bold text-blue-600">{experience.price}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-2">
                    {experience.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src={assets.calenderIcon} alt="duration" className="w-4 h-4" />
                      <span>{experience.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StarRating rating={experience.rating} />
                      <span className="text-sm text-gray-600">
                        {experience.rating} ({experience.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300">
                    Book Experience
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 md:py-20 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <Title
            title="What Our Guests Say"
            subTitle="Real experiences from travelers who have enjoyed our curated hotel experiences"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-600 mt-4 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div 
        className="py-16 md:py-20 px-4 md:px-16 lg:px-24 xl:px-32 relative overflow-hidden"
        style={{ 
          backgroundImage: 'url(https://i.pinimg.com/736x/47/2a/dd/472add28786aa328599861a37a1371ab.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay with OKLCH gradient */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(to right, oklch(0.85 0.05 312.28 / 0.9), oklch(0.7 0.1 312.28 / 0.85))'
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Unforgettable Memories?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your stay with us and unlock access to exclusive experiences designed to make your trip extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/rooms')}
              className="bg-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ color: 'oklch(0.3 0.15 312.28)' }}
            >
              Browse Hotels
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
