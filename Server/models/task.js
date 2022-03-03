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
            type: String,
            default:''
        },
        id: {
            type: String,
            defaukt:''
        }
    },
    assignee: {
        name: {
            type: String,
            default:''
        },
        id: {
            type: String,
            default:''
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
    priority: {
        type: Number,
        default: 1
    }
})

var Task = mongoose.model('Task', TaskSchema);

module.exports = { Task };