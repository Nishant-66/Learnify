const jwt=require('jsonwebtoken');
const User=require('../models/user');
const userAuth=async(req,res,next)=>{
    try{
    const {token}=req.cookies;
    if(!token){
        throw new Error("Please login ");
    }
    const decodedObj=jwt.verify(token,process.env.secret);
 
    const {_id}=decodedObj;
    const user= await User.findById(_id);
    if(!user){
        throw new Error("No such user exist in databse");

    }
    req.user=user;
    next();

    }
    catch(err){
      res.status(400).send("Authentication failed: " + err.message);
    }

}
const educatorAuth=(req,res,next)=>{
   try{
       if(req.user.role==='Educator'){
        next();
    }
    else throw new Error("You are not Educator");

   }
   catch(err){
    res.status(400).send("Authentication failed: " + err.message);
   }
}

module.exports={
    userAuth,
    educatorAuth
}