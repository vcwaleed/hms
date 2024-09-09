import { useState, useEffect } from 'react';
import { StickyNavbar } from '../navbar/StickyNavbar';
import { useNavigate } from 'react-router-dom';

const UserBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please set the token in localStorage.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/admin/getUserBooking', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setBookings(data);
        } else {
          setError(data.error || 'Failed to fetch bookings.');
        }
      } catch (err) {
        setError('Error fetching bookings.');
        console.error('Error:', err);
      }
    };

    fetchBookings();
  }, []);
  

const handleEditBooking = (id) => {
  navigate(`/booking/${id}`);
};

  return (
    <>  
    <StickyNavbar/>
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">User Bookings</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {bookings.length > 0 ? (
          <ul className="space-y-4">
            {bookings.map(({ _id, name, age, pnumber, type, duration, maritalStatus, hasChildren, children, payment }) => (
              <li key={_id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p><strong className="font-semibold">Name:</strong> {name}</p>
                <p><strong className="font-semibold">Age:</strong> {age}</p>
                <p><strong className="font-semibold">Phone Number:</strong> {pnumber}</p>
                <p><strong className="font-semibold">Room Type:</strong> {type}</p>
                <p><strong className="font-semibold">Duration:</strong> {duration}</p>
                <p><strong className="font-semibold">Marital Status:</strong> {maritalStatus}</p>
                <p><strong className="font-semibold">Children:</strong> {hasChildren ? 'Yes' : 'No'}</p>
                {hasChildren && (
                  <p><strong className="font-semibold">Children Names:</strong> {children.join(', ')}</p>
                )}
                <p><strong className="font-semibold">Payment:</strong> ${payment}</p>
                <button type="button"  onClick={() => handleEditBooking(_id)} class="text-white mt-4 ml-4 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update</button>


              </li>
             
            ))}
          </ul>
        ) : (
          !error && <p className="text-gray-500">No bookings found.</p>
        )}
      </div>
    </div>

    </>
  );
};

export default UserBookingPage;
