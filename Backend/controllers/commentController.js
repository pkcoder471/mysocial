const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports.createcomment = async (req,res)=>{
        try {
            let post = await Post.findById(req.params.id);

            if(!post){res.status(404).json({error:"not found!"})};

            let comment = await Comment.create({
                content:req.body.content,
                user:req.user.id,
                post:req.params.id
            })

            return res.json(comment);

        } catch (err) {
            console.log(err);
            return res.status(500).send("Some Error occured");
        }
}