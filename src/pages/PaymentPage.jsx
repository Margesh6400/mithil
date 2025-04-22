import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Calendar, Lock, User } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import Header from '../components/common/Header';
import toast from 'react-hot-toast';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { currentBooking, addBooking, loading } = useBooking();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  if (!currentBooking) {
    navigate('/');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || '';
      if (formattedValue.length > 19) return; // 16 digits + 3 spaces
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').match(/.{1,2}/g)?.join('/') || '';
      if (formattedValue.length > 5) return; // MM/YY format
    }

    // Limit CVV to 3 digits
    if (name === 'cvv' && value.length > 3) return;

    setPaymentDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!paymentDetails.cardNumber || !paymentDetails.cardHolder || 
        !paymentDetails.expiryDate || !paymentDetails.cvv) {
      toast.error('Please fill in all payment details');
      return;
    }

    try {
      // In a real app, you would process the payment here
      const success = await addBooking(currentBooking);
      if (success) {
        toast.success('Payment successful!');
        navigate('/booking-confirmation');
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-blue-50">
      <Header />
      <div className="px-4 pt-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white rounded-xl shadow-md"
          >
            {/* Booking Summary */}
            <div className="p-4 mb-6 rounded-lg bg-blue-50">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Booking Summary</h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Movie:</span> {currentBooking.movieTitle}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Date:</span> {new Date(currentBooking.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Time:</span> {currentBooking.time}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Seats:</span> {currentBooking.seats.join(', ')}
                </p>
                <div className="pt-2 mt-2 border-t border-blue-100">
                  <p className="text-lg font-semibold text-gray-800">
                    Total Amount: <span className="text-blue-600">₹{currentBooking.totalAmount}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-10 border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Card Holder Name
                  </label>
                  <div className="relative">
                    <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="text"
                      name="cardHolder"
                      value={paymentDetails.cardHolder}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full pl-10 border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentDetails.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full pl-10 border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <div className="relative">
                      <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="password"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full pl-10 border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-4 mt-6 border-t border-gray-100 sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 px-6 py-3 text-sm font-semibold text-white rounded-lg
                      ${loading 
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                      }
                    `}
                  >
                    {loading ? 'Processing...' : 'Pay Now'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Back
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;