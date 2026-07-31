// Inside a React component (e.g., QuizComponent.jsx)
import axios from 'axios';

const submitAnswer = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/evaluation/evaluate-answer', {
      question: currentQuestion,
      studentAnswer: userInputValue,
      correctAnswer: expectedAnswer
    });

    console.log("Gemma 4 Evaluation:", res.data.evaluation);
    // Display feedback on screen
    setFeedback(res.data.evaluation.conceptualFeedback);
  } catch (error) {
    console.error("Error evaluating answer:", error);
  }
};

export default submitAnswer;