import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const responses = {
  greeting: [
    "Hello! I'm your AI shopping assistant. How can I help you today?",
    "Hi there! Looking for something specific? I can help you find products!",
    "Welcome! Ask me about products, categories, or get recommendations."
  ],
  help: [
    "I can help you find products, answer questions about items, and give recommendations. What would you like to know?",
    "Try asking: 'Show me headphones' or 'What's the best coffee maker?' or 'Recommend something for my workspace'"
  ],
  products: [
    "We have a great selection! Check out our catalog at /catalog or ask me about a specific category.",
    "Browse our full catalog or tell me what you're looking for and I'll help you find it!"
  ],
  categories: [
    "We have Audio, Wearables, Workspace, Home, Kitchen, and Apparel categories. Which interests you?",
    "Explore Audio for headphones, Wearables for smartwatches, Workspace for desk accessories, and more!"
  ],
  default: [
    "I'm here to help! Try asking about products, categories, or recommendations.",
    "Let me know what you're looking for and I'll help you find it!"
  ]
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi! I'm your AI shopping assistant. How can I help you today? ✨" }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const processMessage = (text) => {
    const lowerText = text.toLowerCase()

    let response = ''
    let action = null

    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
      response = responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
    } else if (lowerText.includes('help') || lowerText.includes('what can you')) {
      response = responses.help[Math.floor(Math.random() * responses.help.length)]
    } else if (lowerText.includes('product') || lowerText.includes('item') || lowerText.includes('show me')) {
      response = responses.products[Math.floor(Math.random() * responses.products.length)]
      action = { type: 'link', url: '/catalog', text: 'Browse Catalog' }
    } else if (lowerText.includes('categor') || lowerText.includes('type')) {
      response = responses.categories[Math.floor(Math.random() * responses.categories.length)]
      action = { type: 'link', url: '/catalog', text: 'View Categories' }
    } else if (lowerText.includes('headphone') || lowerText.includes('audio')) {
      response = "We have premium wireless headphones with noise cancellation! Check out our Audio category."
      action = { type: 'link', url: '/catalog?category=audio', text: 'View Audio Products' }
    } else if (lowerText.includes('coffee') || lowerText.includes('espresso') || lowerText.includes('mug')) {
      response = "Perfect for your morning routine! We have espresso makers and premium mugs in our Kitchen section."
      action = { type: 'link', url: '/catalog?category=kitchen', text: 'View Kitchen Products' }
    } else if (lowerText.includes('watch') || lowerText.includes('smartwatch') || lowerText.includes('wearable')) {
      response = "Stay connected with our smartwatches! They feature fitness tracking and long battery life."
      action = { type: 'link', url: '/catalog?category=wearables', text: 'View Wearables' }
    } else if (lowerText.includes('keyboard') || lowerText.includes('workspace') || lowerText.includes('desk')) {
      response = "Upgrade your workspace! We have mechanical keyboards and desk accessories."
      action = { type: 'link', url: '/catalog?category=workspace', text: 'View Workspace Products' }
    } else if (lowerText.includes('cart') || lowerText.includes('checkout')) {
      response = "Ready to checkout? Your cart is saved and ready when you are!"
      action = { type: 'link', url: '/cart', text: 'View Cart' }
    } else {
      response = responses.default[Math.floor(Math.random() * responses.default.length)]
    }

    return { response, action }
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { type: 'user', text: input }
    setMessages(prev => [...prev, userMessage])

    const { response, action } = processMessage(input)
    const botMessage = { type: 'bot', text: response, action }
    
    setTimeout(() => {
      setMessages(prev => [...prev, botMessage])
    }, 500)

    setInput('')
  }

  return (
    <>
      <button
        className="ai-chat-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="AI Chat Assistant"
      >
        <span className="ai-icon">💬</span>
        <span>AI Assistant</span>
      </button>

      {isOpen && (
        <div className="ai-chat-widget">
          <div className="ai-chat-header">
            <div>
              <h4>✨ AI Shopping Assistant</h4>
              <p>Ask me anything about products!</p>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="ai-chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.type}`}>
                <div className="message-content">
                  {msg.type === 'bot' && <span className="ai-icon">✨</span>}
                  <span>{msg.text}</span>
                </div>
                {msg.action && (
                  <Link href={msg.action.url} className="chat-action-link">
                    {msg.action.text} →
                  </Link>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="ai-chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about products..."
              autoFocus
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  )
}

