import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import BookingPage from '../pages/BookingPage';
import PaymentPage from '../pages/PaymentPage';
import BookingConfirmation from '../pages/BookingConfirmation';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/book/:movieId" element={<BookingPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
    </Routes>
  );
};

export default AppRoutes;