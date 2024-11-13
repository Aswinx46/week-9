const express=require('express')
const admin_route=express();

const auth=require('../auth/adminauth')

const admincontroller=require('../controllers/admincontroller')

admin_route.post('/',admincontroller.insertAdmin)
admin_route.post('/admin/dashboard',auth.adminAuthToken,admincontroller.sendUser)

module.exports=admin_route 