const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/mysocial";


const connectTOMongo =()=>{

    mongoose.connect(mongoURI,()=>{
        console.log("Conncected to Mongo Successfully");
    })
     
}


module.exports= connectTOMongo;