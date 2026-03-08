import { Link } from 'react-router-dom'
import { Star, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'
import { convertAndFormat } from '../utils/currency'

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="card group overflow-hidden"
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square bg-white p-4 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-primary line-clamp-2 h-12 hover:text-accent transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(product.rating?.rate || 0)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-500 ml-2">
            ({product.rating?.count || 0})
          </span>
        </div>
        
<div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-accent">
            {convertAndFormat(product.price)}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault()
              addToCart(product)
            }}
            className="flex items-center space-x-1 bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard

