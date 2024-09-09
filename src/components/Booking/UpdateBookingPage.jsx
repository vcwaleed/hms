import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails, setName, setAge, setPnumber, setType, setDuration, setMaritalStatus, setWifeName, setChildren, setPayment, setChildrenstatus } from '../Booking/BookingSlice';
import { fetchBookingDetails } from '../Booking/BookingSlice'; // You should create this thunk

const UpdateBookingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get booking data from Redux store
  const booking = useSelector((state) => state.booking);
  const status = useSelector((state) => state.booking.status);
  const error = useSelector((state) => state.booking.error);
  
  useEffect(() => {
    const fetchBooking = async () => {
      // Fetch booking details and populate the Redux store
      await dispatch(fetchBookingDetails(id));
    };

    fetchBooking();
  }, [dispatch, id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updateUserDetails({ id, userData: booking }));
    navigate('/bookings');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Update Booking</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && (
          <form onSubmit={handleUpdate}>
            <label className="block mb-4">
              <span className="text-gray-700">Name</span>
              <input
                type="text"
                className="mt-1 block w-full"
                value={booking.name}
                onChange={(e) => dispatch(setName(e.target.value))}
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Age</span>
              <input
                type="number"
                className="mt-1 block w-full"
                value={booking.age}
                onChange={(e) => dispatch(setAge(e.target.value))}
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Phone Number</span>
              <input
                type="text"
                className="mt-1 block w-full"
                value={booking.pnumber}
                onChange={(e) => dispatch(setPnumber(e.target.value))}
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Room Type</span>
              <input
                type="text"
                className="mt-1 block w-full"
                value={booking.type}
                onChange={(e) => dispatch(setType(e.target.value))}
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Duration</span>
              <input
                type="text"
                className="mt-1 block w-full"
                value={booking.duration}
                onChange={(e) => dispatch(setDuration(e.target.value))}
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Marital Status</span>
              <input
                type="text"
                className="mt-1 block w-full"
                value={booking.maritalStatus}
                onChange={(e) => dispatch(setMaritalStatus(e.target.value))}
                required
              />
            </label>
            <label className="block mb-4">
              <input
                type="checkbox"
                checked={booking.hasChildren}
                onChange={(e) => dispatch(setChildrenstatus(e.target.checked))}
              />
              <span className="ml-2">Has Children</span>
            </label>
            {booking.hasChildren && (
              <label className="block mb-4">
                <span className="text-gray-700">Children Names</span>
                <input
                  type="text"
                  className="mt-1 block w-full"
                  value={booking.children.join(', ')}
                  onChange={(e) => dispatch(setChildren(e.target.value.split(',').map(child => child.trim())))}
                />
              </label>
            )}
            <label className="block mb-4">
              <span className="text-gray-700">Payment</span>
              <input
                type="number"
                className="mt-1 block w-full"
                value={booking.payment}
                onChange={(e) => dispatch(setPayment(e.target.value))}
                required
              />
            </label>
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateBookingPage;
