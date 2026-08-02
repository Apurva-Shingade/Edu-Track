import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import {
  BsColumnsGap,
  BsBook,
  BsCpu,
  BsClipboardCheck,
  BsBarChart,
  BsLightbulb,
  BsGear,
} from "react-icons/bs";

import "../assets/Css/Sidebar.css"

function Sidebar() {
  return (
    <div className="sidebar">

      {/* Logo */}

      <div className="logo-section">
        <h2>Gemma LMS</h2>
        <p>TEACHER PORTAL</p>
      </div>

      {/* Navigation */}

      <Nav className="flex-column mt-4">

        <Nav.Link
          as={NavLink}
          to="/Dashboard"
          className="sidebar-link"
        >
          <BsColumnsGap className="me-3" />
          Dashboard
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/MyCourses"
          className="sidebar-link"
        >
          <BsBook className="me-3" />
          Course
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/AiQuizGenerator"
          className="sidebar-link"
        >
          <BsCpu className="me-3" />
          Quiz Generator
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/Management"
          className="sidebar-link"
        >
          <BsBarChart className="me-3" />
          Student Management
        </Nav.Link>
        
        <Nav.Link
          as={NavLink}
          to="/Settings"
          className="sidebar-link"
        >
          <BsGear className="me-3" />
          Settings
        </Nav.Link>

      </Nav>

    </div>
  );
}

export default Sidebar;