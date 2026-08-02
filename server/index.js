const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Setup multer for PDF uploads
const upload = multer({ dest: "uploads/" });

// In-memory data store for quizzes and students (synced with frontend)
let publishedQuizzes = [
  {
    id: 1,
    title: "Data Structures: BST & Graph Traversal",
    course: "Data Structures & Algorithms",
    courseCode: "CS201",
    qCount: 4,
    time: 10,
    diff: "Medium",
    questions: [
      {
        id: 1,
        question: "What is the worst-case time complexity of searching in an unbalanced Binary Search Tree (BST)?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        answer: 2,
        explanation: "In an unbalanced BST (skewed tree), search degrades to linear scan O(n).",
      },
      {
        id: 2,
        question: "Which graph traversal strategy uses a Queue (FIFO) data structure?",
        options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
        answer: 1,
        explanation: "Breadth-First Search (BFS) explores neighbor nodes level by level using a Queue.",
      },
      {
        id: 3,
        question: "Dynamic Programming guarantees optimal solutions for problems exhibiting overlapping subproblems and optimal substructure.",
        options: ["True", "False"],
        answer: 0,
        explanation: "Dynamic programming solves subproblems once and stores their solutions for optimal results.",
      },
      {
        id: 4,
        question: "What is the time complexity of QuickSort in the average case?",
        options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
        answer: 1,
        explanation: "Average time complexity of QuickSort is O(n log n).",
      },
    ],
  },
];

let studentMarks = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex.rivera@email.com",
    course: "Data Structures & Algorithms",
    courseCode: "CS201",
    attendance: 96,
    subjects: { "Data Structures": 94, "Algorithms": 91, "DBMS": 88, "OOP": 95 },
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    course: "Database Management Systems",
    courseCode: "CS302",
    attendance: 92,
    subjects: { "DBMS": 91, "SQL Optimization": 94, "Data Modeling": 87 },
  },
];

// Helper function to call Gemini / Gemma API if key exists
async function callGemmaApi(promptText) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GEMMA_API_KEY;
  if (!apiKey) return null;

  try {
    const fetch = (await import("node-fetch")).default || global.fetch;
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
        }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err) {
    console.error("Server Gemma API fetch error:", err.message);
    return null;
  }
}

// 1. CHAT API ROUTE (Gemma 4 AI Tutor)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const lastUserMsg = Array.isArray(messages)
      ? messages[messages.length - 1]?.content || messages[messages.length - 1]?.text || ""
      : req.body.prompt || "";

    const prompt = `You are Gemma 4, an advanced AI Academic Tutor for computer science and engineering students.
Student question: "${lastUserMsg}"
Provide a clear, helpful, structured response with bullet points and code examples if appropriate.`;

    const liveReply = await callGemmaApi(prompt);
    if (liveReply) {
      return res.json({ reply: liveReply, model: "Gemma 4 (Gemini Flash)" });
    }

    // Offline Gemma 4 Reasoning Engine Response
    const lower = lastUserMsg.toLowerCase();
    let reply = `Gemma 4 AI Tutor: Let's analyze your question step-by-step!\n\n`;

    if (lower.includes("dijkstra") || lower.includes("graph") || lower.includes("shortest path")) {
      reply += `**Dijkstra's Algorithm Overview**:\n- **Purpose**: Finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights.\n- **Data Structure**: Min-Priority Queue (Fibonacci Heap or Binary Heap).\n- **Time Complexity**: O((V + E) log V) with a binary heap.\n\n**Key Step**: Continually relax edges for the unvisited node with the smallest tentative distance.`;
    } else if (lower.includes("tree") || lower.includes("bst") || lower.includes("binary")) {
      reply += `**Binary Search Tree (BST) Properties**:\n- Left subtree nodes < Root node < Right subtree nodes.\n- **Search Complexity**: O(log n) average, O(n) worst case (unbalanced).\n- **In-Order Traversal** produces sorted output.`;
    } else if (lower.includes("dbms") || lower.includes("sql") || lower.includes("join")) {
      reply += `**SQL Join Breakdown**:\n- **INNER JOIN**: Returns matching rows in both tables.\n- **LEFT JOIN**: Returns all rows from left table + matching right rows.\n- **RIGHT JOIN**: Returns all right rows + matching left rows.`;
    } else {
      reply += `I have analyzed your query regarding **"${lastUserMsg}"**.\n\nTo master this concept:\n1. Break down the core theoretical definition.\n2. Work through a concrete input example.\n3. Test edge cases and analyze space/time complexity.\n\nWould you like me to generate a practice quiz on this topic?`;
    }

    res.json({ reply, model: "Gemma 4 Local Engine" });
  } catch (err) {
    console.error("Chat API error:", err);
    res.status(500).json({ error: "Server error handling chat request" });
  }
});

