const express = require('express')
const taskscontrollers = require('../controllers/taskscontrollers')
const auth = require('../middlewares/auth')

const router = express.Router()


router.post('/add',auth,taskscontrollers.add)
router.get('/gettasks',auth,taskscontrollers.gettasks)
router.delete('/deltask/:_id',taskscontrollers.deltask)
router.put('/taskstatus/:task',taskscontrollers.taskstatus)

module.exports = router