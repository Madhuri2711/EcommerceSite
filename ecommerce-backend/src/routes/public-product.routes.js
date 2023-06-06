import express from 'express';
import publicProductController from '../controllers/public-product.controller.js';
import { addProductValidate } from '../validations/product.validation.js';
import upload from '../utility/fileUploader.js';

const publicProductRouter = express.Router();
const productController = new publicProductController();
//Get product count
publicProductRouter.post('/product-count', productController.countProduct)
// Get product by id
publicProductRouter.get('/:id', productController.getById);

// Get a products list
publicProductRouter.post('/', productController.get);
export default publicProductRouter;
