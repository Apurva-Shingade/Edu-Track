import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { BsKeyFill, BsShieldCheck } from "react-icons/bs";

export default function GemmaApiKeyModal({ show, onHide, apiKey, onSaveKey }) {
  const [keyInput, setKeyInput] = useState(apiKey || "");

  const handleSave = (e) => {
    e.preventDefault();
    onSaveKey(keyInput.trim());
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title className="fs-5 d-flex align-items-center gap-2">
          <BsKeyFill className="text-warning" />
          Google Gemini / Gemma API Key
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSave}>
        <Modal.Body className="p-4">
          <Alert variant="info" className="small">
            <BsShieldCheck className="me-2 fs-5 text-info" />
            Connecting your Google AI Studio API Key enables live Gemma 4 / Gemini model calls. If left empty, Edu-Track automatically uses the built-in offline Gemma 4 Reasoning Engine!
          </Alert>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold small">Google AI Studio API Key</Form.Label>
            <Form.Control
              type="password"
              placeholder="AIzaSy..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            Save API Key Configuration
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
