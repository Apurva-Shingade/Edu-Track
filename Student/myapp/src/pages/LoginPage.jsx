import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faGraduationCap,
  faChartLine,
  faShieldHalved,
  faRobot,
  faLaptop,
  faMugHot,
  faEnvelope,
  faArrowRight,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('Student');

  return (
    <div className="login-page-container">
      <div className="login-grid">
        
        {/* LEFT COLUMN: Info & Features */}
        <div className="login-left-content">
          <div className="login-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <FontAwesomeIcon icon={faLock} style={{ color: '#000000' }} /> Welcome Back!
          </div>
          
          <h1 className="login-title">Log in to<br/>Gemma LMS</h1>
          <p className="login-subtitle">
            Access your personalized dashboard, track progress, and continue your learning journey.
          </p>

          <div className="login-feature-item">
            <div className="login-feature-icon">
              <FontAwesomeIcon icon={faGraduationCap} style={{ color: '#000000' }} />
            </div>
            <div className="login-feature-text">
              <h4 className="feature-item-title">Learn Smarter</h4>
              <p>Access your courses, quizzes and learning materials anytime, anywhere.</p>
            </div>
          </div>

          <div className="login-feature-item">
            <div className="login-feature-icon">
              <FontAwesomeIcon icon={faChartLine} style={{ color: '#000000' }} />
            </div>
            <div className="login-feature-text">
              <h4 className="feature-item-title">Track Progress</h4>
              <p>Monitor your performance and achieve your learning goals.</p>
            </div>
          </div>

          <div className="login-feature-item">
            <div className="login-feature-icon">
              <FontAwesomeIcon icon={faShieldHalved} style={{ color: '#000000' }} />
            </div>
            <div className="login-feature-text">
              <h4 className="feature-item-title">Secure & Private</h4>
              <p>Your data is protected with enterprise-grade security.</p>
            </div>
          </div>

          {/* Mascot Placeholder */}
          <div className="login-mascot-wrapper" style={{ display: 'flex', gap: '16px', fontSize: '28px' }}>
            <FontAwesomeIcon icon={faRobot} style={{ color: '#000000' }} />
            <FontAwesomeIcon icon={faLaptop} style={{ color: '#000000' }} />
            <FontAwesomeIcon icon={faMugHot} style={{ color: '#000000' }} />
          </div>
        </div>

        {/* RIGHT COLUMN: Login Card */}
        <div>
          <div className="login-card">
            
            {/* Toggle Tabs */}
            <div className="login-tabs">
              <div 
                className={`login-tab ${activeTab === 'Student' ? 'active' : ''}`}
                onClick={() => setActiveTab('Student')}
              >
                <FontAwesomeIcon icon={faGraduationCap} style={{ color: activeTab === 'Student' ? '#FFFFFF' : '#000000' }} /> Student Login
              </div>
              <div 
                className={`login-tab ${activeTab === 'Admin' ? 'active' : ''}`}
                onClick={() => setActiveTab('Admin')}
              >
                <FontAwesomeIcon icon={faShieldHalved} style={{ color: activeTab === 'Admin' ? '#FFFFFF' : '#000000' }} /> Admin Login
              </div>
            </div>

            <p className="login-welcome-text">Welcome back! Please enter your details.</p>

            {/* Form */}
            <form>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-icon-wrapper">
                  <span className="input-icon">
                    <FontAwesomeIcon icon={faEnvelope} style={{ color: '#000000' }} />
                  </span>
                  <input type="email" className="form-input-with-icon" placeholder="Enter your email address" />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '0' }}>
                <div className="form-header-row">
                  <label className="form-label" style={{ margin: 0 }}>Password</label>
                  <a href="#forgot" className="forgot-password">Forgot Password?</a>
                </div>
                <div className="input-icon-wrapper">
                  <span className="input-icon">
                    <FontAwesomeIcon icon={faLock} style={{ color: '#000000' }} />
                  </span>
                  <input type="password" className="form-input-with-icon" placeholder="Enter your password" />
                </div>
              </div>

              <label className="remember-me-row">
                <input type="checkbox" /> Remember me
              </label>

              <button type="button" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Log In <FontAwesomeIcon icon={faArrowRight} style={{ color: '#FFFFFF' }} />
              </button>

              <div className="divider">or</div>

              <button type="button" className="btn-google">
                <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000000' }}>G</span> Continue with Google
              </button>
            </form>

            <p className="login-footer-text">
              Don't have an account? <Link to="/create-account">Create Account</Link>
            </p>

            {/* Trust Badges Footer */}
            <div className="login-trust-badges">
              <div className="login-trust-item">
                <FontAwesomeIcon icon={faLock} style={{ color: '#000000' }} /> Secure Login
              </div>
              <div className="login-trust-item">
                <FontAwesomeIcon icon={faShieldHalved} style={{ color: '#000000' }} /> Privacy Protected
              </div>
              <div className="login-trust-item">
                <FontAwesomeIcon icon={faUsers} style={{ color: '#000000' }} /> Trusted by Educators
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}