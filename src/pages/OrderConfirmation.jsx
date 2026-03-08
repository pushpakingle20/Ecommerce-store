import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { convertAndFormat } from '../utils/currency'

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const storedOrder = localStorage.getItem('lastOrder')
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder))
    }
  }, [])

  if (!order) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h2 className="text-2xl font-bold text-primary mb-4">No order found</h2>
          <Link to="/products" className="text-accent hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  const orderDate = new Date(order.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Order Confirmed!</h1>
          <p className="text-slate-500">Thank you for your purchase. Your order has been placed successfully.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm mb-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <p className="text-sm text-slate-500">Order Number</p>
              <p className="font-bold text-primary">#{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Order Date</p>
              <p className="font-medium text-primary">{orderDate}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-500 mb-2">Shipping Address</p>
            <p className="text-primary">
              {order.shipping.firstName} {order.shipping.lastName}<br />
              {order.shipping.address}<br />
              {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}<br />
              {order.shipping.country}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500 mb-2">Items Ordered</p>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain bg-slate-50 rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-primary line-clamp-1">{item.title}</p>
                    <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">{convertAndFormat(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-primary">What's Next?</h3>
          </div>
          <p className="text-slate-600">
            We're preparing your order for shipment. You'll receive an email confirmation shortly 
            with tracking information once your order is on its way.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/products" className="btn-primary flex-1 text-center flex items-center justify-center gap-2">
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/" className="btn-secondary flex-1 text-center">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation

