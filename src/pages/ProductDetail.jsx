import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, ShoppingCart, ArrowLeft, Check, Truck, Shield, RefreshCw } from 'lucide-react'
import { useCart } from '../context/CartContext'
import axios from 'axios'
import { motion } from 'framer-motion'
import { convertAndFormat } from '../utils/currency'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/api/products/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl h-96 animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-8 bg-slate-200 rounded w-3/4"></div>
              <div className="h-6 bg-slate-200 rounded w-1/4"></div>
              <div className="h-20 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 text-lg">Product not found</p>
          <Link to="/products" className="text-accent hover:underline mt-2 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const features = [
    { icon: Truck, text: `Free shipping on orders over ₹4,150` },
    { icon: Shield, text: 'Secure payment processing' },
    { icon: RefreshCw, text: '30-day return policy' },
  ]

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center text-slate-600 hover:text-accent mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm p-8 flex items-center justify-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="max-h-96 object-contain"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium capitalize mb-4">
              {product.category}
            </span>
            
            <h1 className="text-3xl font-bold text-primary mb-4">
              {product.title}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(product.rating?.rate || 0)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-500 ml-2">
                ({product.rating?.count || 0} reviews)
              </span>
            </div>

            <p className="text-4xl font-bold text-accent mb-6">
              {convertAndFormat(product.price)}
            </p>

            <p className="text-slate-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-slate-600 font-medium">Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-slate-50 rounded-l-lg transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 font-medium border-x border-slate-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-slate-50 rounded-r-lg transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 mb-6"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                  <feature.icon className="w-5 h-5 text-accent" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

