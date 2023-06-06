import express from 'express';
import authenticateToken from '../utility/jwt/middlewareAuthentication.js';
import authRouter from './auth.route.js';
import productRouter from './product.route.js';
import bannerRouter from './banner.route.js';
import categoryRouter from './category.route.js';
import subCategoryRouter from './subCategory.route.js';
import orderRouter from './order.route.js';
import wishlistRouter from './wishlist.route.js';
import cartRouter from './cart.route.js';
import commentRouter from './comment.routes.js';
import addressRouter from './address.route.js';
import filterRouter from './filter.route.js';
import paymentRouter from './payment.route.js';
import notificationRouter from './notification.route.js';
import userRouter from './user.route.js';
import makeOfferRouter from './makeOffer.route.js'
import canadaPostRouter from './canadaPost.route.js'
import inaniHubRouter from './inaniHub.route.js';
import walletRouter from './wallet.route.js';
import landingRouter from './landingSite.route.js';
import publicProductRouter from './public-product.routes'
import publicBannerRouter from './public-banner.route.js'
import publicCategoryRouter from './public-category.routes.js'
import publicSubCategoryRouter from './public-subcategory.routes'
import publicfilterRouter from './public-filter.routes'
var router = express.Router();

// router.use('/adminlogin', adminloginRouter);
router.use('/auth', authRouter);
router.use('/user', authenticateToken, userRouter)
// router.use('/product', authenticateToken, productRouter);
router.use('/product', productRouter);
router.use('/banner', authenticateToken, bannerRouter);
router.use('/category', authenticateToken, categoryRouter);
router.use('/sub-category', authenticateToken, subCategoryRouter);
router.use('/wishlist', authenticateToken, wishlistRouter);
router.use('/cart', authenticateToken, cartRouter);
router.use('/comment', authenticateToken, commentRouter);
router.use('/order', authenticateToken, orderRouter);
router.use('/address', authenticateToken, addressRouter);
router.use('/filter', authenticateToken, filterRouter);
router.use('/notification', authenticateToken, notificationRouter);
router.use('/make-offer', authenticateToken, makeOfferRouter);
router.use('/wallet', authenticateToken, walletRouter);
router.use('/inani-hub', authenticateToken, inaniHubRouter);
router.use('/public-category', publicCategoryRouter);
router.use('/public-subcategory', publicSubCategoryRouter);
router.use('/public-product', publicProductRouter);
router.use('/public-banner', publicBannerRouter);
router.use('/public-filter', publicfilterRouter);
router.use('/payment', paymentRouter);
router.use('/delivery', canadaPostRouter);
router.use('/', landingRouter);

export default router;
