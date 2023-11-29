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
const stompit = require('stompit')

function main() {
    const connectOptions = {
        'host': 'localhost',
        'port': 8887,
        
        'connectHeaders':{
          'login': 'monitor',
          'passcode': 'test',
        }
      };
    
    stompit.connect(connectOptions, function(error, client) {
    
        const subscribeHeaders = {
            'destination': 'activeMQMonitor',
            'receiver': 'agent://www.arbi.com/interactionManager/message'
        };
    
        if (error) {
            console.log('connect error ' + error.message);
            return;
        }     
        
        client.subscribe(subscribeHeaders, function(error, message) {
            
            if (error) {
                console.log('subscribe error ' + error.message);
                return;
            } 
            
            message.readString('utf-8', function(error, body) {
            
                if (error) {
                    console.log('read message error ' + error.message);
                    return;
                }
                
                console.log('received message: ' + body);
                const json = JSON.parse(body);
                const decode = Buffer.from(json.Content, 'base64').toString('utf8');
                const msg = decode.replace("(","").replace(")","");
                const msgarr = msg.split(" ");
                const cmd = msgarr[0];
                const rmarr = msgarr.splice(0,1);
                const data = msgarr.toString().replaceAll("\"","");
                console.log('Timestamp: ' + json.Timestamp);
                console.log('Content: ' + json.Content);
                console.log('decode: ' + decode);
                console.log('msg: ' + msg);
                console.log('cmd: ' + cmd);
                console.log('data: ' + data);
                io.emit('getData', json.Content.toString('utf-8'))
            });
            
        });
    
        const smessage ='{"Action":"create monitor","Filter":[{"Action":"AssertFact","LogType":"MessageLog","Flag":true},{"Action":"UpdateFact","LogType":"MessageLog","Flag":true}],"ID":"activeMQMonitor","Protocol":"ActiveMQ"}';
        const sendHeaders = {
            'command':'SEND',
            'destination' : 'agent://www.arbi.com/interactionManager/message',
        };   
        const frame = client.send(sendHeaders);
        frame.write(smessage);
        frame.end();
     
        
    });

    server.listen(port, () => {
        console.log(`서버 실행 at http://localhost:${port}`);
      });
}

main();

// const sleep = (ms) => {
//     return new Promise(resolve=>{
//         setTimeout(resolve,ms)
//     })
// }
