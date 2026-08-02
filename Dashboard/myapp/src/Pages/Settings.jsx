import React from 'react'
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form,
    Nav,
    ListGroup
} from "react-bootstrap";

import {
    BsPerson,
    BsGear,
    BsBell,
    BsShieldLock,
    BsLink45Deg,
    BsCreditCard,
    BsCamera,
    BsPersonBadge,
    BsCalendar,
    BsBook,
    BsClipboardCheck,
    BsPeople,
    BsGraphUp
} from "react-icons/bs";

import "../assets/Css/Settings.css";

const Settings = () => {
    return (
        <>
            <Container fluid className="bg-light min-vh-100 p-4">

                {/* Header */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            Settings
                        </h2>

                        <p className="text-muted mb-0">
                            Manage your profile, preferences and account settings
                        </p>

                    </div>

                    <Button
                        style={{
                            background: "#134E4A",
                            border: "none",
                            padding: "10px 24px"
                        }}
                    >
                        + Create Quiz
                    </Button>

                </div>

                {/* Tabs */}

                <Nav
                    variant="tabs"
                    className="mb-4 border-bottom"
                >

                    <Nav.Item>
                        <Nav.Link active>
                            <BsPerson className="me-2" />
                            Profile
                        </Nav.Link>
                    </Nav.Item>
                    
                </Nav>

                <Row>

                    {/* LEFT COLUMN */}

                    <Col lg={7}>

                        <Card className="shadow-sm border-0">

                            <Card.Body className="p-4">

                                <h3 className="fw-bold">
                                    Profile Information
                                </h3>

                                <p className="text-muted mb-4">
                                    Update your personal information and profile picture.
                                </p>

                                <Row>

                                    {/* Profile Image */}

                                    <Col lg={3} className="text-center">

                                        <div className="position-relative d-inline-block">

                                            <img
                                                src="https://i.pravatar.cc/170"
                                                alt="profile"
                                                className="rounded-circle profile-img"
                                            />

                                            <Button
                                                size="sm"
                                                className="camera-btn"
                                            >
                                                <BsCamera />
                                            </Button>

                                        </div>

                                    </Col>

                                    {/* Form */}

                                    <Col lg={9}>

                                        <Row>

                                            <Col md={6} className="mb-3">

                                                <Form.Label>
                                                    Full Name
                                                </Form.Label>

                                                <Form.Control
                                                    defaultValue="Priya Sharma"
                                                />

                                            </Col>

                                            <Col md={6} className="mb-3">

                                                <Form.Label>
                                                    Email Address
                                                </Form.Label>

                                                <Form.Control
                                                    defaultValue="priya.sharma@school.edu"
                                                />

                                            </Col>

                                            <Col md={6} className="mb-3">

                                                <Form.Label>
                                                    Department
                                                </Form.Label>

                                                <Form.Control
                                                    defaultValue="Computer Science"
                                                />

                                            </Col>

                                            <Col md={6} className="mb-3">

                                                <Form.Label>
                                                    Designation
                                                </Form.Label>

                                                <Form.Control
                                                    defaultValue="Assistant Professor"
                                                />

                                            </Col>

                                            <Col md={6} className="mb-3">

                                                <Form.Label>
                                                    Phone Number
                                                </Form.Label>

                                                <Form.Control
                                                    defaultValue="+91 98765 43210"
                                                />

                                            </Col>

                                            <Col md={6} className="mb-3">

                                                <Form.Label>
                                                    Institution
                                                </Form.Label>

                                                <Form.Control
                                                    defaultValue="Greenfield International School"
                                                />

                                            </Col>

                                            <Col md={12}>

                                                <Form.Label>
                                                    Bio
                                                </Form.Label>

                                                <Form.Control
                                                    as="textarea"
                                                    rows={4}
                                                    defaultValue="Passionate about teaching and leveraging AI to enhance student learning outcomes."
                                                />

                                            </Col>

                                        </Row>

                                    </Col>

                                </Row>

                                <Button
                                    className="mt-4"
                                    style={{
                                        background: "#176b5a",
                                        border: "none"
                                    }}
                                >
                                    Save Changes
                                </Button>

                            </Card.Body>

                        </Card>

                    </Col>

                    {/* RIGHT COLUMN */}

                    <Col lg={5}>

                        {/* Account Summary */}

                        <Card className="shadow-sm border-0 mb-4">

                            <Card.Body>

                                <h3 className="fw-bold mb-4">
                                    Account Summary
                                </h3>

                                <ListGroup variant="flush">

                                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0">

                                        <span>
                                            <BsPersonBadge className="me-3 text-success" />
                                            Account Type
                                        </span>

                                        <strong>Teacher</strong>

                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0">

                                        <span>
                                            <BsCalendar className="me-3 text-success" />
                                            Member Since
                                        </span>

                                        <strong>12 Jan 2024</strong>

                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0">

                                        <span>
                                            <BsBook className="me-3 text-success" />
                                            Courses Created
                                        </span>

                                        <strong>4</strong>

                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0">

                                        <span>
                                            <BsClipboardCheck className="me-3 text-success" />
                                            Quizzes Created
                                        </span>

                                        <strong>16</strong>

                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0">

                                        <span>
                                            <BsPeople className="me-3 text-success" />
                                            Students Enrolled
                                        </span>

                                        <strong>128</strong>

                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0">

                                        <span>
                                            <BsGraphUp className="me-3 text-success" />
                                            Evaluations Done
                                        </span>

                                        <strong>1,042</strong>

                                    </ListGroup.Item>

                                </ListGroup>

                            </Card.Body>

                        </Card>

                        {/* Quick Actions */}

                        <Card className="shadow-sm border-0">

                            <Card.Body>

                                <h3 className="fw-bold mb-4">
                                    Quick Actions
                                </h3>

                                <ListGroup variant="flush">

                                    <ListGroup.Item
                                        action
                                        className="border-0"
                                    >
                                        🔒 Change Password
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                        action
                                        className="border-0 text-danger"
                                    >
                                        🚪 Logout
                                    </ListGroup.Item>

                                </ListGroup>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

                {/* AI Engine Status */}

                <Card className="shadow-sm border-0 mt-4">

                    <Card.Body>

                        <h4 className="fw-bold">
                            AI Engine Status
                        </h4>

                        <p className="text-muted">
                            Your AI evaluation engine is running smoothly.
                        </p>

                        <div className="d-flex flex-wrap gap-4 align-items-center mt-3">

                            <span>
                                🟢 Gemma 4 Local (E2B)
                            </span>

                            <span>
                                🟢 100% On-Premise
                            </span>

                            <span>
                                🟢 Ollama Endpoint Active
                            </span>

                            <span>
                                🟢 Last Checked: Just now
                            </span>

                            <Button
                                className="ms-auto"
                                variant="outline-success"
                            >
                                Check Again
                            </Button>

                        </div>

                    </Card.Body>

                </Card>

            </Container>
        </>
    )
}

export default Settings