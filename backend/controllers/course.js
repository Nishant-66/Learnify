const Course = require("../models/course");
const User=require('../models/user')
const EnrolledCourse=require('../models/enrolledCourse');
const CourseChapterMap=require('../models/courseChapterMap');
const addCourse=async(req,res)=>{
    try{
    const user=req.user;
    const{title,description,thumbnail,price}=req.body;
    if (!title || !description || !thumbnail || !price) {
    return res.status(400).json({ message: "All fields are required" });
     }

    const newCourse= new Course({
        title,
        description,
        thumbnail,
        price
    })

    await newCourse.save();
    const courses=await EnrolledCourse.create({userId:user,courseId:newCourse._id});
    res.json({
        message:"Course Added succesfully",
        data:newCourse,courses,
    })

    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
}
const getAllCourse=async(req,res)=>{
    try{
     const allCourses=await Course.find();
     if(allCourses.length==0) return res.send("No Course Found ")
     res.json({
        data:allCourses,
    })

    }
    catch(err){
       res.status(400).send("ERROR: " + err.message);
    }
}
const getCourseByID=async(req,res)=>{
    try{
        const {id}=req.params;
        const singleCourses=await Course.findById(id);
        if(!singleCourses) throw new Error("Course not found ");
        res.json({
        data:singleCourses,
         })
        

    }
    catch(err){
       res.status(400).send("ERROR: " + err.message);
    }
}
const updateCourse=async(req,res)=>{
    try{
        const {id}=req.params;
        const singleCourses=await Course.findById(id);
        if(!singleCourses) throw new Error("Course not found ");
        const{title,description,thumbnail,price}=req.body;
        const updatedCourse=await Course.findByIdAndUpdate(id,{title,description,thumbnail,price},{ new: true, runValidators: true });
        res.json({
            message:"Course updated successfully",
        data:updatedCourse,
         })
        

    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
}

const deleteCourse=async(req,res)=>{
    try{
        const {id}=req.params;
        const singleCourses=await Course.findById(id);
        if(!singleCourses) throw new Error("Course not found ");
        
        const deletedCourse=await Course.findByIdAndDelete(id);
            await CourseChapterMap.deleteMany({courseId: id});
            await EnrolledCourse.deleteMany({courseId: id});
        res.json({
            message:"Course Deleted successfully",
        
         })
        

    }
    catch(err){
       res.status(400).send("ERROR: " + err.message);
    }
}

const getEnrolledcourse=async(req,res)=>{
    try{
        const user=req.user;
        const courses= await EnrolledCourse.find({ userId: user }).populate("courseId") ;
        res.json({
            message:"All Enrolled courses of user",
            data:courses,
        });

    }
    catch(err){
         res.status(400).send("ERROR : " + err.message);
    }

}

module.exports={
    addCourse,
    getAllCourse,
    getCourseByID,
    updateCourse,
    deleteCourse,
    getEnrolledcourse

}