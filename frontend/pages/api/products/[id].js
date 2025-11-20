import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const resp = await axios.get(`${API_URL}/api/products/${id}`)
    res.status(200).json(resp.data)
  } catch (err) {
    const status = err.response?.status || 500
    res.status(status).json({ error: 'Failed to fetch product' })
  }
}

