import express from 'express';
import WishlistController from '../controllers/wishlist.controller.js';

const wishlistRouter = express.Router();
const wishlistController = new WishlistController();

// Get all wishlist
wishlistRouter.get('/', wishlistController.get);

// Create a new wishlist
wishlistRouter.post('/', wishlistController.add);

// Delete a particular wishlist
wishlistRouter.delete("/:product_id", wishlistController.delete);

export default wishlistRouter;
