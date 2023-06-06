import express from 'express';
import FilterController from '../controllers/filter.controller.js';

const publicfilterRouter = express.Router();
const filterController = new FilterController();

// Get filter product
publicfilterRouter.get('/', filterController.get);

// Get filter product
// publicfilterRouter.get('/brands', filterController.getBrands);

export default publicfilterRouter;
