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
const courseRouter=require('./routes/course');
const chapterRouter = require("./routes/chapter");
const lectureRouter=require('./routes/lecture');
app.use("/", authRouter);
app.use("/", courseRouter);
app.use("/", chapterRouter);
app.use("/", lectureRouter);
mongoDB().then(()=>{
console.log("Datbase established ...");
app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})

}).catch((err)=>{
console.log("Connection not established",err);
})

