import { configureStore } from "@reduxjs/toolkit";
import BookingSlice from '../components/Booking/BookingSlice';

const store = configureStore({
  reducer: {
    booking: BookingSlice,
  },
  // Ensure thunk middleware is included (by default, it should be)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
