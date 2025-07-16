const express = require('express');
const router = express.Router();

const {
  addLecture,
  getLectureById,
  updateLecture,
  deleteLecture
} = require('../controllers/lecture');

const { userAuth, educatorAuth } = require('../middleware/userAuth');


router.post('/educator/course/chapter/:id', userAuth, educatorAuth, addLecture);


router.get('/course/chapter/lecture/:id',userAuth, getLectureById);


router.put('/educator/course/chapter/lecture/:id', userAuth, educatorAuth, updateLecture);


router.delete('/educator/course/chapter/lecture/:id', userAuth, educatorAuth, deleteLecture);

module.exports = router;
