const asyncHandler = require('express-async-handler')
const userHelper = require('../helpers/userHelper')
const generateToken = require('../utils/generateToken')


const userSignup = asyncHandler(async(req, res)=>{
    userHelper.registerUser(req.body).then((result)=>{
        if(result.userExist){
            res.status(409).json({message: 'user already exist'})
        }
        else{
            res.status(201).json(result)
        }
    })
}) 

const userLogin = asyncHandler(async(req, res)=>{
    userHelper.loginUser(req.body).then((result)=>{
        if(result.user){
            result.user.token = generateToken(result.user._id)
            res.json(result.user)
        }
        else if(result.loginFailed){
            res.status(401).json({message: 'Invalid Email or Password !'})
        }
        else{
            res.status(404).json({message: 'Invalid Email or Password !'})
        }
    })
}) 

const applyForm = asyncHandler(async(req, res)=>{
    userHelper.applyForm(req.body).then((result)=>{
        if(result.userNotExist){
            res.status(404).json({message: "User not found, Can't apply"})
        }
        else{
            res.status(201).json(result)
        }
    })
}) 

const applicationDetails = asyncHandler(async(req, res)=>{
   
    userHelper.applicationDetails(req.body).then((result)=>{
        if(result.userNotExist){
            res.status(404).json({message: "User not found"})
        }
        else{
            res.status(200).json(result)
        }
    })
}) 

const adminLogin = asyncHandler(async(req, res)=>{
    userHelper.adminLogin(req.body).then((result)=>{
        if(result.admin){
            result.admin.token = generateToken(result.admin._id)
            res.json(result.admin)
        }
        else if(result.loginFailed){
            res.status(401).json({message: 'Invalid Email or Password !'})
        }
        else{
            res.status(404).json({message: 'Invalid Email or Password !'})
        }
    })
}) 

const allApplication = asyncHandler(async(req, res)=>{
   
    userHelper.allApplication().then((result)=>{
        if(result.noData){
            res.status(404).json({message: "No data found"})
        }
        else{
            res.status(200).json(result)
        }
    })
}) 

const changeStatus = asyncHandler(async(req, res)=>{
    userHelper.changeStatus(req.body).then((result)=>{
        if(result.userNotExist){
            res.status(409).json({message: 'Status not updated'})
        }
        else{
            res.status(201).json({message: 'Status updated successfully'})
        }
    })
}) 

module.exports = { userSignup, userLogin, applyForm, applicationDetails, adminLogin, allApplication, changeStatus }