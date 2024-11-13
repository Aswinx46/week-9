const express=require('express')
const user_route=express()
const cors=require('cors')
user_route.use(cors())
const auth=require('../auth/userauth')
const admin_controller=require('../controllers/admincontroller')
const userController=require('../controllers/usercontoller')
const { modelName } = require('../models/usermodel')

user_route.use(express.json());
user_route.use(express.urlencoded({extended:true}));


user_route.post('/signup',userController.signup);
user_route.post('/signin',userController.signin,auth.authToken);
user_route.post('/profile',auth.authToken,userController.changeProfile)

module.exports=user_route