// 2. GENERATE QUIZ API ROUTE (From Prompt or PDF Upload)
app.post("/api/generate-quiz", upload.single("file"), async (req, res) => {
  try {
    const topic = req.body.topic || "General Course Quiz";
    const numQuestions = parseInt(req.body.numQuestions) || 5;
    const difficulty = req.body.difficulty || "Medium";

    let extractedText = "";
    if (req.file) {
      try {
        const pdfParse = require("pdf-parse");
        const dataBuffer = fs.readFileSync(req.file.path);
        const parsed = await pdfParse(dataBuffer);
        extractedText = parsed.text || "";
        fs.unlinkSync(req.file.path); // clean up file
      } catch (e) {
        console.warn("PDF parse error, using text fallback");
      }
    }

    const prompt = `You are Gemma 4, an AI Exam Generator.
Generate a ${numQuestions}-question ${difficulty} difficulty multiple choice quiz based on:
Topic/Content: ${topic}
Extracted PDF Context: ${extractedText.substring(0, 1000)}

Return JSON format:
{
  "title": "Quiz Title",
  "questions": [
    {
      "id": 1,
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "answer": 0,
      "explanation": "Why option 0 is correct"
    }
  ]
}`;

    const liveQuiz = await callGemmaApi(prompt);
    if (liveQuiz) {
      try {
        const clean = liveQuiz.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(clean);
        return res.json(parsed);
      } catch (e) {
        // Fallback
      }
    }

    // Default Gemma 4 Quiz Generator
    const generated = {
      title: `${topic} (${difficulty} Level)`,
      questions: [
        {
          id: 1,
          question: `Which fundamental principle governs ${topic}?`,
          options: [
            "Optimal Substructure & Overlapping Subproblems",
            "Linear Sequential Search",
            "Random Access Memory Allocation",
            "Static Array Resizing",
          ],
          answer: 0,
          explanation: "Optimal substructure allows decomposing the problem into smaller solvable sub-units.",
        },
        {
          id: 2,
          question: `What is the worst-case space complexity of recursive depth traversal in ${topic}?`,
          options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
          answer: 2,
          explanation: "In worst case (skewed call stack), recursive stack space requires O(n).",
        },
        {
          id: 3,
          question: `Which data structure is most efficiently utilized for breadth-first processing in ${topic}?`,
          options: ["Stack (LIFO)", "Queue (FIFO)", "Max-Heap", "Hash Map"],
          answer: 1,
          explanation: "Queue ensures level-order FIFO traversal.",
        },
      ],
    };

    res.json(generated);
  } catch (err) {
    console.error("Quiz gen error:", err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

// 3. PUBLISH QUIZ ROUTE
app.post("/api/quizzes", (req, res) => {
  const newQuiz = {
    id: Date.now(),
    title: req.body.title || "Gemma 4 AI Quiz",
    course: req.body.course || "Data Structures",
    courseCode: req.body.courseCode || "CS201",
    qCount: req.body.questions?.length || 3,
    time: req.body.time || 10,
    diff: req.body.diff || "Medium",
    questions: req.body.questions || [],
  };
  publishedQuizzes.unshift(newQuiz);
  res.json({ success: true, quiz: newQuiz, total: publishedQuizzes.length });
});

// GET ALL QUIZZES
app.get("/api/quizzes", (req, res) => {
  res.json(publishedQuizzes);
});

// 4. ANALYZE QUIZ RESULTS ROUTE
app.post("/api/analyze-quiz", async (req, res) => {
  try {
    const { studentName, quizTitle, score, totalQuestions, answers, questions } = req.body;
    const percentage = Math.round((score / Math.max(1, totalQuestions)) * 100);

    const prompt = `You are Gemma 4, AI Learning Diagnostic Engine.
Student ${studentName} scored ${score}/${totalQuestions} (${percentage}%) in "${quizTitle}".
Analyze question accuracy and provide JSON:
{
  "percentage": ${percentage},
  "grade": "Letter grade",
  "summary": "AI performance summary",
  "weakAreas": ["array of weak topics"],
  "recommendedSteps": ["array of 3 study recommendations"]
}`;

    const liveAnalysis = await callGemmaApi(prompt);
    if (liveAnalysis) {
      try {
        const clean = liveAnalysis.replace(/```json/g, "").replace(/```/g, "").trim();
        return res.json(JSON.parse(clean));
      } catch (e) {}
    }

    res.json({
      percentage,
      grade: percentage >= 85 ? "A" : percentage >= 70 ? "B" : percentage >= 60 ? "C" : "D",
      summary: `Gemma 4 Diagnostic: ${studentName} scored ${percentage}% in ${quizTitle}. ${percentage >= 75 ? "Strong conceptual baseline demonstrated." : "Key topics require immediate review before midterms."}`,
      weakAreas: percentage < 80 ? ["Time Complexity Analysis", "Graph Traversal Edge Cases"] : ["Advanced Algorithm Optimization"],
      recommendedSteps: [
        "Re-attempt practice problems for missed questions.",
        "Review lecture slides on Queue & Stack data structures.",
        "Schedule a follow-up session with Gemma AI Tutor.",
      ],
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to analyze quiz" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", engine: "Gemma 4 AI Server Active", time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Edu-Track Gemma 4 Express Server running on http://localhost:${PORT}`);
});
