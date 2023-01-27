const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const fetchUser = require('../middlewares/fetchuser');

router.post('/create',fetchUser,postController.create);
router.get('/getallposts',fetchUser,postController.getallposts);
router.get('/getposts/:id',fetchUser,postController.getposts);
router.delete('/delete/:id',fetchUser,postController.deletePost);
router.put('/like/:id',fetchUser,postController.like);


module.exports = router;