import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Film, AlertCircle, Star, Tag, User, Users } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { getMovieDetails } from '../api/movieApi';
import { generateSeatMap } from '../utils/seatUtils';
import Header from '../components/common/Header';
import toast from 'react-hot-toast';

const BookingPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { addBooking, selectedMovie, selectMovie, setPendingBooking } = useBooking();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState('');
  const [seatMap, setSeatMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cinemas = [
    { id: 'ruby', name: 'Ruby Cinema', color: 'text-red-600', description: 'Luxury cinema with extra-wide seats and premium corners' },
    { id: 'sapphire', name: 'Sapphire Cinema', color: 'text-blue-600', description: 'Tall theater with premium middle section' },
    { id: 'emerald', name: 'Emerald Cinema', color: 'text-green-600', description: 'Intimate setting with center aisle' },
  ];

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await getMovieDetails(movieId);
        selectMovie(response.data);
      } catch (err) {
        setError('Failed to load movie details. Please try again.');
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!selectedMovie || selectedMovie.id !== movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  useEffect(() => {
    if (selectedCinema) {
      setSeatMap(generateSeatMap(selectedCinema));
      setSelectedSeats([]); // Clear selected seats when changing cinema
    }
  }, [selectedCinema]);

  const showTimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];
  const pricing = {
    Premium: 500,  // Rows I-J
    Standard: 350, // Rows E-H
    Basic: 200,    // Rows A-D
  };

  const getSeatPrice = (seat) => {
    return seat.price;
  };

  const calculateTotalAmount = () => {
    return selectedSeats.reduce((total, seatId) => {
      const [row, col] = seatId.split('-');
      const seat = seatMap[parseInt(row)][parseInt(col)];
      return total + getSeatPrice(seat);
    }, 0);
  };

  const handleSeatSelect = (row, col) => {
    const seatId = `${row}-${col}`;
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      }
      return [...prev, seatId];
    });
  };

  const handleCinemaSelect = (cinemaId) => {
    setSelectedCinema(cinemaId);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || selectedSeats.length === 0 || !selectedCinema) {
      toast.error('Please select date, time, seats, and cinema');
      return;
    }

    const bookingData = {
      movieId,
      movieTitle: selectedMovie?.title,
      date: selectedDate,
      time: selectedTime,
      cinema: selectedCinema,
      seats: selectedSeats.map(seat => {
        const [row, col] = seat.split('-');
        return `${String.fromCharCode(65 + parseInt(row))}${parseInt(col) + 1}`;
      }),
      totalAmount: calculateTotalAmount()
    };

    setPendingBooking(bookingData);
    navigate('/payment');
  };

  const getSeatColor = (seat, isSelected) => {
    if (seat.booked) return 'bg-gray-300 cursor-not-allowed';
    if (isSelected) {
      switch (seat.type) {
        case 'Premium':
          return 'bg-purple-600 text-white shadow-lg';
        case 'Standard':
          return 'bg-blue-600 text-white';
        case 'Basic':
          return 'bg-green-600 text-white';
      }
    }
    switch (seat.type) {
      case 'Premium':
        return 'bg-purple-100 hover:bg-purple-200';
      case 'Standard':
        return 'bg-blue-100 hover:bg-blue-200';
      case 'Basic':
        return 'bg-green-100 hover:bg-green-200';
    }
  };

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

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <AlertCircle className="w-16 h-16 text-red-500" />
          <p className="mt-4 text-lg text-gray-800">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-blue-50">
      <Header />
      <div className="px-4 pt-24 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Movie Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 mb-8 overflow-hidden bg-white shadow-md rounded-xl"
        >
          <div className="grid gap-8 md:grid-cols-12">
            {/* Movie Poster */}
            <div className="md:col-span-3">
              <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-gradient-to-br from-blue-100 to-blue-50">
                <img
                  src={selectedMovie?.poster || `https://picsum.photos/seed/${selectedMovie?.title}/400/600`}
                  alt={selectedMovie?.title}
                  className="object-cover w-full h-full transition-transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>

            {/* Movie Details */}
            <div className="space-y-4 text-gray-800 md:col-span-9">
              <h1 className="text-3xl font-bold md:text-4xl">{selectedMovie?.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center px-3 py-1 space-x-1 bg-yellow-100 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                  <span className="text-yellow-700">{selectedMovie?.rating}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{selectedMovie?.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Tag className="w-4 h-4" />
                  <span>{selectedMovie?.genre}</span>
                </div>
                <div className="flex items-center px-3 py-1 space-x-2 rounded-full bg-blue-50">
                  <span className="text-blue-700">{selectedMovie?.releaseDate}</span>
                </div>
              </div>

              <p className="text-gray-600">{selectedMovie?.description}</p>

              <div className="grid gap-4 pt-4 mt-4 border-t border-gray-100 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Director</h4>
                  <p className="mt-1 text-gray-800">{selectedMovie?.director}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Cast</h4>
                  <p className="mt-1 text-gray-800">{selectedMovie?.cast?.join(', ')}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Language</h4>
                  <p className="mt-1 text-gray-800">{selectedMovie?.language}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Subtitles</h4>
                  <p className="mt-1 text-gray-800">{selectedMovie?.subtitle}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <h3 className="mb-3 text-xl font-semibold text-gray-800">Select Cinema</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {cinemas.map((cinema) => (
                    <motion.button
                      key={cinema.id}
                      onClick={() => handleCinemaSelect(cinema.id)}
                      className={`p-4 border rounded-lg transition-all
                        ${selectedCinema === cinema.id
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                        }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={`block text-lg font-medium ${cinema.color}`}>
                        {cinema.name}
                      </span>
                      <span className="block mt-1 text-sm text-gray-500">
                        {cinema.description}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Date and Time Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 mb-8 bg-white shadow-md rounded-xl"
        >
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">Select Date & Time</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm text-gray-600">Select Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-600">Select Time</label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {showTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
                      ${selectedTime === time
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-blue-50'
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Seat Selection */}
        {selectedCinema && seatMap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-white shadow-md rounded-xl"
          >
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">Select Seats</h2>
            <div className="mb-8">
              <div className="p-4 mb-6">
                {/* Screen */}
                <div className="relative mb-16">
                  <div className="w-full h-3 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 rounded-[100%] shadow-lg transform perspective-1000 rotate-x-12"></div>
                  <div className="absolute w-full h-20 top-0 left-0 bg-gradient-to-b from-blue-400/20 to-transparent rounded-[100%] transform -translate-y-8"></div>
                  <div className="absolute text-sm font-semibold text-gray-500 transform -translate-x-1/2 top-6 left-1/2">
                    SCREEN
                  </div>
                </div>

                {/* Seat Grid */}
                <div className="flex flex-col items-center max-w-4xl mx-auto">
                  <div className="relative w-full perspective-1000">
                    <div className="transform-style-3d rotate-x-10">
                      {seatMap.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex justify-center mb-2 space-x-2">
                          {/* Row Label */}
                          <div className="flex flex-col items-center justify-center w-16 text-sm">
                            <span className="font-medium text-gray-700">{String.fromCharCode(65 + rowIndex)}</span>
                            <span className="text-xs text-gray-500">₹{row[0].price}</span>
                          </div>
                          {row.map((seat, colIndex) => (
                            <React.Fragment key={`${rowIndex}-${colIndex}`}>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleSeatSelect(rowIndex, colIndex)}
                                disabled={seat.booked}
                                className={`
                                  w-10 h-10 text-xs font-medium rounded-t-lg transition-all duration-200
                                  transform hover:shadow-lg relative
                                  ${getSeatColor(seat, selectedSeats.includes(`${rowIndex}-${colIndex}`))}
                                `}
                                title={`${seat.type} - ₹${seat.price}`}
                              >
                                <span className="relative z-10">{colIndex + 1}</span>
                                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-100 rounded-b-lg"></div>
                              </motion.button>
                              {seat.isAisle && <div className="w-4" />}
                            </React.Fragment>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Seat Legend */}
                  <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-2 bg-purple-100 rounded"></div>
                      <span className="text-sm text-gray-600">Premium (₹500)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-2 bg-blue-100 rounded"></div>
                      <span className="text-sm text-gray-600">Standard (₹350)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-2 bg-green-100 rounded"></div>
                      <span className="text-sm text-gray-600">Basic (₹200)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-2 bg-gray-300 rounded"></div>
                      <span className="text-sm text-gray-600">Booked</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cinema Features */}
              {selectedCinema && (
                <div className="p-4 mb-6 text-sm rounded-lg bg-blue-50">
                  <h3 className="mb-2 font-semibold text-gray-700">Cinema Features:</h3>
                  {selectedCinema === 'ruby' && (
                    <p className="text-gray-600">Premium corner seats available with extra legroom</p>
                  )}
                  {selectedCinema === 'sapphire' && (
                    <p className="text-gray-600">Premium middle column with enhanced viewing angle</p>
                  )}
                  {selectedCinema === 'emerald' && (
                    <p className="text-gray-600">Center aisle for easy access to all seats</p>
                  )}
                </div>
              )}

              {/* Booking Summary */}
              <div className="p-6 rounded-lg bg-gradient-to-r from-blue-50 via-white to-blue-50">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <Film className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-medium">Movie:</span>
                      <span className="ml-2">{selectedMovie?.title}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-medium">Show Time:</span>
                      <span className="ml-2">{selectedTime || 'Not selected'}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-medium">Date:</span>
                      <span className="ml-2">{selectedDate || 'Not selected'}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-medium">Selected Seats:</span>
                      <span className="ml-2">
                        {selectedSeats.map(seat => {
                          const [row, col] = seat.split('-');
                          const seatType = seatMap[parseInt(row)][parseInt(col)].type;
                          return `${String.fromCharCode(65 + parseInt(row))}${parseInt(col) + 1} (${seatType})`;
                        }).join(', ') || 'None'}
                      </span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-200">
                      <p className="text-lg font-semibold text-gray-800">
                        Total Amount: <span className="text-blue-600">₹{calculateTotalAmount()}</span>
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime || selectedSeats.length === 0 || !selectedCinema}
                    className={`
                      px-8 py-3 font-medium text-white rounded-lg shadow-md
                      transition-all duration-200
                      ${(!selectedDate || !selectedTime || selectedSeats.length === 0 || !selectedCinema)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                      }
                    `}
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 3D effects styles */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-x-10 {
          transform: rotateX(10deg);
        }
      `}</style>
    </div>
  );
};

export default BookingPage;