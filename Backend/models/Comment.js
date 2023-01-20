const mongoose = require('mongoose');
const {Schema} =mongoose;

const commentSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    },
    likes: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ]
},
{
    timestamps:true
})

module.exports = mongoose.model('comment',commentSchema);