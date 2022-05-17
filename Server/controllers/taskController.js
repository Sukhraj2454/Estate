const { Task } = require('../models/task');
const _ = require('lodash');
const mongoose = require('mongoose');
const { json } = require('express/lib/response');

// Add New Task
module.exports.addTask = (req, res, next) => {
    var task = req.body;
    var user = req.user
    task.reporter = {
        'name': user.name,
        'id': user._id
    }
    task.taskId = task.category.substring(0, 4).toUpperCase() + "-" + (Date.now() % 100000);
    task.createdOn = new Date();
    var obj = new Task(task)
    obj.save().then(() => {
        res.status(200).json({ 'message': "Task Added Successfully." })
    }).catch(err => next(err));
}

// Add Comment
module.exports.addComment = (req, res, next) => {

    const taskId = mongoose.Types.ObjectId(req.body.tId);
    var comment = {
        userId: req.user._id,
        userName: req.user.name,
        message: req.body.message,
        date: new Date()
    }
    Task.findOne({ _id: taskId }).then(task => {

        if (!task.comments)
            task.comments = [];
        task.comments.unshift(comment);
        task.save().then(() => {
            res.send(comment);
        }, () => {
            let er = new Error("No Data Found.")
            er.message = 'Not a Valid Request.'
            er.statusCode = 404
            throw (er);
        });
    }).catch(err => {
        next(err);
    });
}

// Add job to Job Card
module.exports.addJob = (req, res, next) => {

    const taskId = mongoose.Types.ObjectId(req.body.tId);
    const body = req.body;
    console.log(body)
    const job = {
        job: body.title,
        assignee: body.assignee,
        status: 'In Progress'
    }
    Task.findOne({ _id: taskId }).then(task => {
        if (!task) {
            const er = new Error("Task Not Found")
            next(er)
        }
        else {
            task.jobCard.push(job);
            task.save().then(tsk => res.json({ 'message': 'Job Added to JobCard.' }))
        }
    })
}

// Assign or Update Worker to Task
module.exports.assignWorker = (req, res, next) => {

    const assignee = req.body.assignee;
    const taskId = req.body.id ? mongoose.Types.ObjectId(req.body.id) : null;
    if (req.user.desig === 'Worker' || req.user.desig === 'Faculty' || req.user.desig === 'Non Faculty') {
        const er = new Error("Access Denied! Only Admins can Assign Workers")
        er.statusCode = 403;
        next(er);
    }
    else if (!assignee || !taskId) {
        let er = new Error("No Data Found.")
        er.message = 'Not a Valid Request.'
        er.statusCode = 404
        next(er)
    }
    else {
        Task.updateOne({ _id: taskId },
            {
                assignee: assignee
            })
            .then((ret) => {
                if (ret.modifiedCount === 0) {
                    let err = Error("No Modification Done")
                    err.statusCode = 200
                    throw (err)
                }
                else
                    res.status(200)
                        .json({ "message": "Assignee Added." })
            }, (err) => {
                let er = new Error("Could Not Add Assignee.");
                er.data = err;
                throw (er)
            })
            .catch(err => {
                next(err)
            })
    }
}

