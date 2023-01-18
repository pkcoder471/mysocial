const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const fetchUser = require('../middlewares/fetchuser');

router.post('/create/:id',fetchUser,commentController.createcomment);
module.exports = router;