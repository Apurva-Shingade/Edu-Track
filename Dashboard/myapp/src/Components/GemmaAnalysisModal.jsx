import React, { useState, useEffect } from "react";
import { Modal, Button, Badge, ProgressBar, Row, Col, Card, Spinner } from "react-bootstrap";
import {
  BsCpu,
  BsCheckCircleFill,
  BsExclamationTriangleFill,
  BsTrophyFill,
  BsLightningChargeFill,
  BsBook,
  BsArrowRight,
  BsKeyFill,
} from "react-icons/bs";
import { analyzeStudentMarksWithGemma } from "../Services/GemmaAiService";

export default function GemmaAnalysisModal({ show, onHide, student, apiKey, onOpenKeyConfig }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && student) {
      setLoading(true);
      analyzeStudentMarksWithGemma(student, apiKey)
        .then((res) => {
          setAnalysis(res);
        })
        .catch((err) => {
          console.error("Gemma analysis error:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [show, student, apiKey]);

  if (!student) return null;

  const subjects = student.subjects || {};
  const subjectEntries = Object.entries(subjects);

  const getSubjectVariant = (score) => {
    if (score >= 85) return "success";
    if (score >= 70) return "info";
    if (score >= 60) return "warning";
    return "danger";
  };

  const getRiskBadge = (risk) => {
    if (risk === "High" || student.status === "Needs Help") {
      return <Badge bg="danger" className="px-3 py-2 fs-6">High Risk</Badge>;
    }
    if (risk === "Medium" || student.status === "At Risk") {
      return <Badge bg="warning" text="dark" className="px-3 py-2 fs-6">Medium Risk</Badge>;
    }
    return <Badge bg="success" className="px-3 py-2 fs-6">Low Risk (On Track)</Badge>;
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="gemma-analysis-modal">
      <Modal.Header closeButton className="bg-dark text-white border-0 py-3">
        <Modal.Title className="d-flex align-items-center gap-2 fs-5">
          <BsCpu className="text-success fs-4" />
          <span>Gemma 4 AI Student Mark Analysis</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4" style={{ backgroundColor: "#f8fafc" }}>
        {/* STUDENT HEADER CARD */}
        <div className="bg-white p-3 rounded-3 shadow-sm mb-4 border d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h4 className="fw-bold mb-1 text-dark">{student.name}</h4>
            <p className="text-muted mb-0 small">
              Course: <strong className="text-dark">{student.course} ({student.courseCode || "CS"})</strong> | Email: {student.email}
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="text-end">
              <span className="text-muted d-block small">Overall Mark</span>
              <h3 className="fw-bold text-success mb-0">{student.percentage}%</h3>
            </div>
            <div>{getRiskBadge(analysis?.riskLevel)}</div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" className="mb-3" />
            <h6 className="fw-bold text-dark">Gemma 4 AI is analyzing student marks...</h6>
            <p className="text-muted small">Evaluating subject breakdown, performance trends, and learning gaps</p>
          </div>
        ) : analysis ? (
          <>
            {/* AI SUMMARY BOX */}
            <Card className="border-0 shadow-sm mb-4" style={{ borderLeft: "4px solid #10b981" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center gap-2 text-success fw-bold">
                    <BsLightningChargeFill /> Gemma 4 Executive Summary
                  </div>
                  {analysis.isLiveAi ? (
                    <Badge bg="success" className="pill">Live Gemini 1.5/Gemma API</Badge>
                  ) : (
                    <Badge bg="secondary" className="pill">Gemma 4 Engine</Badge>
                  )}
                </div>
                <p className="mb-2 text-dark fs-6 lead-sm">{analysis.summary}</p>
                <div className="d-flex gap-3 text-muted small mt-2 pt-2 border-top">
                  <span><strong>Predicted Grade:</strong> <span className="text-success fw-bold">{analysis.gradePrediction}</span></span>
                  <span><strong>Attendance Rate:</strong> <span className="text-dark fw-bold">{student.attendance}%</span></span>
                </div>
              </Card.Body>
            </Card>

            <Row className="g-3 mb-4">
              {/* SUBJECT MARKS BREAKDOWN */}
              <Col md={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                      <BsBook className="text-primary" /> Subject-wise Performance
                    </h6>
                    {subjectEntries.map(([subject, score]) => (
                      <div key={subject} className="mb-3">
                        <div className="d-flex justify-content-between small mb-1 fw-semibold">
                          <span>{subject}</span>
                          <span className={`text-${getSubjectVariant(score)}`}>{score}%</span>
                        </div>
                        <ProgressBar
                          now={score}
                          variant={getSubjectVariant(score)}
                          style={{ height: "8px", borderRadius: "4px" }}
                        />
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>

              {/* STRENGTHS & WEAKNESSES */}
              <Col md={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <h6 className="fw-bold mb-3 text-success d-flex align-items-center gap-2">
                      <BsTrophyFill /> Strengths & Mastery Areas
                    </h6>
                    <ul className="list-unstyled mb-4">
                      {analysis.strengths.map((item, idx) => (
                        <li key={idx} className="d-flex align-items-start gap-2 mb-2 text-dark small">
                          <BsCheckCircleFill className="text-success mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h6 className="fw-bold mb-2 text-danger d-flex align-items-center gap-2">
                      <BsExclamationTriangleFill /> Target Improvement Areas
                    </h6>
                    <ul className="list-unstyled mb-0">
                      {analysis.weaknesses.map((item, idx) => (
                        <li key={idx} className="d-flex align-items-start gap-2 mb-2 text-dark small">
                          <BsExclamationTriangleFill className="text-danger mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* REMEDIAL ACTION PLAN */}
            <Card className="border-0 shadow-sm mb-3 bg-white">
              <Card.Body>
                <h6 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
                  <BsLightningChargeFill className="text-warning" /> Gemma 4 Recommended Remedial Plan
                </h6>
                <div className="d-flex flex-column gap-2">
                  {analysis.remedialPlan.map((step, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-light border-start border-3 border-success d-flex align-items-center gap-2">
                      <Badge bg="success" pill className="px-2">{idx + 1}</Badge>
                      <span className="small text-dark fw-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </>
        ) : null}
      </Modal.Body>

      <Modal.Footer className="bg-light border-0 py-2 px-4 d-flex justify-content-between">
        <Button variant="outline-secondary" size="sm" onClick={onOpenKeyConfig}>
          <BsKeyFill className="me-1" /> {apiKey ? "API Key Configured" : "Set Gemini API Key"}
        </Button>
        <Button variant="success" size="sm" onClick={onHide}>
          Done & Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
