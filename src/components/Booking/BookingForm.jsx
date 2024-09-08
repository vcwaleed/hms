import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useDispatch } from 'react-redux';
import { setName, setAge, setPnumber, setType, setDuration, setMaritalStatus, setWifeName, setChildren, setPayment, saveUserDetails } from './BookingSlice';
import { useNavigate } from 'react-router-dom';
import { StickyNavbar } from '../navbar/StickyNavbar';

const BookingForm = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [maritalStatus, setMaritalStatusState] = useState('unmarried');
  const [hasChildren, setHasChildren] = useState(false);
  const [children, setChildrenState] = useState([]);

  const onSubmit = (data) => {
    dispatch(setName(data.name));
    dispatch(setAge(data.age));
    dispatch(setPnumber(data.pnumber));
    dispatch(setType(data.type));
    dispatch(setDuration(data.duration));
    dispatch(setPayment(data.payment));
    dispatch(setMaritalStatus(maritalStatus));

    if (maritalStatus === 'married') {
      dispatch(setWifeName(data.wifeName || ""));
    }

    if (hasChildren) {
      dispatch(setChildren(children));
    }

    const bookingData = {
      name: data.name,
      age: data.age,
      pnumber: data.pnumber,
      type: data.type,
      duration: data.duration,
      maritalStatus,
      wifeName: maritalStatus === 'married' ? data.wifeName : "",
      hasChildren,
      children,
      payment: data.payment,
    };

    
      navigate('/confirm');
    
  };

  const handleAddChild = () => {
    setChildrenState([...children, { name: '' }]);
  };

  const handleRemoveChild = (index) => {
    const updatedChildren = children.filter((_, childIndex) => childIndex !== index);
    setChildrenState(updatedChildren);
  };

  const handleChildNameChange = (index, value) => {
    const updatedChildren = [...children];
    updatedChildren[index].name = value;
    setChildrenState(updatedChildren);
  };

  return (
    <>
    <StickyNavbar />
    <div className="min-h-screen flex justify-center bg-gray-100 p-4 bg-center bg-cover first-letter: bg-[url('./b1.jpg')]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 w-48rem"
        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Booking Form</h2>
        
        <div className='flex flex-row justify-between'>
          <div className="mb-4 w-80">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>

          <div className="mb-4 w-80">
            <label htmlFor="age" className="block text-gray-700 font-medium mb-2">Age</label>
            <input
              type="number"
              id="age"
              {...register('age', { required: 'Age is required' })}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
            {errors.age && <span className="text-red-500">{errors.age.message}</span>}
          </div>
        </div>

        <div className='flex flex-row justify-between'>
          <div className="mb-4 w-80">
            <label htmlFor="pnumber" className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="number"
              id="pnumber"
              {...register('pnumber', { required: 'Phone number is required' })}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
            {errors.pnumber && <span className="text-red-500">{errors.pnumber.message}</span>}
          </div>

          <div className="mb-4 w-80">
            <label htmlFor="type" className="block text-gray-700 font-medium mb-2">Type</label>
            <select
              id="type"
              {...register('type', { required: 'Type is required' })}
              className="w-full border border-gray-300 p-2 rounded-lg"
            >
              <option value="">Select a type</option>
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
            {errors.type && <span className="text-red-500">{errors.type.message}</span>}
          </div>
        </div>

        <div className='flex flex-row justify-between'>
          <div className="mb-4 w-80">
            <label htmlFor="duration" className="block text-gray-700 font-medium mb-2">Duration</label>
            <input
              type="text"
              id="duration"
              {...register('duration', { required: 'Duration is required' })}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
            {errors.duration && <span className="text-red-500">{errors.duration.message}</span>}
          </div>

          <div className="mb-4 w-80">
            <label htmlFor="payment" className="block text-gray-700 font-medium mb-2" >Budget</label>
            <input
              type="text"
              id="payment"
              placeholder="budget in doller"
              {...register('payment', { required: 'Budget is required' })}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
            {errors.payment && <span className="text-red-500">{errors.payment.message}</span>}
          </div>
        </div>

        {/* Marital Status */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Marital Status</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                value="unmarried"
                checked={maritalStatus === 'unmarried'}
                onChange={() => setMaritalStatusState('unmarried')}
                className="mr-2"
              />
              Unmarried
            </label>
            <label>
              <input
                type="radio"
                value="married"
                checked={maritalStatus === 'married'}
                onChange={() => setMaritalStatusState('married')}
                className="mr-2"
              />
              Married
            </label>
          </div>
        </div>

        {/* Conditionally render wife name and children based on marital status */}
        {maritalStatus === 'married' && (
          <>
            <div className="mb-4">
              <label htmlFor="wifeName" className="block text-gray-700 font-medium mb-2">Wife's Name</label>
              <input
                type="text"
                id="wifeName"
                {...register('wifeName', { required: 'Wife’s name is required if married' })}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
              {errors.wifeName && <span className="text-red-500">{errors.wifeName.message}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Do you have children?</label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={!hasChildren}
                    onChange={() => setHasChildren(false)}
                    className="mr-2"
                  />
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    value="yes"
                    checked={hasChildren}
                    onChange={() => setHasChildren(true)}
                    className="mr-2"
                  />
                  Yes
                </label>
              </div>
            </div>

            {hasChildren && (
              <>
                <button
                  type="button"
                  onClick={handleAddChild}
                  className="bg-blue-500 text-white py-1 px-4 rounded-lg mb-4"
                >
                  Add Child
                </button>
                {children.map((child, index) => (
                  <div key={index} className="mb-4">
                    <label htmlFor={`childName_${index}`} className="block text-gray-700 font-medium mb-2">Child {index + 1} Name</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        id={`childName_${index}`}
                        value={child.name}
                        onChange={(e) => handleChildNameChange(index, e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveChild(index)}
                        className="ml-2 text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
    </>
  );
};

export default BookingForm;
