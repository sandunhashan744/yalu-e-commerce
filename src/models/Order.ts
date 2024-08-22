import { Schema, model, Document } from 'mongoose';

interface IOrderItem {
    productId: string;
    quantity: number;
    price: number;
}

interface IOrder extends Document {
    orderId: string;
    userId: string;  // Add userId to link the order to a user
    items: IOrderItem[];
    totalPrice: number;
    createdAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const OrderSchema = new Schema<IOrder>({
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },  // Add userId field
    items: [OrderItemSchema],
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Order = model<IOrder>('Order', OrderSchema);

export default Order;
export type { IOrder, IOrderItem };
