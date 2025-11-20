import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default async function handler(req, res) {
  try {
    const resp = await axios.get(`${API_URL}/api/products`, { params: req.query })
    res.status(200).json(resp.data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}
