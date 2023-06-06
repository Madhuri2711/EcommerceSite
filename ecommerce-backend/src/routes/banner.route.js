import express from 'express';
import BannerController from '../controllers/banner.controller.js';
import upload from '../utility/fileUploader.js';

const bannerRouter = express.Router();
const bannerController = new BannerController();

// Add a new product
bannerRouter.post('/add', upload.single('image'), bannerController.addBanner);

bannerRouter.get('/', bannerController.getBanners)

export default bannerRouter;
