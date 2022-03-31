const express = require('express');
const taskRouter = express.Router();

const { authenticate } = require('../middleware/authenticate');
const taskController = require('../controllers/taskController');

taskRouter.post('/add', authenticate, taskController.addTask);
taskRouter.post('/addComment', authenticate, taskController.addComment);
taskRouter.get('/all', authenticate, taskController.getAllTasks);
taskRouter.patch('/assignworker', authenticate, taskController.assignWorker);
taskRouter.patch('/deadline', authenticate, taskController.deadline);
taskRouter.delete('/delete/:tId', authenticate, taskController.delete);
taskRouter.patch('/updatedesctitle', authenticate, taskController.updateDescTitle);
taskRouter.patch('/updatepriority', authenticate, taskController.updatePriority);
taskRouter.patch('/updatereporter', authenticate, taskController.updateReporter);
taskRouter.patch('/updatestatus', authenticate, taskController.updateStatus);
taskRouter.get('/usertasks', authenticate, taskController.getUserTasks);

module.exports = { taskRouter };