import { Router }  from "express";
import ProductController from "../controllers/ProductController";
import CartController from "../controllers/CartController";

const shoppingRouter = Router();

//! Product Router

// Add new product
shoppingRouter.post("/product", ProductController.createProduct);

// Get product by id
shoppingRouter.get("/product/:productId", ProductController.viewProduct);

// Get all products
shoppingRouter.get("/product", ProductController.getAllProducts);

// Update product by id
shoppingRouter.put("/product/:productId", ProductController.updateProduct);

// Delete product by id
shoppingRouter.delete("/product/:productId", ProductController.deleteProduct);

//! Cart Routes

// Add product to cart
shoppingRouter.post('/cart/:cartId', CartController.addToCart);

// Remove product from cart
shoppingRouter.delete('/cart/:cartId/:productId', CartController.removeFromCart);

// View current cart
shoppingRouter.get('/cart/:cartId', CartController.viewCart);

// Update product quantity in cart
shoppingRouter.put('/cart/:cartId/:productId', CartController.updateQuantity);



export default shoppingRouter;