import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      
      {/* STICKY FLOATING AI CHAT TUTOR BADGE */}
      <div 
        onClick={() => navigate('/ai-tutor')}
        className="sticky-ai-badge"
      >
        <span className="status-dot" />
        <span style={{ fontSize: '18px' }}>🤖</span>
        <span>AI Tutor Active</span>
      </div>

      {/* HERO SECTION */}
      <section style={{ display: 'flex', padding: '60px 40px', gap: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Left: Text Content */}
        <div style={{ flex: 1, marginTop: '20px' }}>
          <span style={{ backgroundColor: '#E8EFE9', color: '#1B4D3E', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
            ✨ Next-Gen AI Education
          </span>
          
          <h1 style={{ fontSize: '56px', color: '#1B4D3E', lineHeight: '1.1', margin: '20px 0' }}>
            Next-Gen AI<br/>Education Track
          </h1>
          
          <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.5', maxWidth: '450px' }}>
            Empower educators. Accelerate learning. Save hours every week with Gemma 4-powered evaluation and insights.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', marginTop: '30px' }}>
            <button 
              onClick={() => navigate('/teacher')}
              className="btn-primary" 
              style={{ padding: '14px 24px' }}
            >
              Start Teaching Smarter →
            </button>
            <button className="btn-outline" style={{ padding: '14px 24px' }}>
              Explore Features
            </button>
          </div>
        </div>

        {/* Right: Dashboard Mockup */}
        <div style={{ flex: 1.2, backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', display: 'flex', overflow: 'hidden', border: '1px solid #EAEAEA' }}>
          {/* Mock Sidebar */}
          <div style={{ width: '200px', backgroundColor: '#0F2E23', padding: '20px', color: 'white' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Gemma LMS</h3>
            <p style={{ margin: '0 0 30px 0', fontSize: '10px', color: '#A3B899' }}>TEACHER PORTAL</p>
            <div style={{ padding: '10px', backgroundColor: '#1B4D3E', borderRadius: '6px', fontSize: '12px', marginBottom: '10px' }}>📊 Dashboard</div>
            <div style={{ padding: '10px', fontSize: '12px', color: '#A3B899' }}>📚 Course & PDFs</div>
            <div style={{ padding: '10px', fontSize: '12px', color: '#A3B899' }}>🤖 AI Quiz Generator</div>
          </div>
          {/* Mock Main Content */}
          <div style={{ flex: 1, padding: '20px', backgroundColor: '#F9FBF9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: 0, color: '#0F2E23' }}>Teacher Dashboard</h3>
                <p style={{ margin: 0, fontSize: '10px', color: '#666' }}>Gemma 4 Edge AI Engine Running Locally</p>
              </div>
              <button 
                onClick={() => navigate('/quiz')}
                className="btn-primary" 
                style={{ padding: '6px 12px', fontSize: '10px' }}
              >
                + Create Quiz
              </button>
            </div>
            {/* Mock Stats */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <div style={{ flex: 1, backgroundColor: 'white', padding: '10px', borderLeft: '4px solid #1B4D3E', borderRadius: '4px' }}>
                <span style={{ fontSize: '9px', color: '#666' }}>ACTIVE COURSES</span><br/><b>4</b>
              </div>
              <div style={{ flex: 1, backgroundColor: 'white', padding: '10px', borderLeft: '4px solid #708238', borderRadius: '4px' }}>
                <span style={{ fontSize: '9px', color: '#666' }}>TOTAL STUDENTS</span><br/><b>128</b>
              </div>
              <div style={{ flex: 1, backgroundColor: 'white', padding: '10px', borderLeft: '4px solid #1B4D3E', borderRadius: '4px' }}>
                <span style={{ fontSize: '9px', color: '#666' }}>EVALUATIONS</span><br/><b>1,042</b>
              </div>
            </div>
            {/* Mock Table */}
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '12px' }}>Recent AI Evaluation Queue</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', borderBottom: '1px solid #EEE', paddingBottom: '5px' }}>
                <span>Alex Rivera</span><span>Data Structures Test</span><span>8/10</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES ROW (Restored) */}
      <section style={{ display: 'flex', justifyContent: 'space-between', padding: '0 40px', maxWidth: '1400px', margin: '0 auto 60px auto', gap: '20px' }}>
        <FeatureCard icon="🤖" title="AI Tutor" desc="Intelligent assistance that explains concepts, answers doubts, and guides learners 24/7." />
        <FeatureCard icon="👤" title="Personalized Learning" desc="Adaptive paths and AI-driven recommendations tailored to every student's pace." />
        <FeatureCard icon="📈" title="Progress Tracking" desc="Real-time analytics and insights to monitor growth and improve outcomes." />
      </section>

      {/* CHALLENGE SECTION (Restored) */}
      <section style={{ display: 'flex', backgroundColor: '#F4F7F5', margin: '0 40px', borderRadius: '16px', padding: '40px', maxWidth: '1400px', border: '1px solid #E2E8E4' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* <img src="/challenge-illustration.png" alt="Challenge Graphic" style={{ maxWidth: '100%' }} /> */}
          <div style={{ width: '300px', height: '200px', backgroundColor: '#E8EFE9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
            👨‍🏫 📚
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '12px', color: '#1B4D3E', fontWeight: 'bold', letterSpacing: '1px', margin: '0 0 10px 0' }}>THE CHALLENGE</p>
          <h2 style={{ fontSize: '32px', color: '#0F2E23', margin: '0 0 20px 0', lineHeight: '1.2' }}>Teachers spend too much time on manual test creation and grading.</h2>
          <p style={{ color: '#555', marginBottom: '20px' }}>Your challenge is to build an end-to-end evaluation assistant powered by Gemma 4.</p>
          <ul style={{ listStyle: 'none', padding: 0, color: '#333', lineHeight: '2' }}>
            <li>✅ Automate test creation in seconds</li>
            <li>✅ AI-powered evaluation & feedback</li>
            <li>✅ Save hours and focus on teaching</li>
          </ul>
          <button className="btn-primary" style={{ marginTop: '10px' }}>
            Learn How It Works →
          </button>
        </div>
      </section>
    </div>
  );
}

// Reusable component for the feature boxes
function FeatureCard({ icon, title, desc }) {
  return (
    <div style={{ flex: 1, backgroundColor: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #EAEAEA', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
      <div style={{ fontSize: '30px', backgroundColor: '#E8EFE9', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', marginBottom: '15px' }}>{icon}</div>
      <h3 style={{ margin: '0 0 10px 0', color: '#0F2E23', fontSize: '18px' }}>{title}</h3>
      <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.5' }}>{desc}</p>
    </div>
  );
}