const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController')
const fetchUser = require('../middlewares/fetchuser')


router.post('/',messageController.add);
router.get('/:conversationId',messageController.get);

module.exports = router;