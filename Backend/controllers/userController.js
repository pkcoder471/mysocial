const {validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require('bcrypt');

module.exports.createUser = async (req,res)=>{

    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({email:req.body.email});

        if(user){
            return res.status(400).json({error:"sorry user with this email address already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.password,salt);

        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:pass
        });

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some Error occured");
    }
}

module.exports.login = async (req,res)=>{

    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({email:req.body.email});

        if(!user){
            return res.status(400).json({error:"try to login with correct credentials"});
        }

        const passwordCompare = bcrypt.compare(req.body.password,user.password);

        if(!passwordCompare){
            return res.status(400).json({error:"try to login with correct credentials"});
        }
        
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some Error occured");
    }
}