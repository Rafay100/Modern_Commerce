import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, subtotal, shipping, total, updateQuantity, removeFromCart, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="app-shell page">
        <div className="empty-state">
          <p>Your cart is empty right now.</p>
          <Link href="/catalog" className="primary">
            Browse catalog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell page cart-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Cart</p>
          <h1>Review your picks</h1>
          <p className="lede">Adjust quantities or keep shopping before checkout.</p>
        </div>
        <button className="link-button" onClick={clearCart}>Clear cart</button>
      </header>

      <div className="cart-grid">
        <div className="cart-table">
          {items.map(item => (
            <div key={item.id} className="cart-row">
              <div className="cart-product">
                <img src={item.image || '/images/placeholder.png'} alt={item.name} />
                <div>
                  <Link href={`/products/${item.id}`}>{item.name}</Link>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="cart-qty">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => updateQuantity(item.id, Math.max(parseInt(e.target.value, 10) || 1, 1))}
                />
              </div>
              <div className="cart-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button className="link-button" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>

        <aside className="summary-card">
          <h3>Order summary</h3>
          <div className="summary-line">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping</span>
            <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Calculated at checkout'}</span>
          </div>
          <div className="summary-line total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link href="/checkout" className="primary">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </div>
  )
}

