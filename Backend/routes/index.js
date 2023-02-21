const express = require('express');
const router = express.Router();


router.use('/user',require('./user'));
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));
router.use('/conversation',require('./conversation'));
router.use('/message',require('./message'));


module.exports= router;
