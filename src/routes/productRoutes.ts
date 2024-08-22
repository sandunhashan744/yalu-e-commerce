import { Router }  from "express";
import ProductController from "../controllers/ProductController";

const router = Router();

// Add new product
router.post("/", ProductController.createProduct);

// Get product by id
router.get("/:productId", ProductController.viewProduct);

// Get all products
router.get("/", ProductController.getAllProducts);

// Update product by id
router.put("/:productId", ProductController.updateProduct);

// Delete product by id
router.delete("/:productId", ProductController.deleteProduct);


export default router;