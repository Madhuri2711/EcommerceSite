import express from 'express';
import PaymentController from '../controllers/payment.controller.js';

const paymentRouter = express.Router();
const paymentController = new PaymentController();

paymentRouter.get('/', paymentController.get);
paymentRouter.put('/:id', paymentController.updatePaymentCheckout)
export default paymentRouter;
