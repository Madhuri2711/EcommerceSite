import express from 'express';
import CategoryController from '../controllers/category.controller.js';
import upload from '../utility/fileUploader.js';

const categoryRouter = express.Router();
const categoryController = new CategoryController();

categoryRouter.get('/', categoryController.get);
categoryRouter.get('/:id', categoryController.getById);
categoryRouter.post('/add', categoryController.add);
categoryRouter.delete('/:id',categoryController.deleteCategory)
categoryRouter.put('/:id',categoryController.updateCategory)
export default categoryRouter;
