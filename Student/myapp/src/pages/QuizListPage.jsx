import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizListPage() {
  const navigate = useNavigate();

  const quizzes = [
    { id: 1, title: "1. World Capitals Quiz", qCount: 20, time: 10, success: "85%", diff: "Easy", color: "green" },
    { id: 2, title: "2. Countries by Their Shapes", qCount: 15, time: 8, success: "78%", diff: "Easy", color: "green" },
    { id: 3, title: "3. Identify the Country from Map", qCount: 20, time: 10, success: "72%", diff: "Medium", color: "yellow" },
    { id: 4, title: "4. Rivers and Their Countries", qCount: 15, time: 8, success: "69%", diff: "Medium", color: "yellow" },
    { id: 5, title: "5. Mountains of the World", qCount: 20, time: 10, success: "65%", diff: "Medium", color: "yellow" },
    { id: 6, title: "6. Flags Around the World", qCount: 25, time: 12, success: "58%", diff: "Hard", color: "red" },
    { id: 7, title: "7. Geography Trivia Challenge", qCount: 30, time: 15, success: "54%", diff: "Hard", color: "red" },
    { id: 8, title: "8. Map Reading Skills", qCount: 15, time: 7, success: "50%", diff: "Hard", color: "red" }
  ];

  return (
    <div className="quiz-list-page">
      {/* Header Banner */}
      <div className="quiz-list-header">
        <div className="quiz-list-header-content">
          <div className="breadcrumb" onClick={() => navigate('/quiz')}>
            <span>←</span> Popular Categories <span>›</span> Geography
          </div>

          <div className="quiz-header-banner">
            <div className="quiz-header-info">
              {/* <img src="/map-vintage.jpg" alt="Map" className="quiz-header-img" /> */}
              <div className="quiz-header-img">🗺️</div>
              
              <div>
                <div className="quiz-header-title-row">
                  <h1 style={{ margin: 0, fontSize: '32px' }}>Complete the Map Snippet</h1>
                  <span className="quiz-badge-dark">Geography</span>
                </div>
                <p style={{ color: '#A3B899', fontSize: '15px', lineHeight: '1.5', maxWidth: '400px', marginBottom: '20px' }}>
                  Test your knowledge of places, maps, and geographic features from around the world.
                </p>
                <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#CCC' }}>
                  <span>📅 25 Quizzes</span>
                  <span>👥 12.4k Plays</span>
                </div>
              </div>
            </div>

            <div className="challenge-card">
              <span style={{ fontSize: '24px' }}>🎯</span>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>Challenge yourself</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#A3B899', lineHeight: '1.5' }}>
                  Improve your geography skills with<br/>curated quizzes and track your progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="quiz-list-main">
        {/* Left Column (List) */}
        <div>
          <div className="quiz-list-controls">
            <div className="quiz-list-tabs">
              <div className="quiz-list-tab active">All Quizzes</div>
              <div className="quiz-list-tab">Easy</div>
              <div className="quiz-list-tab">Medium</div>
              <div className="quiz-list-tab">Hard</div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ backgroundColor: 'transparent', border: '1px solid #444', color: '#CCC', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
                Sort: Recommended ⌄
              </button>
            </div>
          </div>

          {/* Render Quiz Rows */}
          <div>
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="quiz-row" onClick={() => navigate('/play-quiz')}>
                <div className="quiz-row-left">
                  <div className="quiz-row-icon">📋</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{quiz.title}</div>
                    <div className="quiz-row-meta">{quiz.qCount} Questions • {quiz.time} min</div>
                  </div>
                </div>
                
                <div className="quiz-row-right">
                  <span className="text-green">{quiz.success} Success</span>
                  <span className={`text-${quiz.color}`}>{quiz.diff}</span>
                  <span style={{ fontSize: '16px', color: '#666' }}>🔖</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div>
          <div className="dark-sidebar-card">
            <h3 style={{ margin: '0 0 24px 0', fontSize: '16px' }}>Category Overview</h3>
            
            <div className="overview-stat-row">
              <span style={{ fontSize: '20px', color: '#FFB703' }}>📅</span>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>25</div>
                <div style={{ fontSize: '12px', color: '#888' }}>Total Quizzes</div>
              </div>
            </div>
            
            <div className="overview-stat-row">
              <span style={{ fontSize: '20px', color: '#FFB703' }}>👥</span>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>12.4k</div>
                <div style={{ fontSize: '12px', color: '#888' }}>Total Plays</div>
              </div>
            </div>

            <div className="overview-stat-row">
              <span style={{ fontSize: '20px', color: '#12AD2B' }}>📈</span>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>68%</div>
                <div style={{ fontSize: '12px', color: '#888' }}>Average Success Rate</div>
              </div>
            </div>

            <div className="overview-stat-row">
              <span style={{ fontSize: '20px', color: '#12AD2B' }}>🕒</span>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>8 min</div>
                <div style={{ fontSize: '12px', color: '#888' }}>Average Time</div>
              </div>
            </div>
          </div>

          <div className="dark-sidebar-card">
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Popular Tags</h3>
            <div className="tag-cloud">
              <span className="tag-pill">World Map</span>
              <span className="tag-pill">Capitals</span>
              <span className="tag-pill">Countries</span>
              <span className="tag-pill">Rivers</span>
              <span className="tag-pill">Mountains</span>
              <span className="tag-pill">Flags</span>
              <span className="tag-pill">Landforms</span>
              <span className="tag-pill">Continents</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}