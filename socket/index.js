
const { Server } = require("socket.io");

const io = new Server({
    cors:{
        origin:"http://localhost:3000"
    }
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("disconnect",()=>{
    console.log("someone has left")
  })
});

io.listen(8000, () => {
  console.log('listening on *:3000');
});