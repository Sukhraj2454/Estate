const express = require('express')
const userRouter = express.Router();
const userController = require('../controllers/userController');

const { authenticate } = require('../middleware/authenticate');

userRouter.post('/signup', userController.signUp);
userRouter.post('/login', userController.login);
userRouter.get('/getUser/:id', authenticate, userController.getUser);
userRouter.get('/getCategories', userController.getCategories);
userRouter.get('/getbranch/:id', authenticate, userController.getBranch);
userRouter.get('/getUsers', authenticate, userController.getUsers);
userRouter.delete('/logout', authenticate, userController.logout);
userRouter.get('/summary', authenticate, userController.getSummary);
userRouter.patch('/updateBranch', authenticate, userController.updateBranchData);
userRouter.patch('/updateUser', authenticate, userController.updateUser);
module.exports = { userRouter };