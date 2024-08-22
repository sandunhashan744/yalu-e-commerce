import express from 'express';
import OrderController from '../controllers/OrderController'; // Adjust the import path as necessary

const router = express.Router();

// Create an order
router.post('/:cartId', OrderController.createOrder);

export default router;
