import express from 'express';
import CartController from '../controllers/CartController'; 

const router = express.Router();

// Add product to cart
router.post('/:userId', CartController.addToCart);

// Remove product from cart
router.delete('/:userId/:productId', CartController.removeFromCart);

// View current cart
router.get('/:userId', CartController.viewCart);

// Update product quantity in cart
router.put('/:userId/:productId', CartController.updateQuantity);

export default router;
