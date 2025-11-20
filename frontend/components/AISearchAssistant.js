import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function AISearchAssistant() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [processing, setProcessing] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const processNaturalLanguage = async (text) => {
    if (!text.trim()) {
      setSuggestions([])
      return
    }

    setProcessing(true)
    try {
      // AI-powered natural language understanding
      const lowerText = text.toLowerCase()

      // Extract intent and filters
      const filters = {
        category: null,
        priceRange: null,
        tags: [],
        query: text
      }

      // Category detection
      const categoryKeywords = {
        audio: ['headphones', 'speaker', 'audio', 'sound', 'music'],
        wearables: ['watch', 'smartwatch', 'fitness', 'wearable'],
        workspace: ['keyboard', 'desk', 'workspace', 'office'],
        home: ['lamp', 'bedding', 'sheets', 'home', 'decor'],
        kitchen: ['coffee', 'espresso', 'mug', 'kitchen'],
        apparel: ['jacket', 'parka', 'clothing', 'apparel', 'fashion']
      }

      for (const [cat, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(k => lowerText.includes(k))) {
          filters.category = cat
          break
        }
      }

      // Price detection
      if (lowerText.includes('cheap') || lowerText.includes('budget') || lowerText.includes('under $')) {
        filters.priceRange = { max: 150 }
      } else if (lowerText.includes('premium') || lowerText.includes('expensive') || lowerText.includes('over $')) {
        filters.priceRange = { min: 300 }
      }

      // Tag extraction
      const tagKeywords = {
        'wireless': ['wireless', 'bluetooth', 'cordless'],
        'noise-cancelling': ['noise', 'quiet', 'anc'],
        'rgb': ['rgb', 'colorful', 'led'],
        'mechanical': ['mechanical', 'clicky'],
        'waterproof': ['waterproof', 'water resistant']
      }

      for (const [tag, keywords] of Object.entries(tagKeywords)) {
        if (keywords.some(k => lowerText.includes(k))) {
          filters.tags.push(tag)
        }
      }

      // Build search query
      const params = new URLSearchParams()
      if (filters.query) params.append('q', filters.query)
      if (filters.category) params.append('category', filters.category)
      if (filters.priceRange?.min) params.append('minPrice', filters.priceRange.min)
      if (filters.priceRange?.max) params.append('maxPrice', filters.priceRange.max)
      if (filters.tags.length) params.append('tags', filters.tags.join(','))

      const searchUrl = `/catalog?${params.toString()}`
      setSuggestions([{
        type: 'search',
        label: `Search for "${text}"`,
        url: searchUrl,
        filters
      }])
    } catch (err) {
      console.error('AI search failed', err)
    } finally {
      setProcessing(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (suggestions.length > 0 && suggestions[0].url) {
      router.push(suggestions[0].url)
      setIsOpen(false)
      setQuery('')
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    processNaturalLanguage(value)
  }

  return (
    <>
      <button
        className="ai-search-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="AI Search Assistant"
      >
        <span className="ai-icon">✨</span>
        <span>AI Search</span>
      </button>

      {isOpen && (
        <div className="ai-search-overlay" onClick={() => setIsOpen(false)}>
          <div className="ai-search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ai-search-header">
              <h3>✨ AI Search Assistant</h3>
              <p>Ask naturally: "wireless headphones under $200" or "coffee maker"</p>
              <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="ai-search-form">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Try: 'premium headphones' or 'cheap coffee mugs'..."
                className="ai-search-input"
              />
              {processing && <div className="ai-processing">✨ Processing...</div>}
              {suggestions.length > 0 && (
                <div className="ai-suggestions">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="ai-suggestion-item"
                      onClick={() => {
                        router.push(suggestion.url)
                        setIsOpen(false)
                        setQuery('')
                      }}
                    >
                      <span className="ai-icon">✨</span>
                      <span>{suggestion.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  )
}

