const express = require('express');
const cors = require('cors');
const evaluationRoutes = require('./routes/evaluation');

const app = express();

app.use(cors());
app.use(express.json());

// Mount the route you wrote in evaluation.js
app.use('/api/evaluation', evaluationRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});