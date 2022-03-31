const express = require('express')
const userRouter = express.Router();
const userController = require('../controllers/userController');

const { authenticate } = require('../middleware/authenticate');

userRouter.post('/signup', userController.signUp);
userRouter.post('/login', userController.login);
userRouter.get('/getUser', authenticate, userController.getUser);
userRouter.get('/getCategories', userController.getCategories);
userRouter.get('/getUsers', authenticate, userController.getUsers);
userRouter.delete('/logout', authenticate, userController.logout);
module.exports = { userRouter };