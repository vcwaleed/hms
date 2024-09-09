import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StickyNavbar } from '../navbar/StickyNavbar';
import { setPayment ,setType ,saveUserDetails } from './BookingSlice';
import { useNavigate } from 'react-router-dom';

const HotelPackages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve the user details from the store
  const userDetails = useSelector((state) => state.booking);

  const [filterOptions, setFilterOptions] = useState({
    budget:  userDetails.payment || 1200, // Set an initial budget to show all packages
    type: userDetails.type, // Initial value for package type
  });

  // Define the hotel packages
  const hotelPackages = [
    { id: 1, name: "Standard Room", beds: 1, people: 2, space: "20 m²", price: "100", type: 'Single' },
    { id: 2, name: "Standard Room", beds: 2, people: 3, space: "22 m²", price: "120", type: 'Single' },
    { id: 3, name: "Standard Room", beds: 1, people: 2, space: "18 m²", price: "90", type: 'Single' },
    { id: 4, name: "Standard Room", beds: 1, people: 2, space: "25 m²", price: "110", type: 'Single' },
  
    { id: 5, name: "Deluxe Room", beds: 2, people: 4, space: "40 m²", price: 200, type: 'Double' },
    { id: 6, name: "Deluxe Room", beds: 1, people: 2, space: "35 m²", price: 180, type: 'Double' },
    { id: 7, name: "Deluxe Room", beds: 2, people: 3, space: "38 m²", price: 190, type: 'Double' },
    
    { id: 8, name: "Family Suite", beds: 3, people: 6, space: "60 m²", price: 350, type: 'Family' },
    { id: 9, name: "Family Suite", beds: 4, people: 8, space: "65 m²", price: 370, type: 'Family' },
    { id: 10, name: "Family Suite", beds: 3, people: 5, space: "58 m²", price: 340, type: 'Family' },
  
    { id: 11, name: "Luxury Suite", beds: 4, people: 8, space: "80 m²", price: 500, type: 'Luxury' },
    { id: 12, name: "Luxury Suite", beds: 5, people: 10, space: "90 m²", price: 550, type: 'Luxury' },
    { id: 13, name: "Luxury Suite", beds: 4, people: 8, space: "85 m²", price: 520, type: 'Luxury' },
  
    { id: 14, name: "Honeymoon Suite", beds: 1, people: 2, space: "30 m²", price: 250, type: 'Honeymoon' },
    { id: 15, name: "Honeymoon Suite", beds: 1, people: 2, space: "32 m²", price: 270, type: 'Honeymoon' },
    { id: 16, name: "Honeymoon Suite", beds: 1, people: 2, space: "28 m²", price: 240, type: 'Honeymoon' },
  
    { id: 17, name: "Business Suite", beds: 2, people: 4, space: "50 m²", price: 300, type: 'Business' },
    { id: 18, name: "Business Suite", beds: 2, people: 4, space: "48 m²", price: 290, type: 'Business' },
    { id: 19, name: "Business Suite", beds: 1, people: 2, space: "45 m²", price: 280, type: 'Business' },
    
    { id: 20, name: "Studio Apartment", beds: 1, people: 2, space: "35 m²", price: 150, type: 'Studio' },
    { id: 21, name: "Studio Apartment", beds: 1, people: 2, space: "38 m²", price: 160, type: 'Studio' },
    { id: 22, name: "Studio Apartment", beds: 1, people: 2, space: "40 m²", price: 170, type: 'Studio' },
  
    // More variations for other types can be added similarly...
  ];
  

  // Filter hotel packages based on the budget and type
  const filteredPackages = hotelPackages.filter((pkg) => {
    const budgetMatch = !filterOptions.budget || pkg.price <= filterOptions.budget;
    const typeMatch = !filterOptions.type || filterOptions.type === pkg.type;
    return budgetMatch && typeMatch;
  });

  // Update budget filter
  const handleBudgetChange = (e) => {
    setFilterOptions({ ...filterOptions, budget: Number(e.target.value) });
  };

  // Update type filter
  const handleTypeChange = (e) => {
    setFilterOptions({ ...filterOptions, type: e.target.value });
  };

  // Dispatch user details with the package price when the "Book Now" button is clicked
  const handleBookNow = (packageData) => {
    // Dispatch the setPayment action to update the payment in the store
   dispatch(setPayment(packageData.price));
   dispatch(setType(packageData.name));

  
    // Prepare the updated user details with the package price and type
    const updatedUserDetails = {
      ...userDetails, // Preserve all existing user details
      payment: packageData.price, // Store the price of the selected package
      type: packageData.name, // Optionally update the package type
    };
  
    dispatch(saveUserDetails(updatedUserDetails))
      .unwrap() // Unwraps the promise and allows you to handle the result directly
      .then(() => {
        navigate('/bookingstatus'); // Navigate to the next page upon success
      })
      .catch((error) => {
        console.error('Error saving user details:', error);
      })
  };
  
  return (
    <>
      <StickyNavbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Hello, {userDetails.name}!</h1>

        <div className="mb-6 flex flex-col sm:flex-row sm:gap-4">
          <div>
            <label htmlFor="budget" className="text-lg font-semibold">Enter your budget: </label>
            <input
              type="number"
              id="budget"
              value={filterOptions.budget}
              onChange={handleBudgetChange}
              className="border border-gray-300 rounded-lg p-2 ml-2"
              placeholder="Enter your budget"
            />
          </div>
          <div className="mt-2 sm:mt-0">
            <label htmlFor="type" className="text-lg font-semibold">Package Type: </label>
            <select id="type" value={filterOptions.type} onChange={handleTypeChange} className="border border-gray-300 rounded-lg p-2 ml-2">
              <option value="">All Types</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Family">Family</option>
              <option value="Luxury">Luxury</option>
              <option value="Executive">Executive</option>
              <option value="Honeymoon">Honeymoon</option>
              <option value="Business">Business</option>
              <option value="Studio">Studio</option>
              <option value="Villa">Villa</option>
              <option value="Cottage">Cottage</option>
            </select>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-8">Hotel Packages within your budget</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">{pkg.name}</h2>
                <p className="text-gray-600 mb-2"><strong>Beds:</strong> {pkg.beds}</p>
                <p className="text-gray-600 mb-2"><strong>Max People:</strong> {pkg.people}</p>
                <p className="text-gray-600 mb-2"><strong>Space:</strong> {pkg.space}</p>
                <p className="text-green-600 font-bold text-lg mb-4">${pkg.price}</p>
                <button
                  onClick={() => handleBookNow(pkg)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Book Now
                </button>
              </div>
            ))
          ) : (
            <p>No packages found within your budget</p>
          )}
        </div>
      </div>
    </>
  );
};

export default HotelPackages;
