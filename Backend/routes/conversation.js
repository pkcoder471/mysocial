const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController')
const fetchUser = require('../middlewares/fetchuser')

router.post('/',fetchUser,conversationController.newconv)
router.get('/:userId',fetchUser,conversationController.getconv)
router.get('/find/:firstUserId/:secondUserId',fetchUser,conversationController.getconvnew)

module.exports = router;