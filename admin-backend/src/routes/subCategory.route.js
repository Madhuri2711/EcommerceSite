import express from 'express';
import SubCategoryController from '../controllers/subCategory.controller.js';
import upload from '../utility/fileUploader.js';

const subCategoryRouter = express.Router();
const subCategoryController = new SubCategoryController();


// Create a new sub-category
subCategoryRouter.post('/add',upload.single('img'), subCategoryController.add);
subCategoryRouter.put('/:id',upload.single('img'),subCategoryController.update)
subCategoryRouter.delete('/:id',subCategoryController.delete)
subCategoryRouter.get('/', subCategoryController.getAll);
subCategoryRouter.get('/:id', subCategoryController.get);

export default subCategoryRouter;
