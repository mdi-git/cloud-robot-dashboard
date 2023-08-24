const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Remove trailing slash
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const port = 3001;
const zmq = require("zeromq");

function main() {
  const MONITOR_ID = "testMonitor";
  const receiver = zmq.socket("dealer");
  receiver.identity = MONITOR_ID;
  receiver.connect("tcp://127.0.0.1:51316");

  receiver.send(
    '{"Action":"create monitor","Filter":[{"Action":"AssertFact","LogType":"MessageLog","Flag":true}],"ID":"testMonitor","Protocol":"ZeroMQ"}'
  );

  receiver.on("message", function onMessage() {
    var args = Array.apply(null, arguments);
    var workload = args[1].toString("utf8");
    console.log("dddddd", workload);
    workload = JSON.parse(workload)
    console.log("=====", workload)
    io.emit('getData', workload["Content"].toString('utf-8'));
  });

  io.on("connection", (socket) => {
    console.log("a user connected");
  });

  server.listen(port, () => {
    console.log(`서버 실행 at http://localhost:${port}`);
  });
}

main();
