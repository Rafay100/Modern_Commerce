import { useState, useEffect } from 'react'

export default function AIProductInsights({ product }) {
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateInsights = () => {
      // AI-generated product insights
      const insightsList = []

      // Price analysis
      if (product.price < 100) {
        insightsList.push({
          type: 'value',
          icon: '💰',
          text: 'Great value for money'
        })
      } else if (product.price > 300) {
        insightsList.push({
          type: 'premium',
          icon: '⭐',
          text: 'Premium quality investment'
        })
      }

      // Rating analysis
      if (product.rating >= 4.7) {
        insightsList.push({
          type: 'rating',
          icon: '🔥',
          text: 'Highly rated by customers'
        })
      }

      // Stock analysis
      if (product.stock < 20) {
        insightsList.push({
          type: 'stock',
          icon: '⚡',
          text: 'Limited stock available'
        })
      }

      // Category insights
      if (product.category === 'audio') {
        insightsList.push({
          type: 'category',
          icon: '🎵',
          text: 'Perfect for music enthusiasts'
        })
      } else if (product.category === 'workspace') {
        insightsList.push({
          type: 'category',
          icon: '💼',
          text: 'Ideal for home office setup'
        })
      } else if (product.category === 'kitchen') {
        insightsList.push({
          type: 'category',
          icon: '☕',
          text: 'Elevate your morning routine'
        })
      }

      // Tag-based insights
      if (product.tags?.includes('wireless')) {
        insightsList.push({
          type: 'feature',
          icon: '📶',
          text: 'Wireless freedom'
        })
      }

      if (product.tags?.includes('noise-cancelling')) {
        insightsList.push({
          type: 'feature',
          icon: '🔇',
          text: 'Active noise cancellation'
        })
      }

      // Review count insights
      if (product.reviewCount > 100) {
        insightsList.push({
          type: 'popular',
          icon: '👥',
          text: `Trusted by ${product.reviewCount}+ customers`
        })
      }

      setInsights(insightsList.slice(0, 4))
      setLoading(false)
    }

    if (product) {
      generateInsights()
    }
  }, [product])

  if (loading || !insights || insights.length === 0) {
    return null
  }

  return (
    <div className="ai-insights">
      <p className="eyebrow">✨ AI Insights</p>
      <div className="insights-grid">
        {insights.map((insight, idx) => (
          <div key={idx} className="insight-item">
            <span className="insight-icon">{insight.icon}</span>
            <span className="insight-text">{insight.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

