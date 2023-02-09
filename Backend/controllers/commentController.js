const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports.getallcomment = async (req,res)=>{
    try {
        let post = await Post.findById(req.params.id);

        if(!post){return res.status(404).json({error:"not found!"})};

        let comment = await Comment.find({post:req.params.id})
        .sort('-createdAt');

        return res.json(comment);

    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Some Error occured"});

    }
}

module.exports.createcomment = async (req,res)=>{
        try {
            let post = await Post.findById(req.params.id);

            if(!post){return res.status(404).json({error:"not found!"})};

            let comment = await Comment.create({
                content:req.body.content,
                user:req.user.id,
                post:req.params.id
            })

            return res.json(comment);

        } catch (err) {
            console.log(err);
            res.status(500).json({error:"Some Error occured"});

        }
}

module.exports.deletecomment = async (req,res)=>{
    try {
        let comment = await Comment.findById(req.params.id);

        if(!comment){return res.status(404).json({error:"not found!"})};

        if(comment.user.toString()!==req.user.id){
            return res.status(401).json({error:"unauthorized"});
        }

        await Comment.findByIdAndDelete(req.params.id);

        return res.status(200).json({success:"comment deleted!"});

    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Some Error occured"});

    }
}

module.exports.like = async (req,res) =>{
    try {
        let comment = await Comment.findById(req.params.id);
        if(!comment){ return res.status(404).json({error:"not found!"})};

        if(!comment.likes.includes(req.user.id)){
            await comment.likes.push(req.user.id);
            comment.save();
            return res.json({success:"comment has been liked!"});
        }
        else{
            await comment.likes.pull(req.user.id);
            comment.save();
            return res.json({success:"comment has been disliked!"});
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Some Error occured"});

    }
}