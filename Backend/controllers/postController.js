const Post = require('../models/Post');


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
        res.status(500).send("Some Error occured");
    }
}