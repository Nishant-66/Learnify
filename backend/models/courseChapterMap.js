const mongoose=require('mongoose');
const courseChapterMap=new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true,
    },
    chapterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chapter',
        required:true,
    }
},{
    timestamps:true
})
courseChapterMapSchema.index({ courseId: 1, chapterId: 1 }, { unique: true });
module.exports=mongoose.model('CourseChapterMap',courseChapterMap);