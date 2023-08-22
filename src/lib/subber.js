const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000/',
        methods: ['GET', 'POST'],
        credentials:true
    }
});
const port = 3001;
var zmq = require("zeromq"),
  sock = zmq.socket("sub");
  

sock.connect("tcp://127.0.0.1:51316");
sock.subscribe("");
console.log("Subscriber connected to port 51316");


io.on('connection', (socket) => {
    console.log('a user connected');
    sock.on("message", function(topic, message) {
        console.log(
          "메시지 받음 :",
          topic.toString('utf-8')
        );
      
        io.emit('getData', topic.toString('utf-8'))
      });
})

server.listen(port, () => {
    console.log(`서버 실행 at http://localhost:${port}`)
})
