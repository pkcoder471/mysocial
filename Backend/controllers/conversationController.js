const Conversation = require('../models/Conversation')

module.exports.newconv = async (req,res) =>{
    const newConversation = new Conversation({
        members:[req.body.senderId,req.body.receiverId],
    })
    try {
        const savedConversation = await newConversation.save();
        return res.status(200).json(savedConversation);
    } catch (err) {
    return res.status(500).json({error:"Internal Server error!"})
    }
}

module.exports.getconv = async (req,res) =>{
    
    try {
        const conversation = await Conversation.find({
            members:{$in:[req.params.userId]},
        })
        return res.status(200).json(conversation);
    } catch (err) {
    return res.status(500).json({error:"Internal Server error!"})
    }
}