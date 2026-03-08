import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'
import { convertAndFormat, USD_TO_INR } from '../utils/currency'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <ShoppingBag className="w-24 h-24 text-slate-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-primary mb-4">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn-primary inline-flex items-center">
              Start Shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const freeShippingThresholdUSD = 50;
  const freeShippingThresholdINR = freeShippingThresholdUSD * USD_TO_INR;
  const shipping = getCartTotal() > freeShippingThresholdINR ? 0 : 9.99
  const tax = getCartTotal() * 0.08
  const total = getCartTotal() + shipping + tax

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm"
              >
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-contain bg-slate-50 rounded-lg"
                  />
                </Link>
                
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="font-semibold text-primary hover:text-accent transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-accent font-bold mt-1">{convertAndFormat(item.price)}</p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-slate-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-slate-50 rounded-l-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-slate-50 rounded-r-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-error hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-primary">
                    {convertAndFormat(item.price * item.quantity)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{convertAndFormat(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : convertAndFormat(shipping)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (8%)</span>
                  <span>{convertAndFormat(tax)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent">{convertAndFormat(total)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-sm text-slate-500 mb-4 bg-slate-50 p-3 rounded-lg">
                  Add {convertAndFormat(freeShippingThresholdINR - getCartTotal())} more for free shipping!
                </p>
              )}

              <Link to="/checkout" className="btn-primary w-full text-center block">
                Proceed to Checkout
              </Link>
              
              <button
                onClick={clearCart}
                className="w-full text-center text-slate-500 hover:text-error mt-4 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

