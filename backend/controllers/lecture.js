const Lecture = require("../models/lecture");
const Chapter = require("../models/chapter");
const ChapterLectureMap=require('../models/chapterLectureMap');
const addLecture=async(req,res)=>{
    try{
     const {id}=req.params;
     const existingChapter= await Chapter.findById(id);
     if(!existingChapter) throw new Error ("No Chapter found");
     const {title,duration,url,free}=req.body;
     const newLecture=new Lecture({
        title,
        duration,
        url,
        free,
     });
     await newLecture.save();
     const newMapping= await ChapterLectureMap.create({
        lectureId:newLecture._id,
        chapterId:id

     })
     res.json({
        message:"Lecture added successfully",
        data:newLecture,newMapping
     })


    }
    catch(err){
       res.status(400).send("ERROR : " + err.message);
    }
}

const getLectureById=async(req,res)=>{
    try{
      const{id}=req.params;
      const lecture=await Lecture.findById(id);
      if(!lecture) throw new Error("Lecture Not found");
      res.json({
        message:"Lecture fetched successfully",
        data:lecture,
      })

    }
    catch(err){
      res.status(400).send("ERROR: " + err.message);
    }

}

const updateLecture=async(req,res)=>{
    try{
        const {id}=req.params;
        const singleLecture=await Lecture.findById(id);
        if(!singleLecture) throw new Error("Lecture not found ");
         const {title,duration,url,free}=req.body;
        const updatedLecture=await Lecture.findByIdAndUpdate(id,{title,duration,url,free},{ new: true, runValidators: true });
        res.json({
            message:"lecture updated successfully",
        data:updatedLecture,
         })
        

    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
}

const deleteLecture=async(req,res)=>{
    try{
        const {id}=req.params;
        const singleLecture=await Lecture.findById(id);
        if(!singleLecture) throw new Error("Lecture not found ");
        
        const deletedLecture=await Lecture.findByIdAndDelete(id);
        await ChapterLectureMap.deleteMany({lectureId:id});

        res.json({
            message:"Lecture Deleted successfully",
        
         })
        

    }
    catch(err){
       res.status(400).send("ERROR: " + err.message);
    }
}

module.exports={
    addLecture,
    getLectureById,
    updateLecture,
    deleteLecture



}
