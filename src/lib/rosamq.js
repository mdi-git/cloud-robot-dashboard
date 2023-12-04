const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const stompit = require("stompit");
const ROSLIB =  require('roslib');

const { argv } = require('node:process');
const dotenv = require("dotenv");
const yaml = require("js-yaml");
const { readFileSync } = require("fs");
const { join } = require("path");


const port = 3002;
let h1 = "localhost";
let h1p = 8887;
let h2 = "localhost";
let h2p = 9997;
let sv= "localhost";
let svp = 3001;

argv.forEach(function (val, index, array) { // 0, 1번은
    // 0: /Users/luke/.nvm/versions/node/v16.18.1/bin/node
    // 1: /Users/luke/StudioProjects/cloud-robot-dashboard/src/lib/rosamq.js
    // 2: 192.168.0.1
    // 3: 9999
    console.log(index + ': ' + val);
    // [
    //     '/Users/luke/.nvm/versions/node/v16.18.1/bin/node',
    //     '/Users/luke/StudioProjects/cloud-robot-dashboard/src/lib/rosamq.js',
    //     '192.168.0.1',
    //     '9999'
    // ]
    //console.log(array);
    
});

// .env 파일로부터 환경변수 값을 읽어와서 사용한다.
dotenv.config();
console.log(process.env);



if(argv.length>7){
    sv= argv[6];
    svp= argv[7];
} else if(argv.length>5){
    h1= argv[2];
    h1p= argv[3];
    h2= argv[4];
    h2p= argv[5];
}

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://"+sv+":"+svp, // Remove trailing slash
      methods: ["GET", "POST"],
      credentials: true,
    },
});

function main() {
    const connectOptions1 = {
        host: h1,
        port: h1p,
    
        connectHeaders: {
          login: "monitor",
          passcode: "test",
        },
    };
    const connectOptions2 = {
        host: h2,
        port: h2p,
    
        connectHeaders: {
          login: "monitor",
          passcode: "test",
        },
    };

    const connections = [connectOptions1, connectOptions2];
    const clients = [];

    connections.forEach(function(connectOptions) {
        stompit.connect(connectOptions, function(error, client) {
            const subscribeHeaders = {
              destination: "activeMQMonitor",
              receiver: "agent://www.arbi.com/interactionManager/message",
            };
        
            if (error) {
              console.log("connect error " + error.message);
              return;
            }
        
            client.subscribe(subscribeHeaders, function (error, message) {
              if (error) {
                console.log("subscribe error " + error.message);
                return;
              }
        
              message.readString("utf-8", function (error, body) {
                if (error) {
                  console.log("read message error " + error.message);
                  return;
                }
        
                console.log("received message: " + body);
                const json = JSON.parse(body);
                const decode = Buffer.from(json.Content, "base64").toString("utf8");
                const msg = decode.replace("(", "").replace(")", "");
                const msgarr = msg.split(" ");
                const cmd = msgarr[0];
                const rmarr = msgarr.splice(0, 1);
                const data = msgarr.toString().replaceAll('"', "");
                console.log("Timestamp: " + json.Timestamp);
                console.log("Content: " + json.Content);
                console.log("decode: " + decode);
                console.log("msg: " + msg);
                console.log("cmd: " + cmd);
                console.log("data: " + data);
                io.emit("getData", json.Content.toString("utf-8"));
              });
            });
        
            const smessage =
              '{"Action":"create monitor","Filter":[{"Action":"AssertFact","LogType":"MessageLog","Flag":true},{"Action":"UpdateFact","LogType":"MessageLog","Flag":true}],"ID":"activeMQMonitor","Protocol":"ActiveMQ"}';
            const sendHeaders = {
              command: "SEND",
              destination: "agent://www.arbi.com/interactionManager/message",
            };
            const frame = client.send(sendHeaders);
            frame.write(smessage);
            frame.end();
        });
    });

    // Close all connections when done
    // process.on('SIGINT', function() {
    //     clients.forEach(function(client) {
    //         client.disconnect();
    //     });
    // });


  server.listen(port, () => {
    console.log(`서버 실행 at http://localhost:${port}`);
  });
}


main();


//
// @todo ros
//

const ros = new ROSLIB.Ros({
    url : 'ws://211.219.48.162:30010'
    //url : 'ws://localhost:9001'  // ros-ws-gateway 또는 rosbridge 서비스의 주소로 설정해야 합니다.
});


ros.on('connection', function() {
    //startrun();
    console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});


// Publishing a Topic
// ------------------
// let action_status = new ROSLIB.Topic({
//     ros : ros, 
//     name : '/myrobot/action_status',
//     messageType : 'lgnav_action_msgs/msg/ActionStatus'
// });

