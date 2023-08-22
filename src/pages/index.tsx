import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from "socket.io-client"

function HomePage() {
  const [receivedData, setReceivedData] = useState('');

  // useEffect(() => {
  //   const socket = io("/api/subscriber", { transports: ["websocket"] });
  //   socket.on("connect", () => {
  //     console.log("소켓 생성!");
  //   });

  //   socket.on("getData", (data) => {
  //     console.log(data);
  //     setReceivedData(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log("changed?!?", receivedData);
  // }, [receivedData]);

  // useEffect(() => {
  //   const socket = io('http://localhost:3001', { transports: ['websocket'] })
  //   socket.on('connect', () => {
  //     console.log('소켓 생성!')
  //   })
  
  //   socket.on('getData', data => {
  //     console.log(data)
  //     setReceivedData(data);
  //   })
  // }, [])
  // useEffect(() => {

  //   console.log('changed?!?', receivedData)
  // }, [receivedData]);

  return (
    <div>
      <h1>Received Data: {receivedData}</h1>
    </div>
  );
}

export default HomePage;
