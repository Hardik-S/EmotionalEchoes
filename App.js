import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

// Mock data for initial state
const mockTimeline = [
  { date: '2025-03-01', mood: 8, note: 'Felt energized and productive today.' },
  { date: '2025-03-02', mood: 6, note: 'Slightly anxious about the upcoming week.' },
  { date: '2025-02-28', mood: 7, note: 'Peaceful afternoon meditation helped me relax.' },
];

const mockInsights = [
  "Your mood tends to improve after meditation sessions. Consider scheduling more throughout your week.",
  "I've noticed your anxiety levels peak on Sunday evenings. Try a 10-minute breathing exercise before bed.",
  "Your happiest days correlate with outdoor activities. Consider more nature time this week."
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  
  // Check for existing user session in localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('eeUser');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    // Mock notification system
    const notificationTimer = setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 6000);
    }, 60000); // Show notification after 1 minute
    
    return () => clearTimeout(notificationTimer);
  }, []);
  
  const handleLogin = (user) => {
    // Store user in localStorage to persist across page refreshes
    localStorage.setItem('eeUser', JSON.stringify({
      ...user,
      timeline: mockTimeline,
      insights: mockInsights,
    }));
    setUserData({
      ...user,
      timeline: mockTimeline,
      insights: mockInsights,
    });
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('eeUser');
    setUserData(null);
    setIsAuthenticated(false);
  };
  
  const handleMoodSubmit = (moodData) => {
    const updatedTimeline = [
      { 
        date: new Date().toISOString().split('T')[0], 
        mood: moodData.mood, 
        note: moodData.note 
      },
      ...(userData?.timeline || [])
    ];
    
    const updatedUser = {
      ...userData,
      timeline: updatedTimeline
    };
    
    localStorage.setItem('eeUser', JSON.stringify(updatedUser));
    setUserData(updatedUser);
  };
  
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app">
        {showNotification && (
          <div className="notification">
            <p>It's time for your daily mood check! How are you feeling today?</p>
            <button onClick={() => setShowNotification(false)}>Dismiss</button>
          </div>
        )}
        
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} 
          />
          <Route 
            path="/auth/:type" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <AuthPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/dashboard/*" 
            element={
              isAuthenticated ? 
              <Dashboard 
                userData={userData} 
                onLogout={handleLogout} 
                onMoodSubmit={handleMoodSubmit}
              /> : 
              <Navigate to="/" />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;