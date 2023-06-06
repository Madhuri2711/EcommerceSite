import express from 'express';
import UserController from '../controllers/user.controller.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/', userController.get);
userRouter.put('/:id',userController.activeAndDeactive)
userRouter.put('/isdelete/:id',userController.isDelete)
userRouter.get('/:id',userController.getById)

export default userRouter;
