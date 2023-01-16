const {validationResult } = require('express-validator');
const User = require("../models/User");

module.exports.createUser = async (req,res)=>{

    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({email:req.body.email});

        if(user){
            return res.status(400).json("sorry user with this email address already exists");
        }

        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        });

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some Error occured");
    }
}