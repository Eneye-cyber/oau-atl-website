import { NextApiRequest, NextApiResponse } from 'next';

const baseUrl = process.env.API_BASE

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const url = `${baseUrl}/auth/login`
  const data = req.body;

  console.log('url', url);
  console.log('data', data);

  try {
    const query = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const response = await query.json()
  
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (e) {
    console.log('error', e)
    return res.status(500).json({ message: 'Server Error' });
  }
  
  // Process the form data, e.g., save to database
}