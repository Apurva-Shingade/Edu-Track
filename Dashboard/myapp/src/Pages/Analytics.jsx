import React from 'react'
import "../assets/Css/Analytics.css"

import { Container, Row, Col, Card, Table, Badge, Button, Form, } from "react-bootstrap";

import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import {
    PeopleFill,
    GraphUpArrow,
    CheckCircleFill,
    ClockFill,
    Download,
} from "react-bootstrap-icons";

const Analytics = () => {
    // Dashboard Cards
    const stats = [
        {
            title: "TOTAL STUDENTS",
            value: "128",
            sub: "+12 this month",
            icon: <PeopleFill size={28} />,
            bg: "#E9F7EC",
            color: "#2E7D32",
        },
        {
            title: "AVG. SCORE",
            value: "78.6%",
            sub: "+5.4% vs last month",
            icon: <GraphUpArrow size={28} />,
            bg: "#FFF3D6",
            color: "#C98A00",
        },
        {
            title: "PASS RATE",
            value: "84.2%",
            sub: "+8.1% vs last month",
            icon: <CheckCircleFill size={28} />,
            bg: "#F2E8FF",
            color: "#8E44AD",
        },
        {
            title: "AVG. TIME / QUIZ",
            value: "24m 30s",
            sub: "-3m vs last month",
            icon: <ClockFill size={28} />,
            bg: "#E7F3FF",
            color: "#1565C0",
        },
    ];
    const data = {
        labels: ["90-100%", "75-89%", "50-74%", "Below 50%"],
        datasets: [
            {
                data: [36, 41, 31, 20],
                backgroundColor: [
                    "#1b5e20",
                    "#7cb342",
                    "#f9a825",
                    "#ef5350",
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: "65%",
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <>
            <Container fluid className="p-4">

                {/* ================= Header ================= */}

                <Row className="align-items-center mb-4">
                    <Col md={8}>
                        <h2 className="fw-bold mb-1">
                            Student Analytics & Reports
                        </h2>

                        <p className="text-muted mb-0">
                            Track performance, understand learning trends,
                            and provide better guidance.
                        </p>
                    </Col>

                    <Col
                        md={4}
                        className="d-flex justify-content-end gap-2 mt-3 mt-md-0"
                    >
                        <Form.Select style={{ maxWidth: "180px" }}>
                            <option>All Courses</option>
                            <option>Data Structures</option>
                            <option>Database Systems</option>
                            <option>Operating System</option>
                        </Form.Select>

                        <Button variant="success">
                            <Download className="me-2" />
                            Export Report
                        </Button>
                    </Col>
                </Row>

                {/* ================= Statistic Cards ================= */}

                <Row className="g-4">

                    {stats.map((item, index) => (

                        <Col lg={3} md={6} key={index}>

                            <Card className="shadow-sm border-0 h-100">

                                <Card.Body className="d-flex align-items-center">

                                    {/* Icon */}

                                    <div
                                        className="rounded-circle d-flex justify-content-center align-items-center me-3"
                                        style={{
                                            width: "65px",
                                            height: "65px",
                                            background: item.bg,
                                            color: item.color,
                                        }}
                                    >
                                        {item.icon}
                                    </div>

                                    {/* Text */}

                                    <div>

                                        <small className="text-muted fw-semibold">
                                            {item.title}
                                        </small>

                                        <h2 className="fw-bold mb-1">
                                            {item.value}
                                        </h2>

                                        <small className="text-success">
                                            {item.sub}
                                        </small>

                                    </div>

                                </Card.Body>

                            </Card>

                        </Col>

                    ))}

                </Row>

                {/* ================= Graphs Section ================= */}

                <Row className="mt-4 g-4">

                    {/* Performance Trend */}

                    <Col lg={8}>

                        <Card className="shadow-sm border-0">

                            <Card.Body>

                                <div className="d-flex justify-content-between align-items-center mb-3">

                                    <div>
                                        <h4 className="fw-bold">
                                            Performance Trend
                                        </h4>

                                        <small className="text-muted">
                                            Average score over time
                                        </small>
                                    </div>

                                    <Form.Select style={{ width: "170px" }}>
                                        <option>Last 6 Weeks</option>
                                    </Form.Select>

                                </div>

                                {/* Graph Placeholder */}

                                <div className="graph-box">
                                    Performance Graph
                                </div>

                            </Card.Body>

                        </Card>

                    </Col>

                    {/* Score Distribution */}

                    <Col lg={4}>

                        <Card className="shadow-sm border-0">

                            <Card.Body>

                                <h4 className="fw-bold">
                                    Score Distribution
                                </h4>

                                <small className="text-muted">
                                    How students performed in assessments
                                </small>

                                <div
                                    className="rounded-circle border mx-auto my-4 d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "220px",
                                        height: "220px",
                                    }}
                                >
                                    <div className="donut-box">
                                        Donut Chart
                                    </div>
                                </div>

                                {/* Legend */}

                                <div className="mt-3">

                                    <div className="d-flex justify-content-between mb-2">
                                        <span>🟢 90 - 100%</span>
                                        <span>28% (36)</span>
                                    </div>

                                    <div className="d-flex justify-content-between mb-2">
                                        <span>🟢 75 - 89%</span>
                                        <span>32% (41)</span>
                                    </div>

                                    <div className="d-flex justify-content-between mb-2">
                                        <span>🟡 50 - 74%</span>
                                        <span>24% (31)</span>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <span>🔴 Below 50%</span>
                                        <span>16% (20)</span>
                                    </div>

                                </div>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

                {/* ================= Student Performance ================= */}

                <Row className="mt-4 g-4">

                    {/* Student Table */}

                    <Col lg={9}>

                        <Card className="shadow-sm border-0">

                            <Card.Body>

                                <h4 className="fw-bold mb-4">
                                    Student Performance Overview
                                </h4>

                                <table className="table align-middle">

                                    <thead>

                                        <tr>
                                            <th>Student</th>
                                            <th>Quizzes Taken</th>
                                            <th>Average Score</th>
                                            <th>Pass Rate</th>
                                            <th>Last Activity</th>
                                            <th>Trend</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        <tr>
                                            <td>Alex Rivera</td>
                                            <td>8</td>
                                            <td>92.5%</td>
                                            <td>100%</td>
                                            <td>Jun 12, 2025</td>
                                            <td className="text-success">↗ 5.2%</td>
                                        </tr>

                                        <tr>
                                            <td>Priya Sharma</td>
                                            <td>7</td>
                                            <td>85.3%</td>
                                            <td>100%</td>
                                            <td>Jun 11, 2025</td>
                                            <td className="text-success">↗ 3.1%</td>
                                        </tr>

                                        <tr>
                                            <td>Rohan Kapoor</td>
                                            <td>6</td>
                                            <td>72.8%</td>
                                            <td>83%</td>
                                            <td>Jun 10, 2025</td>
                                            <td className="text-success">↗ 1.4%</td>
                                        </tr>

                                        <tr>
                                            <td>Sara Thomas</td>
                                            <td>5</td>
                                            <td>48.6%</td>
                                            <td>40%</td>
                                            <td>Jun 09, 2025</td>
                                            <td className="text-danger">↘ 2.7%</td>
                                        </tr>

                                        <tr>
                                            <td>Manav Nair</td>
                                            <td>6</td>
                                            <td>65.2%</td>
                                            <td>67%</td>
                                            <td>Jun 08, 2025</td>
                                            <td className="text-danger">↘ 1.1%</td>
                                        </tr>

                                    </tbody>

                                </table>

                                <div className="text-center mt-3">

                                    <Button
                                        variant="link"
                                        className="text-success fw-bold text-decoration-none"
                                    >
                                        View All Students →
                                    </Button>

                                </div>

                            </Card.Body>

                        </Card>

                    </Col>

                    {/* Strength & Weakness */}

                    <Col lg={3}>

                        <Card className="shadow-sm border-0 h-100">

                            <Card.Body>

                                <h4 className="fw-bold mb-4">
                                    Top Strengths & Weaknesses
                                </h4>

                                <h6 className="text-success fw-bold">
                                    Top Strengths
                                </h6>

                                <ul className="list-group list-group-flush mb-4">

                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Data Structures</span>
                                        <strong>92%</strong>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Algorithms</span>
                                        <strong>89%</strong>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Time Complexity</span>
                                        <strong>84%</strong>
                                    </li>

                                </ul>

                                <h6 className="text-danger fw-bold">
                                    Areas to Improve
                                </h6>

                                <ul className="list-group list-group-flush">

                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Dynamic Programming</span>
                                        <strong>42%</strong>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Graph Algorithms</span>
                                        <strong>48%</strong>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Database Normalization</span>
                                        <strong>53%</strong>
                                    </li>

                                </ul>

                                <Button
                                    variant="success"
                                    className="w-100 mt-4"
                                >
                                    Detailed Concept Report
                                </Button>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </Container>
        </>
    )
}

export default Analytics