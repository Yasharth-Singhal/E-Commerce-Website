import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserDetail,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUser,
} from "../controllers/userController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();
const auth = isAuthenticatedUser;
const admin = (req, res, next) => authorizeRoles("admin")(req, res, next);

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.post("/logout", logoutUser);

// User routes
router.get("/me", auth, getUserDetail);
router.put("/password/update", auth, updatePassword);
router.put("/me/update", auth, updateProfile);

// Admin routes
router.get("/admin/users", auth, admin, getAllUsers);
router.get("/admin/user/:id", auth, admin, getSingleUser);
router.put("/admin/user/:id", auth, admin, updateUser);
router.delete("/admin/user/:id", auth, admin, deleteUser);

export default router;
