import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getPublishedQuizzes } from "../services/GemmaStudentAiService";

export default function QuizListPage() {
  const navigate = useNavigate();
  const { user, logout, quizAttempts } = useContext(AuthContext);

  const [quizzes, setQuizzes] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    setQuizzes(getPublishedQuizzes());
  }, []);

  const filteredQuizzes = quizzes.filter((q) => {
    if (activeFilter === "All") return true;
    return q.diff?.toLowerCase() === activeFilter.toLowerCase();
  });

  const handlePlayQuiz = (quiz) => {
    navigate("/play-quiz", { state: { quiz } });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="quiz-list-page p-4" style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* STUDENT WELCOME & AUTH HEADER */}
      <div className="bg-white p-4 rounded-3 shadow-sm mb-4 border d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h2 className="fw-bold text-dark mb-0">Welcome back, {user?.name || "Student"} 👋</h2>
            <span className="badge bg-success">Enrolled Student</span>
          </div>
          <p className="text-muted mb-0 small">
            Course: <strong>{user?.course || "Data Structures & Algorithms"} ({user?.courseCode || "CS201"})</strong> | Email: {user?.email || "student@email.com"}
          </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="text-end">
            <span className="text-muted d-block small">Quizzes Attempted</span>
            <h4 className="fw-bold text-success mb-0">{quizAttempts.length} Tests</h4>
          </div>
          <button className="btn btn-outline-danger btn-sm px-3 py-2 fw-semibold" onClick={handleLogout}>
            🚪 Log Out
          </button>
        </div>
      </div>

      {/* HEADER BANNER */}
      <div className="quiz-list-header mb-4">
        <div className="quiz-list-header-content">
          <div className="quiz-header-banner">
            <div className="quiz-header-info">
              <div className="quiz-header-img">🤖</div>

              <div>
                <div className="quiz-header-title-row">
                  <h1 style={{ margin: 0, fontSize: "28px" }}>Gemma 4 AI Student Quizzes Portal</h1>
                  <span className="quiz-badge-dark">Teacher Synced</span>
                </div>
                <p style={{ color: "#A3B899", fontSize: "14px", lineHeight: "1.5", maxWidth: "450px", marginBottom: "16px" }}>
                  Attempt latest teacher-published quizzes and existing course tests. Get instant Gemma 4 AI explanations and score feedback!
                </p>
                <div style={{ display: "flex", gap: "20px", fontSize: "13px", color: "#CCC" }}>
                  <span>📅 {quizzes.length} Quizzes Ready</span>
                  <span>⚡ Gemma 4 Score Diagnostics</span>
                </div>
              </div>
            </div>

            <div className="challenge-card">
              <span style={{ fontSize: "24px" }}>🎯</span>
              <div>
                <h4 style={{ margin: "0 0 4px 0", fontSize: "15px" }}>Gemma 4 AI Assistant</h4>
                <p style={{ margin: 0, fontSize: "13px", color: "#A3B899", lineHeight: "1.5" }}>
                  Review explanations for every question<br />and track your scores in real time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="quiz-list-main">
        {/* Left Column (Quizzes List) */}
        <div>
          <div className="quiz-list-controls mb-3">
            <div className="quiz-list-tabs">
              <div
                className={`quiz-list-tab ${activeFilter === "All" ? "active" : ""}`}
                onClick={() => setActiveFilter("All")}
              >
                All Quizzes ({quizzes.length})
              </div>
              <div
                className={`quiz-list-tab ${activeFilter === "Easy" ? "active" : ""}`}
                onClick={() => setActiveFilter("Easy")}
              >
                Easy
              </div>
              <div
                className={`quiz-list-tab ${activeFilter === "Medium" ? "active" : ""}`}
                onClick={() => setActiveFilter("Medium")}
              >
                Medium
              </div>
              <div
                className={`quiz-list-tab ${activeFilter === "Hard" ? "active" : ""}`}
                onClick={() => setActiveFilter("Hard")}
              >
                Hard
              </div>
            </div>
          </div>

          {/* Render Quiz Rows */}
          <div className="bg-white p-3 rounded-3 shadow-sm border mb-4">
            <h5 className="fw-bold mb-3 text-dark">Latest & Existing Quizzes</h5>
            {filteredQuizzes.map((quiz, idx) => (
              <div
                key={quiz.id || idx}
                className="quiz-row border-bottom py-3 px-2 d-flex justify-content-between align-items-center flex-wrap gap-2 cursor-pointer"
                onClick={() => handlePlayQuiz(quiz)}
                style={{ cursor: "pointer", transition: "all 0.2s" }}
              >
                <div className="quiz-row-left d-flex align-items-center gap-3">
                  <div className="quiz-row-icon fs-3">📋</div>
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: "bold" }} className="text-dark">
                      {quiz.title}
                    </div>
                    <div className="quiz-row-meta text-muted small">
                      {quiz.questions?.length || quiz.qCount} Questions • {quiz.time || 10} min • {quiz.course || "CS Course"}
                    </div>
                  </div>
                </div>

                <div className="quiz-row-right d-flex align-items-center gap-2">
                  {idx === 0 && <span className="badge bg-danger">NEW / PUBLISHED</span>}
                  <span className={`badge bg-${quiz.diff === "Hard" ? "danger" : quiz.diff === "Medium" ? "warning" : "success"}`}>
                    {quiz.diff || "Medium"}
                  </span>
                  <button className="btn btn-sm btn-success px-3 fw-bold">Start Quiz →</button>
                </div>
              </div>
            ))}

            {filteredQuizzes.length === 0 && (
              <div className="text-center py-5 text-muted">
                No quizzes found for filter "{activeFilter}".
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Sidebar: Attempts & Scores History) */}
        <div>
          {/* PAST SCORES HISTORY CARD */}
          <div className="bg-white p-3 rounded-3 shadow-sm border mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0 text-dark">My Quiz Scores & Attempt History</h6>
              <span className="badge bg-success">{quizAttempts.length} Completed</span>
            </div>

            <div className="d-flex flex-column gap-2">
              {quizAttempts.map((att) => (
                <div key={att.id} className="p-2.5 rounded bg-light border d-flex justify-content-between align-items-center">
                  <div>
                    <strong className="d-block text-dark small">{att.quizTitle}</strong>
                    <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                      Score: {att.score}/{att.total} • {att.date}
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="fw-bold text-success d-block">{att.percentage}%</span>
                    <span className="badge bg-success">{att.grade}</span>
                  </div>
                </div>
              ))}
              {quizAttempts.length === 0 && (
                <div className="text-muted small text-center py-3">No quiz attempts yet. Start a quiz above!</div>
              )}
            </div>
          </div>

          <div className="dark-sidebar-card p-3 rounded" style={{ backgroundColor: "#1e293b", color: "#fff" }}>
            <h6 className="fw-bold mb-3">Gemma 4 Portal Status</h6>
            <div className="small mb-2 d-flex justify-content-between">
              <span>Logged-in Student:</span>
              <strong className="text-success">{user?.name}</strong>
            </div>
            <div className="small mb-2 d-flex justify-content-between">
              <span>Teacher Live Sync:</span>
              <strong className="text-success">Active</strong>
            </div>
            <div className="small d-flex justify-content-between">
              <span>Gemma 4 Diagnostics:</span>
              <strong className="text-success">Enabled</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}