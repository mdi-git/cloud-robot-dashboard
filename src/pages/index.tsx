import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client"

function HomePage() {
  const [receivedData, setReceivedData] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:3001', { transports: ['websocket'] })
    socket.on('connect', () => {
      console.log('소켓 생성!')
    })
  
    socket.on('getData', data => {
      console.log(data)
      setReceivedData(data);
    })
  }, [])
  
  return (
    <div>
      <h1>테스트 페이지</h1>
      <h1>Received Data: {receivedData}</h1>
    </div>
  );
}

export default HomePage;
