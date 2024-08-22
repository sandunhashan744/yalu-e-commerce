import { Schema, model, Document } from 'mongoose';

interface ICartItem {
    productId: string;
    quantity: number;
}

interface ICart extends Document {
    cartId: string;
    items: ICartItem[];
}

const CartItemSchema = new Schema<ICartItem>({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const CartSchema = new Schema<ICart>({
    cartId: { type: String, required: true, unique: true },
    items: [CartItemSchema]
});

const Cart = model<ICart>('Cart', CartSchema);

export default Cart;
export type { ICart, ICartItem };