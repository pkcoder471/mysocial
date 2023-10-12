const express = require('express');
const connectTOMongo = require('./db');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
connectTOMongo();

const app = express();
port = process.env.PORT || 5000;
//it will redirect me to my img folder
app.use('/img',express.static(path.join(__dirname,"public/img")));

const dest = path.join(__dirname,"public/img");
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,dest);
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})

app.use(cors());
app.use(express.json()); 
const upload = multer({storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try {
        
        return res.status(200).json("file uploaded successfully")
    } catch (err) {
        console.log(err);
    }
})

app.delete("/api/delete/:imgname",(req,res)=>{
    try {
        fs.unlinkSync(path.join(__dirname,"public/img/",req.params.imgname));
        return res.status(200).json("file deleted successfully")
    } catch (err) {
        console.log(err);
    }
})
app.use('/api',require('./routes'));

app.listen(port,() =>{
    console.log(`server is running on ${port}`);
})