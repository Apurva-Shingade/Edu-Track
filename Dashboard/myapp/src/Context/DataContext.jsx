import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

const INITIAL_STUDENTS = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex.rivera@email.com",
    course: "Data Structures & Algorithms",
    courseCode: "CS201",
    attendance: 96,
    lastActive: "10 mins ago",
    subjects: {
      "Data Structures": 94,
      "Algorithms": 91,
      "DBMS": 88,
      "OOP": 95,
      "Web Dev": 85,
    },
    assessmentsCompleted: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    course: "Database Management Systems",
    courseCode: "CS302",
    attendance: 92,
    lastActive: "25 mins ago",
    subjects: {
      "DBMS": 91,
      "SQL Optimization": 94,
      "Data Modeling": 87,
      "Algorithms": 82,
      "OOP": 85,
    },
    assessmentsCompleted: 4,
  },
  {
    id: 3,
    name: "Rohan Gupta",
    email: "rohan.gupta@email.com",
    course: "Object-Oriented Programming",
    courseCode: "CS102",
    attendance: 85,
    lastActive: "1 hour ago",
    subjects: {
      "OOP": 78,
      "Java Core": 82,
      "Data Structures": 68,
      "DBMS": 74,
      "Web Dev": 75,
    },
    assessmentsCompleted: 6,
  },
  {
    id: 4,
    name: "Neha Verma",
    email: "neha.verma@email.com",
    course: "Data Structures & Algorithms",
    courseCode: "CS201",
    attendance: 80,
    lastActive: "2 days ago",
    subjects: {
      "Data Structures": 65,
      "Algorithms": 58,
      "DBMS": 70,
      "OOP": 62,
      "Web Dev": 68,
    },
    assessmentsCompleted: 4,
  },
  {
    id: 5,
    name: "Mayank Singh",
    email: "mayank.singh@email.com",
    course: "Database Management Systems",
    courseCode: "CS302",
    attendance: 68,
    lastActive: "3 days ago",
    subjects: {
      "DBMS": 45,
      "SQL Optimization": 48,
      "Data Modeling": 42,
      "Algorithms": 50,
      "OOP": 41,
    },
    assessmentsCompleted: 3,
  },
  {
    id: 6,
    name: "Ananya Roy",
    email: "ananya.roy@email.com",
    course: "Object-Oriented Programming",
    courseCode: "CS102",
    attendance: 98,
    lastActive: "Just now",
    subjects: {
      "OOP": 98,
      "Java Core": 96,
      "Data Structures": 94,
      "DBMS": 92,
      "Web Dev": 95,
    },
    assessmentsCompleted: 5,
  },
  {
    id: 7,
    name: "Jordan Lee",
    email: "jordan.lee@email.com",
    course: "Data Structures & Algorithms",
    courseCode: "CS201",
    attendance: 90,
    lastActive: "1 hour ago",
    subjects: {
      "Data Structures": 85,
      "Algorithms": 88,
      "DBMS": 80,
      "OOP": 82,
      "Web Dev": 89,
    },
    assessmentsCompleted: 4,
  },
];

const INITIAL_COURSES = [
  {
    id: "CS201",
    name: "Data Structures & Algorithms",
    code: "CS201",
    nextAssessment: "Quiz 4: Graphs",
  },
  {
    id: "CS302",
    name: "Database Management Systems",
    code: "CS302",
    nextAssessment: "Midterm Exam",
  },
  {
    id: "CS102",
    name: "Object-Oriented Programming",
    code: "CS102",
    nextAssessment: "Lab Test 2",
  },
];

const INITIAL_ACTIVITIES = [
  {
    id: 101,
    student: "Alex Rivera",
    action: "Submitted Quiz 3 (Data Structures)",
    score: "94%",
    time: "10 mins ago",
  },
  {
    id: 102,
    student: "Priya Sharma",
    action: "Completed Assignment 2 (DBMS)",
    score: "91%",
    time: "25 mins ago",
  },
  {
    id: 103,
    student: "Jordan Lee",
    action: "Generated Practice Quiz (AI)",
    score: "85%",
    time: "1 hr ago",
  },
  {
    id: 104,
    student: "Ananya Roy",
    action: "Perfect Score in OOP Lab Exam",
    score: "98%",
    time: "2 hrs ago",
  },
];

