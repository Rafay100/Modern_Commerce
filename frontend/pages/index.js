'use client';

import { useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios';
import { useCart } from '../context/CartContext'
import { buildQueryKey, categories, defaultFilters, priceRanges, sortOptions } from '../lib/catalog';
import AIRecommendations from '../components/AIRecommendations';

const fetcher = url => axios.get(url).then(r => r.data);

const lookbookCollections = [
  {
    title: 'Calm interiors',
    copy: 'Organic materials and sculpted lighting for focused workspaces.',
    accent: 'workspace',
    category: 'workspace'
  },
  {
    title: 'City essentials',
    copy: 'Layerable outerwear and connected wearables built for motion.',
    accent: 'wearables',
    category: 'wearables'
  },
  {
    title: 'Slow mornings',
    copy: 'Cafe-grade brewing tools and linen essentials for home rituals.',
    accent: 'kitchen',
    category: 'kitchen'
  }
];

const testimonials = [
  {
    quote: 'Every item feels curated. The checkout flow was effortless and shipping updates were proactive.',
    author: 'Rowan Patel · Brooklyn'
  },
  {
    quote: 'I love the storytelling on each collection. The desk setup bundle arrived in two days.',
    author: 'Morgan Lee · Austin'
  },
  {
    quote: 'Customer support helped me swap a size within minutes. Easily my favorite modern shop.',
    author: 'Camila Duarte · Toronto'
  }
];

export default function Home() {
  const { addToCart, subtotal, totalItems } = useCart();
  const [filters, setFilters] = useState(() => ({ ...defaultFilters }));

  const { data, error, isValidating } = useSWR(buildQueryKey(filters), fetcher, {
    keepPreviousData: true
  });

  const products = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    return data.products || [];
  }, [data]);

  const stats = useMemo(() => (data && !Array.isArray(data) ? data.stats : null), [data]);

  const heroProduct = products.find(p => p.featured) || products[0];
  const featuredRail = products.filter(p => p.featured).slice(0, 3);

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  if (error) {
    return <div className="page-state error">We couldn&apos;t load products right now.</div>;
  }

  return (
    <>
      <Head>
        <title>Modern Commerce · Thoughtful goods for everyday rituals</title>
        <meta
          name="description"
          content="Curated eCommerce experience featuring design-led electronics, apparel, and home goods."
        />
      </Head>

      <div className="app-shell">
        <header className="site-header">
          <div>
            <p className="eyebrow">Modern Commerce</p>
            <h1>Design-led goods for living well.</h1>
            <p className="lede">
              Discover statement tech, slow-made homewares, and adaptive apparel from independent studios.
            </p>
          </div>
          <div className="cart-pill">
            <p>Cart · {totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </header>

        {heroProduct && (
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">{heroProduct.badge || 'Featured'}</p>
              <h2>{heroProduct.name}</h2>
              <p>{heroProduct.description}</p>
              <ul>
                {(heroProduct.highlights || []).slice(0, 3).map(point => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="hero-cta">
                <span>${heroProduct.price.toFixed(2)}</span>
                <button onClick={() => addToCart(heroProduct)}>Add to cart</button>
              </div>
            </div>
            <div className="hero-media">
              <img src={heroProduct.image || '/images/placeholder.png'} alt={heroProduct.name} />
              <div className="rating-chip">
                <strong>{heroProduct.rating?.toFixed(1) ?? '4.8'}</strong>
                <span>{heroProduct.reviewCount || 0} reviews</span>
              </div>
            </div>
          </section>
        )}

        <section className="filter-panel">
          <div className="filter-group">
            <label htmlFor="search">Search catalog</label>
            <input
              id="search"
              type="search"
              placeholder="Search by name, brand, or tag"
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
              <label htmlFor="priceRange">Price range</label>
              <select
                id="priceRange"
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
              <label htmlFor="sort">Sort</label>
              <select
                id="sort"
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
              <span>Show featured only</span>
            </label>
          </div>

          {stats && (
            <div className="stats">
              <p>Collection range · ${stats.min?.toFixed(0) ?? 0} – ${stats.max?.toFixed(0) ?? 0}</p>
              <p>Avg. rating · {stats.avgRating ? stats.avgRating.toFixed(1) : '—'} / 5</p>
            </div>
          )}
        </section>

        <section className="products-section">
          <div className="section-header">
            <div>
              <p className="eyebrow">Now shipping</p>
              <h3>Refined essentials</h3>
            </div>
            <span>{products.length} products</span>
          </div>

          {isValidating && products.length === 0 && (
            <div className="skeleton-grid">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div className="skeleton-card" key={idx} />
              ))}
            </div>
          )}

          {!isValidating && products.length === 0 && (
            <div className="empty-state">
              <p>No products match those filters yet.</p>
              <button onClick={() => setFilters({ ...defaultFilters })}>Reset filters</button>
            </div>
          )}

          <div className="product-grid">
            {products.map(product => (
              <article key={product._id} className="product-card">
                <div className="card-media">
                  {product.badge && <span className="badge">{product.badge}</span>}
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
                    <small>{product.stock > 0 ? `${product.stock} in stock` : 'Backorder'}</small>
                  </div>

                  <div className="tags">
                    {(product.tags || []).slice(0, 3).map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <button className="primary" onClick={() => addToCart(product)}>
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {featuredRail.length > 0 && (
          <section className="featured-rail">
            {featuredRail.map(item => (
              <div className="rail-card" key={item._id}>
                <p className="eyebrow">{item.category}</p>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <button onClick={() => addToCart(item)}>
                  Quick add · ${item.price.toFixed(0)}
                </button>
              </div>
            ))}
          </section>
        )}

        <section className="lookbook">
          {lookbookCollections.map(collection => (
            <div className="lookbook-card" key={collection.title}>
              <p className="eyebrow">{collection.accent}</p>
              <h4>{collection.title}</h4>
              <p>{collection.copy}</p>
              <Link href={`/catalog?category=${collection.category}`}>Shop collection</Link>
            </div>
          ))}
        </section>

        <section className="testimonials">
          {testimonials.map(item => (
            <blockquote key={item.author}>
              <p>“{item.quote}”</p>
              <cite>{item.author}</cite>
            </blockquote>
          ))}
        </section>

        <section className="newsletter">
          <div>
            <p className="eyebrow">Stay in the loop</p>
            <h3>Weekly drops from independent designers.</h3>
            <p>Limited releases, restocks, and essays on mindful retail.</p>
          </div>

          <form onSubmit={e => e.preventDefault()}>
            <input placeholder="Email address" type="email" required />
            <button type="submit">Notify me</button>
          </form>
        </section>

        {products.length > 0 && (
          <AIRecommendations currentProduct={null} viewedProducts={products.slice(0, 5)} />
        )}
      </div>
    </>
  );
}
