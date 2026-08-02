import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="navbar-container">
      {/* Logo Area */}
      <div className="logo-area">
        <div className="logo-icon-box">🧠</div>
        <div>
          <h2 className="logo-title">Gemma LMS</h2>
          <span className="logo-subtitle">AI EDUCATION SUITE</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link to="/quiz" className={`nav-link ${location.pathname === '/quiz' ? 'active' : ''}`}>Quiz</Link>
        <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
        <Link to="/courses" className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`}>Courses</Link>
      </div>

      {/* Auth Buttons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button 
          className="btn-outline" 
          onClick={() => navigate('/login')}
        >
          Log In
        </button>
        <button 
          className="btn-primary"
          onClick={() => navigate('/create-account')} // Added navigation here
        >
          Get Started Free
        </button>
      </div>
    </nav>
  );
}