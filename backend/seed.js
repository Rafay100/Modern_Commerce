/**
 * Run: node seed.js
 * Make sure MONGO_URI is set in .env or environment
 */
const mongoose = require('mongoose')
const Product = require('./models/Product')
require('dotenv').config()

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecom'
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async ()=> {
    console.log('Connected to Mongo, seeding...')
    await Product.deleteMany({})
    const sample = [
      {
        name: 'Aurora Wireless Headphones',
        description: 'Flagship over-ear headphones with hybrid ANC and 40 hours of battery life.',
        price: 249,
        category: 'audio',
        brand: 'Aurora Sound',
        badge: 'Bestseller',
        image: '/images/headphones.jpg',
        gallery: [],
        stock: 32,
        rating: 4.8,
        reviewCount: 214,
        tags: ['wireless', 'noise-cancelling', 'bluetooth'],
        colors: ['Obsidian', 'Rose Sand'],
        sizes: [],
        featured: true,
        highlights: ['Hybrid ANC', '40h battery life', 'Bluetooth 5.3 multipoint']
      },
      {
        name: 'Solstice Smartwatch S3',
        description: 'Aluminum wearable with AMOLED display, wellness tracking, and 5-day battery.',
        price: 329,
        category: 'wearables',
        brand: 'Solstice',
        badge: 'New Arrival',
        image: '/images/smart-watch.jpg',
        stock: 18,
        rating: 4.6,
        reviewCount: 142,
        tags: ['smartwatch', 'fitness'],
        colors: ['Graphite', 'Sunburst'],
        featured: true,
        highlights: ['AMOLED display', 'SpO₂ & ECG', 'Contactless payments']
      },
      {
        name: 'Flux Mechanical Keyboard 75',
        description: 'Low profile gasket-mounted board with hot-swappable switches and per-key RGB.',
        price: 189,
        category: 'workspace',
        brand: 'Flux Studio',
        image: '/images/mechanical-keyboard.jpg',
        stock: 44,
        rating: 4.9,
        reviewCount: 389,
        tags: ['keyboard', 'rgb', 'mechanical'],
        colors: ['Matte Black', 'Fog White'],
        highlights: ['Gasket mount', '3 device pairing', 'PBT keycaps']
      },
      {
        name: 'Haven Linen Sheet Set',
        description: 'Stonewashed French linen sheets that soften with every wash.',
        price: 259,
        category: 'home',
        brand: 'Haven Atelier',
        image: '/images/sheet-set.webp',
        stock: 65,
        rating: 4.7,
        reviewCount: 96,
        tags: ['bedding', 'linen'],
        colors: ['Clay', 'Mist', 'Ivory'],
        highlights: ['OEKO-TEX certified', 'Temperature regulating']
      },
      {
        name: 'Ivy Minimal Desk Lamp',
        description: 'Sculpted aluminum task lamp with touch dimming and wireless charging pad.',
        price: 149,
        category: 'home',
        brand: 'Ivy & Co.',
        image: '/images/lamp.jpeg',
        stock: 27,
        rating: 4.5,
        reviewCount: 61,
        tags: ['lighting', 'desk'],
        colors: ['Matte Sage', 'Brushed Brass'],
        featured: true,
        highlights: ['15W wireless charging', 'Touch dimming', 'Adjustable arm']
      },
      {
        name: 'Barista Pro Espresso Maker',
        description: 'Dual boiler espresso machine with PID temp control and 3 pre-set profiles.',
        price: 749,
        category: 'kitchen',
        brand: 'Barista Pro',
        image: '/images/baristo-pro-maker.jpeg',
        stock: 12,
        rating: 4.9,
        reviewCount: 58,
        tags: ['espresso', 'coffee'],
        highlights: ['Dual boiler', 'PID temperature control', 'Included frothing wand']
      },
      {
        name: 'Nordic Down Parka',
        description: 'Waterproof recycled shell with 700-fill traceable down and oversized hood.',
        price: 389,
        category: 'apparel',
        brand: 'Northwind',
        image: '/images/down-parka.jpeg',
        stock: 40,
        rating: 4.4,
        reviewCount: 133,
        tags: ['outerwear'],
        colors: ['Pine', 'Charcoal'],
        sizes: ['S', 'M', 'L', 'XL'],
        highlights: ['Recycled shell', '700-fill down', 'Storm hood']
      },
      {
        name: 'TerraPlanter Ceramic Set',
        description: 'Hand glazed nesting planters with self-watering core for leafy plants.',
        price: 119,
        category: 'home',
        brand: 'Terra Studio',
        image: '/images/plant-set.jpeg',
        stock: 73,
        rating: 4.3,
        reviewCount: 87,
        tags: ['planter', 'ceramic'],
        colors: ['Terracotta', 'Alpine White'],
        highlights: ['Self-watering core', 'Matte glaze finish']
      }
    ]
    await Product.insertMany(sample)
    console.log('Seed completed.')
    process.exit(0)
  })
  .catch(err => {
    console.error('Seed failed', err)
    process.exit(1)
  })
