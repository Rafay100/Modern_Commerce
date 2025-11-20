import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useCart } from '../context/CartContext'

const initialCustomer = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  region: '',
  postalCode: '',
  country: '',
  notes: ''
}

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, clearCart } = useCart()
  const [customer, setCustomer] = useState(initialCustomer)
  const [status, setStatus] = useState({ loading: false, success: null, error: null })

  if (items.length === 0 && !status.success) {
    return (
      <div className="app-shell page">
        <div className="empty-state">
          <p>You need at least one item before checking out.</p>
          <Link href="/catalog" className="primary">
            Return to catalog
          </Link>
        </div>
      </div>
    )
  }

  const handleChange = e => {
    const { name, value } = e.target
    setCustomer(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus({ loading: true, success: null, error: null })

    try {
      const payload = {
        customer,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      }

      const response = await axios.post('/api/orders', payload)
      setStatus({ loading: false, success: response.data, error: null })
      clearCart()
      setCustomer(initialCustomer)
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.response?.data?.error || 'Failed to place order' })
    }
  }

  if (status.success) {
    return (
      <div className="app-shell page">
        <div className="confirmation-card">
          <p className="eyebrow">Order confirmed</p>
          <h1>Thanks for your purchase!</h1>
          <p>Order number · {status.success.orderNumber}</p>
          <Link href="/catalog" className="primary">Continue shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell page checkout-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Checkout</p>
          <h1>Shipping details</h1>
          <p className="lede">Secure checkout with transparent totals.</p>
        </div>
      </header>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              First name
              <input name="firstName" value={customer.firstName} onChange={handleChange} required />
            </label>
            <label>
              Last name
              <input name="lastName" value={customer.lastName} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input type="email" name="email" value={customer.email} onChange={handleChange} required />
            </label>
            <label>
              Phone
              <input name="phone" value={customer.phone} onChange={handleChange} />
            </label>
            <label className="full">
              Address
              <input name="address" value={customer.address} onChange={handleChange} required />
            </label>
            <label>
              City
              <input name="city" value={customer.city} onChange={handleChange} required />
            </label>
            <label>
              Region / State
              <input name="region" value={customer.region} onChange={handleChange} required />
            </label>
            <label>
              Postal code
              <input name="postalCode" value={customer.postalCode} onChange={handleChange} required />
            </label>
            <label>
              Country
              <input name="country" value={customer.country} onChange={handleChange} required />
            </label>
            <label className="full">
              Order notes
              <textarea name="notes" value={customer.notes} onChange={handleChange} rows={3} />
            </label>
          </div>
          {status.error && <p className="error">{status.error}</p>}
          <button className="primary" type="submit" disabled={status.loading}>
            {status.loading ? 'Processing...' : 'Place order'}
          </button>
        </form>

        <aside className="summary-card">
          <h3>Order summary</h3>
          <div className="summary-line">
            <span>Items</span>
            <span>{items.length}</span>
          </div>
          <div className="summary-line">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="summary-line total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <ul className="summary-items">
            {items.map(item => (
              <li key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}

