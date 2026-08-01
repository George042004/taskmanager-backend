const express = require('express')
const usercontrollers = require("../controllers/usercontrollers")
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/register',usercontrollers.register)
router.post('/login',usercontrollers.login)
router.get('/getdata',auth,usercontrollers.getdatafun)


module.exports = router