import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Flower data
const flowerTypes = [
  { name: 'Rose', emoji: '🌹', color: '#ff6b9d', description: 'Symbol of love and passion' },
  { name: 'Sunflower', emoji: '🌻', color: '#ffd93d', description: 'Bright and cheerful' },
  { name: 'Tulip', emoji: '🌷', color: '#ff6b9d', description: 'Perfect love and elegance' },
  { name: 'Cherry Blossom', emoji: '🌸', color: '#ffb7c5', description: 'Beauty and renewal' },
  { name: 'Hibiscus', emoji: '🌺', color: '#ff1744', description: 'Delicate beauty' },
  { name: 'Blossom', emoji: '🌼', color: '#fff176', description: 'Joy and happiness' },
  { name: 'Lotus', emoji: '💮', color: '#f8bbd0', description: 'Purity and enlightenment' },
  { name: 'Bouquet', emoji: '💐', color: '#ff4081', description: 'Celebration and gratitude' },
  { name: 'Daisy', emoji: '🌼', color: '#ffeb3b', description: 'Innocence and purity' },
  { name: 'Lily', emoji: '🌷', color: '#e91e63', description: 'Devotion and purity' }
];

// Generate flower cards
const generateCards = () => {
  const cards = [];
  for (let i = 0; i < 100; i++) {
    const flower = flowerTypes[i % flowerTypes.length];
    cards.push({
      id: i + 1,
      ...flower
    });
  }
  return cards;
};

const flowerCards = generateCards();

// Get all flower cards (protected route)
router.get('/', verifyToken, (req, res) => {
  try {
    res.json({
      success: true,
      count: flowerCards.length,
      data: flowerCards
    });
  } catch (error) {
    console.error('Error fetching flowers:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching flowers' 
    });
  }
});

// Get single flower card by ID (protected route)
router.get('/:id', verifyToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const card = flowerCards.find(c => c.id === id);
    
    if (!card) {
      return res.status(404).json({ 
        success: false, 
        message: 'Flower card not found' 
      });
    }
    
    res.json({
      success: true,
      data: card
    });
  } catch (error) {
    console.error('Error fetching flower:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching flower' 
    });
  }
});

// Get flower types
router.get('/types/all', verifyToken, (req, res) => {
  try {
    res.json({
      success: true,
      count: flowerTypes.length,
      data: flowerTypes
    });
  } catch (error) {
    console.error('Error fetching flower types:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching flower types' 
    });
  }
});

export default router;


