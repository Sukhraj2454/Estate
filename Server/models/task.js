const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    type: {
        type: String,
        requried: true
    },
    title: {
        type: String,
        requried: true
    },
    taskId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 350,
        default: ""
    },
    branch: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    reporter: {
        name: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            defaukt: ''
        }
    },
    assignee: {
        name: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default: ''
        }
    },
    status: {
        type: String,
        default: 'To Do'
    },
    createdOn: {
        type: Date
    },
    deadline: {
        type: Date,
        min: this.createdOn
    },
    comments: [{
        userId: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        message: {
            type: String,
        },
    }],
    rating: {
        stars: {
            type: String,
            default: 0,
        },
        text: {
            type: String,
            default: ''
        }

    }
});

var Task = mongoose.model('Task', TaskSchema);

module.exports = { Task };