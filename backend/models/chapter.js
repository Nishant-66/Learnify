const mongoose=require('mongoose');
const chapterSchema=new mongoose.Schema({
    name:{
      type:String,
      required:true,
      validate(value){
        const word=value.trim().split(/\s+/).length;
        if(word>20){
            throw new Error("Chapter name can be at most 20 words");
        }
      }
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Chapter',chapterSchema);