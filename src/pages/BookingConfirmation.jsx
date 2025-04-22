import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import Header from '../components/common/Header';

const ConfettiPiece = ({ index }) => {
  const randomColor = () => {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <motion.div
      initial={{
        y: -10,
        x: 0,
        rotate: 0,
        opacity: 0
      }}
      animate={{
        y: [null, Math.random() * 400 + 200],
        x: [null, (Math.random() - 0.5) * 400],
        rotate: [null, Math.random() * 360],
        opacity: [0, 1, 1, 0]
      }}
      transition={{
        duration: 2.5,
        delay: index * 0.1,
        ease: [0.23, 0.83, 0.68, 0.22],
        times: [0, 0.4, 0.8, 1]
      }}
      className="absolute"
      style={{
        width: Math.random() * 10 + 5,
        height: Math.random() * 10 + 5,
        backgroundColor: randomColor(),
        borderRadius: '50%'
      }}
    />
  );
};

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { currentBooking, clearCurrentBooking, loading } = useBooking();

  useEffect(() => {
    if (!currentBooking && !loading) {
      navigate('/');
    }
    
    // Clear booking data when component unmounts
    return () => clearCurrentBooking();
  }, [currentBooking, navigate, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!currentBooking) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-gray-50 to-blue-50">
      <Header />
      
      {/* Confetti Container */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <ConfettiPiece key={i} index={i} />
        ))}
      </div>

      <div className="px-4 pt-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className="max-w-2xl p-8 mx-auto bg-white rounded-xl shadow-md"
        >
          <div className="flex flex-col items-center text-center">
            <motion.div 
              className="flex items-center justify-center w-16 h-16 mb-6 bg-blue-50 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.3
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Check className="w-8 h-8 text-blue-500" />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="mb-4 text-2xl font-bold text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Booking Confirmed!
            </motion.h1>
            
            <motion.p 
              className="mb-8 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Your tickets have been booked successfully.
            </motion.p>
          </div>

          <motion.div 
            className="p-6 mb-6 space-y-4 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-between text-gray-700">
              <span className="font-semibold">Movie:</span>
              <span>{currentBooking.movieTitle}</span>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <span className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-semibold">Date:</span>
              </span>
              <span>{new Date(currentBooking.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <span className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-semibold">Time:</span>
              </span>
              <span>{currentBooking.time}</span>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <span className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-semibold">Seats:</span>
              </span>
              <span>{currentBooking.seats.join(', ')}</span>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                <motion.span 
                  className="text-lg font-bold text-blue-600"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: 1,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  ₹{currentBooking.totalAmount}
                </motion.span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center flex-1 px-6 py-3 text-sm font-medium text-gray-700 transition-colors bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              Back to Home
            </Link>
            <motion.button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center flex-1 px-6 py-3 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Ticket
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmation;