import express from 'express';
import { orders } from '../data/products.js';

const router = express.Router();

// POST /api/orders - Create new order
router.post('/', (req, res) => {
  const { items, shipping, payment, user } = req.body;
  
  if (!items || !items.length) {
    return res.status(400).json({ message: 'Order must have at least one item' });
  }
  
  if (!shipping || !payment) {
    return res.status(400).json({ message: 'Shipping and payment information required' });
  }
  
  // Calculate total
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Create new order
  const newOrder = {
    id: orders.length + 1,
    orderNumber: `ORD-${Date.now()}`,
    items,
    shipping,
    payment,
    user,
    total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  
  res.status(201).json({ 
    message: 'Order created successfully',
    order: newOrder
  });
});

// GET /api/orders - Get all orders (for admin)
router.get('/', (req, res) => {
  res.json(orders);
});

// GET /api/orders/:id - Get single order
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  res.json(order);
});

export default router;

