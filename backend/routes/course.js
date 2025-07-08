const express=require('express');
const router=express.Router();
const { addCourse,getAllCourse,getCourseByID,updateCourse,deleteCourse}=require('../controllers/course');
console.log({ addCourse, getAllCourse, getCourseByID, updateCourse, deleteCourse });

const { userAuth,educatorAuth}=require('../middleware/userAuth');
router.get('/',getAllCourse);
router.get('/:id',getCourseByID);
router.post('/educator/course', userAuth, educatorAuth, addCourse);
router.put('/educator/course/:id', userAuth, educatorAuth, updateCourse);
router.delete('/educator/course/:id', userAuth, educatorAuth, deleteCourse);

module.exports = router;