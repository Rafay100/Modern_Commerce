const router = require('express').Router()
const Product = require('../models/Product')

const SORT_MAP = {
  newest: { createdAt: -1 },
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  rating_desc: { rating: -1, reviewCount: -1 },
  popular: { reviewCount: -1, rating: -1 }
}

function buildPriceFilter(minPrice, maxPrice) {
  const priceFilter = {}
  if (!isNaN(minPrice)) priceFilter.$gte = minPrice
  if (!isNaN(maxPrice)) priceFilter.$lte = maxPrice
  return Object.keys(priceFilter).length ? priceFilter : undefined
}

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const {
      q,
      category,
      limit = 12,
      page = 1,
      sort = 'newest',
      minPrice,
      maxPrice,
      featured,
      tags
    } = req.query

    const filter = {}

    if (q) {
      filter.$text = { $search: q }
    }

    if (category && category !== 'all') {
      filter.category = category
    }

    if (featured === 'true') {
      filter.featured = true
    }

    if (tags) {
      filter.tags = { $in: tags.split(',').map(t => t.trim()).filter(Boolean) }
    }

    const priceFilter = buildPriceFilter(parseFloat(minPrice), parseFloat(maxPrice))
    if (priceFilter) {
      filter.price = priceFilter
    }

    const lim = Math.max(Math.min(parseInt(limit, 10) || 12, 100), 1)
    const pg = Math.max(parseInt(page, 10) || 1, 1)

    const query = Product.find(filter)
    const projection = q ? { score: { $meta: 'textScore' } } : undefined

    query.sort(q ? { score: { $meta: 'textScore' }, ...(SORT_MAP[sort] || SORT_MAP.newest) } : (SORT_MAP[sort] || SORT_MAP.newest))
    query.skip((pg - 1) * lim).limit(lim)

    if (projection) {
      query.select(projection)
    }

    const [products, total, priceStats] = await Promise.all([
      query.lean(),
      Product.countDocuments(filter),
      Product.aggregate([
        { $match: filter },
        {
          $group: {
            _id: null,
            min: { $min: '$price' },
            max: { $max: '$price' },
            avgRating: { $avg: '$rating' }
          }
        }
      ])
    ])

    res.json({
      products,
      pagination: {
        total,
        page: pg,
        pages: Math.ceil(total / lim),
        limit: lim
      },
      stats: priceStats[0] || { min: 0, max: 0, avgRating: 0 }
    })
  } catch (err) {
    console.error('Failed to fetch products', err)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ error: 'Invalid data', details: err.message })
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (err) {
    res.status(400).json({ error: 'Invalid product id' })
  }
})

module.exports = router
