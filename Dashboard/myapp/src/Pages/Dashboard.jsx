import React, { useState, useContext } from "react";
import { DataContext } from "../Context/DataContext";
import GemmaAnalysisModal from "../Components/GemmaAnalysisModal";
import AddEditStudentModal from "../Components/AddEditStudentModal";
import GemmaApiKeyModal from "../Components/GemmaApiKeyModal";
import GemmaChatDrawer from "../Components/GemmaChatDrawer";
import "../assets/Css/Dashboard.css";
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
  ProgressBar,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  BsBook,
  BsPeople,
  BsJournalCheck,
  BsTrophy,
  BsPlusLg,
  BsUpload,
  BsCpu,
  BsArrowRight,
  BsClockHistory,
  BsSearch,
  BsFilter,
  BsPencilSquare,
  BsTrash,
  BsKey,
  BsLightningCharge,
} from "react-icons/bs";

export default function Dashboard() {
  const {
    students,
    courses,
    recentActivities,
    overviewStats,
    apiKey,
    setApiKey,
    addStudent,
    updateStudent,
    deleteStudent,
  } = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedStudentForAnalysis, setSelectedStudentForAnalysis] = useState(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showChatDrawer, setShowChatDrawer] = useState(false);

  // Filter students based on search and course filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "All" || student.courseCode === selectedCourse || student.course.includes(selectedCourse);
    return matchesSearch && matchesCourse;
  });

  const handleOpenAnalysis = (student) => {
    setSelectedStudentForAnalysis(student);
    setShowAnalysisModal(true);
  };

  const handleOpenAdd = () => {
    setStudentToEdit(null);
    setShowAddEditModal(true);
  };

  const handleOpenEdit = (student) => {
    setStudentToEdit(student);
    setShowAddEditModal(true);
  };

  const getStatIcon = (type) => {
    switch (type) {
      case "courses":
        return <BsBook />;
      case "students":
        return <BsPeople />;
      case "evaluations":
        return <BsJournalCheck />;
      case "mastery":
        return <BsTrophy />;
      default:
        return <BsBook />;
    }
  };

  const getGradeBadgeVariant = (percentage) => {
    if (percentage >= 85) return "success";
    if (percentage >= 70) return "info";
    if (percentage >= 60) return "warning";
    return "danger";
  };

  return (
    <div className="lms-main-content">
      {/* HEADER */}
      <header className="dashboard-header d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h1 className="page-title">Welcome back, Professor</h1>
          <p className="page-subtitle mb-0">
            Real-time student performance dashboard powered by <strong>Gemma 4 AI</strong>.
          </p>
        </div>
        <div className="d-flex gap-2 align-items-center flex-wrap">
          <Button variant="outline-dark" className="d-flex align-items-center gap-2" onClick={() => setShowKeyModal(true)}>
            <BsKey className="text-warning fs-5" />
            {apiKey ? "API Key Active" : "Config Gemma Key"}
          </Button>
          <Button className="btn-green-primary d-flex align-items-center gap-2" onClick={handleOpenAdd}>
            <BsPlusLg /> Add Student Marks
          </Button>
        </div>
      </header>

      {/* OVERVIEW STATS */}
      <Row className="g-3 mb-4">
        {overviewStats.map((stat, idx) => (
          <Col xl={3} md={6} key={idx}>
            <Card className="dash-card border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="dash-stat-title">{stat.title}</span>
                  <h2 className="dash-stat-value">{stat.value}</h2>
                  <span className="dash-stat-sub text-success">{stat.subtitle}</span>
                </div>
                <div className="dash-icon-box bg-green-soft">
                  {getStatIcon(stat.type)}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        {/* MAIN COLUMN */}
        <Col lg={8}>
          {/* ACTIVE COURSES */}
          <Card className="dash-card border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-heading mb-0">Active Courses Progress & Average Marks</h5>
                <Badge bg="success" className="px-3 py-2">Live Data</Badge>
              </div>

              <div className="course-list">
                {courses.map((course, idx) => (
                  <div key={idx} className="course-item p-3 mb-3 rounded border">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <Badge className="badge-green-soft me-2">{course.code}</Badge>
                        <strong className="course-title">{course.name}</strong>
                      </div>
                      <span className="text-muted small">{course.students} Enrolled Students</span>
                    </div>

                    <div className="d-flex align-items-center gap-3 my-2">
                      <div className="flex-grow-1">
                        <ProgressBar now={course.progress} className="custom-progress" />
                      </div>
                      <span className="small fw-bold text-success-dark">{course.progress}% Class Avg</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center text-muted small mt-2">
                      <span><BsClockHistory className="me-1" /> Next: {course.nextAssessment}</span>
                      <span className="text-success fw-semibold">Gemma 4 Synced</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          {/* REAL-TIME DYNAMIC STUDENT MARKS TABLE */}
          <Card className="dash-card border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <div>
                  <h5 className="card-heading mb-1">Student Marks & Performance Directory</h5>
                  <p className="text-muted small mb-0">Click <strong>Analyze with Gemma 4</strong> to get instant AI diagnostic breakdown</p>
                </div>
                <div className="d-flex gap-2">
                  <InputGroup size="sm" style={{ width: "200px" }}>
                    <Form.Control
                      placeholder="Search student..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <InputGroup.Text><BsSearch /></InputGroup.Text>
                  </InputGroup>
                  <Form.Select
                    size="sm"
                    style={{ width: "130px" }}
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="All">All Courses</option>
                    <option value="CS201">CS201</option>
                    <option value="CS302">CS302</option>
                    <option value="CS102">CS102</option>
                  </Form.Select>
                </div>
              </div>

              <Table hover responsive className="align-middle custom-dash-table">
                <thead className="bg-light">
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Overall %</th>
                    <th>Status</th>
                    <th>Gemma 4 AI Analysis</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <div className="fw-semibold text-dark">{student.name}</div>
                        <div className="text-muted small">{student.email}</div>
                      </td>
                      <td>
                        <Badge bg="secondary" className="me-1">{student.courseCode}</Badge>
                        <span className="small text-muted">{student.course}</span>
                      </td>
                      <td>
                        <span className={`fw-bold text-${getGradeBadgeVariant(student.percentage)} fs-6`}>
                          {student.percentage}% ({student.grade})
                        </span>
                      </td>
                      <td>
                        <Badge
                          bg={
                            student.status === "Active"
                              ? "success"
                              : student.status === "At Risk"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {student.status}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="outline-success"
                          className="d-flex align-items-center gap-1 py-1"
                          onClick={() => handleOpenAnalysis(student)}
                        >
                          <BsCpu /> Analyze with Gemma 4
                        </Button>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button
                            size="sm"
                            variant="light"
                            className="text-primary p-1"
                            title="Edit Marks"
                            onClick={() => handleOpenEdit(student)}
                          >
                            <BsPencilSquare />
                          </Button>
                          <Button
                            size="sm"
                            variant="light"
                            className="text-danger p-1"
                            title="Delete Student"
                            onClick={() => deleteStudent(student.id)}
                          >
                            <BsTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-muted">
                        No students found matching your criteria. Click "Add Student Marks" to insert a record.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* SIDE COLUMN */}
        <Col lg={4}>
          <div className="d-flex flex-column gap-3">
            {/* QUICK ACTIONS CARD */}
            <Card className="dash-card border-0 shadow-sm">
              <Card.Body>
                <h5 className="card-heading mb-3">Quick Actions</h5>
                <div className="d-flex flex-column gap-2">
                  <Button className="quick-btn btn-green-primary w-100" onClick={handleOpenAdd}>
                    <BsPlusLg className="me-2" /> Add Student Marks
                  </Button>
                  <Button
                    className="quick-btn btn-green-soft w-100"
                    onClick={() => setShowChatDrawer(!showChatDrawer)}
                  >
                    <BsCpu className="me-2" /> Ask Gemma 4 Assistant
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* AI ASSISTANT DRAWER OR CARD */}
            {showChatDrawer ? (
              <GemmaChatDrawer
                students={students}
                apiKey={apiKey}
                onClose={() => setShowChatDrawer(false)}
              />
            ) : (
              <Card className="ai-dash-card border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center gap-2 mb-2 text-green-dark">
                    <BsCpu className="fs-5 text-success" />
                    <strong className="fs-6">Gemma 4 Teaching Assistant</strong>
                  </div>
                  <p className="ai-text small mb-3">
                    {students.filter(s => s.percentage < 60).length > 0
                      ? `Attention required: ${students.filter(s => s.percentage < 60).length} student(s) are currently performing below 60%. Would you like a targeted Gemma 4 review guide?`
                      : `All active students are meeting target performance thresholds (>60%). Gemma 4 is actively tracking new marks submissions.`}
                  </p>
                  <Button
                    size="sm"
                    className="btn-green-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => setShowChatDrawer(true)}
                  >
                    <BsLightningCharge /> Open Gemma 4 AI Assistant
                  </Button>
                </Card.Body>
              </Card>
            )}

            {/* RECENT SUBMISSIONS / ACTIVITIES */}
            <Card className="dash-card border-0 shadow-sm">
              <Card.Body>
                <h6 className="fw-bold mb-3">Recent Activity Feed</h6>
                <div className="d-flex flex-column gap-2">
                  {recentActivities.slice(0, 5).map((act, idx) => (
                    <div key={idx} className="p-2 border-bottom small">
                      <div className="fw-semibold text-dark">{act.student}</div>
                      <div className="text-muted" style={{ fontSize: "0.8rem" }}>{act.action}</div>
                      <div className="d-flex justify-content-between mt-1 text-muted" style={{ fontSize: "0.75rem" }}>
                        <span className="text-success fw-bold">{act.score}</span>
                        <span>{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      {/* MODALS */}
      <GemmaAnalysisModal
        show={showAnalysisModal}
        onHide={() => setShowAnalysisModal(false)}
        student={selectedStudentForAnalysis}
        apiKey={apiKey}
        onOpenKeyConfig={() => {
          setShowAnalysisModal(false);
          setShowKeyModal(true);
        }}
      />

      <AddEditStudentModal
        show={showAddEditModal}
        onHide={() => setShowAddEditModal(false)}
        student={studentToEdit}
        onSave={(data) => {
          if (studentToEdit) {
            updateStudent(data);
          } else {
            addStudent(data);
          }
        }}
      />

      <GemmaApiKeyModal
        show={showKeyModal}
        onHide={() => setShowKeyModal(false)}
        apiKey={apiKey}
        onSaveKey={setApiKey}
      />
    </div>
  );
}
