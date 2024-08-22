import Order, { IOrder, IOrderItem } from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';

class OrderService {
    async createOrder(userId: string, cartId: string): Promise<IOrder> {
        try {
            const cart = await Cart.findOne({ cartId });
            if (!cart) {
                throw new Error('Cart not found');
            }

            let totalPrice = 0;
            const orderItems: IOrderItem[] = [];

            for (const item of cart.items) {
                const product = await Product.findOne({ productId: item.productId });
                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`);
                }

                const itemPrice = product.price * item.quantity;
                totalPrice += itemPrice;
                orderItems.push({
                    productId: product.productId,
                    quantity: item.quantity,
                    price: itemPrice
                });

                // Reduce product stock
                product.stock -= item.quantity;
                if (product.stock < 0) {
                    throw new Error(`Insufficient stock for product ${product.productId}`);
                }
                await product.save();
            }

            const orderId = `ORD-${Date.now()}`;
            const order = new Order({
                orderId,
                userId,  // Assign userId to the order
                items: orderItems,
                totalPrice
            });

            await order.save();
            await Cart.deleteOne({ cartId });

            return order;
        } catch (error) {
            throw new Error(`Unable to create order: ${error.message}`);
        }
    }
}

export default new OrderService();