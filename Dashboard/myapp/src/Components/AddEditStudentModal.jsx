import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { BsPersonPlus, BsPencilSquare, BsPlusLg, BsTrash } from "react-icons/bs";

export default function AddEditStudentModal({ show, onHide, student, onSave }) {
  const isEdit = Boolean(student);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("Data Structures & Algorithms");
  const [attendance, setAttendance] = useState(85);
  const [subjects, setSubjects] = useState([
    { name: "Data Structures", score: 85 },
    { name: "DBMS", score: 80 },
    { name: "OOP", score: 75 },
  ]);

  useEffect(() => {
    if (student) {
      setName(student.name || "");
      setEmail(student.email || "");
      setCourse(student.course || "Data Structures & Algorithms");
      setAttendance(student.attendance || 85);

      if (student.subjects) {
        const subList = Object.entries(student.subjects).map(([k, v]) => ({
          name: k,
          score: Number(v),
        }));
        setSubjects(subList.length > 0 ? subList : [{ name: "Subject 1", score: 75 }]);
      }
    } else {
      setName("");
      setEmail("");
      setCourse("Data Structures & Algorithms");
      setAttendance(85);
      setSubjects([
        { name: "Data Structures", score: 85 },
        { name: "DBMS", score: 80 },
        { name: "OOP", score: 75 },
      ]);
    }
  }, [student, show]);

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = field === "score" ? Math.max(0, Math.min(100, Number(value))) : value;
    setSubjects(updated);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: `Subject ${subjects.length + 1}`, score: 75 }]);
  };

  const handleRemoveSubject = (index) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((_, idx) => idx !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Convert subjects array to object
    const subjectObj = {};
    subjects.forEach((s) => {
      if (s.name.trim()) {
        subjectObj[s.name.trim()] = Number(s.score);
      }
    });

    const courseCode = course.includes("Data Structures")
      ? "CS201"
      : course.includes("Database")
      ? "CS302"
      : "CS102";

    const payload = {
      ...(student ? { id: student.id } : {}),
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, ".")}@email.com`,
      course,
      courseCode,
      attendance: Number(attendance),
      subjects: subjectObj,
    };

    onSave(payload);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title className="fs-5 d-flex align-items-center gap-2">
          {isEdit ? <BsPencilSquare /> : <BsPersonPlus />}
          {isEdit ? "Edit Student & Marks Sheet" : "Add New Student Record"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          <Row className="g-3 mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold small">Student Full Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold small">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="e.g. alex@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-3 mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold small">Primary Course</Form.Label>
                <Form.Select value={course} onChange={(e) => setCourse(e.target.value)}>
                  <option value="Data Structures & Algorithms">Data Structures & Algorithms (CS201)</option>
                  <option value="Database Management Systems">Database Management Systems (CS302)</option>
                  <option value="Object-Oriented Programming">Object-Oriented Programming (CS102)</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold small">Attendance (%)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  max="100"
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="border-top pt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Subject Marks Breakdown (0 - 100%)</h6>
              <Button variant="outline-success" size="sm" onClick={handleAddSubject}>
                <BsPlusLg className="me-1" /> Add Subject
              </Button>
            </div>

            {subjects.map((sub, idx) => (
              <Row key={idx} className="g-2 mb-2 align-items-center">
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Subject Name (e.g. Algorithms)"
                    value={sub.name}
                    onChange={(e) => handleSubjectChange(idx, "name", e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Score"
                      value={sub.score}
                      onChange={(e) => handleSubjectChange(idx, "score", e.target.value)}
                    />
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col md={2} className="text-end">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    disabled={subjects.length <= 1}
                    onClick={() => handleRemoveSubject(idx)}
                  >
                    <BsTrash />
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            {isEdit ? "Save Changes & Recalculate" : "Add Student Record"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
