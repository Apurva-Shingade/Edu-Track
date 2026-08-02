import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizPlayPage() {
  const navigate = useNavigate();
  
  // State to track selected options per question ID
  const [answers, setAnswers] = useState({});

  const handleSelect = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const mockQuestions = [
    {
      id: 1,
      text: "Which of the following is the capital of Australia?",
      options: [
        { id: 'A', text: "Sydney" },
        { id: 'B', text: "Melbourne" },
        { id: 'C', text: "Canberra" },
        { id: 'D', text: "Perth" }
      ]
    },
    {
      id: 2,
      text: "Which river is the longest in the world?",
      options: [
        { id: 'A', text: "Amazon River" },
        { id: 'B', text: "Nile River" },
        { id: 'C', text: "Yangtze River" },
        { id: 'D', text: "Mississippi River" }
      ]
    },
    {
      id: 3,
      text: "Mount Everest is located in which mountain range?",
      options: [
        { id: 'A', text: "The Andes" },
        { id: 'B', text: "The Alps" },
        { id: 'C', text: "The Rockies" },
        { id: 'D', text: "The Himalayas" }
      ]
    }
  ];

  const handleSubmit = () => {
    alert("Quiz Submitted! AI Evaluation is generating your score...");
    navigate('/quiz'); // Route back to main quiz page after submission
  };

  return (
    <div style={{ backgroundColor: '#F4F7F5', minHeight: '100vh', padding: '40px 20px' }}>
      <div className="play-quiz-container">
        
        <div className="play-quiz-header">
          <button 
            onClick={() => navigate(-1)} 
            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ← Back to List
          </button>
          <h1 style={{ margin: '0 0 10px 0', color: 'var(--dark-green)' }}>1. World Capitals Quiz</h1>
          <p style={{ margin: 0, color: '#666' }}>Answer all 20 questions below. Estimated time: 10 mins.</p>
        </div>

        {/* Scrollable Questions Area */}
        <div>
          {mockQuestions.map((q, index) => (
            <div key={q.id} className="question-card">
              <div className="question-text">
                {index + 1}. {q.text}
              </div>
              
              <div className="options-container">
                {q.options.map(opt => (
                  <div 
                    key={opt.id}
                    className={`option-row ${answers[q.id] === opt.id ? 'selected' : ''}`}
                    onClick={() => handleSelect(q.id, opt.id)}
                  >
                    <div className="option-radio"></div>
                    <div>{opt.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #EEE', paddingTop: '30px', marginTop: '20px', textAlign: 'right' }}>
          <button 
            className="btn-primary" 
            style={{ padding: '14px 32px', fontSize: '16px' }}
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        </div>

      </div>
    </div>
  );
}