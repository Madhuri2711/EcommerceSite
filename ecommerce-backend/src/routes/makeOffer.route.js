import express from 'express';
import MakeOfferController from '../controllers/makeOffer.controller.js';

const makeOfferRouter = express.Router();
const makeOfferController = new MakeOfferController();

makeOfferRouter.post('/', makeOfferController.add);

makeOfferRouter.post('/seller/:notification_id', makeOfferController.acceptDecline);

makeOfferRouter.post('/again/:notification_id', makeOfferController.newMakeOffer);

export default makeOfferRouter;