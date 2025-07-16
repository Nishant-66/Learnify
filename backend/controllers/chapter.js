const Chapter = require("../models/chapter");
const Course = require("../models/course");
const CourseChapterMap=require('../models/courseChapterMap');
const ChapterLecturemap=require('../models/chapterLectureMap');
const addChapter=async(req,res)=>{
    try{
        const id=req.params.id;
        const existingcourse=await Course.findById(id);
        if(!existingcourse) throw new Error("No Course Found");

    const{name}=req.body;
    if (!name) {
    return res.status(400).json({ message: "All fields are required" });
     }
    const newChapter= new Chapter({
        name,
    })

    await newChapter.save();
    const CCM= await CourseChapterMap.create({
        courseId:id,
        chapterId:newChapter._id,
    })
    res.json({
        message:"Chapter Added succesfully",
        data:CCM,
        chapter:newChapter
    })

    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
}
const getAllChapter=async(req,res)=>{
    try{
     const {id}=req.params;
     const existingCourse=await Course.findById(id)
     if(!existingCourse) throw new Error("No Course Found ");
     const chapters =await CourseChapterMap.find({courseId:id}).populate('chapterId')
     res.json({
        message:"getting all the chapters of a particular course",
        data:chapters,
    })

    }
    catch(err){
       res.status(400).send("ERROR: " + err.message);
    }
}
const getChapterByID=async(req,res)=>{
    try{
        const {id}=req.params;
        const existingChapter=await Chapter.findById(id);
        if(!existingChapter) throw new Error("No Chapter found ");
        const lectures= await ChapterLecturemap.find({chapterId:id}).populate('lectureId');

        res.json({
        message:"getting all lectures of a particular chapter by its id",
        data:lectures,
        chapter:chapter,
         })
        

    }
    catch(err){
       res.status(400).send("ERROR: " + err.message);
    }
}
const updateChapter = async (req, res) => {
  try {
    const {id}=req.params;
    const {name}=req.body;

    const updated = await Chapter.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Chapter not found" });

    res.json({ message: "Chapter updated", data: updated });
  } catch (err) {
    res.status(400).json({ message: "ERROR: " + err.message });
  }
};


const deleteChapter=async (req, res) => {
  try {
    const {id}=req.params;

    const chapter=await Chapter.findByIdAndDelete(id);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    await CourseChapterMap.deleteMany({chapterId:id});
    await ChapterLectureMap.deleteMany({chapterId:id});

    res.json({ message: "Chapter and related mappings deleted" });
  } catch (err) {
    res.status(400).json({ message: "ERROR: " + err.message });
  }
};

module.exports={
    addChapter,
    getAllChapter,
    getChapterByID,
    updateChapter,
    deleteChapter



}