let action_status1 = new ROSLIB.Topic({
    ros : ros, 
    name : '/AMR_RL01/action_status',
    messageType : 'lgnav_action_msgs/msg/ActionStatus'
});
let action_status2 = new ROSLIB.Topic({
    ros : ros, 
    name : '/AMR_RL02/action_status',
    messageType : 'lgnav_action_msgs/msg/ActionStatus'
});
let action_status3 = new ROSLIB.Topic({
    ros : ros, 
    name : '/AMR_RL03/action_status',
    messageType : 'lgnav_action_msgs/msg/ActionStatus'
});
let action_status4 = new ROSLIB.Topic({
    ros : ros, 
    name : '/AMR_RL04/action_status',
    messageType : 'lgnav_action_msgs/msg/ActionStatus'
});
let action_status5 = new ROSLIB.Topic({
    ros : ros, 
    name : '/AMR_VL01/action_status',
    messageType : 'lgnav_action_msgs/msg/ActionStatus'
});
let action_status6 = new ROSLIB.Topic({
    ros : ros, 
    name : '/AMR_VL02/action_status',
    messageType : 'lgnav_action_msgs/msg/ActionStatus'
});
let action_status7 = new ROSLIB.Topic({
    ros : ros, 
    name : '/AMR_VL03/action_status',
    messageType : 'lgnav_action_msgs/msg/ActionStatus'
});
let action_status8 = new ROSLIB.Topic({
    ros : ros, 
    name : '/PLTZ_R01/action_status',
    messageType : 'lgnav_action_msgs/msg/ActionStatus'
});
let action_status9 = new ROSLIB.Topic({
    ros : ros, 
    name : '/PLTZ_V01/action_status',
    messageType : 'lgnav_action_msgs/msg/ActionStatus'
});
let action_status10 = new ROSLIB.Topic({
    ros : ros, 
    name : '/PLTZ_V02/action_status',
    messageType : 'lgnav_action_msgs/msg/ActionStatus'
});


var action_status11 = new ROSLIB.Topic({
    ros : ros, 
    name : '/COBOT_01/action_status',
    messageType : 'lgnav_action_msgs/msg/ActionStatus'
});
var action_status12 = new ROSLIB.Topic({
    ros : ros, 
    name : '/INBOT_01/action_status',
    messageType : 'lgnav_action_msgs/msg/ActionStatus'
});


let battery_info = new ROSLIB.Topic({
    ros : ros, 
    name : '/core_batteryInfo',
    messageType : 'ebme_interfaces/msg/BatteryInfo'
});

let robot_pose1 = new ROSLIB.Topic({
  ros : ros, 
  name : '/AMR_RL01/amcl_pose',
  messageType : 'geometry_msgs/msg/PoseWithCovarianceStamped'
});

let robot_pose2 = new ROSLIB.Topic({
  ros : ros, 
  name : '/AMR_RL02/amcl_pose',
  messageType : 'geometry_msgs/msg/PoseWithCovarianceStamped'
});

let robot_pose3 = new ROSLIB.Topic({
  ros : ros, 
  name : '/AMR_RL03/amcl_pose',
  messageType : 'geometry_msgs/msg/PoseWithCovarianceStamped'
});

let robot_pose4 = new ROSLIB.Topic({
  ros : ros, 
  name : '/AMR_RL04/amcl_pose',
  messageType : 'geometry_msgs/msg/PoseWithCovarianceStamped'
});
  
let robot_pose5 = new ROSLIB.Topic({
  ros : ros, 
  name : '/AMR_VL01/amcl_pose',
  messageType : 'geometry_msgs/msg/PoseWithCovarianceStamped'
});
let robot_pose6 = new ROSLIB.Topic({
  ros : ros, 
  name : '/AMR_VL02/amcl_pose',
  messageType : 'geometry_msgs/msg/PoseWithCovarianceStamped'
});

let robot_pose7 = new ROSLIB.Topic({
  ros : ros, 
  name : '/AMR_VL03/amcl_pose',
  messageType : 'geometry_msgs/msg/PoseWithCovarianceStamped'
});
let robot_pose8 = new ROSLIB.Topic({
    ros : ros, 
    name : '/PLTZ_R01/amcl_pose',
    messageType : 'geometry_msgs/msg/PoseWithCovarianceStamped'
});
let robot_pose9 = new ROSLIB.Topic({
    ros : ros, 
    name : '/PLTZ_V01/amcl_pose',
    messageType : 'geometry_msgs/msg/PoseWithCovarianceStamped'
});
let robot_pose10 = new ROSLIB.Topic({
    ros : ros, 
    name : '/PLTZ_V02/amcl_pose',
    messageType : 'geometry_msgs/msg/PoseWithCovarianceStamped'
});


