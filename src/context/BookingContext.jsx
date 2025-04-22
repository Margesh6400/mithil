import React, { createContext, useState, useContext } from 'react';
import { createBooking } from '../api/bookingApi';
import toast from 'react-hot-toast';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const setPendingBooking = (bookingData) => {
    setCurrentBooking(bookingData);
  };

  const addBooking = async (bookingData) => {
    setLoading(true);
    try {
      const response = await createBooking(bookingData);
      
      if (response.status === 200) {
        setBookings(prev => [...prev, response.data]);
        setCurrentBooking(response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error(error.message || 'Booking failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const selectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const clearCurrentBooking = () => {
    setCurrentBooking(null);
  };

  return (
    <BookingContext.Provider value={{ 
      bookings, 
      addBooking,
      currentBooking,
      setPendingBooking,
      clearCurrentBooking,
      selectedMovie,
      selectMovie,
      loading
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);