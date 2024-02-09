const { validationResult } = require('express-validator');
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "blahsomething";

module.exports.createUser = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ success, error: "sorry user with this email address already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: pass
        });

        let data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some Error occured" });
    }
}

module.exports.login = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ success, error: "try to login with correct credentials" });
        }

        const passwordCompare = bcrypt.compare(req.body.password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ success, error: "try to login with correct credentials" });
        }

        let data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some Error occured" });

    }
}

module.exports.update = async (req, res) => {
    const { name, about, city, relationship, profilePic, coverPic } = req.body;
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "not found" });
        }
        if (req.params.id !== req.user.id) {
            return res.status(401).json({ error: "unauthorized" });
        }

        user.name = name;
        user.about = about;
        user.city = city;
        user.relationship = relationship;
        user.profilePic = profilePic;
        user.coverPic = coverPic;

        user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some Error occured" });

    }
}

module.exports.delete = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "not found" });
        }
        if (req.params.id !== req.user.id) {
            return res.status(401).json({ error: "unauthorized" });
        }

        await User.findByIdAndDelete(req.params.id);
        await Post.deleteMany({ user: req.params.id });
        await Comment.deleteMany({ user: req.params.id });

        res.status(200).json({ success: "Account has been deleted!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some Error occured" });

    }
}

module.exports.getUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "not found" });
        }

        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some Error occured" });

    }
}

module.exports.follow = async (req, res) => {
    let follow = false;
    try {
        if (req.params.id === req.user.id) {
            return res.status(403).json({ error: "You can't follow yourself!" })
        }
        let user = await User.findById(req.params.id);
        let curruser = await User.findById(req.user.id);

        if (!user.followers.includes(req.user.id)) {
            await user.followers.push(req.user.id);
            await curruser.followings.push(req.params.id);
            user.save();
            curruser.save();
            follow = true;
            res.status(200).json({ follow, success: "you followed a user" });
        }
        else {
            await user.followers.pull(req.user.id);
            await curruser.followings.pull(req.params.id);
            user.save();
            curruser.save();
            res.status(200).json({ follow, success: "you unfollowed a user" });

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some Error occured" });

    }
}
//todo profile picture
module.exports.getfriends = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        let friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );

        let friendList = [];

        friends.map((friend) => {
            const { _id, name, profilePic } = friend;
            friendList.push({ _id, name, profilePic });
        })

        res.json(friendList);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some Error occured" });

    }
}

module.exports.curruser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some Error occured" });

    }

}

module.exports.getallusers = async (req, res) => {
    const {q} = req.query;
    try {
        const users = await User.find({});
        
        const search=(data)=>{
        return data.filter((u) =>
            u.name.toLowerCase().includes(q)
        )
        }

        q ? res.json(search(users)) : res.json([]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some Error occured" });

    }

}