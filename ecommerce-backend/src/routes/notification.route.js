
import express from 'express';
import NotificationController from '../controllers/notification.controller.js';

const notificationRouter = express.Router();
const notificationController = new NotificationController();

// Get notification product
notificationRouter.get('/', notificationController.get);

notificationRouter.get('/all-visible', notificationController.allVisible)

notificationRouter.post("/firebase", notificationController.sendFireBaseNotificationToMyDevice);

notificationRouter.post('/', notificationController.add)

notificationRouter.put("/:id", notificationController.update);

notificationRouter.get("/count", notificationController.getNonVisibleNotificationCount);

export default notificationRouter;