import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const resp = await axios.post(`${API_URL}/api/orders`, req.body)
      res.status(201).json(resp.data)
    } catch (err) {
      const status = err.response?.status || 500
      res.status(status).json({ error: 'Failed to create order', details: err.response?.data })
    }
    return
  }

  if (req.method === 'GET') {
    const { orderNumber } = req.query
    if (!orderNumber) {
      return res.status(400).json({ error: 'orderNumber is required' })
    }

    try {
      const resp = await axios.get(`${API_URL}/api/orders/${orderNumber}`)
      res.status(200).json(resp.data)
    } catch (err) {
      const status = err.response?.status || 500
      res.status(status).json({ error: 'Failed to fetch order' })
    }
    return
  }

  res.status(405).json({ error: 'Method not allowed' })
}

