
const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
});

let onlineUsers = []

const addNewUser = (userId, socketId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
        onlineUsers.push({ userId, socketId });
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
}

const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId === userId)
}

io.on('connection', (socket) => {

    
    socket.on("newUser",(userId) =>{
        addNewUser(userId,socket.id);
    })

    socket.on("sendNotification",({senderName,receiverName,type})=>{
        if(senderName._id!==receiverName._id){
        const receiver = getUser(receiverName._id);
        io.to(receiver.socketId).emit("getNotification",{
            senderName,
            type,
        })
        }
        
    })
    socket.on("disconnect", () => {
        removeUser(socket.id);
    })
});

io.listen(8000, () => {
    console.log('listening on *:3000');
});