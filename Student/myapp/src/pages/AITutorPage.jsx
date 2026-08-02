import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRobot,
  faPlus,
  faWandMagicSparkles,
  faFileLines,
  faLocationDot,
  faLightbulb,
  faPenToSquare,
  faCircleCheck,
  faComment,
  faBrain,
  faCheck,
  faClipboardList,
  faGraduationCap,
  faTrash,
  faPaperPlane,
  faMicrophone,
  faCheckDouble
} from '@fortawesome/free-solid-svg-icons';

export default function AITutorPage() {
  // 1. State for managing the chat input and conversation history
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "Hello! I'm Gemma AI 👋\nAsk me anything. I'm here to help you learn, solve problems, and explore new topics.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 2. Function to handle sending the message to the backend API
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      role: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update UI instantly with user's message
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Format history for the API (removing 'time' which the API doesn't need)
      const apiMessages = updatedMessages.map(msg => ({
        role: msg.role === 'ai' ? 'assistant' : 'user',
        content: msg.text
      }));

      // 3. Make the API Call to your Node.js backend
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await response.json();

      if (data.reply) {
        setMessages(prev => [
          ...prev, 
          {
            role: 'ai',
            text: data.reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [
        ...prev, 
        {
          role: 'ai',
          text: "Sorry, I am having trouble connecting to my server right now.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([messages[0]]); // Keep only the initial greeting
  };

  return (
    <div className="ai-tutor-container">
      
      {/* LEFT SIDEBAR (Unchanged structure, static elements) */}
      <div className="ai-sidebar">
        <div className="ai-profile-header">
          <div className="ai-avatar-large">
            <FontAwesomeIcon icon={faRobot} style={{ color: '#000000' }} />
          </div>
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', color: 'var(--dark-green)' }}>
              AI Tutor <span className="ai-status-badge">Active</span>
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
              Your personal learning assistant
            </p>
          </div>
        </div>

        <button className="btn-new-chat" onClick={handleClearChat} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FontAwesomeIcon icon={faPlus} style={{ color: '#000000' }} /> New Chat
        </button>

        <div>
          <h4 className="history-section-title">Recent Conversations</h4>
          <div className="history-item active">
            <div className="history-item-left">
              <FontAwesomeIcon icon={faWandMagicSparkles} style={{ color: '#000000' }} /> Current Session
            </div>
            <span style={{ fontSize: '11px' }}>Now</span>
          </div>
          <div className="history-item">
            <div className="history-item-left">
              <FontAwesomeIcon icon={faFileLines} style={{ color: '#000000' }} /> Explain the Pythagorean theorem
            </div>
            <span style={{ fontSize: '11px' }}>1h ago</span>
          </div>
          <div className="history-item">
            <div className="history-item-left">
              <FontAwesomeIcon icon={faLocationDot} style={{ color: '#000000' }} /> What is the capital of Australia?
            </div>
            <span style={{ fontSize: '11px' }}>3h ago</span>
          </div>
          <div className="history-item">
            <div className="history-item-left">
              <FontAwesomeIcon icon={faLightbulb} style={{ color: '#000000' }} /> Tips to improve in geography
            </div>
            <span style={{ fontSize: '11px' }}>Yesterday</span>
          </div>
        </div>

        <div className="capabilities-box">
          <h4 className="history-section-title" style={{ color: 'var(--dark-green)' }}>AI Tutor Capabilities</h4>
          <div className="capability-item"><FontAwesomeIcon icon={faComment} style={{ color: '#000000' }} /> Answer academic questions</div>
          <div className="capability-item"><FontAwesomeIcon icon={faBrain} style={{ color: '#000000' }} /> Explain complex topics</div>
          <div className="capability-item"><FontAwesomeIcon icon={faCheck} style={{ color: '#000000' }} /> Provide step-by-step solutions</div>
          <div className="capability-item"><FontAwesomeIcon icon={faClipboardList} style={{ color: '#000000' }} /> Generate practice quizzes</div>
          <div className="capability-item"><FontAwesomeIcon icon={faFileLines} style={{ color: '#000000' }} /> Summarize content</div>
          <div className="capability-item"><FontAwesomeIcon icon={faGraduationCap} style={{ color: '#000000' }} /> Study tips & guidance</div>
        </div>
      </div>

      {/* RIGHT CHAT AREA (Dynamic Mapping) */}
      <div className="ai-chat-main">
        
        {/* Chat Header */}
        <div className="chat-header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="ai-avatar-small" style={{ width: '48px', height: '48px', fontSize: '24px' }}>
              <FontAwesomeIcon icon={faRobot} style={{ color: '#000000' }} />
            </div>
            <div>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', color: 'var(--dark-green)' }}>Hello! I'm Gemma AI 👋</h2>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                Powered by Gemma 4. Ask me anything.
              </p>
            </div>
          </div>
          <button onClick={handleClearChat} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', padding: '8px 16px' }}>
            <FontAwesomeIcon icon={faTrash} style={{ color: '#000000' }} /> Clear Chat
          </button>
        </div>

        {/* Dynamic Chat Messages */}
        <div className="chat-messages-area">
          {messages.map((msg, index) => (
            <div key={index} className={`msg-row ${msg.role}`}>
              {msg.role === 'ai' && (
                <div className="ai-avatar-small">
                  <FontAwesomeIcon icon={faRobot} style={{ color: '#000000' }} />
                </div>
              )}
              
              <div className={`msg-bubble ${msg.role}`} style={{ whiteSpace: 'pre-wrap' }}>
                {msg.text}
                <div className="msg-footer" style={{ justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '6px' }}>
                  <span>{msg.time}</span>
                  {msg.role === 'user' && <FontAwesomeIcon icon={faCheckDouble} style={{ color: '#000000' }} />}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="msg-row ai">
              <div className="ai-avatar-small">
                <FontAwesomeIcon icon={faRobot} style={{ color: '#000000' }} />
              </div>
              <div className="msg-bubble ai" style={{ color: '#888' }}>
                Typing...
              </div>
            </div>
          )}
          
          {/* Invisible div to scroll into view */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chat-input-section">
          <div className="chat-input-wrapper">
            <input 
              type="text" 
              className="chat-input-field" 
              placeholder="Ask anything..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
            />
            <FontAwesomeIcon icon={faMicrophone} style={{ fontSize: '18px', color: '#000000', cursor: 'pointer' }} />
            <button 
              className="btn-send" 
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
            >
              <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#FFFFFF' }} />
            </button>
          </div>
          <div style={{ textAlign: 'center', fontSize: '11px', color: '#999', marginTop: '12px' }}>
            Gemma AI may make mistakes. Please verify important information.
          </div>
        </div>

      </div>
    </div>
  );
}