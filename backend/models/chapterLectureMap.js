const mongoose=require('mongoose');
const chapterLectureMapSchema=new mongoose.Schema({
    lectureId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lecture',
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
chapterLectureMapSchema.index({ chapterId: 1, lectureId: 1 }, { unique: true });

module.exports=mongoose.model('ChapterLectureMap',chapterLectureMapSchema);