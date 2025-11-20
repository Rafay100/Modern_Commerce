'use client';

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from '../context/CartContext'
import AISearchAssistant from './AISearchAssistant'

const links = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
  { href: '/checkout', label: 'Checkout' }
]

export default function TopNav() {
  const { totalItems } = useCart()
  const router = useRouter()

  return (
    <nav className="global-nav">
      <div className="nav-brand">
        <Link href="/">Modern Commerce</Link>
      </div>
      <div className="nav-links">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={router.pathname === link.href ? 'active' : ''}
          >
            {link.label}
          </Link>
        ))}
        <AISearchAssistant />
      </div>
      <div className="nav-cart">
        <Link href="/cart">
          Cart · <span>{totalItems}</span>
        </Link>
      </div>
    </nav>
  )
}

