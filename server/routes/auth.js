import express from 'express';
import { users } from '../data/products.js';

const router = express.Router();

// POST /api/auth/register - Register new user
router.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    email,
    password, // In production, this should be hashed
    name,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({ 
    message: 'Registration successful',
    user: userWithoutPassword,
    token: `mock-jwt-token-${newUser.id}`
  });
});

// POST /api/auth/login - Mock login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  res.json({ 
    message: 'Login successful',
    user: userWithoutPassword,
    token: `mock-jwt-token-${user.id}`
  });
});

export default router;

