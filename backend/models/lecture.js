const mongoose=require ('mongoose');
const validator=require('validator');
const lectureSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        validate(value){
            const word= value.trim().split(/\s+/).length;
            if(word>20){
                throw new Error('Lecture title must be of atmost 20 words.');

            }
        }
    },
    duration:{
        type:Number,
        required:true,
    },
    url:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("lecture url is not valid url ")
            }
        }
    },
    free:{
        type:Boolean,
        required:true,
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Lecture',lectureSchema);