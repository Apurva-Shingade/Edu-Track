import React, { useState } from "react";
import { Card, Button, Form, InputGroup, Spinner, Badge } from "react-bootstrap";
import { BsCpu, BsSend, BsLightningCharge, BsXCircle } from "react-icons/bs";
import { askGemmaAssistant } from "../Services/GemmaAiService";

export default function GemmaChatDrawer({ students, apiKey, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "gemma",
      text: "Hello! I am your Gemma 4 AI Academic Assistant. Ask me anything about student marks, weak topics, or personalized study plans!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setLoading(true);

    try {
      const responseText = await askGemmaAssistant(userMsg, students, apiKey);
      setMessages((prev) => [...prev, { sender: "gemma", text: responseText }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "gemma", text: "Sorry, I encountered an issue analyzing the request. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (promptText) => {
    setInput(promptText);
  };

  return (
    <Card className="shadow-lg border-0 bg-white h-100 d-flex flex-column rounded-3" style={{ border: "1px solid #e2e8f0" }}>
      <Card.Header className="bg-dark text-white py-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <BsCpu className="text-success fs-4" />
          <div>
            <h6 className="fw-bold mb-0">Gemma 4 Teaching Assistant</h6>
            <small className="text-muted" style={{ fontSize: "0.75rem" }}>
              Marks & Performance AI Assistant
            </small>
          </div>
        </div>
        {onClose && (
          <Button variant="link" className="text-white p-0" onClick={onClose}>
            <BsXCircle className="fs-5" />
          </Button>
        )}
      </Card.Header>

      <Card.Body className="flex-grow-1 p-3 overflow-auto d-flex flex-column gap-3" style={{ maxHeight: "400px" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`d-flex flex-column ${msg.sender === "user" ? "align-items-end" : "align-items-start"}`}
          >
            <div
              className={`p-3 rounded-3 small ${
                msg.sender === "user"
                  ? "bg-success text-white"
                  : "bg-light text-dark border border-success-subtle"
              }`}
              style={{ maxWidth: "90%", whiteSpace: "pre-wrap" }}
            >
              {msg.sender === "gemma" && (
                <div className="d-flex align-items-center gap-1 text-success fw-bold mb-1" style={{ fontSize: "0.75rem" }}>
                  <BsLightningCharge /> Gemma 4 AI
                </div>
              )}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="d-flex align-items-center gap-2 text-muted small">
            <Spinner animation="grow" size="sm" variant="success" />
            <span>Gemma 4 is processing marks...</span>
          </div>
        )}
      </Card.Body>

      {/* QUICK SUGGESTIONS */}
      <div className="px-3 py-2 bg-light border-top border-bottom d-flex gap-2 flex-wrap">
        <Badge
          bg="white"
          text="dark"
          className="border border-secondary-subtle cursor-pointer small py-1 px-2"
          onClick={() => handleQuickPrompt("Which students need help?")}
          style={{ cursor: "pointer" }}
        >
          🔍 Who needs help?
        </Badge>
        <Badge
          bg="white"
          text="dark"
          className="border border-secondary-subtle cursor-pointer small py-1 px-2"
          onClick={() => handleQuickPrompt("Show top performers")}
          style={{ cursor: "pointer" }}
        >
          🏆 Top performers
        </Badge>
        <Badge
          bg="white"
          text="dark"
          className="border border-secondary-subtle cursor-pointer small py-1 px-2"
          onClick={() => handleQuickPrompt("Suggest a revision quiz")}
          style={{ cursor: "pointer" }}
        >
          📝 Quiz suggestions
        </Badge>
      </div>

      <Card.Footer className="bg-white border-0 p-3">
        <Form onSubmit={handleSend}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Ask Gemma 4 about student marks..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button variant="success" type="submit" disabled={loading || !input.trim()}>
              <BsSend />
            </Button>
          </InputGroup>
        </Form>
      </Card.Footer>
    </Card>
  );
}
