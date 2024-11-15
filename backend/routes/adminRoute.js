const express=require('express')
const admin_route=express();

const auth=require('../auth/adminauth')

const admincontroller=require('../controllers/admincontroller')

admin_route.post('/',admincontroller.adminLogin)
admin_route.get('/dashboard',auth.adminAuthToken,admincontroller.sendUser)
admin_route.post('/edituser',auth.adminAuthToken,admincontroller.edituser)
admin_route.post('/delete',auth.adminAuthToken,admincontroller.deleteUser)
admin_route.post('/addUser',auth.adminAuthToken,admincontroller.insertUser)
admin_route.post('/search',auth.adminAuthToken,admincontroller.searchUser)
module.exports=admin_route 