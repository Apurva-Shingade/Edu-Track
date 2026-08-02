import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faPlus,
  faWandMagicSparkles,
  faFileLines,
  faLightbulb,
  faComment,
  faBrain,
  faCheck,
  faClipboardList,
  faGraduationCap,
  faTrash,
  faPaperPlane,
  faMicrophone,
  faCheckDouble,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { sendGemmaTutorChat } from "../services/GemmaStudentAiService";

export default function AITutorPage() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello! I am your Gemma 4 AI Tutor 👋\nAsk me anything about your computer science courses, math problems, data structures, or DBMS concepts. I'm here to help you excel!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (customPrompt) => {
    const textToSend = customPrompt || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInputValue("");
    setIsLoading(true);

    try {
      const reply = await sendGemmaTutorChat(textToSend.trim(), messages);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Gemma 4 AI is analyzing your question. Please try asking again!",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([messages[0]]);
  };

  return (
    <div className="ai-tutor-container">
      {/* LEFT SIDEBAR */}
      <div className="ai-sidebar">
        <div className="ai-profile-header">
          <div className="ai-avatar-large">
            <FontAwesomeIcon icon={faRobot} style={{ color: "#10b981" }} />
          </div>
          <div>
            <h2 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "var(--dark-green)" }}>
              Gemma 4 AI Tutor <span className="ai-status-badge">Active</span>
            </h2>
            <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)" }}>
              Personal academic assistant
            </p>
          </div>
        </div>

        <button
          className="btn-new-chat"
          onClick={handleClearChat}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ color: "#000000" }} /> New Chat
        </button>

        {/* QUICK SUGGESTIONS */}
        <div className="mt-3 mb-3">
          <h4 className="history-section-title">Quick Study Topics</h4>
          <div
            className="history-item cursor-pointer mb-1"
            onClick={() => handleSendMessage("Explain Dijkstra's shortest path algorithm step by step.")}
          >
            <div className="history-item-left">
              <FontAwesomeIcon icon={faWandMagicSparkles} style={{ color: "#10b981" }} /> Dijkstra's Algorithm
            </div>
          </div>
          <div
            className="history-item cursor-pointer mb-1"
            onClick={() => handleSendMessage("Explain Binary Search Tree search time complexity.")}
          >
            <div className="history-item-left">
              <FontAwesomeIcon icon={faFileLines} style={{ color: "#10b981" }} /> BST Search & Complexity
            </div>
          </div>
          <div
            className="history-item cursor-pointer mb-1"
            onClick={() => handleSendMessage("Summarize SQL Join types with examples.")}
          >
            <div className="history-item-left">
              <FontAwesomeIcon icon={faLightbulb} style={{ color: "#10b981" }} /> SQL Join Types
            </div>
          </div>
        </div>

        <div className="capabilities-box">
          <h4 className="history-section-title" style={{ color: "var(--dark-green)" }}>
            Gemma 4 Capabilities
          </h4>
          <div className="capability-item">
            <FontAwesomeIcon icon={faComment} style={{ color: "#10b981" }} /> Answer course questions
          </div>
          <div className="capability-item">
            <FontAwesomeIcon icon={faBrain} style={{ color: "#10b981" }} /> Explain algorithms step-by-step
          </div>
          <div className="capability-item">
            <FontAwesomeIcon icon={faCheck} style={{ color: "#10b981" }} /> Code & math problem solving
          </div>
          <div className="capability-item">
            <FontAwesomeIcon icon={faClipboardList} style={{ color: "#10b981" }} /> Post-quiz performance analysis
          </div>
          <div className="capability-item">
            <FontAwesomeIcon icon={faGraduationCap} style={{ color: "#10b981" }} /> Exam preparation roadmaps
          </div>
        </div>
      </div>

      {/* RIGHT CHAT AREA */}
      <div className="ai-chat-main">
        {/* Chat Header */}
        <div className="chat-header-bar">
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div className="ai-avatar-small" style={{ width: "48px", height: "48px", fontSize: "24px" }}>
              <FontAwesomeIcon icon={faRobot} style={{ color: "#10b981" }} />
            </div>
            <div>
              <h2 style={{ margin: "0 0 4px 0", fontSize: "20px", color: "var(--dark-green)" }}>
                Gemma 4 AI Tutor Assistant
              </h2>
              <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)" }}>
                Powered by Gemma 4 AI & Google Gemini.
              </p>
            </div>
          </div>
          <button
            onClick={handleClearChat}
            className="btn-outline"
            style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", padding: "8px 16px" }}
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: "#000000" }} /> Clear Chat
          </button>
        </div>

        {/* Dynamic Messages */}
        <div className="chat-messages-area">
          {messages.map((msg, index) => (
            <div key={index} className={`msg-row ${msg.role}`}>
              {msg.role === "ai" && (
                <div className="ai-avatar-small">
                  <FontAwesomeIcon icon={faRobot} style={{ color: "#10b981" }} />
                </div>
              )}

              <div className={`msg-bubble ${msg.role}`} style={{ whiteSpace: "pre-wrap" }}>
                {msg.role === "ai" && (
                  <div style={{ fontSize: "11px", fontWeight: "bold", color: "#10b981", marginBottom: "4px" }}>
                    <FontAwesomeIcon icon={faBolt} className="me-1" /> Gemma 4 AI
                  </div>
                )}
                {msg.text}
                <div
                  className="msg-footer"
                  style={{ justifyContent: msg.role === "user" ? "flex-end" : "flex-start", gap: "6px" }}
                >
                  <span>{msg.time}</span>
                  {msg.role === "user" && <FontAwesomeIcon icon={faCheckDouble} style={{ color: "#10b981" }} />}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="msg-row ai">
              <div className="ai-avatar-small">
                <FontAwesomeIcon icon={faRobot} style={{ color: "#10b981" }} />
              </div>
              <div className="msg-bubble ai" style={{ color: "#888" }}>
                Gemma 4 is processing your question...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chat-input-section">
          <div className="chat-input-wrapper">
            <input
              type="text"
              className="chat-input-field"
              placeholder="Ask Gemma 4 anything about your courses or quizzes..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
            />
            <FontAwesomeIcon icon={faMicrophone} style={{ fontSize: "18px", color: "#666", cursor: "pointer" }} />
            <button
              className="btn-send"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              style={{ backgroundColor: "#10b981" }}
            >
              <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#FFFFFF" }} />
            </button>
          </div>
          <div style={{ textAlign: "center", fontSize: "11px", color: "#999", marginTop: "8px" }}>
            Gemma 4 AI Tutor provides instant academic assistance.
          </div>
        </div>
      </div>
    </div>
  );
}