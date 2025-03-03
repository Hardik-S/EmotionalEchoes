import React, { useState } from 'react';
import { Link, useParams, useNavigate, Routes, Route } from 'react-router-dom';

// Landing Page Component
export function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="logo">
          <span className="logo-text">Emotional Echoes</span>
        </div>
        <h1>Track your emotional journey</h1>
        <p>Gain insights into your moods and develop mindfulness with our AI-powered tools</p>
        <div className="auth-buttons">
          <Link to="/auth/login" className="btn btn-primary">Log In</Link>
          <Link to="/auth/signup" className="btn btn-secondary">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

// Authentication Page Component
export function AuthPage({ onLogin }) {
  const { type } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (type === 'signup' && !formData.name) {
      setError('Please provide your name');
      return;
    }
    
    // Mock successful authentication
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'User',
      email: formData.email
    });
    
    navigate('/dashboard');
  };
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h2>{type === 'signup' ? 'Create an Account' : 'Welcome Back'}</h2>
        
        <form onSubmit={handleSubmit}>
          {type === 'signup' && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
          
          {error && <div className="error">{error}</div>}
          
          <button type="submit" className="btn btn-primary">
            {type === 'signup' ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        
        <div className="auth-switch">
          {type === 'signup' ? (
            <p>Already have an account? <Link to="/auth/login">Log In</Link></p>
          ) : (
            <p>Need an account? <Link to="/auth/signup">Sign Up</Link></p>
          )}
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
export function Dashboard({ userData, onLogout, onMoodSubmit }) {
  const navigate = useNavigate();
  
  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-text">EE</span>
        </div>
        <div className="user-menu">
          <span>Hi, {userData.name}</span>
          <button onClick={onLogout} className="btn-link">Logout</button>
        </div>
      </nav>
      
      <div className="dashboard-content">
        <aside className="sidebar">
          <ul>
            <li>
              <Link to="/dashboard" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/mood-check" className="nav-link">Mood Check</Link>
            </li>
            <li>
              <Link to="/dashboard/timeline" className="nav-link">Your Timeline</Link>
            </li>
            <li>
              <Link to="/dashboard/insights" className="nav-link">Insights</Link>
            </li>
            <li>
              <Link to="/dashboard/meditation" className="nav-link">Meditation</Link>
            </li>
            <li>
              <Link to="/dashboard/about" className="nav-link">About EE</Link>
            </li>
          </ul>
        </aside>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<DashboardHome userData={userData} />} />
            <Route path="/mood-check" element={<MoodCheck onSubmit={onMoodSubmit} />} />
            <Route path="/timeline" element={<Timeline userData={userData} />} />
            <Route path="/insights" element={<Insights userData={userData} />} />
            <Route path="/meditation" element={<Meditation />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Dashboard Home
function DashboardHome({ userData }) {
  return (
    <div className="dashboard-home">
      <h1>Welcome to Emotional Echoes</h1>
      <div className="widgets-container">
        <div className="widget">
          <h3>Current Mood Trends</h3>
          <div className="mood-trend">
            {userData.timeline && userData.timeline.length > 0 ? (
              <div className="trend-indicator">
                <span className="trend-value">{userData.timeline[0].mood}/10</span>
                <p>Your latest mood entry</p>
              </div>
            ) : (
              <p>No mood data yet. Start by completing a mood check!</p>
            )}
          </div>
          <Link to="/dashboard/mood-check" className="btn btn-small">New Entry</Link>
        </div>
        
        <div className="widget">
          <h3>AI Insight</h3>
          <div className="insight-bubble">
            <p>{userData.insights && userData.insights[0]}</p>
          </div>
          <Link to="/dashboard/insights" className="btn btn-small">View All</Link>
        </div>
        
        <div className="widget">
          <h3>Suggested Meditation</h3>
          <div className="meditation-card">
            <h4>5-Minute Breathing</h4>
            <p>Perfect for a quick reset during the day</p>
          </div>
          <Link to="/dashboard/meditation" className="btn btn-small">Start</Link>
        </div>
      </div>
    </div>
  );
}

// Mood Check Component
function MoodCheck({ onSubmit }) {
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ mood, note });
    setSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setMood(5);
      setNote('');
      setSubmitted(false);
    }, 3000);
  };
  
  return (
    <div className="mood-check-page">
      <h1>How are you feeling today?</h1>
      
      {submitted ? (
        <div className="success-message">
          <h3>Thank you for your check-in!</h3>
          <p>Your mood has been recorded.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mood-form">
          <div className="mood-slider">
            <div className="emoji-scale">
              <span role="img" aria-label="Very Sad">😢</span>
              <span role="img" aria-label="Sad">😕</span>
              <span role="img" aria-label="Neutral">😐</span>
              <span role="img" aria-label="Happy">🙂</span>
              <span role="img" aria-label="Very Happy">😁</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={mood}
              onChange={(e) => setMood(parseInt(e.target.value))}
              className="slider"
            />
            <div className="mood-value">{mood}/10</div>
          </div>
          
          <div className="form-group">
            <label htmlFor="mood-note">Add a note (optional)</label>
            <textarea
              id="mood-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind? Any particular reasons for your mood today?"
              rows="4"
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Save Mood</button>
        </form>
      )}
    </div>
  );
}

