import express from "express";
import landingRouter from "./landingSite.route.js";
import bannerRouter from "./banner.route.js";
import categoryRouter from "./category.route.js";
import subCategoryRouter from "./subCategory.route.js";
import productRouter from "./product.route.js";
import userRouter from "./user.route.js";
import orderRouter from './order.route.js';
import errorsRouter from './errors.routes.js';
import paymentRouter from './payment.route.js';
import adminRouter from './admin.routes';

var router = express.Router();
import authenticateToken from "../utility/jwt/middlewareAuthentication.js";

router.use("/banner", authenticateToken, bannerRouter);
router.use("/category", authenticateToken, categoryRouter);
router.use("/sub-category", authenticateToken, subCategoryRouter);
router.use("/product", authenticateToken, productRouter);
router.use("/user", authenticateToken, userRouter);
router.use('/order', authenticateToken, orderRouter);
router.use('/errors', authenticateToken, errorsRouter);
router.use('/payment', authenticateToken, paymentRouter);
router.use('/admin',  adminRouter);
router.use("/", landingRouter);

export default router;
