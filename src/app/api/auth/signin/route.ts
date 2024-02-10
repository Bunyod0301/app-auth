// pages/api/auth/login.js
import connectMongoDB from '../../../../../libs/mongodb';
import { compare } from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validate input (you may want to add more validation)
    if (!email || !password) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const { db } = await connectMongoDB();

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // At this point, the user is authenticated. You may want to create a JWT or session token.

    return res.status(200).json({ success: true });
  }

  return res.status(405).end(); // Method Not Allowed for non-POST requests
}
