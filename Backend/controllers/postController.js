const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User')

//feed
module.exports.getallposts = async (req,res) =>{
    try {
        let currUser = await User.findById(req.user.id);
        let userPosts = await Post.find({user:req.user.id}).sort('-createdAt');

        const friendsPosts = await Promise.all(
            currUser.followings.map((friendId)=>{
                return Post.find({user:friendId});
            })
        ).sort('-createdAt');
        res.status(200).json(userPosts.concat(...friendsPosts));
    } catch (err) {
        console.log(err);
        return res.status(500).send("Some Error occured");
    }
}

//get posts of a particular user
module.exports.getposts = async (req,res) =>{
    try {
        let posts = await Post.find({user:req.params.id})
        .sort("-createdAt");

        res.json(posts);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Some Error occured");
    }
}

module.exports.create = async (req,res) =>{
    try {
        let post = new Post({
            content:req.body.content,
            user:req.user.id
        })

        let savedPost = await post.save();

        res.json({savedPost});
    } catch (err) {
        console.log(err);
        return res.status(500).send("Some Error occured");
    }
}

module.exports.deletePost = async (req,res) =>{
    try {
        let post = await Post.findById(req.params.id);
        if(!post){ return res.status(404).json({error:"not found!"})};

        if(post.user.toString()!==req.user.id){
            return res.status(401).json({error:"unauthorized!"});
        }

        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({post:req.params.id});
        res.json({success:"post has been deleted!"});
    } catch (err) {
        console.log(err);
        return res.status(500).send("Some Error occured");
    }
}

module.exports.like = async (req,res) =>{
    try {
        let post = await Post.findById(req.params.id);
        if(!post){ return res.status(404).json({error:"not found!"})};

        if(!post.likes.includes(req.user.id)){
            await post.likes.push(req.user.id);
            post.save();
            return res.json({success:"post has been liked!"});
        }
        else{
            await post.likes.pull(req.user.id);
            post.save();
            return res.json({success:"post has been disliked!"});
        }
        
    } catch (err) {
        console.log(err);
        return res.status(500).send("Some Error occured");
    }
}