// Timeline Component
function Timeline({ userData }) {
  return (
    <div className="timeline-page">
      <h1>Your Mood Timeline</h1>
      
      {userData.timeline && userData.timeline.length > 0 ? (
        <div className="timeline-container">
          <div className="timeline-chart">
            {/* Simple visual representation of mood data */}
            <div className="chart">
              {userData.timeline.slice(0, 7).map((entry, index) => (
                <div 
                  key={index} 
                  className="chart-bar" 
                  style={{ 
                    height: `${entry.mood * 10}%`,
                    backgroundColor: `hsl(${entry.mood * 12}, 70%, 60%)`
                  }}
                  title={`${entry.date}: ${entry.mood}/10`}
                />
              ))}
            </div>
            <div className="chart-labels">
              {userData.timeline.slice(0, 7).map((entry, index) => (
                <div key={index} className="chart-label">
                  {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              ))}
            </div>
          </div>
          
          <div className="timeline-entries">
            {userData.timeline.map((entry, index) => (
              <div key={index} className="timeline-entry">
                <div className="entry-date">
                  {new Date(entry.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="entry-mood" style={{ color: `hsl(${entry.mood * 12}, 70%, 45%)` }}>
                  Mood: {entry.mood}/10
                </div>
                {entry.note && <div className="entry-note">{entry.note}</div>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p>No mood entries yet. Start by completing a mood check!</p>
          <Link to="/dashboard/mood-check" className="btn btn-primary">Record Mood</Link>
        </div>
      )}
    </div>
  );
}

// Insights Component
function Insights({ userData }) {
  return (
    <div className="insights-page">
      <h1>Intelligent Insights</h1>
      <p className="page-description">Our AI analyzes your mood patterns to provide personalized insights and suggestions.</p>
      
      {userData.insights && userData.insights.length > 0 ? (
        <div className="insights-container">
          {userData.insights.map((insight, index) => (
            <div key={index} className="insight-card">
              <div className="insight-icon">💡</div>
              <p>{insight}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No insights yet. Continue checking in with your moods to receive personalized insights.</p>
        </div>
      )}
    </div>
  );
}

// Meditation Component
function Meditation() {
  const meditations = [
    {
      title: "Morning Clarity",
      duration: "10 minutes",
      description: "Start your day with intention and calm awareness.",
      icon: "🌄"
    },
    {
      title: "Stress Reducer",
      duration: "5 minutes",
      description: "A quick breathing exercise to calm your nervous system.",
      icon: "🍃"
    },
    {
      title: "Deep Relaxation",
      duration: "15 minutes",
      description: "Progressive muscle relaxation for deep release.",
      icon: "🌊"
    },
    {
      title: "Sleep Preparation",
      duration: "8 minutes",
      description: "Gentle meditation to prepare your mind for restful sleep.",
      icon: "🌙"
    }
  ];
  
  return (
    <div className="meditation-page">
      <h1>Guided Meditations</h1>
      <p className="page-description">Choose a meditation to support your current emotional state.</p>
      
      <div className="meditation-grid">
        {meditations.map((meditation, index) => (
          <div key={index} className="meditation-card">
            <div className="meditation-icon">{meditation.icon}</div>
            <h3>{meditation.title}</h3>
            <div className="meditation-duration">{meditation.duration}</div>
            <p>{meditation.description}</p>
            <button className="btn btn-secondary">Begin</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// About Component
function About() {
  return (
    <div className="about-page">
      <h1>About Emotional Echoes</h1>
      
      <div className="about-content">
        <section>
          <h2>Our Mission</h2>
          <p>
            Emotional Echoes was created to help people develop greater emotional intelligence
            through mindful tracking and AI-powered insights. We believe that understanding your
            emotional patterns is the first step toward improved mental wellbeing.
          </p>
        </section>
        
        <section>
          <h2>How It Works</h2>
          <ol>
            <li><strong>Track your mood</strong> daily using our simple check-in system</li>
            <li><strong>View your timeline</strong> to observe patterns and trends</li>
            <li><strong>Receive personalized insights</strong> based on your emotional data</li>
            <li><strong>Practice mindfulness</strong> with our guided meditations</li>
          </ol>
        </section>
        
        <section>
          <h2>Privacy First</h2>
          <p>
            Your emotional data is personal. We never share your information with third parties,
            and all analysis happens securely within the application.
          </p>
        </section>
      </div>
    </div>
  );
}