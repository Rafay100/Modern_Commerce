require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }))

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecom'
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Mongo connected'))
  .catch(err => console.error('Mongo connection error', err))

// Routes
const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/orders')
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req,res)=> res.send('E-commerce Backend Running'))

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log('Server running on', PORT))
