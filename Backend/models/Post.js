const mongoose  = require("mongoose");
const {Schema} = mongoose;

const postSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Post',postSchema);