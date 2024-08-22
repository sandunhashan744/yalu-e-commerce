import { Request, Response } from 'express';
import CartService from '../services/CartService';
import logger from '../utils/logger';

class CartController {
    async addToCart(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const { productId, quantity } = req.body;

            const cart = await CartService.addToCart(userId, productId, quantity);
            res.status(200).json({ cart });
            logger.info(`Product added to cart: userId=${userId}, productId=${productId}, quantity=${quantity}`);
        } catch (error) {
            res.status(500).json({ message: `Error adding to cart: ${error instanceof Error ? error.message : 'Unknown error'}` });
            logger.error(`Error adding to cart: ${error instanceof Error ? error.message : 'Unknown error'}`);

        }
    }

    async removeFromCart(req: Request, res: Response): Promise<void> {
        try {
            const { userId, productId } = req.params;
            const cart = await CartService.removeFromCart(userId, productId);
            res.status(200).json({ cart });
            logger.info(`Product removed from cart: userId=${userId}, productId=${productId}`);
        } catch (error) {
            res.status(500).json({ message: `Error removing from cart: ${error instanceof Error ? error.message : 'Unknown error'}` });
            logger.error(`Error removing from cart: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async viewCart(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const cart = await CartService.viewCart(userId);
            if (cart) {
                res.status(200).json({ cart });
                logger.info(`Cart viewed: userId=${userId}`);
            } else {
                res.status(404).json({ message: 'Cart not found' });
                logger.info(`Cart not found: userId=${userId}`);
            }
        } catch (error) {
            res.status(500).json({ message: `Error viewing cart: ${error instanceof Error ? error.message : 'Unknown error'}` });
            logger.error(`Error viewing cart: ${error instanceof Error? error.message : 'Unknown error'}`);
        }
    }

    async updateQuantity(req: Request, res: Response): Promise<void> {
        try {
            const { userId, productId } = req.params;
            const { quantity } = req.body;
            const cart = await CartService.updateQuantity(userId, productId, quantity);
            res.status(200).json({ cart });
            logger.info(`Cart updated: userId=${userId}, productId=${productId}, quantity=${quantity}`);

        } catch (error) {
            res.status(500).json({ message: `Error updating cart: ${error instanceof Error ? error.message : 'Unknown error'}` });
            logger.error(`Error updating cart: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }
}

export default new CartController();
