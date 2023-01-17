const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const fetchUser = require('../middlewares/fetchuser');

router.post('/create',fetchUser,postController.create);

module.exports = router;