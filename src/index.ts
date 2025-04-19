import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Basic route to check if the API is working
app.get('/test', (req: Request, res: Response) => {
  res.json({
    message: 'API test successful',
    timestamp: new Date().toISOString(),
  });
});