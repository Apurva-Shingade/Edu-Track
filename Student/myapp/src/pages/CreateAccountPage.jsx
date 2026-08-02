import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faGraduationCap,
  faChartLine,
  faShieldHalved,
  faRobot,
  faLaptop,
  faMugHot,
  faEnvelope,
  faLock,
  faPhone,
  faArrowRight,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

export default function CreateAccountPage() {
  const [activeTab, setActiveTab] = useState('Student');
  const navigate = useNavigate();

  return (
    <div className="login-page-container">
      <div className="login-grid">
        
        {/* LEFT COLUMN: Info & Features */}
        <div className="login-left-content">
          <div className="login-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <FontAwesomeIcon icon={faUser} style={{ color: '#000000' }} /> Create Your Account
          </div>
          
          <h1 className="login-title">Create your<br/>Gemma LMS account</h1>
          <p className="login-subtitle">
            Join thousands of learners and educators<br/>on their learning journey.
          </p>

          <div className="login-feature-item">
            <div className="login-feature-icon">
              <FontAwesomeIcon icon={faGraduationCap} style={{ color: '#000000' }} />
            </div>
            <div className="login-feature-text">
              <h4 className="feature-item-title">Learn Anytime, Anywhere</h4>
              <p>Access courses, quizzes and learning<br/>materials on any device.</p>
            </div>
          </div>

          <div className="login-feature-item">
            <div className="login-feature-icon">
              <FontAwesomeIcon icon={faChartLine} style={{ color: '#000000' }} />
            </div>
            <div className="login-feature-text">
              <h4 className="feature-item-title">Track Your Progress</h4>
              <p>Monitor performance and achieve<br/>your learning goals.</p>
            </div>
          </div>

          <div className="login-feature-item">
            <div className="login-feature-icon">
              <FontAwesomeIcon icon={faShieldHalved} style={{ color: '#000000' }} />
            </div>
            <div className="login-feature-text">
              <h4 className="feature-item-title">Secure & Trusted</h4>
              <p>Your data is protected with enterprise-grade<br/>security.</p>
            </div>
          </div>

          {/* Mascot Placeholder */}
          <div className="login-mascot-wrapper" style={{ display: 'flex', gap: '16px', fontSize: '28px' }}>
            <FontAwesomeIcon icon={faRobot} style={{ color: '#000000' }} />
            <FontAwesomeIcon icon={faLaptop} style={{ color: '#000000' }} />
            <FontAwesomeIcon icon={faMugHot} style={{ color: '#000000' }} />
          </div>
        </div>

        {/* RIGHT COLUMN: Registration Card */}
        <div>
          <div className="login-card">
            
            {/* Toggle Tabs */}
            <div className="login-tabs">
              <div 
                className={`login-tab ${activeTab === 'Student' ? 'active' : ''}`}
                onClick={() => setActiveTab('Student')}
              >
                <FontAwesomeIcon icon={faGraduationCap} style={{ color: activeTab === 'Student' ? '#FFFFFF' : '#000000' }} /> Student Account
              </div>
              <div 
                className={`login-tab ${activeTab === 'Admin' ? 'active' : ''}`}
                onClick={() => setActiveTab('Admin')}
              >
                <FontAwesomeIcon icon={faShieldHalved} style={{ color: activeTab === 'Admin' ? '#FFFFFF' : '#000000' }} /> Admin Account
              </div>
            </div>

            <p className="login-welcome-text" style={{ fontSize: '18px', marginBottom: '8px' }}>
              Create your {activeTab.toLowerCase()} account
            </p>
            <p className="login-welcome-text" style={{ color: '#888', fontWeight: 'normal', fontSize: '13px' }}>
              Fill in your details to get started
            </p>

            {/* Form */}
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div className="input-icon-wrapper">
                    <span className="input-icon">
                      <FontAwesomeIcon icon={faUser} style={{ color: '#000000' }} />
                    </span>
                    <input type="text" className="form-input-with-icon" placeholder="Enter your full name" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-icon-wrapper">
                    <span className="input-icon">
                      <FontAwesomeIcon icon={faEnvelope} style={{ color: '#000000' }} />
                    </span>
                    <input type="email" className="form-input-with-icon" placeholder="Enter your email address" />
                  </div>
                </div>
              </div>

              <div className="form-row" style={{ marginBottom: '0' }}>
                <div className="form-group" style={{ marginBottom: '0' }}>
                  <label className="form-label">Password</label>
                  <div className="input-icon-wrapper">
                    <span className="input-icon">
                      <FontAwesomeIcon icon={faLock} style={{ color: '#000000' }} />
                    </span>
                    <input type="password" className="form-input-with-icon" placeholder="Create a password" />
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: '0' }}>
                  <label className="form-label">Confirm Password</label>
                  <div className="input-icon-wrapper">
                    <span className="input-icon">
                      <FontAwesomeIcon icon={faLock} style={{ color: '#000000' }} />
                    </span>
                    <input type="password" className="form-input-with-icon" placeholder="Confirm your password" />
                  </div>
                </div>
              </div>
              
              <div className="form-hint-text">At least 8 characters with a number and symbol</div>

              <div className="form-group">
                <label className="form-label">Phone Number <span style={{ color: '#888', fontWeight: 'normal' }}>(Optional)</span></label>
                <div className="input-icon-wrapper">
                  <span className="input-icon">
                    <FontAwesomeIcon icon={faPhone} style={{ color: '#000000' }} />
                  </span>
                  <input type="tel" className="form-input-with-icon" placeholder="Enter your phone number" />
                </div>
              </div>

              <label className="checkbox-label">
                <input type="checkbox" /> 
                <span>I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong></span>
              </label>

              <button type="button" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Create Account <FontAwesomeIcon icon={faArrowRight} style={{ color: '#FFFFFF' }} />
              </button>

              <div className="divider">or</div>

              <button type="button" className="btn-google">
                <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000000' }}>G</span> Sign up with Google
              </button>
            </form>

            <p className="login-footer-text">
              Already have an account? <Link to="/login">Log In</Link>
            </p>

            {/* Trust Badges Footer */}
            <div className="login-trust-badges">
              <div className="login-trust-item">
                <FontAwesomeIcon icon={faLock} style={{ color: '#000000' }} /> Secure Sign Up
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