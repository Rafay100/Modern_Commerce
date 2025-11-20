import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext()
const SHIPPING_FLAT = 14

const initialState = {
  items: []
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload || initialState
    case 'ADD': {
      const exists = state.items.find(item => item.id === action.payload.id)
      if (exists) {
        const updated = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
        return { ...state, items: updated }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) }
    case 'UPDATE': {
      const updated = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(action.payload.quantity, 1) }
          : item
      )
      return { ...state, items: updated }
    }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

function persistState(state) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('ecom_cart', JSON.stringify(state))
  } catch {
    // ignore persistence errors
  }
}

function readState() {
  if (typeof window === 'undefined') return initialState
  try {
    const stored = localStorage.getItem('ecom_cart')
    return stored ? JSON.parse(stored) : initialState
  } catch {
    return initialState
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    dispatch({ type: 'HYDRATE', payload: readState() })
  }, [])

  useEffect(() => {
    persistState(state)
  }, [state])

  const value = useMemo(() => {
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 0 ? SHIPPING_FLAT : 0
    const total = subtotal + shipping

    return {
      items: state.items,
      totalItems,
      subtotal,
      shipping,
      total,
      addToCart: (product, quantity = 1) =>
        dispatch({
          type: 'ADD',
          payload: {
            id: product._id || product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity
          }
        }),
      removeFromCart: id => dispatch({ type: 'REMOVE', payload: id }),
      updateQuantity: (id, quantity) => dispatch({ type: 'UPDATE', payload: { id, quantity } }),
      clearCart: () => dispatch({ type: 'CLEAR' })
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

