import React from 'react'

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
    FaEllipsisV,
    FaPlus,
} from "react-icons/fa";

import "../assets/Css/Management.css";

const students = [
    {
        id: 1,
        name: "Alex Rivera",
        email: "alex.rivera@email.com",
        course: "Data Structures",
        assessments: 5,
        score: "92.5%",
        status: "Active",
        lastActive: "2 hours ago",
    },
    {
        id: 2,
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        course: "Database Systems",
        assessments: 4,
        score: "87.3%",
        status: "Active",
        lastActive: "5 hours ago",
    },
    {
        id: 3,
        name: "Rohan Gupta",
        email: "rohan@email.com",
        course: "AI Fundamentals",
        assessments: 6,
        score: "78.6%",
        status: "At Risk",
        lastActive: "1 day ago",
    },
    {
        id: 4,
        name: "Neha Verma",
        email: "neha@email.com",
        course: "Web Development",
        assessments: 4,
        score: "65.4%",
        status: "At Risk",
        lastActive: "2 days ago",
    },
    {
        id: 5,
        name: "Mayank Singh",
        email: "mayank@email.com",
        course: "Data Structures",
        assessments: 3,
        score: "45.2%",
        status: "Needs Help",
        lastActive: "3 days ago",
    },
];

const cards = [
    {
        title: "TOTAL STUDENTS",
        value: "128",
        sub: "+12 this month",
        icon: <FaUserGraduate />,
    },
    {
        title: "ACTIVE STUDENTS",
        value: "98",
        sub: "76.6% active",
        icon: <FaUserCheck />,
    },
    {
        title: "AVG. SCORE",
        value: "84.2%",
        sub: "Across all assessments",
        icon: <FaChartLine />,
    },
    {
        title: "NEED ATTENTION",
        value: "15",
        sub: "Below 60% score",
        icon: <FaExclamationCircle />,
    },
];