export function computeStudentDetails(student) {
  const subjectKeys = Object.keys(student.subjects || {});
  if (subjectKeys.length === 0) {
    return {
      ...student,
      totalMarks: 0,
      maxMarks: 0,
      percentage: 0,
      grade: "N/A",
      status: "Needs Help",
    };
  }

  const totalMarks = subjectKeys.reduce((sum, key) => sum + Number(student.subjects[key]), 0);
  const maxMarks = subjectKeys.length * 100;
  const percentage = Math.round((totalMarks / maxMarks) * 100);

  let grade = "F";
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 50) grade = "D";

  let status = "Active";
  if (percentage < 60) {
    status = "Needs Help";
  } else if (percentage < 75) {
    status = "At Risk";
  }

  return {
    ...student,
    totalMarks,
    maxMarks,
    percentage,
    grade,
    status,
  };
}

export function DataProvider({ children }) {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("edutrack_students");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading stored students:", e);
      }
    }
    return INITIAL_STUDENTS;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("edutrack_courses");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading stored courses:", e);
      }
    }
    return INITIAL_COURSES;
  });

  const [recentActivities, setRecentActivities] = useState(() => {
    const saved = localStorage.getItem("edutrack_activities");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading stored activities:", e);
      }
    }
    return INITIAL_ACTIVITIES;
  });

  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("edutrack_gemini_api_key") || "";
  });

  useEffect(() => {
    localStorage.setItem("edutrack_students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("edutrack_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("edutrack_activities", JSON.stringify(recentActivities));
  }, [recentActivities]);

  useEffect(() => {
    localStorage.setItem("edutrack_gemini_api_key", apiKey);
  }, [apiKey]);

  // Compute enriched students with live percentages & grades
  const enrichedStudents = students.map(computeStudentDetails);

  // Compute live course progress based on enrolled students
  const activeCoursesData = courses.map((course) => {
    const courseStudents = enrichedStudents.filter(
      (s) => s.courseCode === course.code || s.course.toLowerCase().includes(course.name.toLowerCase().split(" ")[0])
    );
    const count = courseStudents.length;
    const avgScore = count > 0
      ? Math.round(courseStudents.reduce((acc, s) => acc + s.percentage, 0) / count)
      : 75;

    return {
      ...course,
      students: count,
      progress: avgScore,
    };
  });

  // Calculate overall stats dynamically
  const totalStudentsCount = enrichedStudents.length;
  const avgMasteryLevel = totalStudentsCount > 0
    ? Math.round(enrichedStudents.reduce((acc, s) => acc + s.percentage, 0) / totalStudentsCount)
    : 0;
  const totalEvaluations = enrichedStudents.reduce(
    (acc, s) => acc + (s.assessmentsCompleted || Object.keys(s.subjects || {}).length),
    0
  );

  const overviewStats = [
    {
      title: "Active Courses",
      value: `${activeCoursesData.length}`,
      subtitle: `${activeCoursesData.length} active semesters`,
      type: "courses",
    },
    {
      title: "Total Students",
      value: `${totalStudentsCount}`,
      subtitle: `Synced across all courses`,
      type: "students",
    },
    {
      title: "Evaluations Completed",
      value: `${totalEvaluations}`,
      subtitle: `${Math.round((enrichedStudents.filter(s => s.percentage >= 60).length / Math.max(1, totalStudentsCount)) * 100)}% pass rate`,
      type: "evaluations",
    },
    {
      title: "Avg Mastery Level",
      value: `${avgMasteryLevel}%`,
      subtitle: `${avgMasteryLevel >= 80 ? "↑ Strong overall performance" : "Needs targeted review"}`,
      type: "mastery",
    },
  ];

  // Actions
  const addStudent = (studentData) => {
    const newId = Date.now();
    const newStudent = {
      id: newId,
      ...studentData,
      lastActive: "Just now",
      assessmentsCompleted: Object.keys(studentData.subjects || {}).length,
    };
    setStudents((prev) => [newStudent, ...prev]);

    // Record activity
    const newActivity = {
      id: Date.now(),
      student: newStudent.name,
      action: `Enrolled & Marks Uploaded (${newStudent.course})`,
      score: `${computeStudentDetails(newStudent).percentage}%`,
      time: "Just now",
    };
    setRecentActivities((prev) => [newActivity, ...prev]);
  };

  const updateStudent = (updatedData) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedData.id ? { ...s, ...updatedData } : s))
    );

    const updatedEnriched = computeStudentDetails(updatedData);
    const newActivity = {
      id: Date.now(),
      student: updatedData.name,
      action: `Marks Updated in ${updatedData.course}`,
      score: `${updatedEnriched.percentage}%`,
      time: "Just now",
    };
    setRecentActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        students: enrichedStudents,
        courses: activeCoursesData,
        recentActivities,
        overviewStats,
        apiKey,
        setApiKey,
        addStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
