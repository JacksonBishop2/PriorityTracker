import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Priority Tracker API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});