import express, { Request, Response } from 'express';
import sgMail from '@sendgrid/mail';
import pool from './db';
import { Parser } from 'json2csv';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Setup SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
const senderEmail = process.env.SENDER_EMAIL || 'no-reply@yourdomain.com';

// Health check route
app.get('/test', (req: Request, res: Response) => {
  res.json({
    message: 'API test successful',
    timestamp: new Date().toISOString(),
  });
});

// Monday email
app.post('/email/monday', async (req: Request, res: Response) => {
  const msg = {
    to: 'jacksonbishop2@gmail.com', // Replace for testing
    from: senderEmail,
    subject: 'What are your top 3 priorities this week?',
    text: 'Please reply with your top 3 predicted priorities for this week.',
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Monday email sent' });
  } catch (err) {
  const error = err as any;
  console.error('SendGrid error:', error?.response?.body || error);
  res.status(500).json({ error: 'Failed to send Monday email' });
  }
});

// Friday email
app.post('/email/friday', async (req: Request, res: Response) => {
  const msg = {
    to: 'jacksonbishop2@gmail.com', // Replace for testing
    from: senderEmail,
    subject: 'What were your top 3 priorities this week?',
    text: 'Please reply with your actual top 3 priorities from this week.',
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Friday email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send Friday email' });
  }
});

app.get('/export', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM priorities ORDER BY week_start, email');

    const parser = new Parser();
    const csv = parser.parse(result.rows);

    res.header('Content-Type', 'text/csv');
    res.attachment('priorities.csv');
    res.send(csv);
  } catch (err: any) {
    console.error('Export error:', err);
    res.status(500).json({ error: 'Failed to export CSV' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
