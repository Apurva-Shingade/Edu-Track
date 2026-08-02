const express = require('express');
const router = express.Router();
const axios = require('axios');

// 1. Route to generate quiz questions from uploaded content
router.post('/generate-quiz', async (req, res) => {
  try {
    const { syllabusText } = req.body;

    const prompt = `
      You are an automated evaluation assistant.
      Based on the following study text, generate 3 multiple-choice questions.
      Return strictly a JSON array with objects containing: "question", "options" (array of 4 strings), and "correctAnswer".
      
      Study Text:
      "${syllabusText}"
    `;

    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'gemma4:e2b',
      prompt: prompt,
      stream: false,
      format: 'json'
    });

    const quizData = JSON.parse(response.data.response);
    res.json({ success: true, quiz: quizData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Route to evaluate student response and provide feedback
router.post('/evaluate-answer', async (req, res) => {
  try {
    const { question, studentAnswer, correctAnswer } = req.body;

    const prompt = `
      Question: "${question}"
      Correct Answer: "${correctAnswer}"
      Student Answer: "${studentAnswer}"

      Evaluate the student's answer. Return JSON with:
      1. "isCorrect": boolean
      2. "conceptualFeedback": A concise explanation of why the answer is correct or what concept the student misunderstood.
    `;

    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'gemma4:e2b',
      prompt: prompt,
      stream: false,
      format: 'json'
    });

    const evalData = JSON.parse(response.data.response);
    res.json({ success: true, evaluation: evalData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;