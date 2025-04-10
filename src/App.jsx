// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MealsLog from './pages/DailyLog/MealsLog';
import ActivityLog from './pages/ActivityLog';
import SleepStressLog from './pages/SleepStressLog';
import Report from './pages/Report';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/log/meals" element={<MealsLog />} />
        <Route path="/log/activity" element={<ActivityLog />} />
        <Route path="/log/sleep-stress" element={<SleepStressLog />} />
        <Route path="/report" element={<Report />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;