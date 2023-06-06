import express from 'express';
import Orders from '../controllers/order.controller.js';

const orderRouter = express.Router();
const ordersController = new Orders();

orderRouter.get("/", ordersController.get);
orderRouter.get("/resend-label/:orderid", ordersController.resendShippingLabel)
orderRouter.put("/:id", ordersController.update);

export default orderRouter;
