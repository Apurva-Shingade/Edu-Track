import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeMode, setActiveMode] = useState('Practice');

  return (
    <div className="quiz-page-container">
      
      {/* HERO BANNER SECTION */}
      <div className="quiz-hero-banner">
        
        {/* Left Filter Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* Top Category Icons */}
          <div className="filter-pills-row">
            <FilterPill icon="🎛️" label="All" active={activeCategory === 'All'} onClick={() => setActiveCategory('All')} />
            <FilterPill icon="🎡" label="General" active={activeCategory === 'General'} onClick={() => setActiveCategory('General')} />
            <FilterPill icon="🧪" label="Science" active={activeCategory === 'Science'} onClick={() => setActiveCategory('Science')} />
            <FilterPill icon="📐" label="Math" active={activeCategory === 'Math'} onClick={() => setActiveCategory('Math')} />
            <FilterPill icon="🏛️" label="History" active={activeCategory === 'History'} onClick={() => setActiveCategory('History')} />
            <FilterPill icon="💻" label="Tech" active={activeCategory === 'Tech'} onClick={() => setActiveCategory('Tech')} />
            <FilterPill icon="⚽" label="Sports" active={activeCategory === 'Sports'} onClick={() => setActiveCategory('Sports')} />
            <FilterPill icon="🎵" label="Music" active={activeCategory === 'Music'} onClick={() => setActiveCategory('Music')} />
          </div>

          {/* Sub Mode Filters */}
          <div className="mode-pills-row">
            <button className={`mode-pill ${activeMode === 'Practice' ? 'active' : ''}`} onClick={() => setActiveMode('Practice')}>🎯 Practice</button>
            <button className={`mode-pill ${activeMode === 'Challenge' ? 'active' : ''}`} onClick={() => setActiveMode('Challenge')}>🏆 Challenge</button>
            <button className={`mode-pill ${activeMode === 'Puzzle' ? 'active' : ''}`} onClick={() => setActiveMode('Puzzle')}>🧩 Puzzle</button>
            <button className={`mode-pill ${activeMode === 'Trivia' ? 'active' : ''}`} onClick={() => setActiveMode('Trivia')}>❓ Trivia</button>
          </div>
        </div>

        {/* Mascot Left Placeholder */}
        {/* <img src="/robot-left.png" alt="Robot Mascot" style={{ width: '120px' }} /> */}
        <div style={{ fontSize: '70px' }}>🤖</div>

        {/* Center Text */}
        <div className="hero-banner-center">
          <h1 className="hero-banner-title">Unlimited quizzes<br/>and puzzle games</h1>
          <p className="hero-banner-sub">Let your brain play every day.</p>
        </div>

        {/* Mascot Right / Chalkboard Placeholder */}
        {/* <img src="/robot-blackboard.png" alt="Trivia Fun" style={{ width: '180px' }} /> */}
        <div style={{ backgroundColor: '#1F3A2B', color: '#FFF', padding: '15px 25px', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold' }}>
          🎓 Trivia + Fun²
        </div>

        {/* Action Top Right */}
        <div style={{ position: 'absolute', top: '20px', right: '30px', display: 'flex', gap: '10px' }}>
          <button className="btn-outline" style={{ backgroundColor: '#FFF', fontSize: '12px' }}>🍿 Remove Ads</button>
          <button className="btn-primary" style={{ backgroundColor: '#0F2E23', fontSize: '12px' }}>🔀 Random Quiz</button>
        </div>
      </div>

      {/* POPULAR CATEGORIES */}
      <h2 className="section-title">Popular Categories</h2>
      <div className="grid-popular">
        <QuizCard title="Mini Nurikabe (Part 1)" subtitle="Playlist, 200 Quizzes" />
        <QuizCard title="Complete the Map Snippet" subtitle="Geography • 2m" />
        <QuizCard title="15 Categories: Letter 'F' Blitz" subtitle="Miscellaneous • 60s" />
        <QuizCard title="Alphabetical Geography Series" subtitle="Playlist, 25 Quizzes" />
        <QuizCard title="'90s Pop Culture A" subtitle="Entertainment • 3m" />
        <QuizCard title="Prove You Aren't a Robot - 'A' Countries" subtitle="Geography • 2m" />
      </div>

      {/* NEW FEATURED QUIZZES & POPULAR NEAR YOU */}
      <div className="grid-featured-layout">
        {/* Left Big Card */}
        <div>
          <h2 className="section-title">New Featured Quizzes</h2>
          <div className="featured-big-card">
            <div className="featured-img-box">
              {/* <img src="/pop-culture.jpg" alt="Featured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '40px' }}>🎬</span>
                <p style={{ margin: 0, fontSize: '12px' }}>[ Image Placeholder ]</p>
              </div>
            </div>
            <div className="featured-content">
              <span style={{ backgroundColor: '#E8EFE9', color: '#1B4D3E', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>⭐ Featured</span>
              <h3 style={{ fontSize: '22px', color: '#0F2E23', margin: '15px 0 10px 0' }}>'90s Pop Culture Mega Quiz</h3>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.5', marginBottom: '20px' }}>
                Test your knowledge of iconic movies, music, fashion, and unforgettable moments.
              </p>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '20px' }}>
                Entertainment • 15 Questions • 5m
              </div>
              <button className="btn-primary" style={{ backgroundColor: '#0F2E23' }}>Start Quiz →</button>
            </div>
          </div>
        </div>

        {/* Right Popular List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="section-title">Popular Near You</h2>
            <a href="#all" style={{ fontSize: '12px', color: '#1B4D3E', fontWeight: 'bold', textDecoration: 'none' }}>View All</a>
          </div>
          <div className="popular-list-container">
            <PopularListItem rank="1" title="General Knowledge Basics" count="12.5k plays" />
            <PopularListItem rank="2" title="World Capitals Challenge" count="9.8k plays" />
            <PopularListItem rank="3" title="Science: Fun Facts" count="8.1k plays" />
            <PopularListItem rank="4" title="Math Speed Drill" count="6.3k plays" />
            <PopularListItem rank="5" title="History Through Ages" count="5.7k plays" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function FilterPill({ icon, label, active, onClick }) {
  return (
    <div className={`filter-pill ${active ? 'active' : ''}`} onClick={onClick}>
      <span style={{ fontSize: '16px', marginBottom: '4px' }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function QuizCard({ title, subtitle }) {
  const navigate = useNavigate(); // Added navigation hook here

  return (
    <div 
      className="card-quiz" 
      onClick={() => navigate('/quiz-list')} // Routes to the new Dark Theme Quiz List page
      style={{ cursor: 'pointer' }}
    >
      <div className="card-image-placeholder">
        {/* <img src="/quiz-thumb.jpg" alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
        <span>{title}</span>
      </div>
      <div className="card-body">
        <div className="card-footer-info">
          <span>{subtitle}</span>
          <span>🧪</span>
        </div>
      </div>
    </div>
  );
}

function PopularListItem({ rank, title, count }) {
  return (
    <div className="popular-item">
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', color: '#666', fontSize: '14px' }}>{rank}</span>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#0F2E23' }}>{title}</div>
          <span style={{ fontSize: '10px', color: '#888' }}>1-100</span>
        </div>
      </div>
      <span style={{ fontSize: '11px', color: '#1B4D3E', fontWeight: 'bold' }}>{count}</span>
    </div>
  );
}