import axios from 'axios';

const bookingApi = axios.create({
  baseURL: '/api/bookings',
});

// Mock booking storage since we don't have a backend
let mockBookings = [];

export const createBooking = async (bookingData) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate booking data
    if (!bookingData.movieId || !bookingData.date || !bookingData.time || !bookingData.seats || !bookingData.cinema) {
      throw new Error('Missing required booking information');
    }

    // Create booking with unique ID
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Save to mock storage
    mockBookings.push(newBooking);

    // Return success response
    return {
      data: newBooking,
      status: 200
    };
  } catch (error) {
    console.error('Booking creation failed:', error);
    throw error;
  }
};

export const getBookings = () => {
  return Promise.resolve({ data: mockBookings });
};

export default bookingApi;