const express = require('express');
const connectTOMongo = require('./db');

connectTOMongo();

const app = express();
port = 5000;


app.use(express.json()); 
app.use('/api',require('./routes'));

app.listen(port,() =>{
    console.log(`server is running on ${port}`);
})