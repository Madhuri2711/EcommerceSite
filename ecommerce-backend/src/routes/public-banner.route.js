import express from 'express';
import BannerController from '../controllers/public-banner.controller';

const publicBannerRouter = express.Router();
const bannerController = new BannerController();


publicBannerRouter.get('/', bannerController.getBanners)

export default publicBannerRouter;
