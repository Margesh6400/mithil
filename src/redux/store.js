import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import movieSlice from './slices/movieSlice';
import bookingSlice from './slices/bookingSlice';
import adminSlice from './slices/adminSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    movies: movieSlice,
    bookings: bookingSlice,
    admin: adminSlice,
  },
});

export default store;