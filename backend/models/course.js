const mongoose=require('mongoose');
const validator=require('validator');
const courseSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isLength(value,{max:100})){
                throw new Error("Title must be at most 100 character long ")

            }
        }

    },
    description:{
        type:String,
        required:true,
        validate(value){
            const wordCount = value.trim().split(/\s+/).length;
            if (wordCount > 100) {
            throw new Error('Description must be at most 100 words.');
            }
        }
    },
    thumbnail:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true,
        min: [1, 'Price must be at least 1'],
       
    }


},{
    timestamps:true
});

module.exports=mongoose.model('Course',courseSchema);