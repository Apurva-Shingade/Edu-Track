import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("alex.rivera@email.com");
  const [password, setPassword] = useState("password123");
  const [activeTab, setActiveTab] = useState("Student");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    login(email, password);
    navigate("/quiz-list");
  };

  return (
    <div className="login-page-container">
      <div className="login-grid">
        {/* LEFT COLUMN: Info & Features */}
        <div className="login-left-content">
          <div className="login-badge" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <FontAwesomeIcon icon={faLock} style={{ color: "#10b981" }} /> Welcome Back!
          </div>

          <h1 className="login-title">
            Log in to
            <br />
            Gemma LMS
          </h1>
          <p className="login-subtitle">
            Access your personalized student dashboard, attempt latest teacher quizzes, and track your Gemma 4 AI performance.
          </p>

          <div className="login-feature-item">
            <div className="login-feature-icon">
              <FontAwesomeIcon icon={faGraduationCap} style={{ color: "#10b981" }} />
            </div>
            <div className="login-feature-text">
              <h4 className="feature-item-title">Interactive Quizzes</h4>
              <p>Attempt quizzes generated directly by your professor using Gemma 4 AI.</p>
            </div>
          </div>

          <div className="login-feature-item">
            <div className="login-feature-icon">
              <FontAwesomeIcon icon={faChartLine} style={{ color: "#10b981" }} />
            </div>
            <div className="login-feature-text">
              <h4 className="feature-item-title">Gemma 4 AI Diagnostics</h4>
              <p>Receive instant explanation guides and 3-step study recommendations after every quiz.</p>
            </div>
          </div>

          <div className="login-feature-item">
            <div className="login-feature-icon">
              <FontAwesomeIcon icon={faShieldHalved} style={{ color: "#10b981" }} />
            </div>
            <div className="login-feature-text">
              <h4 className="feature-item-title">Live Teacher Sync</h4>
              <p>Your quiz scores sync automatically to your professor's dashboard.</p>
            </div>
          </div>

          {/* Mascot */}
          <div className="login-mascot-wrapper" style={{ display: "flex", gap: "16px", fontSize: "28px" }}>
            <FontAwesomeIcon icon={faRobot} style={{ color: "#10b981" }} />
            <FontAwesomeIcon icon={faLaptop} style={{ color: "#10b981" }} />
            <FontAwesomeIcon icon={faMugHot} style={{ color: "#10b981" }} />
          </div>
        </div>

        {/* RIGHT COLUMN: Login Card */}
        <div>
          <div className="login-card">
            {/* Toggle Tabs */}
            <div className="login-tabs">
              <div
                className={`login-tab ${activeTab === "Student" ? "active" : ""}`}
                onClick={() => setActiveTab("Student")}
              >
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  style={{ color: activeTab === "Student" ? "#FFFFFF" : "#000000" }}
                />{" "}
                Student Login
              </div>
              <div
                className={`login-tab ${activeTab === "Admin" ? "active" : ""}`}
                onClick={() => setActiveTab("Admin")}
              >
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  style={{ color: activeTab === "Admin" ? "#FFFFFF" : "#000000" }}
                />{" "}
                Teacher Portal
              </div>
            </div>

            <p className="login-welcome-text">Enter your student credentials to access quizzes and AI tutor.</p>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-icon-wrapper">
                  <span className="input-icon">
                    <FontAwesomeIcon icon={faEnvelope} style={{ color: "#666" }} />
                  </span>
                  <input
                    type="email"
                    required
                    className="form-input-with-icon"
                    placeholder="e.g. alex.rivera@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "0" }}>
                <div className="form-header-row">
                  <label className="form-label" style={{ margin: 0 }}>
                    Password
                  </label>
                </div>
                <div className="input-icon-wrapper">
                  <span className="input-icon">
                    <FontAwesomeIcon icon={faLock} style={{ color: "#666" }} />
                  </span>
                  <input
                    type="password"
                    required
                    className="form-input-with-icon"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <label className="remember-me-row my-3 d-flex align-items-center gap-2">
                <input type="checkbox" defaultChecked /> Remember me on this device
              </label>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  backgroundColor: "#10b981",
                  border: "none",
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Log In to Student Dashboard <FontAwesomeIcon icon={faArrowRight} style={{ color: "#FFFFFF" }} />
              </button>
            </form>

            <p className="login-footer-text mt-3">
              Don't have an account? <Link to="/create-account">Create Account</Link>
            </p>

            {/* Trust Badges */}
            <div className="login-trust-badges mt-4">
              <div className="login-trust-item">
                <FontAwesomeIcon icon={faLock} style={{ color: "#10b981" }} /> Secure Login
              </div>
              <div className="login-trust-item">
                <FontAwesomeIcon icon={faShieldHalved} style={{ color: "#10b981" }} /> Privacy Protected
              </div>
              <div className="login-trust-item">
                <FontAwesomeIcon icon={faUsers} style={{ color: "#10b981" }} /> Gemma 4 Synced
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}