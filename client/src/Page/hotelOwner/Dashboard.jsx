import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

function Dashboard() {
  const { axios, getToken, user, currency } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        toast.error('Please log in as owner to view dashboard');
        setLoading(false);
        return;
      }
      const { data } = await axios.get('http://localhost:3000/api/booking/owner/rooms', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        console.log('Dashboard API Response:', data);
        const dashboardInfo = data.dashboardData || { bookings: [], totalBookings: 0, totalRevenue: 0 };
        console.log('Setting dashboard data:', dashboardInfo);
        setDashboardData(dashboardInfo);
      } else {
        toast.error(data.message || 'Failed to load dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchDashboardData();
  }, [user]);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and revenue—all in one place."
      />

      <div className="flex gap-4 my-8">
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img src={assets.totalBookingIcon} alt="" className="max-sm:hidden h-10" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img src={assets.totalRevenueIcon} alt="" className="max-sm:hidden h-10" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base">
              {currency}{dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl text-blue-950/70 font-medium mb-5">Recent Bookings</h2>
      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        {loading ? (
          <div className="py-8 text-center text-gray-500">Loading bookings...</div>
        ) : !dashboardData.bookings || dashboardData.bookings.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No bookings yet. <br />
            <span className="text-xs text-gray-400">Bookings will appear here once customers book your rooms.</span>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-gray-800 font-medium text-left">User Name</th>
                <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden text-left">
                  Room
                </th>
                <th className="py-3 px-4 text-gray-800 font-medium text-center">
                  Total Amount
                </th>
                <th className="py-3 px-4 text-gray-800 font-medium text-center">
                  Payment Status
                </th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {dashboardData.bookings.map((item, index) => (
                <tr key={item._id || index}>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {item.user?.username || item.user?.name || 'Guest'}
                  </td>

                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {item.room?.roomType || 'Room'}
                  </td>

                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                    {currency}{item.totalPrice || 0}
                  </td>

                  <td className="py-3 px-4 border-t border-gray-300 flex justify-center">
                    <button
                      className={`py-1 px-3 text-xs rounded-full 
                        ${item.isPaid ? 'bg-green-200 text-green-600' : 'bg-amber-200 text-yellow-600'}`}
                    >
                      {item.isPaid ? 'Completed' : 'Pending'}
                    </button>
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

export default Dashboard;
