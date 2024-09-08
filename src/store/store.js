import { configureStore } from "@reduxjs/toolkit";
import BookingSlice from '../components/Booking/BookingSlice'
  const store = configureStore(
    {
        reducer: {
            booking:BookingSlice
        },
    }
)

export default store;