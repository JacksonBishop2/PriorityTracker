import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Basic route to check if the API is working
app.get('/', (req: Request, res: Response) => {
  res.send('Priority Tracker API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});