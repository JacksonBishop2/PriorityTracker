import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Explicitly type req and res
app.get('/', (req: Request, res: Response) => {
  res.send('Priority Tracker API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});