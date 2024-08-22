import { Request, Response } from 'express';
import OrderService from '../services/OrderService';

class OrderController {
    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            
            const { cartId } = req.params;
            const order = await OrderService.createOrder( cartId);
            res.status(201).json({ order });
        } catch (error) {
            res.status(500).json({ message: `Error creating order: ${error instanceof Error ? error.message : 'Unknown error'}` });
        }
    }
}

export default new OrderController();
