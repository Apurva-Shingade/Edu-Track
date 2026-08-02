import React from 'react'
import "../assets/Css/MyCourses.css"

import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form,
    InputGroup,
    Badge,
} from "react-bootstrap";

import {
    BsBook,
    BsPeople,
    BsClipboardCheck,
    BsSearch,
    BsGrid,
    BsList,
    BsThreeDotsVertical,
} from "react-icons/bs";

const stats = [
    {
        title: "TOTAL COURSES",
        value: "4",
        icon: <BsBook size={28} />,
    },
    {
        title: "TOTAL QUIZZES",
        value: "16",
        icon: <BsClipboardCheck size={28} />,
    },
    {
        title: "TOTAL STUDENTS",
        value: "128",
        icon: <BsPeople size={28} />,
    },
    {
        title: "PUBLISHED",
        value: "3",
        icon: <BsBook size={28} />,
    },
];

const courses = [
    {
        image: "https://picsum.photos/90?1",
        title: "Data Structures & Algorithms",
        description:
            "Learn fundamental data structures and algorithms with practical examples.",
        students: 42,
        quizzes: 6,
        status: "Published",
        updated: "2 days ago",
    },
    {
        image: "https://picsum.photos/90?2",
        title: "Database Systems",
        description:
            "Understand SQL, normalization and transaction management.",
        students: 38,
        quizzes: 4,
        status: "Published",
        updated: "5 days ago",
    },
    {
        image: "https://picsum.photos/90?3",
        title: "AI Fundamentals",
        description:
            "Introduction to AI concepts and Machine Learning basics.",
        students: 28,
        quizzes: 3,
        status: "Published",
        updated: "1 week ago",
    },
    {
        image: "https://picsum.photos/90?4",
        title: "Web Development",
        description:
            "HTML, CSS, JavaScript and React development practices.",
        students: 20,
        quizzes: 3,
        status: "Draft",
        updated: "1 week ago",
    },
];

const MyCourses = () => {
    return (
        <>
            <Container fluid className="py-4 px-4 bg-light min-vh-100">

                {/* Header */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                        <h2 className="fw-bold mb-1">My Courses</h2>

                        <p className="text-muted mb-0">
                            Manage your courses, materials and assessments
                        </p>
                    </div>

                    <Button
                        style={{
                            background: "#134E4A",
                            border: "none",
                            padding: "10px 22px",
                        }}
                    >
                        + Create Course
                    </Button>

                </div>

                {/* Statistic Cards */}

                <Row className="g-4 mb-4">

                    {stats.map((item, index) => (

                        <Col lg={3} md={6} key={index}>

                            <Card className="shadow-sm border-0 h-100 stats-card">

                                <Card.Body className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <small className="text-uppercase text-muted">
                                            {item.title}
                                        </small>

                                        <h1 className="fw-bold mt-2">
                                            {item.value}
                                        </h1>

                                    </div>

                                    <div className="icon-circle">
                                        {item.icon}
                                    </div>

                                </Card.Body>

                            </Card>

                        </Col>

                    ))}

                </Row>

                {/* Search & Filter */}

                <Card className="border-0 shadow-sm mb-4">

                    <Card.Body>

                        <Row className="g-3 align-items-center">

                            <Col lg={4}>

                                <InputGroup>

                                    <Form.Control
                                        placeholder="Search courses..."
                                    />

                                    <InputGroup.Text>
                                        <BsSearch />
                                    </InputGroup.Text>

                                </InputGroup>

                            </Col>

                            <Col lg={2}>

                                <Form.Select>

                                    <option>All Status</option>

                                    <option>Published</option>

                                    <option>Draft</option>

                                </Form.Select>

                            </Col>

                            <Col lg={3}></Col>

                            <Col lg={2}>

                                <Form.Select>

                                    <option>Sort by : Recent</option>

                                    <option>Name</option>

                                    <option>Students</option>

                                </Form.Select>

                            </Col>

                            <Col lg={1}>

                                <div className="d-flex gap-2 justify-content-end">

                                    <Button
                                        variant="light"
                                        className="border"
                                    >
                                        <BsGrid />
                                    </Button>

                                    <Button
                                        variant="light"
                                        className="border"
                                    >
                                        <BsList />
                                    </Button>

                                </div>

                            </Col>

                        </Row>

                    </Card.Body>

                </Card>

                {/* Course List */}

                <Card className="border-0 shadow-sm">

                    <Card.Body className="p-0">

                        {courses.map((course, index) => (

                            <div
                                key={index}
                                className="d-flex align-items-center justify-content-between p-4 border-bottom flex-wrap"
                            >

                                {/* Left Side */}

                                <div className="d-flex align-items-center">

                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        width="95"
                                        height="95"
                                        className="rounded me-4"
                                    />

                                    <div>

                                        <h4 className="fw-bold mb-2">
                                            {course.title}
                                        </h4>

                                        <p
                                            className="text-muted mb-3"
                                            style={{ maxWidth: "360px" }}
                                        >
                                            {course.description}
                                        </p>

                                        <Badge
                                            bg={
                                                course.status === "Published"
                                                    ? "success"
                                                    : "warning"
                                            }
                                        >
                                            {course.status}
                                        </Badge>

                                    </div>

                                </div>

                                {/* Right Side */}

                                <div className="d-flex align-items-center gap-5 flex-wrap mt-3 mt-lg-0">

                                    <div className="text-center">

                                        <small className="text-muted d-block">
                                            STUDENTS
                                        </small>

                                        <h4 className="fw-bold">
                                            {course.students}
                                        </h4>

                                    </div>

                                    <div className="text-center">

                                        <small className="text-muted d-block">
                                            QUIZZES
                                        </small>

                                        <h4 className="fw-bold">
                                            {course.quizzes}
                                        </h4>

                                    </div>

                                    <div className="text-center">

                                        <small className="text-muted d-block">
                                            UPDATED
                                        </small>

                                        <h6 className="mt-2">
                                            {course.updated}
                                        </h6>

                                    </div>

                                    <Button
                                        variant="light"
                                        className="border-0"
                                    >
                                        <BsThreeDotsVertical />
                                    </Button>

                                </div>

                            </div>

                        ))}

                        {/* Footer */}

                        <div className="d-flex justify-content-between align-items-center p-3">

                            <small className="text-muted">
                                Showing 1 to 4 of 4 courses
                            </small>

                            <div className="d-flex gap-2">

                                <Button variant="light" className="border">
                                    &lt;
                                </Button>

                                <Button variant="success">
                                    1
                                </Button>

                                <Button variant="light" className="border">
                                    &gt;
                                </Button>

                            </div>

                        </div>

                    </Card.Body>

                </Card>

            </Container>
        </>
    )
}

export default MyCourses