const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, index: true },
  brand: { type: String, default: '' },
  badge: { type: String, default: '' },
  image: { type: String, default: '' },
  gallery: [{ type: String }],
  stock: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 4.6, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0, min: 0 },
  tags: [{ type: String }],
  colors: [{ type: String }],
  sizes: [{ type: String }],
  featured: { type: Boolean, default: false },
  highlights: [{ type: String }]
}, {
  timestamps: true
})

ProductSchema.index({ name: 'text', description: 'text', tags: 'text', brand: 'text' })
ProductSchema.index({ featured: 1 })

module.exports = mongoose.model('Product', ProductSchema)
