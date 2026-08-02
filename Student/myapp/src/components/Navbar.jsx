import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar-container">
      {/* Logo Area */}
      <div className="logo-area cursor-pointer" onClick={() => navigate("/")}>
        <div className="logo-icon-box">🧠</div>
        <div>
          <h2 className="logo-title">Gemma LMS</h2>
          <span className="logo-subtitle">AI EDUCATION SUITE</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
          Home
        </Link>
        <Link
          to="/quiz-list"
          className={`nav-link ${
            location.pathname === "/quiz-list" || location.pathname === "/play-quiz" || location.pathname === "/quiz"
              ? "active"
              : ""
          }`}
        >
          My Quizzes
        </Link>
        <Link to="/ai-tutor" className={`nav-link ${location.pathname === "/ai-tutor" ? "active" : ""}`}>
          AI Tutor
        </Link>
        <Link to="/courses" className={`nav-link ${location.pathname === "/courses" ? "active" : ""}`}>
          Courses
        </Link>
      </div>

      {/* Auth State */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {user ? (
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {user.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <span className="fw-bold d-block text-dark" style={{ fontSize: "14px", lineHeight: "1.2" }}>
                  {user.name}
                </span>
                <small className="text-success fw-semibold" style={{ fontSize: "11px" }}>
                  Student Active
                </small>
              </div>
            </div>
            <button
              className="btn btn-sm btn-outline-danger px-3 py-1 fw-semibold"
              onClick={handleLogout}
              style={{ borderRadius: "6px" }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            <button className="btn-outline" onClick={() => navigate("/login")}>
              Log In
            </button>
            <button className="btn-primary" onClick={() => navigate("/create-account")}>
              Get Started Free
            </button>
          </>
        )}
      </div>
    </nav>
  );
}