var robot_pose11 = new ROSLIB.Topic({
    ros : ros, 
    name : '/COBOT_01/amcl_pose',
    messageType : 'geometry_msgs/msg/PoseWithCovarianceStamped'
  });
  
  var robot_pose12 = new ROSLIB.Topic({
    ros : ros, 
    name : '/INBOT_01/amcl_pose',
    messageType : 'geometry_msgs/msg/PoseWithCovarianceStamped'
  });
  

let action_status_value = new ROSLIB.Message({
    status_id: 0,
    action_info: {
        action_id: 0,
        remain_navigation_distance_m: 0,
        remain_expected_navigation_time_sec: 0,
        path_distance_m: 0,
        stacked_distance_m: 0,
        goal_between_heading_deg: 0
      },
    motion_status: {
        type: 1,
        status: 0,
    }
});


let battery_value = new ROSLIB.Message({
    device_id: 'robot_123',
    id: 0,
    state: 0,
    description : "robot battery",
    level: 100.0
});

let orientation = new ROSLIB.Quaternion({x:0, y:0, z:0, w: 0});

let pose_value = new ROSLIB.Message({
    header: {
        stamp: {
          secs : 0, 
          nsecs : 100
        },
        frame_id : "map"              
      },
      pose: {
       pose:{
        position: {
          x : 0.0,
          y : 0.0,
          z : 0.0
        },
        orientation: orientation
       },
        covariance: [0.25, 0.0, 0.0, 0.0, 0.0, 0.0, 
            0.0, 0.25, 0.0, 0.0, 0.0, 0.0, 
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 
            0.0, 0.0, 0.0, 0.0, 0.0, 0.06853892326654787]
      },
});

let pose_value1 = { ...pose_value}
let pose_value2 = { ...pose_value}
let pose_value3 = { ...pose_value}
let pose_value4 = { ...pose_value}
let pose_value5 = { ...pose_value}
let pose_value6 = { ...pose_value}
let pose_value7 = { ...pose_value}
let pose_value8 = { ...pose_value}
let pose_value9 = { ...pose_value}
let pose_value10 = { ...pose_value}
let pose_value11 = { ...pose_value}
let pose_value12 = { ...pose_value}

let action_status_value1 = { ...action_status_value};
let action_status_value2 = { ...action_status_value};
let action_status_value3 = { ...action_status_value};
let action_status_value4 = { ...action_status_value};
let action_status_value5 = { ...action_status_value};
let action_status_value6 = { ...action_status_value};
let action_status_value7 = { ...action_status_value};
let action_status_value8 = { ...action_status_value};
let action_status_value9 = { ...action_status_value};
let action_status_value10 = { ...action_status_value};
let action_status_value11 = { ...action_status_value};
let action_status_value12 = { ...action_status_value};


