const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const fetchUser = require('../middlewares/fetchuser');

router.post('/create/:id',fetchUser,commentController.createcomment);
router.delete('/delete/:id',fetchUser,commentController.deletecomment);
router.get('/getall/:id',fetchUser,commentController.getallcomment);
router.put('/like/:id',fetchUser,commentController.like);

module.exports = router;