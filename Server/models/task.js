const mongoose = require('mongoose')
const validator = require('validator')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        requried: true
    },
    description: {
        type: String,
        maxlength: 350,
        default: ""
    },
    reporter: {
        name: {
            type: String
        },
        id: {
            type: String
        }
    },
    assignee: {
        name: {
            type: String
        },
        id: {
            type: String
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
    }
})

var Task = mongoose.model('Task', TaskSchema);

module.exports = { Task };