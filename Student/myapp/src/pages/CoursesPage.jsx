import React, { useState } from 'react';

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState('Classes');
  const [activeFilter, setActiveFilter] = useState('All');

  const courseData = [
    {
      id: 1,
      title: "Introduction to Python Programming - Class 1",
      instructor: "Apurva Shingade",
      verified: false,
      capacity: "8/10",
      date: "Dec 10",
      location: "HCMC",
      hasMenu: true
    },
    {
      id: 2,
      title: "Advanced React & useEffect Patterns - Class 2",
      instructor: "Apurva Shingade",
      verified: false,
      capacity: "10/10",
      date: "Dec 15",
      location: "HCMC",
      hasMenu: true
    },
    {
      id: 3,
      title: "Mastering MongoDB Databases for Web Apps",
      instructor: "Apurva Shingade",
      verified: false,
      capacity: "10/10",
      date: "Dec 18",
      location: "HCMC",
      status: 'yellow',
      icon: '🕒'
    },
    {
      id: 4,
      title: "The Complete Android Studio Material Design Course",
      instructor: "Apurva Shingade",
      verified: false,
      capacity: "3/10",
      date: "Jan 10",
      location: "HCMC",
      status: 'yellow',
      icon: '🕒'
    },
    {
      id: 5,
      title: "How To Create a Simple Website With Bootstrap",
      instructor: "Apurva Shingade",
      verified: true,
      capacity: "8/10",
      date: "Jan 20",
      location: "HCMC",
      status: 'yellow',
      icon: '🕒'
    },
    {
      id: 6,
      title: "AI Video Editing Automation: Everything You Need to Know",
      instructor: "Apurva Shingade",
      verified: true,
      capacity: "10/10",
      date: "Jan 22",
      location: "HCMC",
      status: 'green',
      icon: '✓'
    },
    {
      id: 7,
      title: "Information Technology Fundamentals & Architecture",
      instructor: "Apurva Shingade",
      verified: true,
      capacity: "10/10",
      date: "Jan 30",
      location: "HCMC",
      status: 'green',
      icon: '✓'
    },
    {
      id: 8,
      title: "Building Fullstack Apps with Vercel Deployments",
      instructor: "Apurva Shingade",
      verified: true,
      capacity: "8/10",
      date: "Feb 10",
      location: "HCMC",
      status: 'green',
      icon: '✓'
    }
  ];

  return (
    <div className="courses-page-container">
      
      {/* HEADER SECTION */}
      <div className="courses-header-row">
        <h1 className="courses-page-title">My Courses</h1>
        
        <div className="courses-tabs">
          <div 
            className={`courses-tab ${activeTab === 'Classes' ? 'active' : ''}`}
            onClick={() => setActiveTab('Classes')}
          >
            Classes
          </div>
          <div 
            className={`courses-tab ${activeTab === 'Calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('Calendar')}
          >
            Calendar
          </div>
        </div>

        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>+</span> Create Class
        </button>
      </div>

      {/* FILTERS & SORT */}
      <div className="courses-controls-row">
        <div className="courses-filters">
          <div 
            className={`course-filter-pill ${activeFilter === 'All' ? 'active' : ''}`}
            onClick={() => setActiveFilter('All')}
          >
            All
          </div>
          <div 
            className={`course-filter-pill ${activeFilter === 'Ongoing' ? 'active' : ''}`}
            onClick={() => setActiveFilter('Ongoing')}
          >
            Ongoing <span className="filter-badge badge-red">2</span>
          </div>
          <div 
            className={`course-filter-pill ${activeFilter === 'Completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('Completed')}
          >
            Completed
          </div>
          <div 
            className={`course-filter-pill ${activeFilter === 'Draft' ? 'active' : ''}`}
            onClick={() => setActiveFilter('Draft')}
          >
            Draft <span className="filter-badge badge-gray">3</span>
          </div>
        </div>

        <div className="courses-sort">
          Sort: Last Active <span>⌄</span>
        </div>
      </div>

      {/* COURSE GRID */}
      <div className="courses-grid">
        {courseData.map((course) => (
          <CourseCard key={course.id} data={course} />
        ))}
      </div>

    </div>
  );
}

// Sub-component for individual course cards
function CourseCard({ data }) {
  return (
    <div className="course-card">
      {/* Image / Graphic Placeholder */}
      <div className="course-img-wrapper">
        {/* <img src={`/placeholder-${data.id}.jpg`} alt="Course Cover" /> */}
        <span>💻</span>
        
        {/* Conditional Top Right Icons */}
        {data.hasMenu && (
          <div className="course-menu-dots">⋮</div>
        )}
        {data.status && (
          <div className={`course-status-icon ${data.status === 'yellow' ? 'status-yellow' : 'status-green'}`}>
            {data.icon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="course-content">
        <h3 className="course-title">{data.title}</h3>
        
        <div className="course-instructor">
          {/* <img src="/avatar.jpg" alt="Instructor" className="instructor-avatar" /> */}
          <div className="instructor-avatar"></div>
          <div className="instructor-name">
            {data.instructor}
            {data.verified && <span style={{ color: '#6C63FF', fontSize: '14px' }}>✔</span>}
          </div>
        </div>

        <div className="course-footer">
          <div className="course-footer-item">
            <span style={{ fontSize: '14px' }}>👥</span> {data.capacity}
          </div>
          <div className="course-footer-item">
            <span style={{ fontSize: '14px' }}>📅</span> {data.date}
          </div>
          <div className="course-footer-item">
            <span style={{ fontSize: '14px' }}>📍</span> {data.location}
          </div>
        </div>
      </div>
    </div>
  );
}