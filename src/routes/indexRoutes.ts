import express from 'express';
import cartRoutes from './cartRoutes'; 
import productRoutes from './productRoutes'; 
// import orderRoutes from './orderRoutes'; 

const router = express.Router();

// routes
router.use('/cart', cartRoutes);

router.use('/product', productRoutes);

// router.use('/orders', orderRoutes);

export default router;
