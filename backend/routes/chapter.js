const express = require('express');
const router = express.Router();

const {
  addChapter,
  getAllChapter,
  getChapterByID,
  updateChapter,
  deleteChapter
} = require('../controllers/chapter');

const { userAuth, educatorAuth } = require('../middleware/userAuth');

router.post('/educator/course/:id', userAuth, educatorAuth, addChapter);


router.get('/course/:id',userAuth, getAllChapter);


router.get('/course/chapter/:id', getChapterByID);


router.put('/educator/course/chapter/:id', userAuth, educatorAuth, updateChapter);


router.delete('/educator/course/chapter/:id', userAuth, educatorAuth, deleteChapter);

module.exports = router;
