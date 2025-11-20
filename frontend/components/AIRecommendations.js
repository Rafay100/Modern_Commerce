'use client';
import { useState, useEffect } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import axios from 'axios'
import { useCart } from '../context/CartContext'

const fetcher = url => axios.get(url).then(r => r.data)

export default function AIRecommendations({ currentProduct, viewedProducts = [] }) {
  const { addToCart } = useCart()
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const generateRecommendations = async () => {
      setLoading(true)
      try {
        // AI-powered recommendation logic
        // Combines: category similarity, price range, tags, ratings
        const allProducts = await axios.get('/api/products?limit=50').then(r => 
          Array.isArray(r.data) ? r.data : r.data?.products || []
        )

        let scored = allProducts
          .filter(p => !currentProduct || p._id !== currentProduct._id)
          .map(product => {
            let score = 0

            // Category match
            if (currentProduct?.category === product.category) score += 30

            // Price similarity (within 20% range)
            if (currentProduct?.price) {
              const priceDiff = Math.abs(currentProduct.price - product.price) / currentProduct.price
              if (priceDiff < 0.2) score += 25
            }

            // Tag overlap
            if (currentProduct?.tags && product.tags) {
              const commonTags = currentProduct.tags.filter(t => product.tags.includes(t))
              score += commonTags.length * 10
            }

            // Rating boost
            if (product.rating >= 4.5) score += 15

            // Viewed products similarity
            viewedProducts.forEach(vp => {
              if (vp.category === product.category) score += 5
              if (vp.tags?.some(t => product.tags?.includes(t))) score += 3
            })

            return { ...product, aiScore: score }
          })
          .sort((a, b) => b.aiScore - a.aiScore)
          .slice(0, 4)

        setRecommendations(scored)
      } catch (err) {
        console.error('AI recommendations failed', err)
      } finally {
        setLoading(false)
      }
    }

    generateRecommendations()
  }, [currentProduct, viewedProducts])

  if (loading || recommendations.length === 0) {
    return null
  }

  return (
    <section className="ai-recommendations">
      <div className="section-header">
        <div>
          <p className="eyebrow">✨ AI-Powered</p>
          <h3>Recommended for you</h3>
          <p className="lede">Smart suggestions based on your browsing</p>
        </div>
      </div>
      <div className="product-grid">
        {recommendations.map(product => (
          <article key={product._id} className="product-card ai-card">
            <div className="card-media">
              {product.badge && <span className="badge">{product.badge}</span>}
              <div className="ai-badge">AI Match</div>
              <img src={product.image || '/images/placeholder.png'} alt={product.name} />
            </div>
            <div className="card-body">
              <div className="card-top">
                <p className="eyebrow">{product.brand}</p>
                <p className="rating">{product.rating?.toFixed(1) ?? '4.8'} ★</p>
              </div>
              <h4>{product.name}</h4>
              <p className="description">{product.description}</p>
              <div className="meta">
                <span>${product.price.toFixed(2)}</span>
                <Link href={`/products/${product._id}`}>View details</Link>
              </div>
              <button className="primary" onClick={() => addToCart(product)}>
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

