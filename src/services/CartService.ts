import Cart, { ICart, ICartItem } from '../models/Cart';
import Product from '../models/Product';

class CartService {
    async addToCart(userId: string, productId: string, quantity: number): Promise<ICart> {
        try {
            const product = await Product.findOne({ productId });
            if (!product) {
                throw new Error('Product not found');
            }

            let cart = await Cart.findOne({ cartId: userId });
            if (!cart) {
                cart = new Cart({ cartId: userId, items: [] });
            }

            const existingItem = cart.items.find(item => item.productId === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Unable to add to cart: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async removeFromCart(userId: string, productId: string): Promise<ICart> {
        try {
            const cart = await Cart.findOne({ cartId: userId });
            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.items = cart.items.filter(item => item.productId !== productId);
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Unable to remove from cart: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async viewCart(userId: string): Promise<ICart | null> {
        try {
            const cart = await Cart.findOne({ cartId: userId });
            return cart;
        } catch (error) {
            throw new Error(`Unable to view cart: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async updateQuantity(userId: string, productId: string, quantity: number): Promise<ICart> {
        try {
            const product = await Product.findOne({ productId });
            if (!product) {
                throw new Error('Product not found');
            }

            const cart = await Cart.findOne({ cartId: userId });
            if (!cart) {
                throw new Error('Cart not found');
            }

            const item = cart.items.find(item => item.productId === productId);
            if (item) {
                item.quantity = quantity;
                if (quantity <= 0) {
                    cart.items = cart.items.filter(item => item.productId !== productId);
                }
            } else if (quantity > 0) {
                cart.items.push({ productId, quantity });
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Unable to update cart: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}

export default new CartService();