//publish 함수
function publish_ros(line){

    let a1=3.5;
    let b1=0.05;
    let c1=5.4;
    let d1=17.2;
    let a2=3.71;
    let b2=-7.62;
    let c2=4.35;
    let d2=12.7;

    line = replaceAll(line,"(","");
    line = replaceAll(line,")","");
    line = replaceAll(line,'"',"");

    line = replaceAll(line,'AMR_LIFT1',"AMR_RL01");
    line = replaceAll(line,'AMR_LIFT2',"AMR_RL02");
    line = replaceAll(line,'AMR_LIFT3',"AMR_RL03");
    line = replaceAll(line,'AMR_LIFT4',"AMR_RL04");
    line = replaceAll(line,'Palletizer1',"PLTZ_R01");

    line = replaceAll(line,'AMR_LIFT5',"AMR_VL01");
    line = replaceAll(line,'AMR_LIFT6',"AMR_VL02");
    line = replaceAll(line,'AMR_LIFT7',"AMR_VL03");
    line = replaceAll(line,'Palletizer2',"PLTZ_V01");
    line = replaceAll(line,'Palletizer3',"PLTZ_V02");

    line = replaceAll(line,'Epson',"INBOT_01");
    line = replaceAll(line,'UR',"COBOT_01");

    let lsp = line.split(" ");
    
    //AMR_RL01 AMR_RL02 AMR_RL03 AMR_RL04 PLTZ_R01
    //AMR_VL01 AMR_VL02 AMR_VL03 PLTZ_V01 PLTZ_V02 
    if(line.startsWith("robotPosition")){
            
        if(lsp[1].endsWith("AMR_RL01")){
            
            pose_value1.pose.pose.position.x = b1+a1*lsp[2];
            pose_value1.pose.pose.position.y = d1+c1*lsp[3];
            robot_pose1.publish(pose_value1);

            //console.log("poseval1 : %o",pose_value1);

        } else if(lsp[1].endsWith("AMR_RL02")){
            
            pose_value1.pose.pose.position.x = b1+a1*lsp[2];
            pose_value1.pose.pose.position.y = d1+c1*lsp[3];
          robot_pose2.publish(pose_value2);

          //console.log("poseval2 : %o",pose_value2);
        
        } else if(lsp[1].endsWith("AMR_RL03")){
            
            pose_value1.pose.pose.position.x = b1+a1*lsp[2];
            pose_value1.pose.pose.position.y = d1+c1*lsp[3];
          robot_pose3.publish(pose_value3);

          //console.log("poseval3 : %o",pose_value3);
        
        } else if(lsp[1].endsWith("AMR_RL04")){
            
            pose_value1.pose.pose.position.x = b1+a1*lsp[2];
            pose_value1.pose.pose.position.y = d1+c1*lsp[3];
          robot_pose4.publish(pose_value4);

          //console.log("poseval4 : %o",pose_value4);

        } else if(lsp[1].endsWith("AMR_VL01")){
            
            pose_value1.pose.pose.position.x = b2+a2*lsp[2];
            pose_value1.pose.pose.position.y = d2+c2*lsp[3];
          robot_pose5.publish(pose_value5);

          //console.log("poseval5 : %o",pose_value5);

        } else if(lsp[1].endsWith("AMR_VL02")){
            
            pose_value1.pose.pose.position.x = b2+a2*lsp[2];
            pose_value1.pose.pose.position.y = d2+c2*lsp[3];
          robot_pose6.publish(pose_value6);

          //console.log("poseval6 : %o",pose_value6);

        } else if(lsp[1].endsWith("AMR_VL03")){
            
            pose_value1.pose.pose.position.x = b2+a2*lsp[2];
            pose_value1.pose.pose.position.y = d2+c2*lsp[3];
          robot_pose7.publish(pose_value7);

          //console.log("poseval7 : %o",pose_value7);

        }

    } else if(line.startsWith("batteryRemain")){

       if(lsp[1].endsWith("AMR_RL01")){
        
        battery_value.device_id = lsp[1];

      } else if(lsp[1].endsWith("AMR_RL02")){
        
        battery_value.device_id = lsp[1];

      } else if(lsp[1].endsWith("AMR_RL03")){
        
        battery_value.device_id = lsp[1];

      } else if(lsp[1].endsWith("AMR_RL04")){
        
        battery_value.device_id = lsp[1];

      } else if(lsp[1].endsWith("AMR_VL01")){
        
        battery_value.device_id = lsp[1];

      } else if(lsp[1].endsWith("AMR_VL02")){
        
        battery_value.device_id = lsp[1];

      } else if(lsp[1].endsWith("AMR_VL03")){
        
        battery_value.device_id = lsp[1];

      }

      battery_value.level = lsp[2]/1.0;
      battery_info.publish(battery_value);
      //console.log("battery_value : %o",battery_value);

    } else if(line.startsWith("RobotTaskStatus")){ //start progress complete

      if(lsp[1].endsWith("AMR_RL01")){
        action_status_value1.status_id = (lsp[4]=='start'?1:(lsp[4]=='progress'?3:(lsp[4]=='complete'?5:0)));
         action_status_value1.motion_status.status = 1;   
        action_status1.publish(action_status_value1);

        console.log("action_status_value1 : %o",action_status_value1);

      } else if(lsp[1].endsWith("AMR_RL02")){
        action_status_value2.status_id = (lsp[4]=='start'?1:(lsp[4]=='progress'?3:(lsp[4]=='complete'?5:0)));
        action_status_value2.motion_status.status = 1;        
        action_status2.publish(action_status_value2);

        console.log("action_status_value2 : %o",action_status_value2);
        
      } else if(lsp[1].endsWith("AMR_RL03")){
        action_status_value3.status_id = (lsp[4]=='start'?1:(lsp[4]=='progress'?3:(lsp[4]=='complete'?5:0)));
        action_status_value3.motion_status.status = 1;        
        action_status3.publish(action_status_value3);

        console.log("action_status_value3 : %o",action_status_value3);
        
      } else if(lsp[1].endsWith("AMR_RL04")){
        action_status_value4.status_id = (lsp[4]=='start'?1:(lsp[4]=='progress'?3:(lsp[4]=='complete'?5:0)));
         action_status_value4.motion_status.status = 1;        
        action_status4.publish(action_status_value4);

        console.log("action_status_value4 : %o",action_status_value4);
        
      } else if(lsp[1].endsWith("AMR_VL01")){
        action_status_value5.status_id = (lsp[4]=='start'?1:(lsp[4]=='progress'?3:(lsp[4]=='complete'?5:0)));
        action_status_value5.motion_status.status = 1;        
        action_status5.publish(action_status_value5);

        console.log("action_status_value5 : %o",action_status_value5);
        
      } else if(lsp[1].endsWith("AMR_VL02")){
        action_status_value6.status_id = (lsp[4]=='start'?1:(lsp[4]=='progress'?3:(lsp[4]=='complete'?5:0)));
         action_status_value6.motion_status.status = 1;        
        action_status6.publish(action_status_value6);

        console.log("action_status_value6 : %o",action_status_value6);
        
      } else if(lsp[1].endsWith("AMR_VL03")){
        action_status_value7.status_id = (lsp[4]=='start'?1:(lsp[4]=='progress'?3:(lsp[4]=='complete'?5:0)));
        action_status_value7.motion_status.status = 1;        
        action_status7.publish(action_status_value7);

        console.log("action_status_value7 : %o",action_status_value7);
        
      } else if(lsp[1].endsWith("PLTZ_R01")){
        action_status_value8.status_id = (lsp[4]=='start'?1:(lsp[4]=='progress'?3:(lsp[4]=='complete'?5:0)));
        action_status_value8.motion_status.status = 1;         
        action_status8.publish(action_status_value8);

        console.log("action_status_value8 : %o",action_status_value8);
        
        pose_value8.pose.pose.position.x = b1+a1*4.5;
        pose_value8.pose.pose.position.y = d1+c1*3;
        robot_pose8.publish(pose_value8);
        
      } else if(lsp[1].endsWith("PLTZ_V01")){
        action_status_value9.status_id = (lsp[4]=='start'?1:(lsp[4]=='progress'?3:(lsp[4]=='complete'?5:0)));
        action_status_value9.motion_status.status = 1;        
        action_status9.publish(action_status_value9);

        console.log("action_status_value9 : %o",action_status_value9);
        
        pose_value9.pose.pose.position.x = b2+a2*4.5;
        pose_value9.pose.pose.position.y = d2+c2*8.4;
        robot_pose9.publish(pose_value9);

      } else if(lsp[1].endsWith("PLTZ_V02")){
        action_status_value10.status_id = (lsp[4]=='start'?1:(lsp[4]=='progress'?3:(lsp[4]=='complete'?5:0)));
        action_status_value10.motion_status.status = 1;        
        action_status10.publish(action_status_value10);

        console.log("action_status10 : %o",action_status10);
        
        pose_value10.pose.pose.position.x = b2+a2*4.5;
        pose_value10.pose.pose.position.y = d2+c2*3;
        robot_pose10.publish(pose_value10);

      } else if(lsp[1].endsWith("COBOT_01")){
        action_status_value11.status_id = (lsp[4]=='start'?1:(lsp[4]=='progress'?3:(lsp[4]=='complete'?5:0)));
        action_status_value11.motion_status.status = 1;        
        action_status11.publish(action_status_value1);

        pose_value11.pose.pose.position.x = 113.5;
        pose_value11.pose.pose.position.y = 68;
        robot_pose11.publish(pose_value11);

      } else if(lsp[1].endsWith("INBOT_01")){
        action_status_value12.status_id = (lsp[4]=='start'?1:(lsp[4]=='progress'?3:(lsp[4]=='complete'?5:0)));
        action_status_value12.motion_status.status = 1;        
        action_status12.publish(action_status_value12);

        pose_value12.pose.pose.position.x = 113.5;
        pose_value12.pose.pose.position.y = 32;
        robot_pose12.publish(pose_value12);

      } 

    } else if(line.startsWith("TaskProgress")){ //1/4

        var tps = lsp[2].split("/")
        var tp = tps[0]*25;
 
       if(lsp[1].endsWith("COBOT_01")){
         pose_value11.pose.pose.position.x = 113.5;
         pose_value11.pose.pose.position.y = 68;
         robot_pose11.publish(pose_value11);
       } else if(lsp[1].endsWith("INBOT_01")){
         pose_value12.pose.pose.position.x = 113.5;
         pose_value12.pose.pose.position.y = 32;
         robot_pose12.publish(pose_value12);
       } 
 
     } 

    console.log("publish_ros : "+line +" / "+lsp[0]);

}


function replaceAll(str, searchStr, replaceStr) {

    return str.split(searchStr).join(replaceStr);
 }
