import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  createProductReview,
  getProductReviews,
  deleteReview,
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/products", getAllProducts);
router.get("/product/:id", getProductDetail);

// Admin routes
const adminAuth = [isAuthenticatedUser, authorizeRoles("admin")];
router.post("/admin/product/new", ...adminAuth, createProduct);
router.put("/admin/product/:id", ...adminAuth, updateProduct);
router.delete("/admin/product/:id", ...adminAuth, deleteProduct);

// User routes
router.put("/review", isAuthenticatedUser, createProductReview);

router.get("/reviews", getProductReviews);
router.delete("/reviews", isAuthenticatedUser, deleteReview);

export default router;
