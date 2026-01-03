// Vercel API Route for database initialization
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { seedProducts } from './utils/seed';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      await seedProducts();
      res.status(200).json({ success: true, message: 'Database seeded successfully' });
    } catch (error) {
      console.error('Database initialization error:', error);
      res.status(500).json({ success: false, error: 'Failed to initialize database' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}