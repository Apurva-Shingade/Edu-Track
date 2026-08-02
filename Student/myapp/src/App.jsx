import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import QuizListPage from './pages/QuizListPage';
import QuizPlayPage from './pages/QuizPlayPage';
import ContactPage from './pages/ContactPage';
import CoursesPage from './pages/CoursesPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import AITutorPage from './pages/AITutorPage'; // Import the new AI Tutor page!

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 w-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz-list" element={<QuizListPage />} />
          <Route path="/play-quiz" element={<QuizPlayPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          
          {/* Replace placeholder with actual component */}
          <Route path="/ai-tutor" element={<AITutorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;