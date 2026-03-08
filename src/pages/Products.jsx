import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
import { convertAndFormat } from '../utils/currency'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter states - price range in USD for filtering
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/products/categories/list')
        ])
        setProducts(productsRes.data)
        setCategories(categoriesRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Search filter
      if (search && !product.title.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false
      }
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return (b.rating?.rate || 0) - (a.rating?.rate || 0)
        case 'name':
          return a.title.localeCompare(b.title)
        default:
          return a.id - b.id
      }
    })

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setPriceRange([0, 1000])
    setSortBy('default')
    setSearchParams({})
  }

  const hasActiveFilters = search || selectedCategory || priceRange[0] > 0 || priceRange[1] < 1000

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">All Products</h1>
          <p className="text-slate-500">{filteredProducts.length} products found</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-white"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A-Z</option>
            </select>

            {/* Filter Toggle (Mobile) */}
<button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 rounded-xl text-slate-600"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-primary flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-accent hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-primary mb-3">Category</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                      className="w-4 h-4 text-accent focus:ring-accent"
                    />
                    <span className="ml-2 text-slate-600">All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="w-4 h-4 text-accent focus:ring-accent"
                      />
                      <span className="ml-2 text-slate-600 capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-primary mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-accent"
                  />
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{convertAndFormat(priceRange[0])}</span>
                    <span>{convertAndFormat(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filters Drawer */}
          {showFilters && (
            <div className="md:hidden fixed inset-0 z-50">
              <div 
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowFilters(false)}
              ></div>
              <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-primary">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-6 h-6 text-slate-600" />
                  </button>
                </div>

                {/* Mobile Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-primary mb-3">Category</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="mobile-category"
                        checked={selectedCategory === ''}
                        onChange={() => setSelectedCategory('')}
                        className="w-4 h-4 text-accent"
                      />
                      <span className="ml-2 text-slate-600">All</span>
                    </label>
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="mobile-category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-4 h-4 text-accent"
                        />
                        <span className="ml-2 text-slate-600 capitalize">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Mobile Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-primary mb-3">Max Price: {convertAndFormat(priceRange[1])}</h4>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-accent"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={clearFilters}
                    className="flex-1 py-3 border border-slate-200 rounded-xl text-slate-600"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 btn-primary"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl h-80 animate-pulse"></div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-500 text-lg mb-4">No products found</p>
                <button
                  onClick={clearFilters}
                  className="text-accent hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products

