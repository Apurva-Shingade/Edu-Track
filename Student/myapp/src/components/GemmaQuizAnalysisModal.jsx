import React from "react";
import { Modal, Button, Badge, ProgressBar, Card } from "react-bootstrap";
import {
  BsCpu,
  BsCheckCircleFill,
  BsXCircleFill,
  BsLightningChargeFill,
  BsTrophyFill,
  BsArrowRight,
} from "react-icons/bs";

export default function GemmaQuizAnalysisModal({ show, onHide, result, onNavigateTutor }) {
  if (!result) return null;

  const getScoreColor = (pct) => {
    if (pct >= 85) return "success";
    if (pct >= 70) return "info";
    if (pct >= 60) return "warning";
    return "danger";
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="gemma-quiz-modal">
      <Modal.Header closeButton className="bg-dark text-white border-0 py-3">
        <Modal.Title className="d-flex align-items-center gap-2 fs-5">
          <BsCpu className="text-success fs-4" />
          <span>Gemma 4 AI Quiz Diagnostic & Analysis</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4" style={{ backgroundColor: "#f8fafc" }}>
        {/* SCORE SUMMARY BANNER */}
        <div className="bg-white p-4 rounded-3 shadow-sm mb-4 border d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <span className="text-muted small text-uppercase fw-semibold">Quiz Title</span>
            <h4 className="fw-bold mb-1 text-dark">{result.quizTitle}</h4>
            <p className="text-muted mb-0 small">
              Correct Answers: <strong className="text-dark">{result.score} / {result.total}</strong>
            </p>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="text-end">
              <span className="text-muted d-block small">Gemma 4 Score</span>
              <h2 className={`fw-bold text-${getScoreColor(result.percentage)} mb-0`}>
                {result.percentage}%
              </h2>
            </div>
            <Badge bg={getScoreColor(result.percentage)} className="px-3 py-2 fs-5">
              {result.grade}
            </Badge>
          </div>
        </div>

        {/* AI SUMMARY BOX */}
        <Card className="border-0 shadow-sm mb-4" style={{ borderLeft: "4px solid #10b981" }}>
          <Card.Body>
            <div className="d-flex align-items-center gap-2 text-success fw-bold mb-2">
              <BsLightningChargeFill /> Gemma 4 Performance Insights
            </div>
            <p className="text-dark mb-0 leading-normal">{result.summary}</p>
          </Card.Body>
        </Card>

        {/* QUESTION-BY-QUESTION BREAKDOWN */}
        <h6 className="fw-bold mb-3 text-dark">Question-by-Question Explanation</h6>
        <div className="d-flex flex-column gap-3 mb-4">
          {result.questionBreakdown.map((q, idx) => (
            <Card key={idx} className={`border-0 shadow-sm ${q.isCorrect ? "border-start border-4 border-success" : "border-start border-4 border-danger"}`}>
              <Card.Body className="p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="fw-bold text-dark me-2">Q{idx + 1}. {q.questionText}</span>
                  {q.isCorrect ? (
                    <Badge bg="success" className="d-flex align-items-center gap-1">
                      <BsCheckCircleFill /> Correct
                    </Badge>
                  ) : (
                    <Badge bg="danger" className="d-flex align-items-center gap-1">
                      <BsXCircleFill /> Incorrect
                    </Badge>
                  )}
                </div>

                <div className="small mb-2">
                  <span className="text-muted">Your Answer: </span>
                  <strong className={q.isCorrect ? "text-success" : "text-danger"}>{String(q.studentChoice)}</strong>
                </div>

                <div className="p-2.5 rounded bg-light border text-dark small">
                  <strong className="text-success d-block mb-1">💡 Gemma 4 Explanation:</strong>
                  {q.explanation}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* ACTION PLAN */}
        <Card className="border-0 shadow-sm bg-white">
          <Card.Body>
            <h6 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
              <BsTrophyFill className="text-warning" /> Gemma 4 Recommended Action Steps
            </h6>
            <div className="d-flex flex-column gap-2">
              {result.actionPlan.map((step, idx) => (
                <div key={idx} className="p-2 rounded bg-light border-start border-3 border-success d-flex align-items-center gap-2 small">
                  <Badge bg="success" pill>{idx + 1}</Badge>
                  <span className="text-dark fw-medium">{step}</span>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>

      <Modal.Footer className="bg-light border-0 py-2 px-4 d-flex justify-content-between">
        <Button
          variant="outline-success"
          size="sm"
          onClick={() => {
            onHide();
            if (onNavigateTutor) onNavigateTutor();
          }}
        >
          <BsCpu className="me-1" /> Ask Gemma 4 Tutor Doubts
        </Button>
        <Button variant="success" size="sm" onClick={onHide}>
          Done & Return to Quizzes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
