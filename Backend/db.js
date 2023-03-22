const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://pk471:pklid471@cluster0.spdib4y.mongodb.net/mysocial?retryWrites=true&w=majority";


const connectTOMongo =()=>{

    mongoose.connect(mongoURI,()=>{
        console.log("Conncected to Mongo Successfully");
    })
     
}


module.exports= connectTOMongo;