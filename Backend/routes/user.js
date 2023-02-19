const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchuser');

const userController = require('../controllers/userController');
const { body } = require('express-validator');

router.post('/createUser',[
    body('name','Enter a Valid name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],userController.createUser);

router.post('/login',[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],userController.login);

router.put('/update/:id',fetchUser,userController.update);
router.delete('/delete/:id',fetchUser,userController.delete);
router.get('/getUser/:id',fetchUser,userController.getUser);
router.put('/follow/:id',fetchUser,userController.follow);
router.get('/getfriends/:id',fetchUser,userController.getfriends);
router.get('/getCurruser',fetchUser,userController.curruser);
router.get('/getallusers',fetchUser,userController.getallusers);



module.exports= router;
