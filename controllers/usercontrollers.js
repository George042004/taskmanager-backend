const express = require('express')
const Users = require('../models/usermodels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function register(req,res){
    const {name,email,password} = req.body
    try{

        const exist = await Users.findOne({email})
        if(exist)
        {
            return res.json({status:false, message:"user already exist"})
        }
        else{
            const hash = await bcrypt.hash(password,10)
            await Users.create({name:name,email:email,password:hash})
            return res.json({status:true,message:"registered successfully!"})
        }
    }
    catch(e){
            return res.json({status:false, message:e.message})
    }

}



async function login(req,res){

    const {email,password} = req.body

    const exist = await Users.findOne({email})
    if(!exist)
    {
        return res.json({status:false,message:"User not found"})
    }

    const pass = await bcrypt.compare(password, exist.password)
    if(!pass)
    {
        return res.json({status:false,message:"Incorrect password!"})
    }

    const token = jwt.sign({
        email:email
    },process.env.SECRECT_KEY,{
        expiresIn:'1h'
    })

    return res.json({status:true,message:"login successful!",token})
}



async function getdatafun(req,res){
    const email = req.user.email
    const data = await Users.findOne({email}).select('-password')
    if(data)
    {
        return res.json({status:true,message:[data]})
    }
    return res.json({status:false, message:"something went wrong!"})
}

async function updatepass(req,res){

    const email = req.user.email
    console.log(email)
    const {oldpass,newpass} = req.body
    const userexist = await Users.findOne({email})
    const passexist = await bcrypt.compare(oldpass,userexist.password)
    if(!passexist)
    {
        return res.json({status:false,message:"password is incorrect!"})
    }

    const hashedpass = await bcrypt.hash(newpass,10)
    await Users.findOneAndUpdate({email},{$set:{password:hashedpass}})
    return res.json({status:true,message:"password updated!"})
}


module.exports = {register, login, getdatafun, updatepass}