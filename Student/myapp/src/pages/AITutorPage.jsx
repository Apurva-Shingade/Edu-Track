import React from 'react';

export default function AITutorPage() {
  return (
    <div className="ai-tutor-container">
      
      {/* LEFT SIDEBAR */}
      <div className="ai-sidebar">
        
        <div className="ai-profile-header">
          <div className="ai-avatar-large">🤖</div>
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', color: 'var(--dark-green)' }}>
              AI Tutor <span className="ai-status-badge">Active</span>
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
              Your personal learning assistant
            </p>
          </div>
        </div>

        <button className="btn-new-chat">✨ New Chat</button>

        <div>
          <h4 className="history-section-title">Recent Conversations</h4>
          
          <div className="history-item active">
            <div className="history-item-left">
              <span>✦</span> Help me understand photosynthesis
            </div>
            <span style={{ fontSize: '11px' }}>2m ago</span>
          </div>

          <div className="history-item">
            <div className="history-item-left">
              <span>📄</span> Explain the Pythagorean theorem
            </div>
            <span style={{ fontSize: '11px' }}>1h ago</span>
          </div>

          <div className="history-item">
            <div className="history-item-left">
              <span>📍</span> What is the capital of Australia?
            </div>
            <span style={{ fontSize: '11px' }}>3h ago</span>
          </div>

          <div className="history-item">
            <div className="history-item-left">
              <span>💡</span> Tips to improve in geography
            </div>
            <span style={{ fontSize: '11px' }}>Yesterday</span>
          </div>

          <div className="history-item">
            <div className="history-item-left">
              <span>📝</span> Solve: 2x + 5 = 15
            </div>
            <span style={{ fontSize: '11px' }}>2 days ago</span>
          </div>

          <div className="history-item">
            <div className="history-item-left">
              <span>☑️</span> What are primary colors?
            </div>
            <span style={{ fontSize: '11px' }}>3 days ago</span>
          </div>

          <div className="history-item">
            <div className="history-item-left">
              <span>🤖</span> How does AI work?
            </div>
            <span style={{ fontSize: '11px' }}>4 days ago</span>
          </div>
        </div>

        <div className="capabilities-box">
          <h4 className="history-section-title" style={{ color: 'var(--dark-green)' }}>AI Tutor Capabilities</h4>
          <div className="capability-item"><span>💬</span> Answer academic questions</div>
          <div className="capability-item"><span>🧠</span> Explain complex topics</div>
          <div className="capability-item"><span>✅</span> Provide step-by-step solutions</div>
          <div className="capability-item"><span>📋</span> Generate practice quizzes</div>
          <div className="capability-item"><span>📄</span> Summarize content</div>
          <div className="capability-item"><span>✨</span> Study tips & guidance</div>
        </div>

        <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ color: 'var(--bottle-green)' }}>✨</span> Gemma AI is here to help you learn smarter!
        </div>

      </div>

      {/* RIGHT CHAT AREA */}
      <div className="ai-chat-main">
        
        {/* Chat Header */}
        <div className="chat-header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="ai-avatar-small" style={{ width: '48px', height: '48px', fontSize: '24px' }}>🤖</div>
            <div>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', color: 'var(--dark-green)' }}>Hello! I'm Gemma AI 👋</h2>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                Ask me anything. I'm here to help you learn, solve problems, and explore new topics.
              </p>
            </div>
          </div>
          <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', padding: '8px 16px' }}>
            <span>🗑️</span> Clear Chat
          </button>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages-area">
          
          {/* User Message 1 */}
          <div className="msg-row user">
            <div className="msg-bubble user">
              Help me understand photosynthesis in simple terms.
              <div className="msg-footer" style={{ justifyContent: 'flex-end', gap: '6px' }}>
                10:30 AM <span style={{ color: 'var(--bottle-green)' }}>✔✔</span>
              </div>
            </div>
          </div>

          {/* AI Message 1 */}
          <div className="msg-row ai">
            <div className="ai-avatar-small">🤖</div>
            <div className="msg-bubble ai">
              <p style={{ marginTop: 0 }}>Sure! 🌿 Photosynthesis is the process used by green plants to make their own food.</p>
              <p>Here's a simple breakdown:</p>
              <ul style={{ paddingLeft: '20px', color: '#444' }}>
                <li style={{ marginBottom: '8px' }}>Plants take in carbon dioxide (CO₂) from the air.</li>
                <li style={{ marginBottom: '8px' }}>They absorb water (H₂O) from the soil through their roots.</li>
                <li style={{ marginBottom: '8px' }}>With the help of sunlight ☀️ and chlorophyll (the green pigment), they combine CO₂ and H₂O to produce glucose (food) and oxygen (O₂).</li>
                <li>The oxygen is released back into the air.</li>
              </ul>
              
              <p>In short:</p>
              <div className="msg-formula-box">
                Sunlight + Water + Carbon Dioxide → Glucose (Food) + Oxygen
              </div>

              <p style={{ marginBottom: 0 }}>Let me know if you'd like a diagram or a quiz on this topic!</p>
              
              <div className="msg-footer">
                <span>10:31 AM</span>
                <div className="msg-feedback-icons">
                  <span>👍</span> <span>👎</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Message 2 */}
          <div className="msg-row user">
            <div className="msg-bubble user">
              Can you give me a simple example?
              <div className="msg-footer" style={{ justifyContent: 'flex-end', gap: '6px' }}>
                10:32 AM <span style={{ color: 'var(--bottle-green)' }}>✔✔</span>
              </div>
            </div>
          </div>

          {/* AI Message 2 */}
          <div className="msg-row ai">
            <div className="ai-avatar-small">🤖</div>
            <div className="msg-bubble ai">
              <p style={{ marginTop: 0 }}>Absolutely! 🌳</p>
              <p style={{ marginBottom: 0 }}>
                Think of a plant in your garden.<br/>
                During the daytime, it uses sunlight, water from the soil, and carbon dioxide from the air to make its food. That food helps the plant grow, and the oxygen it releases keeps the air fresh for us to breathe!
              </p>
              
              <div className="msg-footer">
                <span>10:33 AM</span>
                <div className="msg-feedback-icons">
                  <span>👍</span> <span>👎</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Input Area */}
        <div className="chat-input-section">
          <div className="chat-input-wrapper">
            <input type="text" className="chat-input-field" placeholder="Ask anything..." />
            <span style={{ fontSize: '18px', color: '#888', cursor: 'pointer' }}>🎤</span>
            <button className="btn-send">➤</button>
          </div>
          <div style={{ textAlign: 'center', fontSize: '11px', color: '#999', marginTop: '12px' }}>
            Gemma AI may make mistakes. Please verify important information.
          </div>
        </div>

      </div>
    </div>
  );
}