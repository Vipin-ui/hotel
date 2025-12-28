import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

function ListRoom() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios, getToken, user, currency } = useAppContext();

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        toast.error('Please log in as owner to view rooms');
        setLoading(false);
        return;
      }
      const { data } = await axios.get(`http://localhost:3000/api/rooms/owner`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setRooms(data.rooms || []);
      } else {
        toast.error(data.message || 'Failed to load rooms');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (roomId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        'http://localhost:3000/api/rooms/toggle-availability',
        { roomId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchRooms();
      } else {
        toast.error(data.message || 'Failed to update availability');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
      />
      <p className="text-gray-500 mt-8">All Rooms</p>
      <div className="w-full max-w-4xl text-left border border-gray-300 rounded-lg max-h-[420px] overflow-y-auto mt-3">
        {loading ? (
          <div className="py-10 text-center text-gray-500">Loading rooms...</div>
        ) : rooms.length === 0 ? (
          <div className="py-10 text-center text-gray-500">No rooms found.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-gray-800 font-medium text-left">Name</th>
                <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden text-left">
                  Amenities
                </th>
                <th className="py-3 px-4 text-gray-800 font-medium text-left">
                  Price / night
                </th>
                <th className="py-3 px-4 text-gray-800 font-medium text-center">
                  Available
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rooms.map((item) => (
                <tr key={item._id}>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {item.roomType || 'Room'}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                    {(item.amenities || []).join(', ')}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {currency} {item.pricePerNight || 0}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-300 text-sm text-center">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        onChange={() => toggleAvailability(item._id)}
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.isAvailable}
                        readOnly
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ListRoom;
