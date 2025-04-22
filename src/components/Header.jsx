// components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Heart, 
  User, 
  Bell, 
  ClipboardCheck, 
  BarChart2, 
  LineChart,
  Settings,
  HelpCircle,
  Sun
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      className="bg-white border-b border-gray-100 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-rose-500" />
            <span className="text-xl font-semibold text-gray-900">DilCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/checkin" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium hover:bg-gray-50 rounded-md transition-all"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Daily Check-In</span>
            </Link>
            <Link 
              to="/daily-report" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium hover:bg-gray-50 rounded-md transition-all"
            >
              <BarChart2 className="w-4 h-4" />
              <span>Daily Report</span>
            </Link>
            <Link 
              to="/main-report" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium hover:bg-gray-50 rounded-md transition-all"
            >
              <LineChart className="w-4 h-4" />
              <span>Main Report</span>
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-50"
            >
              <Sun className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-50"
            >
              <Bell className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-50"
            >
              <HelpCircle className="w-5 h-5" />
            </motion.button>

            <Link to="/profile" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
              </motion.div>
            </Link>

            <Link to="/settings">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-50"
              >
                <Settings className="w-5 h-5" />
              </motion.div>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-50"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/checkin"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Daily Check-In</span>
                </Link>
                <Link
                  to="/daily-report"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>Daily Report</span>
                </Link>
                <Link
                  to="/main-report"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LineChart className="w-4 h-4" />
                  <span>Main Report</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;