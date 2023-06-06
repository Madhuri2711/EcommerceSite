import express from 'express';
import ErrorController from '../controllers/error.controller';
const errorsRouter = express.Router();
const errorController = new ErrorController();

errorsRouter.get('/', errorController.get);

export default errorsRouter;
