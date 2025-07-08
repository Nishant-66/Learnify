const express=require('express');
const app=express();
const mongoDB=require('./config/database');
const dotenv=require('dotenv');
dotenv.config();
const cookieParser=require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
const port=process.env.PORT||3000;
const authRouter = require("./routes/auth");
app.use("/", authRouter);
mongoDB().then(()=>{
console.log("Datbase established ...");
app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})

}).catch((err)=>{
console.log("Connection not established",err);
})

