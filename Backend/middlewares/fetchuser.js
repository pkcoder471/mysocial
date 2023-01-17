const jwt = require('jsonwebtoken');
const JWT_SECRET = "blahsomething";

const fetchUser = (req,res,next)=>{
    const token = req.header('auth-token');

    if(!token){
        return res.status(401).send("please authenticate using a valid token");
    }
    try{
    const data = jwt.verify(token,JWT_SECRET);
    req.user = data.user;
    next();
    }catch(err){
        return res.status(401).send({error:"Please authenticate using a valid token"});
    }

}
module.exports = fetchUser;