import express from 'express';
import {
  getAllUsers,
  deleteUser,
  getAllListings,
  deleteListing,
  // getAllOrders,
 // deleteOrder,
} from '../controllers/adminController.js';
import { isAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

// User routes
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Listing routes
router.get("/listings", getAllListings);
router.delete("/listings/:id", deleteListing);

// Order routes
// router.get("/orders", getAllOrders);
//router.delete("/orders/:id", deleteOrder);

export default router;