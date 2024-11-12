require('dotenv').config()
const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const cors=require('cors');

mongoose.connect(process.env.MONGO_DB_KEY)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(3000,()=>{
    console.log('the server is running');
})