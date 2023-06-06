import express from 'express';
import publicSubCategoryController from '../controllers/public-subcategory.controller';

const publicSubCategoryRouter = express.Router();
const subCategoryController = new publicSubCategoryController();

// Get all the sub-category
publicSubCategoryRouter.get('/', subCategoryController.get);


export default publicSubCategoryRouter;
