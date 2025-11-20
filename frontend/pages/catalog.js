'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import { useCart } from '../../context/CartContext'
import {
  buildQueryKey,
  categories,
  defaultFilters,
  priceRanges,
  sortOptions
} from '../lib/catalog';

const fetcher = url => axios.get(url).then(r => r.data);

export default function CatalogPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [filters, setFilters] = useState(() => ({ ...defaultFilters }));

  const { data, error, isValidating } = useSWR(
    buildQueryKey(filters),
    fetcher,
    { keepPreviousData: true }
  );

  // Sync category from URL
  useEffect(() => {
    if (!router.isReady) return;

    const queryCategory = router.query.category;

    if (typeof queryCategory === 'string' && queryCategory !== filters.category) {
      const exists = categories.some(cat => cat.id === queryCategory);

      if (exists) {
        setFilters(prev => ({ ...prev, category: queryCategory }));
      }
    }
  }, [router.isReady, router.query.category]);

  const products = useMemo(
    () => (Array.isArray(data) ? data : data?.products || []),
    [data]
  );

  const pagination = !Array.isArray(data) ? data?.pagination : null;

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="app-shell page">
      {/* HEADER */}
      <header className="page-header">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>All products</h1>
          <p className="lede">
            Filter by category, price range, or search for specific tags and brands.
          </p>
        </div>
      </header>

      {/* FILTER PANEL */}
      <section className="filter-panel">
        <div className="filter-group">
          <label htmlFor="searchCatalog">Search catalog</label>
          <input
            id="searchCatalog"
            type="search"
            placeholder="Search by name or tag"
            value={filters.query}
            onChange={e => handleInputChange('query', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Category</label>
          <div className="chip-row">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={filters.category === cat.id ? 'chip active' : 'chip'}
                onClick={() => handleInputChange('category', cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-grid">
          <div className="filter-group">
            <label htmlFor="catalogPrice">Price range</label>
            <select
              id="catalogPrice"
              value={filters.priceRange}
              onChange={e => handleInputChange('priceRange', e.target.value)}
            >
              {priceRanges.map(range => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="catalogSort">Sort</label>
            <select
              id="catalogSort"
              value={filters.sort}
              onChange={e => handleInputChange('sort', e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <label className="toggle">
            <input
              type="checkbox"
              checked={filters.onlyFeatured}
              onChange={e => handleInputChange('onlyFeatured', e.target.checked)}
            />
            <span>Featured items only</span>
          </label>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="products-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Showing</p>
            <h3>{products.length} products</h3>
          </div>

          {pagination && (
            <small>
              Page {pagination.page} of {pagination.pages}
            </small>
          )}
        </div>

        {error && (
          <div className="page-state error">Could not load catalog.</div>
        )}

        {isValidating && products.length === 0 && (
          <div className="skeleton-grid">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div className="skeleton-card" key={idx} />
            ))}
          </div>
        )}

        {!isValidating && products.length === 0 && (
          <div className="empty-state">
            <p>No catalog matches just yet.</p>
            <button onClick={() => setFilters({ ...defaultFilters })}>
              Reset filters
            </button>
          </div>
        )}

        <div className="product-grid">
          {products.map(product => (
            <article key={product._id} className="product-card">
              <div className="card-media">
                {product.badge && <span className="badge">{product.badge}</span>}
                <img
                  src={product.image || '/images/placeholder.png'}
                  alt={product.name}
                />
              </div>

              <div className="card-body">
                <div className="card-top">
                  <p className="eyebrow">{product.brand}</p>
                  <p className="rating">
                    {product.rating?.toFixed(1) ?? '4.8'} ★
                  </p>
                </div>

                <h4>{product.name}</h4>
                <p className="description">{product.description}</p>

                <div className="meta">
                  <span>${product.price.toFixed(2)}</span>
                  <Link href={`/products/${product._id}`}>View details</Link>
                </div>

                <button
                  className="primary"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
