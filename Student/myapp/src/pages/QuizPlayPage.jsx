import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { analyzeStudentQuizResults } from "../services/GemmaStudentAiService";
import GemmaQuizAnalysisModal from "../components/GemmaQuizAnalysisModal";

export default function QuizPlayPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addQuizAttempt } = useContext(AuthContext);

  const quiz = location.state?.quiz || {
    id: 1,
    title: "Data Structures & Algorithms: BST & Graph Traversal",
    course: "Data Structures & Algorithms",
    courseCode: "CS201",
    time: 10,
    questions: [
      {
        id: 1,
        text: "What is the worst-case time complexity of searching in a balanced Binary Search Tree (BST)?",
        options: [
          { id: "A", text: "O(1)" },
          { id: "B", text: "O(log n)" },
          { id: "C", text: "O(n)" },
          { id: "D", text: "O(n log n)" },
        ],
        correct: "B",
        explanation: "In a balanced BST, tree height is log2(n), giving O(log n) search time.",
      },
      {
        id: 2,
        text: "Which traversal strategy explores graph vertices level by level using a Queue?",
        options: [
          { id: "A", text: "Depth-First Search (DFS)" },
          { id: "B", text: "Breadth-First Search (BFS)" },
          { id: "C", text: "In-order Traversal" },
          { id: "D", text: "Post-order Traversal" },
        ],
        correct: "B",
        explanation: "BFS processes nodes level by level using FIFO Queue operations.",
      },
      {
        id: 3,
        text: "Dynamic Programming requires problems to possess optimal substructure and overlapping subproblems.",
        options: [
          { id: "A", text: "True" },
          { id: "B", text: "False" },
        ],
        correct: "A",
        explanation: "These two properties are mandatory for dynamic programming memoization.",
      },
    ],
  };

  const [answers, setAnswers] = useState({});
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await analyzeStudentQuizResults(quiz, answers);
      setAnalysisResult(res);

      if (addQuizAttempt) {
        addQuizAttempt({
          quizTitle: quiz.title,
          score: res.score,
          total: res.total,
          percentage: res.percentage,
          grade: res.grade,
        });
      }

      setShowModal(true);
    } catch (err) {
      console.error("Analysis error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#F4F7F5", minHeight: "100vh", padding: "40px 20px" }}>
      <div className="play-quiz-container" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="play-quiz-header bg-white p-4 rounded shadow-sm mb-4">
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "none",
              border: "none",
              color: "#666",
              cursor: "pointer",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            ← Back to Quizzes
          </button>
          <h1 style={{ margin: "0 0 10px 0", color: "var(--dark-green)", fontSize: "24px" }}>
            {quiz.title}
          </h1>
          <p style={{ margin: 0, color: "#666" }}>
            Course: <strong>{quiz.course || "CS Course"} ({quiz.courseCode || "CS"})</strong> • Answer all {quiz.questions.length} questions. Estimated time: {quiz.time || 10} mins.
          </p>
        </div>

        {/* Scrollable Questions Area */}
        <div className="d-flex flex-column gap-3">
          {quiz.questions.map((q, index) => (
            <div key={q.id} className="question-card bg-white p-4 rounded shadow-sm border">
              <div className="question-text fw-bold mb-3" style={{ fontSize: "16px" }}>
                {index + 1}. {q.text || q.question}
              </div>

              <div className="options-container d-flex flex-column gap-2">
                {(q.options || []).map((opt, oIdx) => {
                  const optId = typeof opt === "string" ? opt : opt.id || String(oIdx);
                  const optText = typeof opt === "string" ? opt : opt.text || opt;
                  const isSelected = answers[q.id] === optId || answers[q.id] === optText;

                  return (
                    <div
                      key={oIdx}
                      className={`option-row p-3 rounded border cursor-pointer d-flex align-items-center gap-3 ${
                        isSelected ? "bg-success-subtle border-success fw-bold" : "bg-light"
                      }`}
                      onClick={() => handleSelect(q.id, optId)}
                      style={{ cursor: "pointer", transition: "all 0.2s" }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          border: isSelected ? "6px solid #10b981" : "2px solid #ccc",
                          backgroundColor: "#fff",
                        }}
                      ></div>
                      <div>{optText}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #EEE", paddingTop: "30px", marginTop: "20px", textAlign: "right" }}>
          <button
            className="btn btn-success px-4 py-2.5 fs-6 fw-bold"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Gemma 4 is Analyzing..." : "Submit Quiz & Analyze with Gemma 4"}
          </button>
        </div>
      </div>

      <GemmaQuizAnalysisModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          navigate("/quiz-list");
        }}
        result={analysisResult}
        onNavigateTutor={() => {
          setShowModal(false);
          navigate("/ai-tutor");
        }}
      />
    </div>
  );
}