import express from 'express';
import cartRoutes from './cartRoutes'; 
import productRoutes from './productRoutes'; 
import orderRoutes from './orderRoutes'; 

const router = express.Router();

// routes
router.use('/carts', cartRoutes);

router.use('/products', productRoutes);

router.use('/orders', orderRoutes);

export default router;
