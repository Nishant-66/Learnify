const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
     lastName:{
        type:String,
        trim:true,
    },
     emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("Please enter valid email");
        }
    },
     password:{
        type:String,
        required:true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Password which should include atleast one lowercase, one uppercase and one symbol...");
            }
        }
    },
    role:{
        type: String,
        enum: ['Student', 'Educator'],
        default: 'Student'
    }
     
},{
    timestamps:true,
}
);

userSchema.methods.getJwt=function(){
    const user=this;
    const token =jwt.sign({_id:this._id},process.env.secret,{expiresIn:'7d'});
    return token;
}
userSchema.methods.validatePassword=async function (password){
    const user=this;
    const isValidPassword=await bcrypt.compare(password,user.password);
    return isValidPassword;
}

module.exports=mongoose.model("User",userSchema);