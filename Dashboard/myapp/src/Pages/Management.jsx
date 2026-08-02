import React, { useState, useContext } from "react";
import { DataContext } from "../Context/DataContext";
import GemmaAnalysisModal from "../Components/GemmaAnalysisModal";
import AddEditStudentModal from "../Components/AddEditStudentModal";
import GemmaApiKeyModal from "../Components/GemmaApiKeyModal";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  InputGroup,
  Button,
  Badge,
} from "react-bootstrap";
import {
  FaSearch,
  FaFilter,
  FaUserGraduate,
  FaUserCheck,
  FaChartLine,
  FaExclamationCircle,
  FaEye,
  FaPlus,
  FaTrash,
  FaEdit,
  FaRobot,
} from "react-icons/fa";
import "../assets/Css/Management.css";

export default function Management() {
  const {
    students,
    apiKey,
    setApiKey,
    addStudent,
    updateStudent,
    deleteStudent,
  } = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [selectedStudentForAnalysis, setSelectedStudentForAnalysis] = useState(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [showKeyModal, setShowKeyModal] = useState(false);

  // Compute live statistics cards
  const totalStudentsCount = students.length;
  const activeStudentsCount = students.filter((s) => s.status === "Active").length;
  const avgScore = totalStudentsCount > 0
    ? (students.reduce((acc, s) => acc + s.percentage, 0) / totalStudentsCount).toFixed(1)
    : 0;
  const needAttentionCount = students.filter((s) => s.percentage < 60 || s.status === "Needs Help").length;

  const cards = [
    {
      title: "TOTAL STUDENTS",
      value: `${totalStudentsCount}`,
      sub: "Synced across courses",
      icon: <FaUserGraduate />,
    },
    {
      title: "ACTIVE STUDENTS",
      value: `${activeStudentsCount}`,
      sub: `${totalStudentsCount > 0 ? Math.round((activeStudentsCount / totalStudentsCount) * 100) : 0}% active`,
      icon: <FaUserCheck />,
    },
    {
      title: "AVG. SCORE",
      value: `${avgScore}%`,
      sub: "Across all subjects",
      icon: <FaChartLine />,
    },
    {
      title: "NEED ATTENTION",
      value: `${needAttentionCount}`,
      sub: "Below 60% mark average",
      icon: <FaExclamationCircle />,
    },
  ];

  // Filtering
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "All" || student.course.includes(selectedCourse) || student.courseCode === selectedCourse;
    const matchesStatus =
      selectedStatus === "All" || student.status === selectedStatus;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  // Top Performers
  const topPerformers = [...students].sort((a, b) => b.percentage - a.percentage).slice(0, 3);

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

  return (
    <Container fluid className="management-page p-4">
      {/* Header */}
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="fw-bold mb-1">Student Marks & Academic Management</h2>
          <p className="text-muted mb-0">
            Real-time student registry & Gemma 4 AI mark analysis portal
          </p>
        </Col>

        <Col xs="auto" className="d-flex gap-2">
          <Button className="add-btn" onClick={handleOpenAdd}>
            <FaPlus className="me-2" />
            Add Student & Marks
          </Button>
        </Col>
      </Row>

      {/* Statistic Cards */}
      <Row className="g-4 mb-4">
        {cards.map((card, index) => (
          <Col lg={3} md={6} key={index}>
            <Card className="stat-card h-100 border-0 shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-uppercase text-muted fw-semibold">
                    {card.title}
                  </small>
                  <h1 className="fw-bold mt-2">{card.value}</h1>
                  <small className="text-muted">{card.sub}</small>
                </div>
                <div className="icon-circle">{card.icon}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Section */}
      <Row className="g-4">
        {/* Left Side Table */}
        <Col lg={9}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                <h4 className="fw-bold mb-0">All Registered Students</h4>

                <div className="d-flex gap-2 flex-wrap">
                  <InputGroup style={{ width: "220px" }}>
                    <Form.Control
                      placeholder="Search name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <InputGroup.Text>
                      <FaSearch />
                    </InputGroup.Text>
                  </InputGroup>

                  <Form.Select
                    style={{ width: "160px" }}
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="All">All Courses</option>
                    <option value="Data Structures">Data Structures</option>
                    <option value="Database">Database Systems</option>
                    <option value="Object-Oriented">OOP</option>
                  </Form.Select>

                  <Form.Select
                    style={{ width: "140px" }}
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Needs Help">Needs Help</option>
                  </Form.Select>
                </div>
              </div>

              {/* Student Table */}
              <Table hover responsive className="align-middle">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Overall %</th>
                    <th>Status</th>
                    <th>Gemma 4 AI</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="fw-semibold text-dark">{student.name}</td>
                      <td className="text-muted small">{student.email}</td>
                      <td>{student.course}</td>
                      <td className="fw-bold text-success">
                        {student.percentage}% ({student.grade})
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
                          className="d-flex align-items-center gap-1"
                          onClick={() => handleOpenAnalysis(student)}
                        >
                          <FaRobot /> Gemma 4
                        </Button>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button
                            size="sm"
                            variant="light"
                            className="text-primary"
                            onClick={() => handleOpenEdit(student)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            size="sm"
                            variant="light"
                            className="text-danger"
                            onClick={() => deleteStudent(student.id)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Side Insights */}
        <Col lg={3}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <h4 className="fw-bold mb-4">Class Insights</h4>

              <h6 className="fw-bold mb-3">Performance Distribution</h6>

              <div className="mb-2 d-flex justify-content-between">
                <span>
                  <span className="dot excellent me-2"></span>
                  Excellent (≥85%)
                </span>
                <strong>{students.filter(s => s.percentage >= 85).length}</strong>
              </div>

              <div className="mb-2 d-flex justify-content-between">
                <span>
                  <span className="dot good me-2"></span>
                  Good (70-84%)
                </span>
                <strong>{students.filter(s => s.percentage >= 70 && s.percentage < 85).length}</strong>
              </div>

              <div className="mb-2 d-flex justify-content-between">
                <span>
                  <span className="dot average me-2"></span>
                  Average (60-69%)
                </span>
                <strong>{students.filter(s => s.percentage >= 60 && s.percentage < 70).length}</strong>
              </div>

              <div className="mb-4 d-flex justify-content-between">
                <span>
                  <span className="dot poor me-2"></span>
                  Needs Help (&lt;60%)
                </span>
                <strong className="text-danger">{students.filter(s => s.percentage < 60).length}</strong>
              </div>

              <hr />

              {/* Top Performers */}
              <h6 className="fw-bold mb-3">Top Performers</h6>

              {topPerformers.map((student) => {
                const initials = student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");
                return (
                  <div key={student.id} className="performer d-flex align-items-center mb-3 p-2 bg-light rounded">
                    <div className="performer-avatar bg-success text-white rounded-circle p-2 small fw-bold">
                      {initials}
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <strong className="d-block small text-dark">{student.name}</strong>
                      <span className="text-muted text-xs" style={{ fontSize: "0.75rem" }}>{student.courseCode}</span>
                    </div>
                    <span className="text-success fw-bold small">{student.percentage}%</span>
                  </div>
                );
              })}
            </Card.Body>
          </Card>
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
    </Container>
  );
}