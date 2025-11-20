export const categories = [
  { id: 'all', label: 'All' },
  { id: 'audio', label: 'Audio' },
  { id: 'wearables', label: 'Wearables' },
  { id: 'workspace', label: 'Workspace' },
  { id: 'home', label: 'Home' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'apparel', label: 'Apparel' }
]

export const priceRanges = [
  { id: 'all', label: 'Any price', value: [0, 10000] },
  { id: 'low', label: 'Under $150', value: [0, 150] },
  { id: 'mid', label: '$150 - $350', value: [150, 350] },
  { id: 'high', label: '$350+', value: [350, 10000] }
]

export const sortOptions = [
  { id: 'newest', label: 'Newest' },
  { id: 'popular', label: 'Popular' },
  { id: 'rating_desc', label: 'Top Rated' },
  { id: 'price_asc', label: 'Price: Low → High' },
  { id: 'price_desc', label: 'Price: High → Low' }
]

export const defaultFilters = {
  query: '',
  category: 'all',
  sort: 'newest',
  priceRange: 'all',
  onlyFeatured: false
}

export const buildQueryKey = ({ query, category, sort, priceRange, onlyFeatured }) => {
  const params = new URLSearchParams()
  if (query) params.append('q', query)
  if (category && category !== 'all') params.append('category', category)
  if (sort) params.append('sort', sort)
  if (priceRange && priceRange !== 'all') {
    const range = priceRanges.find(r => r.id === priceRange)?.value
    if (range) {
      params.append('minPrice', range[0])
      params.append('maxPrice', range[1])
    }
  }
  if (onlyFeatured) params.append('featured', 'true')
  const search = params.toString()
  return search ? `/api/products?${search}` : '/api/products'
}

