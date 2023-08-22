const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials:true
    }
});

app.get('/', (req, res) => {
    res.json({ok: true, data: 'hello world'})
});

// sub 이라고 가정
var zmq = require("zeromq"),
sock = zmq.socket("sub");

sock.connect("tcp://127.0.0.1:61316");
sock.subscribe("kitty cats");


io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('test', JSON.stringify(socket.toString()))
    sock.on("testMonitor", function(topic, message) {
        console.log(
          "메시지 받음 :",
          topic.toString('utf-8'),
          message
        );
      
        io.emit('getData', topic.toString('utf-8'))
      });
    sock.on("error", function(val) {
        console.log(val)
    })
})

const port = 61316;
server.listen(port, '127.0.0.1', () => {
    console.log(`서버 실행 at http://localhost:${port}`)
})
