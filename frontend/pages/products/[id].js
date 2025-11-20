'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import AIProductInsights from '../../components/AIProductInsights';
import AIRecommendations from '../../components/AIRecommendations';

const fetcher = url => axios.get(url).then(r => r.data);

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { data: product, error } = useSWR(id ? `/api/products/${id}` : null, fetcher);
  const { data: related } = useSWR(
    product?.category ? `/api/products?category=${product.category}&limit=4` : null,
    fetcher
  );

  const relatedItems = Array.isArray(related) ? related : related?.products || [];

  if (error) {
    return <div className="page-state error">Failed to load product.</div>;
  }

  if (!product) {
    return <div className="page-state loading">Loading product...</div>;
  }

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="app-shell page product-detail">
      <nav className="breadcrumb">
        <Link href="/catalog">Catalog</Link>
        <span> / </span>
        <span>{product.name}</span>
      </nav>

      <div className="detail-grid">
        <div className="detail-media">
          <img src={product.image || '/images/placeholder.png'} alt={product.name} />
        </div>

        <div className="detail-info">
          <p className="eyebrow">{product.brand}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>

          <div className="detail-meta">
            <span>
              {product.rating?.toFixed(1) ?? '4.8'} · {product.reviewCount || 0} reviews
            </span>
            <span>{product.stock > 0 ? `${product.stock} in stock` : 'Backorder'}</span>
          </div>

          {product.highlights?.length > 0 && (
            <ul className="detail-highlights">
              {product.highlights.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          <AIProductInsights product={product} />

          <div className="detail-actions">
            <label>
              Qty
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={e => setQuantity(Math.max(parseInt(e.target.value, 10) || 1, 1))}
              />
            </label>
            <button className="primary" onClick={handleAdd}>
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {relatedItems.length > 0 && (
        <section className="related-grid">
          <div className="section-header">
            <div>
              <p className="eyebrow">Related</p>
              <h3>More in {product.category}</h3>
            </div>
          </div>

          <div className="product-grid">
            {relatedItems
              .filter(item => item._id !== product._id)
              .slice(0, 3)
              .map(item => (
                <article key={item._id} className="product-card">
                  <div className="card-media">
                    <img src={item.image || '/images/placeholder.png'} alt={item.name} />
                  </div>

                  <div className="card-body">
                    <h4>{item.name}</h4>

                    <div className="meta">
                      <span>${item.price.toFixed(2)}</span>
                      <Link href={`/products/${item._id}`}>View</Link>
                    </div>

                    <button className="primary" onClick={() => addToCart(item)}>
                      Quick add
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </section>
      )}

      <AIRecommendations currentProduct={product} />
    </div>
  );
}
