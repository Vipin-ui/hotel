import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const { axios, getToken, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        toast.error('Please log in to view your bookings');
        setLoading(false);
        return;
      }

      const { data } = await axios.get('http://localhost:3000/api/booking/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        toast.error(data.message || 'Failed to fetch bookings');
        setBookings([]);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to load bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error('Please log in to make a payment');
        return;
      }

      const { data } = await axios.post(
        'http://localhost:3000/api/booking/stripe_payment',
        { bookingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.message || 'Failed to initiate payment');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to process payment');
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
        align="left"
      />
      <div className="max-w-6xl mt-8 w-full text-gray-800">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Loading your bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">You don't have any bookings yet.</p>
            <button
              onClick={() => window.location.href = '/rooms'}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Browse Hotels
            </button>
          </div>
        ) : (
          <>
            <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
              <div>Hotels</div>
              <div>Date & Timings</div>
              <div>Payment</div>
            </div>

            {bookings.map((book) => (
              book && book.room && book.hotel && (
                <div
                  key={book._id}
                  className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
                >
                  <div className="flex flex-col md:flex-row">
                    <img
                      src={book.room?.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                      alt="hotel-img"
                      className="md:w-44 rounded shadow object-cover h-32 md:h-auto"
                    />
                    <div className="flex flex-col gap-1.5 md:ml-4 mt-2 md:mt-0">
                      <p className="font-playfair text-2xl">
                        {book.hotel?.name || 'Hotel Name'}
                        <span className="font-inter text-sm">
                          ({book.room?.roomType || 'Room Type'})
                        </span>
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <img src={assets.locationIcon} alt="location-img" />
                        <span>{book.hotel?.address || 'Address not available'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <img src={assets.guestsIcon} alt="guests-img" />
                        <span>Guests: {book.guests || 1}</span>
                      </div>
                      <p className="text-base">Total: {currency} {book.totalPrice || 0}</p>
                    </div>
                  </div>

                  <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
                    <div>
                      <p className="font-medium">Check-In:</p>
                      <p className="text-gray-500 text-sm">
                        {book.checkInDate ? new Date(book.checkInDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Check-Out:</p>
                      <p className="text-gray-500 text-sm">
                        {book.checkOutDate ? new Date(book.checkOutDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start justify-center pt-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          book.isPaid ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      ></div>
                      <p
                        className={`text-sm px-2 py-0.5 rounded-full text-white ${
                          book.isPaid ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {book.isPaid ? 'Paid' : 'Unpaid'}
                      </p>
                    </div>
                    {!book.isPaid && (
                      <button
                        onClick={() => handlePayment(book._id)}
                        className="px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              )
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

