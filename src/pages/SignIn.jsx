import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const pageVariants = {
    initial: { opacity: 0, x: -200 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { opacity: 0, x: 200 }
  };

  const formControls = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black"
    >
      <div className="relative w-full max-w-md p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 bg-white rounded-lg filter blur-xl"
        />
        
        <motion.div 
          className="relative p-8 bg-white/10 backdrop-blur-xl rounded-lg shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.h2 
            className="mb-6 text-3xl font-bold text-center text-white"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Welcome Back
          </motion.h2>

          <form className="space-y-6">
            <motion.div variants={formControls} className="space-y-2">
              <label className="text-sm text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="email"
                  className="w-full px-10 py-3 bg-black/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </motion.div>

            <motion.div variants={formControls} className="space-y-2">
              <label className="text-sm text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="password"
                  className="w-full px-10 py-3 bg-black/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </motion.button>
          </form>

          <motion.div 
            className="mt-6 text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign Up <ArrowRight className="inline-block w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignIn;
