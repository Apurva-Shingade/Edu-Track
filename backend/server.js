import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Your actual API key inserted here
const GEMMA_API_KEY = "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"; 

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMMA_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // Active high-speed Groq model
        messages: [
          { role: "system", content: "You are Gemma AI, a helpful and concise educational tutor." },
          ...messages
        ],
        temperature: 0.7,
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      const aiReply = data.choices[0].message.content;
      res.json({ reply: aiReply });
    } else {
      console.error("API Error Response:", data);
      res.status(500).json({ error: "Invalid response from AI provider." });
    }

  } catch (error) {
    console.error("Error communicating with AI server:", error);
    res.status(500).json({ error: "Failed to generate response." });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));