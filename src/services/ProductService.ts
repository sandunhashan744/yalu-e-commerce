import Product, { IProduct } from '../models/Product';

class ProductService {

    generateProductId(): string {
        const randomNumber = Math.floor(1 + Math.random() * 99999); // Generate a random number between 1 and 99999
        const paddedNumber = String(randomNumber).padStart(5, '0'); // Pad the number with leading zeros if necessary
        return `PROD-${paddedNumber}`;
    }

    // create a new product
    async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
        try {
            let productId: string;
            let isUnique = false;
    
            // Keep generating a new ID until a unique one is found
            do {
                productId = this.generateProductId();
                const existingProduct = await Product.findOne({ productId });
                if (!existingProduct) {
                    isUnique = true;
                }
            } while (!isUnique);

            const product = new Product({ ...productData, productId });
            await product.save();
            return product;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to create product: ${error.message}`);
            } else {
                throw new Error('Unable to create product: An unknown error occurred');
            }
        }
    }

    // View a product by its ID
    async getProductById(productId: string): Promise<IProduct | null> {
        try {
            const product = await Product.findOne({ productId });
            return product;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to get product: ${error.message}`);
            } else {
                throw new Error('Unable to get product: An unknown error occurred');
            }
        }
    }
       // Get all products
    async getAllProducts(): Promise<IProduct[]> {
        try {
            const products = await Product.find(); // Retrieve all products
            return products;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to get products: ${error.message}`);
            } else {
                throw new Error('Unable to get products: An unknown error occurred');
            }
        }
    }

    // Update a product by its ID
    async updateProduct(productId: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
        try {
            const product = await Product.findOneAndUpdate(
                { productId },
                updateData,
                { new: true } // Return the updated document
            );
            return product;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to update product: ${error.message}`);
            } else {
                throw new Error('Unable to update product: An unknown error occurred');
            }
        }
    }

    // Delete a product by its ID
    async deleteProduct(productId: string): Promise<IProduct | null> {
        try {
            const product = await Product.findOneAndDelete({ productId });
            return product;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unable to delete product: ${error.message}`);
            } else {
                throw new Error('Unable to delete product: An unknown error occurred');
            }
        }
    }
}

export default new ProductService();
