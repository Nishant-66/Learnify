const express=require('express');
const app=express();
const mongoDB=require('./config/database');
const dotenv=require('dotenv');
dotenv.config();
const port=process.env.PORT||3000;

mongoDB().then(()=>{
console.log("Datbase established ...");
app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
})

}).catch((err)=>{
console.log("Connection not established",err);
})