const Management = () => {
    return (
        <>
            <Container fluid className="management-page p-4">

                {/* Header */}

                <Row className="align-items-center mb-4">
                    <Col>
                        <h2 className="fw-bold mb-1">Student Management</h2>
                        <p className="text-muted mb-0">
                            View and manage all students and their progress
                        </p>
                    </Col>

                    <Col xs="auto">
                        <Button className="add-btn">
                            <FaPlus className="me-2" />
                            Add Student
                        </Button>
                    </Col>
                </Row>

                {/* Statistic Cards */}

                <Row className="g-4 mb-4">
                    {cards.map((card, index) => (
                        <Col lg={3} md={6} key={index}>
                            <Card className="stat-card h-100">
                                <Card.Body className="d-flex justify-content-between align-items-center">

                                    <div>
                                        <small className="text-uppercase text-muted fw-semibold">
                                            {card.title}
                                        </small>

                                        <h1 className="fw-bold mt-2">{card.value}</h1>

                                        <small className="text-muted">{card.sub}</small>
                                    </div>

                                    <div className="icon-circle">
                                        {card.icon}
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Main Section */}

                <Row className="g-4">

                    {/* Left Side */}

                    <Col lg={9}>

                        <Card className="shadow-sm border-0">

                            <Card.Body>

                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

                                    <h4 className="fw-bold">
                                        All Students
                                    </h4>

                                    <div className="d-flex gap-2 flex-wrap">

                                        <InputGroup style={{ width: "230px" }}>
                                            <Form.Control
                                                placeholder="Search students..."
                                            />
                                            <InputGroup.Text>
                                                <FaSearch />
                                            </InputGroup.Text>
                                        </InputGroup>

                                        <Form.Select style={{ width: "160px" }}>
                                            <option>All Courses</option>
                                            <option>AI</option>
                                            <option>Database</option>
                                            <option>Web</option>
                                        </Form.Select>

                                        <Form.Select style={{ width: "150px" }}>
                                            <option>All Status</option>
                                            <option>Active</option>
                                            <option>At Risk</option>
                                            <option>Needs Help</option>
                                        </Form.Select>

                                        <Button variant="light">
                                            <FaFilter className="me-2" />
                                            Filters
                                        </Button>

                                    </div>

                                </div>

                                {/* Student Table */}

                                <Table hover responsive>

                                    <thead>

                                        <tr>
                                            <th>Student</th>
                                            <th>Email</th>
                                            <th>Course</th>
                                            <th>Assessments</th>
                                            <th>Avg. Score</th>
                                            <th>Status</th>
                                            <th>Last Active</th>
                                            <th>Actions</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {students.map((student) => (

                                            <tr key={student.id}>

                                                <td className="fw-semibold">
                                                    {student.name}
                                                </td>

                                                <td>{student.email}</td>

                                                <td>{student.course}</td>

                                                <td>{student.assessments}</td>

                                                <td className="fw-bold text-success">
                                                    {student.score}
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

                                                <td>{student.lastActive}</td>

                                                <td>

                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        className="me-2"
                                                    >
                                                        <FaEye />
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                    >
                                                        <FaEllipsisV />
                                                    </Button>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </Table>

                            </Card.Body>

                        </Card>

                    </Col>

                    {/* Right Side */}

                    <Col lg={3}>

                        <Card className="shadow-sm border-0 h-100">

                            <Card.Body>

                                <h4 className="fw-bold mb-4">
                                    Student Insights
                                </h4>

                                {/* Donut Chart */}

                                <div className="d-flex justify-content-center mb-4">
                                    <div className="donut-chart"></div>
                                </div>

                                {/* Performance Distribution */}

                                <h6 className="fw-bold mb-3">
                                    Performance Distribution
                                </h6>

                                <div className="mb-2 d-flex justify-content-between">
                                    <span>
                                        <span className="dot excellent"></span>
                                        Excellent (90-100%)
                                    </span>

                                    <strong>32</strong>
                                </div>

                                <div className="mb-2 d-flex justify-content-between">
                                    <span>
                                        <span className="dot good"></span>
                                        Good (70-89%)
                                    </span>

                                    <strong>54</strong>
                                </div>

                                <div className="mb-2 d-flex justify-content-between">
                                    <span>
                                        <span className="dot average"></span>
                                        Average (50-69%)
                                    </span>

                                    <strong>27</strong>
                                </div>

                                <div className="mb-4 d-flex justify-content-between">
                                    <span>
                                        <span className="dot poor"></span>
                                        Needs Help (&lt;50%)
                                    </span>

                                    <strong>15</strong>
                                </div>

                                <hr />

                                {/* Top Performers */}

                                <h6 className="fw-bold mb-3">
                                    Top Performers
                                </h6>

                                <div className="performer">

                                    <div className="performer-avatar">
                                        AR
                                    </div>

                                    <div className="flex-grow-1 ms-3">
                                        <strong>Alex Rivera</strong>
                                    </div>

                                    <span className="text-success fw-bold">
                                        92.5%
                                    </span>

                                </div>

                                <div className="performer">

                                    <div className="performer-avatar">
                                        PS
                                    </div>

                                    <div className="flex-grow-1 ms-3">
                                        <strong>Priya Sharma</strong>
                                    </div>

                                    <span className="text-success fw-bold">
                                        87.3%
                                    </span>

                                </div>

                                <div className="performer">

                                    <div className="performer-avatar">
                                        RG
                                    </div>

                                    <div className="flex-grow-1 ms-3">
                                        <strong>Rohan Gupta</strong>
                                    </div>

                                    <span className="text-warning fw-bold">
                                        78.6%
                                    </span>

                                </div>

                                <Button
                                    className="w-100 mt-4 analytics-btn"
                                >
                                    View Detailed Analytics
                                </Button>

                            </Card.Body>

                        </Card>

                    </Col>




                </Row>

            </Container>
        </>
    )
}

export default Management