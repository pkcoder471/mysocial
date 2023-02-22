const Message = require('../models/Message');

module.exports.add = async (req,res) =>{
    const newMessage = new Message(req.body)

    try {
        const savedMessage = await newMessage.save();
        return res.status(200).json(savedMessage);
    } catch (err) {

        return res.status(500).json({error:"Internal Server error!"})
        
    }

}

module.exports.get = async (req,res) =>{

    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        return res.status(200).json(messages);
    } catch (err) {

        return res.status(500).json({error:"Internal Server error!"})
        
    }

}