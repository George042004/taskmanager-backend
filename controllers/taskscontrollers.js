const tasks = require('../models/tasksmodel')


async function add(req,res){

    const {task} = req.body
    const email = req.user.email

    const ok = await tasks.create({email,task})
    if(ok)
    {
        return res.json({status:true,message:"task added"})
    }
    return res.json({status:false,message:"unable to add task"})

}

async function gettasks(req,res){
    const email = req.user.email
    const taskdata = await tasks.find({email}).select('_id email task taskstatus')
    if(taskdata)
    {
        return res.json({status:true,message:[taskdata]})
    }
    return res.json({status:false,message:"unable to get data"})

}


async function deltask(req,res){
    const id = req.params._id
    console.log(req.params._id)
    const ok = await tasks.deleteOne({_id:id})
    if(ok)
    {
        return res.json({status:true,message:"task deleted!"})
    }
    return res.json({status:false,message:"unable to remove task"})
}

async function taskstatus(req,res){
    const{taskstatus} = req.body
    const task = req.params.task
    await tasks.findByIdAndUpdate({_id:task},{$set:{taskstatus:taskstatus}})
    return res.json({status:true})
}

module.exports = {add, gettasks, deltask, taskstatus}