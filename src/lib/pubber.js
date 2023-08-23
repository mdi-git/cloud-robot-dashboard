// pubber.js
var zmq = require("zeromq"),
  sock = zmq.socket("pub");

sock.bindSync("tcp://127.0.0.1:51316");
console.log("Publisher bound to port 51316");

let i = 0;

setInterval(function() {
  console.log("1씩 늘리기...", i++);
  sock.send(i%2 === 0 ? `(RemainingTaskCount ${i})` : `(PerfirmableTaskCount "AMR_LIFT1" ${i})`);
}, 5000);