const jwt = require('jsonwebtoken')
require('dotenv').config()


async function auth(req,res,next){

    const SECRECT_KEY = process.env.SECRECT_KEY
    const authHeaders = req.headers['authorization']
    if(!authHeaders){
        return res.json({status:false,message:"Access denied"})
    }
    try{
        const token = authHeaders.split(" ")
        const dec = await jwt.verify(token[1],SECRECT_KEY)
        req.user = dec 
        next()
    }
    catch(e){
        return res.json({status:false,message:e.message})

    }
}

module.exports = auth