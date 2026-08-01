const express = require('express')
const cors = require('cors')
const userroutes = require('./routes/userroutes')
const tasksroutes = require('./routes/taskroutes')
const dbs = require('./utils/db')

const server = express()
server.use(cors())
server.use(express.json())

server.use('/users',userroutes)
server.use('/tasks',tasksroutes)

server.listen((1111),()=>{
    console.log("server is running at 1111");
    
})

dbs()