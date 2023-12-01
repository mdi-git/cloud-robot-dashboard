import Link from 'next/link';
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
      <h1>클라우드 로봇</h1>
      <div><Link href="/potenit">포테닛 물류센터 용 대시보드</Link></div>
      <div><Link href="/simulation">가상 물류 로봇 용 대시보드</Link></div>
      <div><Link href="/hitek">코리아하이텍 제조 로봇 용 대시보드</Link></div>
      <div><Link href="/map/real">SmartLogisticsCenter</Link></div>
      <div><Link href="/map/isaac">VirtualSmartLogisticsCenter</Link></div>
    </div>
  );
}

export default HomePage;
