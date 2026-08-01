const mongoose = require('mongoose')

const tasksSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    task:{
        type:String,
        require:true
    },
    taskstatus:{
        type:Boolean,
        default:false
    }

},{timestamps:true})


module.exports = mongoose.model("Tasks",tasksSchema)