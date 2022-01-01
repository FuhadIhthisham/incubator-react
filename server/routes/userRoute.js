const express = require('express')
const { userSignup, userLogin, applyForm, applicationDetails, adminLogin, allApplication, changeStatus } = require('../controllers/userController')
const router = express.Router()

router.post('/signup', userSignup )

router.post('/login', userLogin)

router.post('/apply', applyForm)

router.post('/applicationDetails', applicationDetails)

router.post('/admin/login', adminLogin)

router.get('/admin/allApplication', allApplication)

router.post('/admin/changeStatus', changeStatus)

module.exports = router