// Complete Job from worker
module.exports.changeJobStatus = (req, res, next) => {
    const body = req.body;
    if (req.user === 'Faculty' || req.user === 'Non Faculty') {
        const er = new Error('Access Denied.');
        next(er)
    }
    else {
        const taskId = body.tId ? mongoose.Types.ObjectId(body.tId) : '';

        Task.findOne({ _id: taskId }).then(task => {
            if (task.jobCard[body.ind].status === 'Verified' || body.status === 'Verified') {
                const er = new Error(`Access Denied, Cannot Change Status to ${body.status}`);
                next(er);
            }
            else if (req.user.desig === 'Worker' && task.jobCard[body.ind].assignee.id !== req.user.id) {

                const er = new Error('Access Denied, Not the Assigned User of Task.');
                next(er);
            }
            else {
                task.jobCard[body.ind].status = body.status;
                task.save().then((t) => res.json({ 'message': 'Job Status Updated.' }))
            }
        }).catch(er => next(er))
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
        const taskId = mongoose.Types.ObjectId(req.body.id);
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

// Delete Task
module.exports.delete = (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.params['id'])
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

// Get Task by Task Id
module.exports.findTask = (req, res, next) => {
    const tId = req.params['tId'];
    Task.findOne({ taskId: tId }).then((task) => {
        if (task)
            res.send(task);
        else res.json({ 'message': 'No Task Found.' });
    })
}

module.exports.getSummary = (req, res, next) => {
    const user = req.user;
    if (user.desig !== 'EE' && user.desig !== 'AE' && user.desig !== 'JE') {
        const er = new Error('Admin Access Needed.');
        er.statusCode = 401;
        next(er);
    }
    else {
        Task.count({ branch: user.Branch.name }).then(ct => {

            res.json({ count: ct });

        }).catch(er => next(er))
    }
}

// Get All Tasks
module.exports.getAllTasks = (req, res, next) => {
    const user = req.user;
    var cat = user.Branch.category;
    var subCat = cat.map(c => c.subCategory.map(sc => sc.name));
    cat = cat.map(c => c.name);
    subCat = _.flatten(subCat);
    // if (req.user.desig !== 'Admin') {
    //     let error = new Error("Admin Required")
    //     error.message = "Not Enough Access Rights. This Incident shall be Reported.";
    //     error.statusCode = 403
    //     next(error)
    // }
    // else {
    Task.find({
        $and: [{ branch: user.Branch.name },
        { category: { $in: cat } },
        { subCategory: { $in: subCat } },
        { status: { $nin: ['Reviewed'] } }]
    }).then((obj) => {
        // if (obj.length === 0) {
        //     let error = new Error("No Tasks")
        //     error.message = "No Tasks Found";
        //     error.statusCode = 404
        //     throw error;
        // }
        res.status(200).json(obj);
    })
        .catch(err => {
            next(err)
        })
    // }
}

// Change Description, Title, Location 
module.exports.updateDescTitle = (req, res, next) => {
    const id = req.body.id ? mongoose.Types.ObjectId(req.body.id) : null;
    const description = req.body.description;
    const location = req.body.location;
    const title = req.body.title;
    if (!id || !description || !title || !location) {
        let er = new Error("No ID Found.")
        er.message = 'Not a Valid Request.'
        er.statusCode = 404
        next(er)
    }
    else {
        Task.updateOne({ _id: id }, {
            title: title,
            description: description,
            location: location
        })
            .then((ret) => {
                if (ret.modifiedCount === 0) {
                    let err = Error("No Modification Done.")
                    err.statusCode = 200
                    throw (err)
                }
                else
                    res.json({ 'message': 'Task Description, Title and Location Information Updated' });
            }, (err) => {
                let er = new Error("Could Not Update Priority.");
                er.data = err;
                throw (er)
            })
            .catch(err => {
                next(err)
            })
    }
}

// Update Job in a task
module.exports.updateJob = (req, res, next) => {
    const body = req.body;
    const tId = body.tId ? mongoose.Types.ObjectId(body.tId) : null;

    if (req.user.desig === 'Faculty' || req.user.desig === 'Non Faculty') {
        const er = new Error("Access Denied.");
        next(er);
    }
    else if (req.user.desig === 'Worker' && body.assignee.id !== req.user._id) {
        const er = new Error("Only Assigned Worker can make changes.");
        next(er);
    }
    else {
        Task.findOne({ _id: tId }).then(task => {
            if (!task) {
                const er = new Error('No Task Found')
                next(er)
            }
            else {
                const status = task.jobCard[body.ind].status;
                if (status === 'Completed' || status === 'Verified') {
                    const er = new Error('Job Already Completed.')
                    er.statusCode = 403;
                    next(er);
                }
                else {
                    task.jobCard[body.ind].assignee = body.assignee;
                    task.jobCard[body.ind].job = body.jobTitle;
                    task.jobCard[body.ind].materialUsed = body.materialsUsed;
                    task.save().then(t => {
                        res.json({ 'message': 'Job Updated.' });
                    }).catch(er => next(er))
                }
            }
        }).catch(er => next(er))
    }


}
// Add  or update deadline
module.exports.updateDate = (req, res, next) => {
    const tId = req.body.tId ? mongoose.Types.ObjectId(req.body.tId) : null;
    const date = new Date(req.body.date);
    Task.findOne({ _id: tId }).then((task) => {
        if (task) {
            if (date.getTime() >= task.createdOn.getTime()) {
                task.deadline = date;
                task.save().then(() => {
                    res.json({ "message": "Deadline Added" });
                })
            }
            else {
                const er = new Error('Deadline cannot be set before the creation date.');
                throw (er)
            }
        }
        else {
            const er = new Error("Task Not found");
            throw (er)
        }
    }).catch(err => {
        next(err);
    });
}
// Change Priority
module.exports.updatePriority = (req, res, next) => {
    const id = req.body.id ? mongoose.Types.ObjectId(req.body.id) : null;
    const priority = (req.body.priority) === 'High' ? 2 : 1;
    if (!id || !priority) {
        let er = new Error("No ID Found.")
        er.message = 'Not a Valid Request.'
        er.statusCode = 404
        next(er)
    }
    else {
        Task.updateOne({ _id: id }, {
            priority: priority
        })
            .then((ret) => {
                if (ret.modifiedCount === 0) {
                    let err = Error("No Modification Done")
                    err.statusCode = 200
                    throw (err)
                }
                else
                    res.json({ 'message': 'Task Priority Updated' });
            }, (err) => {
                let er = new Error("Could Not Update Priority.");
                er.data = err;
                throw (er)
            })
            .catch(err => {
                next(err)
            })
    }
}


// Assign or Update Reporter
module.exports.updateReporter = (req, res, next) => {
    const id = req.body.id ? mongoose.Types.ObjectId(req.body.id) : null;
    const reporter = req.body.reporter;
    if (req.user.desig === 'Worker' || req.user.desig === 'Faculty' || req.user.desig === 'Non Faculty') {
        const er = new Error("Access Denied! Only Admins can Modify Reporters")
        er.statusCode = 403;
        next(er);
    }
    if (!id || !reporter) {
        let er = new Error("No ID Found.")
        er.message = 'Not a Valid Request.'
        er.statusCode = 404
        next(er)
    }
    else {
        Task.updateOne({ _id: id }, {
            reporter: reporter
        })
            .then((ret) => {
                if (ret.modifiedCount === 0) {
                    let err = Error("No Modification Done")
                    err.statusCode = 200
                    next(err)
                }
                else
                    res.json({ 'message': 'Reporter Updated' });
            }, (err) => {
                let er = new Error("Could Not Update Reporter.");
                er.data = err;
                next(er)
            })
            .catch(err => {
                next(err)
            })
    }
}
// Change Status
module.exports.updateStatus = (req, res, next) => {
    const id = req.body.id ? mongoose.Types.ObjectId(req.body.id) : null;
    const status = req.body.status;
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

// verify Job Completion
module.exports.verifyJobCompletion = (req, res, next) => {
    const user = req.user;
    const body = req.body;
    const tId = body.tId ? mongoose.Types.ObjectId(body.tId) : body.tId;
    Task.findOne({ _id: tId }).then(task => {
        if (task.jobCard[body.ind].status !== 'Completed') {
            const er = new Error('Job not Completed by Assignee.');
            next(er);
        }
        else if (user.id === task.reporter.id) {
            task.jobCard[body.ind].status = 'Verified';
            task.save().then(t => res.json({ 'message': 'Job Verified By User.' }));
        }
        else {
            const er = new Error('Access Denied.');
            er.statusCode = 403;
            next(er);
        }
    })
        .catch(er => next(er));
}

// Get Tasks created by a certain User
module.exports.getUserTasks = (req, res, next) => {
    const userId = req.params['id'] !== '2' ? mongoose.Types.ObjectId(req.params['id']) : req.user._id;
    Task.find({
        $and: [{ '$or': [{ 'assignee.id': userId }, { 'reporter.id': userId }] }, {
            status: { $nin: ['Reviewed'] }
        }]
    }).then((tasks) => {
        res.send(tasks)
    }, (err) => {
        console.log(err)
        let error = new Error("User Not Found")
        error.message = "Requested User Not Found"
        error.statusCode = 404
        error.data = err;
        throw error;
    }).catch(err => {
        next(err);
    })
}

module.exports.submitRating = (req, res, next) => {
    const tId = req.body.id ? mongoose.Types.ObjectId(req.body.id) : null;
    const stars = req.body.stars;
    const text = req.body.text;
    Task.findOne({ _id: tId }).then(task => {
        if (task.status === 'Reviewed') {
            const er = new Error("You have already reviwed the Service.")
            throw (er);
        }
        else if (task.status !== 'Completed') {
            const er = new Error("InComplete Task Cannot be Reviewed, Kindly Refresh Page.")
            throw (er);
        }
        else {
            task.rating.stars = stars;
            task.rating.text = text;
            task.status = 'Reviewed';
            task.save().then(() => {
                res.json({ message: 'Rating Submitted Sucessfully.' })
            }).catch(err => {
                const er = new Error(err);
                next(er);
            })
        }
    }).catch(err => {
        const er = new Error(err);
        next(er);
    })
}