const express = require('express');
const taskRouter = express.Router();

const { authenticate } = require('../middleware/authenticate');
const taskController = require('../controllers/taskController');

taskRouter.post('/add', authenticate, taskController.addTask);
taskRouter.post('/addComment', authenticate, taskController.addComment);
taskRouter.post('/addJob', authenticate, taskController.addJob);
taskRouter.get('/all', authenticate, taskController.getAllTasks);
taskRouter.patch('/assignworker', authenticate, taskController.assignWorker);
taskRouter.patch('/changeJobStatus', authenticate, taskController.changeJobStatus);
taskRouter.patch('/deadline', authenticate, taskController.deadline);
taskRouter.delete('/delete/:tId', authenticate, taskController.delete);
taskRouter.get('/findtask/:tId', authenticate, taskController.findTask);
taskRouter.get('/summary', authenticate, taskController.getSummary);
taskRouter.patch('/updatedate', authenticate, taskController.updateDate);
taskRouter.patch('/updatedesctitle', authenticate, taskController.updateDescTitle);
taskRouter.patch('/updateJob', authenticate, taskController.updateJob);
taskRouter.patch('/updatepriority', authenticate, taskController.updatePriority);
taskRouter.patch('/updatereporter', authenticate, taskController.updateReporter);
taskRouter.patch('/updatestatus', authenticate, taskController.updateStatus);
taskRouter.get('/usertasks/:id', authenticate, taskController.getUserTasks);
taskRouter.patch('/verifyJob', authenticate, taskController.verifyJobCompletion);
taskRouter.post('/submitrating', authenticate, taskController.submitRating);

module.exports = { taskRouter };