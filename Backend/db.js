const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()

const mongoURI = process.env.MONGO_URL;

 
const connectTOMongo =()=>{

    mongoose.connect(mongoURI,()=>{
        console.log("Conncected to Mongo Successfully");
    })
     
}


module.exports= connectTOMongo;