import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Updated thunk with JWT token in headers
export const saveUserDetails = createAsyncThunk(
  'booking/saveUserDetails',
  async (userData, { rejectWithValue }) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');
      console.log(userData);


      if (!token) {
        setError('No token found. Please set the token in localStorage.');
        return;
      }

      // Set up headers with the token
      const config = {
        headers: {
          'Content-Type': 'application/json',
       
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      };

      const response = await axios.post('http://localhost:3000/api/admin/addUserBooking', userData, config);
      return response.data;  // This must be a plain object
    } catch (error) {
      return rejectWithValue(error.response.data); // This must also be a plain object
    }
  }
);

const BookingSlice = createSlice({
  name: "booking",
  initialState: {
    name: "",
    age: 0,
    pnumber: 0,
    type: "",
    duration: "",
    maritalStatus: 'unmarried',
    wifeName: "",
    hasChildren: true,
    children: [],
    payment:"",
    status: 'idle',
    error: null
  },
  reducers: {
    setName: (state, action) => { state.name = action.payload; },
    setAge: (state, action) => { state.age = action.payload; },
    setPnumber: (state, action) => { state.pnumber = action.payload; },
    setType: (state, action) => { state.type = action.payload; },
    setDuration: (state, action) => { state.duration = action.payload; },
    setMaritalStatus: (state, action) => { state.maritalStatus = action.payload; },
    setWifeName: (state, action) => { state.wifeName = action.payload; },
    setChildren: (state, action) => { state.children = action.payload; },
    setPayment: (state, action) => { state.payment = action.payload; },
    setChildrenstatus: (state, action) => { state.hasChildren = action.payload; },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(saveUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default BookingSlice.reducer;
export const { setName, setAge, setPnumber, setType, setDuration, setMaritalStatus, setWifeName, setChildren, setPayment , setChildrenstatus} = BookingSlice.actions;
