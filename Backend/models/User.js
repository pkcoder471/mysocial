const mongoose = require('mongoose');
const {Schema}  = mongoose;

const userSchema = new Schema({
     name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     password:{
        type:String,
        required:true
     },
     about:{
         type:String,
         default:""
     },
     city:{
         type:String,
         default:""
     },
     relationship:{
         type:String,
         default:""
     },
     profilePic:{
         type:String,
         default:""
     },
     coverPic:{
         type:String,
         default:""
     },
     followers: [
         {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
         }
     ],
     followings: [
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:'user'
      }
      ],
},
{
    timestamps:true
})

module.exports =  mongoose.model('user',userSchema);