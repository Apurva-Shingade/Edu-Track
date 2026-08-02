import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "../assets/Css/AiQuizGenerator.css"
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  ProgressBar,
} from "react-bootstrap";
import {
  BsCpu,
  BsUpload,
  BsSliders,
  BsLightningCharge,
  BsCheckCircle,
  BsTrash,
  BsPencilSquare,
  BsPlusLg,
  BsFileEarmarkPdf,
} from "react-icons/bs";

export default function AiQuizGenerator() {
  const [activeTab, setActiveTab] = useState("ai-quiz");
  const [generationType, setGenerationType] = useState("prompt"); // 'prompt' | 'document'
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionType, setQuestionType] = useState("Multiple Choice");

  // Mock generated questions state
  const [generatedQuestions, setGeneratedQuestions] = useState([
    {
      id: 1,
      question: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
      type: "Multiple Choice",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: 1,
    },
    {
      id: 2,
      question: "Dynamic Programming guarantees finding the optimal solution for problems with overlapping subproblems.",
      type: "True / False",
      options: ["True", "False"],
      answer: 0,
    },
  ]);

  return (
    <div className="lms-layout">
      {/* SIDEBAR INTEGRATION */}
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* MAIN CONTENT AREA */}
      <main className="lms-main-content">
        {/* HEADER */}
        <header className="dashboard-header">
          <div>
            <h1 className="page-title">AI Quiz Generator</h1>
            <p className="page-subtitle">
              Automatically create tailored quizzes from prompts, topics, or course documents
            </p>
          </div>
        </header>

        <Row className="g-4">
          {/* LEFT COLUMN: CONFIGURATION FORM */}
          <Col lg={5}>
            <Card className="content-card shadow-sm border-0 mb-4">
              <Card.Body>
                <h5 className="card-heading mb-3 d-flex align-items-center gap-2">
                  <BsSliders className="text-success" /> Generator Settings
                </h5>

                {/* GENERATION MODE SELECTOR */}
                <div className="mode-toggle-group mb-3">
                  <button
                    className={`mode-btn ${generationType === "prompt" ? "active" : ""}`}
                    onClick={() => setGenerationType("prompt")}
                  >
                    <BsCpu className="me-2" /> From Prompt / Topic
                  </button>
                  <button
                    className={`mode-btn ${generationType === "document" ? "active" : ""}`}
                    onClick={() => setGenerationType("document")}
                  >
                    <BsUpload className="me-2" /> Upload Material
                  </button>
                </div>

                <Form>
                  {/* PROMPT OR FILE UPLOAD AREA */}
                  {generationType === "prompt" ? (
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-custom">
                        Topic or Content Prompt
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="e.g., Generate a quiz on Graph Algorithms, covering Dijkstra's and BFS/DFS with a focus on time complexity..."
                        className="custom-input"
                      />
                    </Form.Group>
                  ) : (
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-custom">
                        Course File (PDF, DOCX, TXT)
                      </Form.Label>
                      <div className="file-upload-box">
                        <BsFileEarmarkPdf className="upload-icon" />
                        <p className="upload-text">
                          Drag & drop file here or <span>browse</span>
                        </p>
                        <small className="text-muted">Supports PDF, DOCX up to 10MB</small>
                        <input type="file" className="file-input-hidden" />
                      </div>
                    </Form.Group>
                  )}

                  {/* COURSE SELECTION */}
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Target Course</Form.Label>
                    <Form.Select className="filter-select w-100">
                      <option>Data Structures & Algorithms</option>
                      <option>Database Systems</option>
                      <option>Computer Networks</option>
                    </Form.Select>
                  </Form.Group>

                  {/* DIFFICULTY & QUESTION COUNT */}
                  <Row className="g-2 mb-3">
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label className="form-label-custom">Difficulty</Form.Label>
                        <Form.Select
                          value={difficulty}
                          onChange={(e) => setDifficulty(e.target.value)}
                          className="filter-select w-100"
                        >
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Hard</option>
                          <option>Mixed</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label className="form-label-custom">
                          Questions ({numQuestions})
                        </Form.Label>
                        <Form.Range
                          min={3}
                          max={20}
                          value={numQuestions}
                          onChange={(e) => setNumQuestions(e.target.value)}
                          className="custom-range mt-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* QUESTION TYPE */}
                  <Form.Group className="mb-4">
                    <Form.Label className="form-label-custom">Question Format</Form.Label>
                    <Form.Select
                      value={questionType}
                      onChange={(e) => setQuestionType(e.target.value)}
                      className="filter-select w-100"
                    >
                      <option>Multiple Choice</option>
                      <option>True / False</option>
                      <option>Short Answer</option>
                      <option>Mixed Formats</option>
                    </Form.Select>
                  </Form.Group>

                  {/* GENERATE ACTION BUTTON */}
                  <Button className="btn-generate w-100 d-flex align-items-center justify-center">
                    <BsLightningCharge className="me-2" /> Generate Quiz with AI
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT COLUMN: PREVIEW & MANAGEMENT */}
          <Col lg={7}>
            <Card className="content-card shadow-sm border-0 h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-heading">Generated Preview</h5>
                    <Badge bg="success" className="px-3 py-2 border-radius-pill">
                      {generatedQuestions.length} Questions Ready
                    </Badge>
                  </div>

                  {/* QUESTION PREVIEW LIST */}
                  <div className="questions-list">
                    {generatedQuestions.map((q, idx) => (
                      <Card key={q.id} className="question-card mb-3 border">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="q-number fw-bold">Q{idx + 1}</span>
                            <div className="q-actions">
                              <button className="icon-btn me-1">
                                <BsPencilSquare />
                              </button>
                              <button className="icon-btn text-danger">
                                <BsTrash />
                              </button>
                            </div>
                          </div>
                          <p className="q-title fw-semibold mb-3">{q.question}</p>

                          {/* OPTIONS DISPLAY */}
                          <div className="options-grid">
                            {q.options.map((opt, oIdx) => (
                              <div
                                key={oIdx}
                                className={`option-pill ${
                                  oIdx === q.answer ? "correct-option" : ""
                                }`}
                              >
                                <span>{opt}</span>
                                {oIdx === q.answer && <BsCheckCircle className="ms-2 text-success" />}
                              </div>
                            ))}
                          </div>
                        </Card.Body>
                      </Card>
                    ))}

                    <Button variant="outline-dashed" className="w-100 py-2 border-dashed">
                      <BsPlusLg className="me-2" /> Add Question Manually
                    </Button>
                  </div>
                </div>

                {/* BOTTOM PUBLISH ACTIONS */}
                <div className="pt-3 border-top mt-4 d-flex justify-content-end gap-2">
                  <Button variant="outline-secondary" className="btn-export">
                    Save Draft
                  </Button>
                  <Button className="btn-create">
                    Publish Quiz to Class
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </main>
    </div>
  );
}