const express = require('express');
const connectTOMongo = require('./db');
const cors = require('cors');

connectTOMongo();

const app = express();
port = 5000;

app.use(cors());

app.use(express.json()); 
app.use('/api',require('./routes'));

app.listen(port,() =>{
    console.log(`server is running on ${port}`);
})