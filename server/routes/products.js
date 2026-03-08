import express from 'express';
import { products, categories } from '../data/products.js';

const router = express.Router();

// GET /api/products - List all products
router.get('/', (req, res) => {
  const { category, search, minPrice, maxPrice, sort } = req.query;
  
  let filteredProducts = [...products];
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  // Filter by search query
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.title.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }
  
  // Filter by price range
  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
  }
  
  // Sort products
  if (sort) {
    switch (sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name':
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
  }
  
  res.json(filteredProducts);
});

// GET /api/products/:id - Get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(product);
});

// GET /api/categories - List all categories
router.get('/categories/list', (req, res) => {
  res.json(categories);
});

export default router;

