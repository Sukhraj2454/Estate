const { Task } = require('../models/task');

const mongoose = require('mongoose');

// Get Tasks for a certain User
module.exports.getUserTasks = (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.params['uId'])
    User.find({ _id: id }).then((user) => {
        console.log(user)
    }, (err) => {
        let error = new Error("User Not Found")
        error.message = "Requested User Not Found"
        error.statusCode = 404
        error.data = err;
    }).catch(err => {
        next(err);
    })
    res.send(":DONE")
}

// Add New Task
module.exports.addTask = (req, res, next) => {
    var task = req.body;
    var user = req.user
    task.reporter = {
        'name': user.name,
        'id': user._id
    }
    task.createdOn = new Date();
    var obj = new Task(task)
    obj.save().then((ob) => {
        res.status(200).json({ 'message': "Task Added Successfully." })
    })
}

// Get All Tasks
module.exports.getAllTasks = (req, res, next) => {

    Task.find().then((obj) => {
        if (obj.length === 0) {
            let error = new Error("No Tasks")
            error.message = "No Tasks Found";
            error.statusCode = 404
            throw error;
        }
        res.status(200).json(obj);
    })
      .catch(err => {
          next(err)
      })
}


// Change Status
module.exports.updateStatus = (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.body.id)
    const status = req.body.status
    if (!id || !status) {
        let er = new Error("No ID Found.")
        er.message = 'Not a Valid Request.'
        er.statusCode = 404
        next(er)
    }
    else {
        Task.updateOne({ _id: id }, {
            status: status
        })
            .then((ret) => {
                if (ret.modifiedCount === 0) {
                    let err = Error("No Modification Done")
                    err.statusCode = 200
                    throw (err)
                }
                else
                    res.json({ 'message': 'Task Status Updated' });
            }, (err) => {
                let er = new Error("Could Not Update Staus");
                er.data = err;
                throw (er)
            })
            .catch(err => {
                next(err)
            })
    }
}

// Assign Worker to Task (Admin Only)
module.exports.assignWorker = (req, res, next) => {
    if (req.user.desig != 'Admin') {
        let error = new Error("Admin Required")
        error.message = "Not Enough Access Rights. This Incident shall be Reported.";
        error.statusCode = 403
        next(error)
    }
    else {
        const assigneeId = req.body.id;
        const taskId = mongoose.Types.ObjectId(req.body.taskId);
        const assigneeName = req.body.assigneeName;

        if (!assigneeId || !taskId) {
            let er = new Error("No Data Found.")
            er.message = 'Not a Valid Request.'
            er.statusCode = 404
            next(er)
        }
        else {
            Task.updateOne({ _id: taskId },
                {
                    "assignee.name": assigneeName,
                    "assignee.id": assigneeId
                })
                .then(() => {
                    res.status(200)
                        .json({ "message": "Assignee Added." })
                }, (err) => {
                    let er = new Error("Could Not Add Assignee");
                    er.data = err;
                    throw (er)
                })
                .catch(err => {
                    next(err)
                })
        }
    }
}


// Add Deadline
module.exports.deadline = (req, res, next) => {
    if (req.user.desig != 'Admin') {
        let error = new Error("Admin Required")
        error.message = "Not Enough Access Rights. This Incident shall be Reported.";
        error.statusCode = 403
        next(error)
    }
    else {
        const taskId = mongoose.Types.ObjectId(req.body.taskId);
        deadline = req.body.deadline
        if (!taskId || !deadline) {
            let er = new Error("No Data Found.")
            er.message = 'Not a Valid Request.'
            er.statusCode = 404
            next(er)
        }
        else {
            Task.updateOne({ _id: taskId },
                {
                    deadline: deadline
                })
                .then(() => {
                    res.status(200)
                        .json({ "message": "Deadline Added." })
                }, (err) => {
                    let er = new Error("Could Not Add Deadline");
                    er.data = err;
                    throw (er)
                })
                .catch(err => {
                    next(err)
                })
        }
    }
}


// Get Tasks for a certain User
module.exports.getUserTasks = (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.params['uId'])
    Task.find({ "assignee.id": id }).then((tasks) => {
        res.status(200).json(tasks)
    }, (err) => {
        let error = new Error("User Not Found")
        error.message = "Requested User Not Found"
        error.statusCode = 404
        error.data = err;
    }).catch(err => {
        next(err);
    })
}

// Delete Task
module.exports.delete = (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.params['tId'])
    Task.deleteOne({ _id: id }).then((result) => {
        if (result.deletedCount === 0) {
            let error = new Error("Error Not Found")
            error.message = "Task Not Found"
            error.statusCode = 404
            throw error
        }
        else {
            res.status(200).json({ 'message': "Task Removed." })
        }
    })
        .catch(err => {
            next(err)
        })
}
