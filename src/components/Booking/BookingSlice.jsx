import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const saveUserDetails = createAsyncThunk(
  'booking/saveUserDetails',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', userData);
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
    hasChildren: false,
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
export const { setName, setAge, setPnumber,setType, setDuration, setMaritalStatus, setWifeName, setChildren,setPayment } = BookingSlice.actions;
