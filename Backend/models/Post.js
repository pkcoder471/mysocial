const mongoose  = require("mongoose");
const {Schema} = mongoose;

const postSchema = new Schema({
    content:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    img:{
        type:String
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

module.exports = mongoose.model('post',postSchema);