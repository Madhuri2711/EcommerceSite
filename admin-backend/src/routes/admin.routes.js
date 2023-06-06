import express from 'express';
import AdminController from '../controllers/admin.controller';

const adminRouter = express.Router();
const adminController = new AdminController();

adminRouter.post('/login',adminController.login)
adminRouter.get('/',adminController.getAdmin)
adminRouter.put('/:id',adminController.updateAdmin)
adminRouter.post('/forgot', adminController.forgotPassword);
adminRouter.post('/forgot-password-change', adminController.forgotPasswordChange);
adminRouter.get('/verifyToken', adminController.verifyToken);
adminRouter.post('/admin-send-mail', adminController.adminsendmail);



export default adminRouter;