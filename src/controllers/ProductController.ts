// import { Request, Response } from "express";
// import ProductService from "../services/ProductService";
// import logger from '../utils/logger';

// //! create Product
// async function createProduct(req: Request, res: Response):Promise<void>{
//     try {
//         const product = await ProductService.createProduct(req.body);
//         res.status(201).json({ message: `Product created successfully ${product.productId}` });
//         logger.info(`Product created successfully`);

//     } catch (error) {       
//         res.status(500).json({ message: `Error creating product: ${error instanceof Error ? error.message : 'Unknown error'}` });
//         logger.error(`Error creating product: ${error instanceof Error ? error.message : 'Unknown error'}`);
//     }
// }

// //! view the product by id
// async function viewProduct(req: Request, res: Response): Promise<void>{
//     try {
//         const { productId } = req.params;
//         const product = await ProductService.getProductById(productId);
//         if (product) {
//             res.status(200).json({ product });
//             logger.info(`Retrieved product successfully with id: ${productId}`);
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//             logger.info(`Product not found for id: ${productId}`);
//         }
//     } catch (error) {
//         res.status(500).json({ message: `Error retrieving product: ${error instanceof Error ? error.message : 'Unknown error'}` });
//         logger.error(`Error retrieving product: ${error instanceof Error ? error.message : 'Unknown error'}`);
//     }
// }

// //! view all Products
// // async function viewAllProducts() {}
//   async function getAllProducts(req: Request, res: Response): Promise<void> {
//     try {
//         const products = await ProductService.getAllProducts();
//         res.status(200).json({ products });
//         logger.info(`Retrieved all products successfully`);
//     } catch (error) {
//         res.status(500).json({ message: `Error retrieving products: ${error instanceof Error ? error.message : 'Unknown error'}` });
//         logger.error(`Error retrieving products: ${error instanceof Error? error.message : 'Unknown error'}`);
//     }
// }

// //! update Product
// async function updateProduct(req: Request, res: Response): Promise<void>{
//     try {
//         const { productId } = req.params;
//         const updateData = req.body;
//         const updatedProduct = await ProductService.updateProduct(productId, updateData);
//         if (updatedProduct) {
//             res.status(200).json({ updatedProduct });
//             logger.info(`Product updated successfully`);
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//             logger.error(`Product not found for update: ${productId}`);
//         }
//     } catch (error) {
//         res.status(500).json({ message: `Error updating product: ${error instanceof Error ? error.message : 'Unknown error'}` });
//         logger.error(`Error updating product: ${error instanceof Error? error.message : 'Unknown error'}`);
//     }
// }

// //! delete Product
// async function deleteProduct(req: Request, res: Response): Promise<void>{
//     try {
//         const { productId } = req.params;
//         const deletedProduct = await ProductService.deleteProduct(productId);
//         if (deletedProduct) {
//             res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
//             logger.info(`Product deleted successfully with id: ${productId}`);
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//             logger.error(`Product not found for deletion: ${productId}`);
//         }
//     } catch (error) {
//         res.status(500).json({ message: `Error deleting product: ${error instanceof Error ? error.message : 'Unknown error'}` });
//         logger.error(`Error deleting product: ${error instanceof Error? error.message : 'Unknown error'}`);
//     }  
// }

// export default {
//     createProduct,
//     viewProduct,
//     getAllProducts,
//     updateProduct,
//     deleteProduct,
// }


import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import logger from '../utils/logger';

class ProductController {
    // Create a new product
    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await ProductService.createProduct(req.body);
            res.status(201).json({ message: `Product created successfully ${product.productId}` });
            logger.info(`Product created successfully`);
        } catch (error) {
            res.status(500).json({ message: `Error creating product: ${error instanceof Error ? error.message : 'Unknown error'}` });
            logger.error(`Error creating product: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    // View product by ID
    async viewProduct(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.params;
            const product = await ProductService.getProductById(productId);
            if (product) {
                res.status(200).json({ product });
                logger.info(`Retrieved product successfully with id: ${productId}`);
            } else {
                res.status(404).json({ message: 'Product not found' });
                logger.info(`Product not found for id: ${productId}`);
            }
        } catch (error) {
            res.status(500).json({ message: `Error retrieving product: ${error instanceof Error ? error.message : 'Unknown error'}` });
            logger.error(`Error retrieving product: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    // View all products
    async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await ProductService.getAllProducts();
            res.status(200).json({ products });
            logger.info(`Retrieved all products successfully`);
        } catch (error) {
            res.status(500).json({ message: `Error retrieving products: ${error instanceof Error ? error.message : 'Unknown error'}` });
            logger.error(`Error retrieving products: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    // Update a product
    async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.params;
            const updateData = req.body;
            const updatedProduct = await ProductService.updateProduct(productId, updateData);
            if (updatedProduct) {
                res.status(200).json({ updatedProduct });
                logger.info(`Product updated successfully`);
            } else {
                res.status(404).json({ message: 'Product not found' });
                logger.error(`Product not found for update: ${productId}`);
            }
        } catch (error) {
            res.status(500).json({ message: `Error updating product: ${error instanceof Error ? error.message : 'Unknown error'}` });
            logger.error(`Error updating product: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    // Delete a product
    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { productId } = req.params;
            const deletedProduct = await ProductService.deleteProduct(productId);
            if (deletedProduct) {
                res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
                logger.info(`Product deleted successfully with id: ${productId}`);
            } else {
                res.status(404).json({ message: 'Product not found' });
                logger.error(`Product not found for deletion: ${productId}`);
            }
        } catch (error) {
            res.status(500).json({ message: `Error deleting product: ${error instanceof Error ? error.message : 'Unknown error'}` });
            logger.error(`Error deleting product: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}

export default new ProductController();

