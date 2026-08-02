import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DataProvider } from "./Context/DataContext";
import Sidebar from "./Pages/Sidebar";
import MyCourses from "./Pages/MyCourses";
import Settings from "./Pages/Settings";
import Management from "./Pages/Management";
import Dashboard from "./Pages/Dashboard";
import AiQuizGenerator from "./Pages/AiQuizGenerator";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Sidebar />
        <div style={{ marginLeft: "280px", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/MyCourses" element={<MyCourses />} />
            <Route path="/AiQuizGenerator" element={<AiQuizGenerator />} />
            <Route path="/Management" element={<Management />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
