import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "../assets/Css/Dashboard.css"
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
  ProgressBar,
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
  BsCheckCircle,
} from "react-icons/bs";

const overviewStats = [
  {
    title: "Active Courses",
    value: "6",
    subtitle: "2 new this semester",
    icon: <BsBook />,
    iconBg: "bg-green-soft",
  },
  {
    title: "Total Students",
    value: "148",
    subtitle: "+12 from last month",
    icon: <BsPeople />,
    iconBg: "bg-green-soft",
  },
  {
    title: "Evaluations Completed",
    value: "1,240",
    subtitle: "88% completion rate",
    icon: <BsJournalCheck />,
    iconBg: "bg-green-soft",
  },
  {
    title: "Avg Mastery Level",
    value: "82%",
    subtitle: "↑ 4% vs target",
    icon: <BsTrophy />,
    iconBg: "bg-green-soft",
  },
];

const activeCourses = [
  {
    name: "Data Structures & Algorithms",
    code: "CS201",
    students: 45,
    progress: 72,
    nextAssessment: "Quiz 4: Graphs",
  },
  {
    name: "Database Management Systems",
    code: "CS302",
    students: 38,
    progress: 85,
    nextAssessment: "Midterm Exam",
  },
  {
    name: "Object-Oriented Programming",
    code: "CS102",
    students: 65,
    progress: 40,
    nextAssessment: "Lab Test 2",
  },
];

const recentActivity = [
  {
    student: "Alex Rivera",
    action: "Submitted Quiz 3 (Data Structures)",
    score: "94%",
    time: "10 mins ago",
  },
  {
    student: "Priya Sharma",
    action: "Completed Assignment 2 (DBMS)",
    score: "91%",
    time: "25 mins ago",
  },
  {
    student: "Jordan Lee",
    action: "Generated Practice Quiz (AI)",
    score: "85%",
    time: "1 hr ago",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="lms-layout">
      {/* SIDEBAR */}
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* MAIN CONTENT AREA */}
      <main className="lms-main-content">
        {/* HEADER */}
        <header className="dashboard-header d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="page-title">Welcome back, Professor</h1>
            <p className="page-subtitle">
              Here is what's happening across your courses today.
            </p>
          </div>
          <div className="d-flex gap-2">
            <Button className="btn-green-primary d-flex align-items-center gap-2">
              <BsPlusLg /> Create Quiz
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
                  <div className={`dash-icon-box ${stat.iconBg}`}>
                    {stat.icon}
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
                  <h5 className="card-heading">Active Courses Progress</h5>
                  <Button variant="link" className="view-all-green">
                    View All <BsArrowRight />
                  </Button>
                </div>

                <div className="course-list">
                  {activeCourses.map((course, idx) => (
                    <div key={idx} className="course-item p-3 mb-3 rounded">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <Badge className="badge-green-soft me-2">{course.code}</Badge>
                          <strong className="course-title">{course.name}</strong>
                        </div>
                        <span className="text-muted small">{course.students} Students</span>
                      </div>

                      <div className="d-flex align-items-center gap-3 my-2">
                        <div className="flex-grow-1">
                          <ProgressBar now={course.progress} className="custom-progress" />
                        </div>
                        <span className="small fw-bold text-success-dark">{course.progress}%</span>
                      </div>

                      <div className="d-flex justify-content-between align-items-center text-muted small mt-2">
                        <span><BsClockHistory className="me-1" /> Next: {course.nextAssessment}</span>
                        <a href="#manage" className="manage-link-green">Manage →</a>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* RECENT SUBMISSIONS */}
            <Card className="dash-card border-0 shadow-sm">
              <Card.Body>
                <h5 className="card-heading mb-3">Recent Student Activity</h5>
                <Table hover responsive className="align-middle custom-dash-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Activity</th>
                      <th>Score</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((act, idx) => (
                      <tr key={idx}>
                        <td className="fw-semibold">{act.student}</td>
                        <td className="text-muted">{act.action}</td>
                        <td>
                          <span className="badge-score-green">
                            {act.score}
                          </span>
                        </td>
                        <td className="text-muted small">{act.time}</td>
                      </tr>
                    ))}
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
                    <Button className="quick-btn btn-green-primary w-100">
                      <BsPlusLg className="me-2" /> Create New Quiz
                    </Button>
                    <Button className="quick-btn btn-green-outline w-100">
                      <BsUpload className="me-2" /> Upload Course PDF
                    </Button>
                    <Button className="quick-btn btn-green-soft w-100">
                      <BsCpu className="me-2" /> AI Question Generator
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              {/* AI ASSISTANT CARD */}
              <Card className="ai-dash-card border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center gap-2 mb-2 text-green-dark">
                    <BsCpu className="fs-5" />
                    <strong className="fs-6">AI Teaching Assistant</strong>
                  </div>
                  <p className="ai-text small mb-3">
                    3 students scored below 50% in the last Binary Trees quiz. Would you like me to generate a targeted review worksheet?
                  </p>
                  <Button size="sm" className="btn-green-primary w-100">
                    Generate Review Sheet
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </main>
    </div>
  );
}

