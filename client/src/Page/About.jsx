import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { number: '10K+', label: 'Happy Guests' },
    { number: '500+', label: 'Hotels Listed' },
    { number: '50+', label: 'Destinations' },
    { number: '98%', label: 'Satisfaction Rate' },
  ];

  const values = [
    {
      icon: '✨',
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, ensuring the highest quality experience for our guests.',
    },
    {
      icon: '🤝',
      title: 'Trust & Transparency',
      description: 'We believe in building trust through transparent communication and honest relationships with our partners and guests.',
    },
    {
      icon: '🌍',
      title: 'Global Reach',
      description: 'Connecting travelers with exceptional accommodations and experiences around the world.',
    },
    {
      icon: '❤️',
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond to ensure memorable experiences.',
    },
  ];

  const features = [
    {
      title: 'Curated Selection',
      description: 'Handpicked hotels and accommodations that meet our strict quality standards.',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
    },
    {
      title: 'Best Price Guarantee',
      description: 'We ensure you get the best prices for your bookings, with exclusive deals and offers.',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80',
    },
    {
      title: '24/7 Support',
      description: 'Our dedicated support team is available around the clock to assist you with any queries.',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80',
    },
    {
      title: 'Secure Booking',
      description: 'Your data and transactions are protected with industry-leading security measures.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
    },
  ];

  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
      bio: 'Passionate about connecting travelers with unique experiences worldwide.',
    },
    {
      name: 'David Thompson',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
      bio: 'Ensuring smooth operations and exceptional service delivery.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Director of Partnerships',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
      bio: 'Building strong relationships with hotels and service providers.',
    },
    {
      name: 'James Park',
      role: 'Head of Technology',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
      bio: 'Leading innovation in travel technology and user experience.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 md:py-32 px-4 md:px-16 lg:px-24 xl:px-32"
      
      style={{ 
        backgroundImage: 'url(https://i.pinimg.com/1200x/43/1c/ec/431cecf0fae64a7b1698eebdd5be5032.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block mb-6">
            <p className="text-sm font-medium">Our Story</p>
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            We're dedicated to making your travel dreams come true by connecting you with the world's finest hotels and unforgettable experiences.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-16 lg:px-24 xl:px-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="font-playfair text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 md:py-20 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded with a vision to transform the way people discover and book accommodations, our platform has grown from a small startup to a trusted name in the travel industry.
                </p>
                <p>
                  We understand that every journey is unique, and every traveler deserves an exceptional experience. That's why we've carefully curated a collection of hotels and accommodations that meet our high standards for quality, comfort, and service.
                </p>
                <p>
                  Our team is passionate about travel and committed to helping you create memories that last a lifetime. Whether you're planning a romantic getaway, a family vacation, or a business trip, we're here to make it perfect.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80"
                alt="Our Story"
                className="rounded-2xl shadow-2xl object-cover w-full h-96"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 md:py-20 px-4 md:px-16 lg:px-24 xl:px-32 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To empower travelers with seamless booking experiences and connect them with extraordinary accommodations that create lasting memories. We believe that everyone deserves to explore the world comfortably and confidently.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-5xl mb-4">👁️</div>
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To become the world's most trusted and innovative platform for hotel bookings, recognized for our commitment to excellence, customer satisfaction, and sustainable travel practices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-16 md:py-20 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <Title
            title="Our Core Values"
            subTitle="The principles that guide everything we do"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="font-playfair text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 md:py-20 px-4 md:px-16 lg:px-24 xl:px-32 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Title
            title="Why Choose Us"
            subTitle="Discover what sets us apart in the travel industry"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 md:py-20 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <Title
            title="Meet Our Team"
            subTitle="The passionate individuals behind our success"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 md:py-20 px-4 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers and discover your perfect accommodation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/rooms')}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Browse Hotels
            </button>
            <button
              onClick={() => navigate('/Experience')}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Explore Experiences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
