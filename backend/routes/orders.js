const router = require('express').Router()
const Order = require('../models/Order')
const Product = require('../models/Product')

const BASE_SHIPPING = 14

router.post('/', async (req, res) => {
  try {
    const { customer, items } = req.body

    if (!customer || !items || !items.length) {
      return res.status(400).json({ error: 'Customer info and at least one item are required.' })
    }

    const productIds = items.map(item => item.productId)
    const products = await Product.find({ _id: { $in: productIds } }).lean()

    if (!products.length) {
      return res.status(400).json({ error: 'Products not found for this order.' })
    }

    const normalizedItems = items.map(item => {
      const product = products.find(p => p._id.toString() === item.productId)
      if (!product) return null

      return {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: Math.max(item.quantity || 1, 1)
      }
    }).filter(Boolean)

    if (!normalizedItems.length) {
      return res.status(400).json({ error: 'Unable to match order items to products.' })
    }

    const subtotal = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 0 ? BASE_SHIPPING : 0
    const total = subtotal + shipping

    const order = new Order({
      customer,
      items: normalizedItems,
      subtotal,
      shipping,
      total
    })

    await order.save()
    res.status(201).json(order)
  } catch (err) {
    console.error('Order creation failed', err)
    res.status(500).json({ error: 'Failed to create order' })
  }
})

router.get('/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber }).lean()
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' })
  }
})

module.exports = router

