import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const DEFAULT_USER = {
  name: "Alex Rivera",
  email: "alex.rivera@email.com",
  course: "Data Structures & Algorithms",
  courseCode: "CS201",
  isLoggedIn: true,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("edutrack_student_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_USER; // Default logged in student for demo
  });

  const [quizAttempts, setQuizAttempts] = useState(() => {
    const saved = localStorage.getItem("edutrack_quiz_attempts");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 1,
        quizTitle: "Data Structures: BST & Graph Traversal",
        score: 3,
        total: 3,
        percentage: 100,
        grade: "A+",
        date: "Today at 2:15 PM",
      },
      {
        id: 2,
        quizTitle: "DBMS: SQL Joins & Normalization",
        score: 2,
        total: 2,
        percentage: 100,
        grade: "A+",
        date: "Yesterday",
      },
    ];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("edutrack_student_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("edutrack_student_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("edutrack_quiz_attempts", JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  const login = (email, password) => {
    // Infer student name from email or default to Alex Rivera
    const cleanEmail = email.trim();
    const namePart = cleanEmail.split("@")[0] || "Alex Rivera";
    const formattedName = namePart
      .split(".")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const loggedUser = {
      name: formattedName || "Alex Rivera",
      email: cleanEmail,
      course: "Data Structures & Algorithms",
      courseCode: "CS201",
      isLoggedIn: true,
    };

    setUser(loggedUser);
    return loggedUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("edutrack_student_user");
  };

  const addQuizAttempt = (attempt) => {
    const newRecord = {
      id: Date.now(),
      quizTitle: attempt.quizTitle,
      score: attempt.score,
      total: attempt.total,
      percentage: attempt.percentage,
      grade: attempt.grade,
      date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setQuizAttempts((prev) => [newRecord, ...prev]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, quizAttempts, addQuizAttempt }}>
      {children}
    </AuthContext.Provider>
  );
}
