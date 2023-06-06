import express from 'express';
import CategoryController from '../controllers/public-category.controller';

const publicCategoryRouter = express.Router();
const categoryController = new CategoryController();

// Get all the category
publicCategoryRouter.get('/', categoryController.get);


export default publicCategoryRouter;
