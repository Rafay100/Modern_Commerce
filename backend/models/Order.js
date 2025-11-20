const mongoose = require('mongoose')

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  image: String,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false })

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  address: { type: String, required: true },
  city: { type: String, required: true },
  region: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  notes: String
}, { _id: false })

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  customer: CustomerSchema,
  items: [OrderItemSchema],
  subtotal: { type: Number, required: true },
  shipping: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'processing', enum: ['processing', 'fulfilled', 'cancelled'] },
  paymentStatus: { type: String, default: 'pending', enum: ['pending', 'paid', 'refunded'] }
}, {
  timestamps: true
})

OrderSchema.pre('save', function setOrderNumber(next) {
  if (!this.orderNumber) {
    const randomSegment = Math.random().toString(36).substring(2, 6).toUpperCase()
    this.orderNumber = `ORD-${Date.now().toString().slice(-6)}-${randomSegment}`
  }
  next()
})

module.exports = mongoose.model('Order', OrderSchema)

