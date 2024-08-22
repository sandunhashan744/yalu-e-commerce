import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
    productId: string;
    name: string;
    description: string;
    price: number;
    stock: number;
}

const ProductSchema = new Schema<IProduct>({
    productId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

const Product = model<IProduct>('Product', ProductSchema);

export default Product;
export type { IProduct };
