const mongoose=require('mongoose');
const mongoDB=async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI);
    }
    catch(err){
        console.log("Error while connecting to mongo",err);
    }

}
module.exports=mongoDB;