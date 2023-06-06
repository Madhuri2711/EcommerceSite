import express from 'express';
import UserController from '../controllers/user.controller.js';
import upload from '../utility/fileUploader.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/', userController.get);

userRouter.put('/profile', upload.single('image'), userController.update);

userRouter.put('/profile-edit', userController.updateInformation);

userRouter.put('/:user_id', userController.removeUser);

userRouter.get('/countries', userController.getCountries);

userRouter.get('/state/:country_id', userController.getStates);

userRouter.get('/city/:state_id', userController.getCities);

userRouter.get('/dashboard', userController.getDashboard);

userRouter.get('/profile/:user_id', userController.getProfile);

export default userRouter;
