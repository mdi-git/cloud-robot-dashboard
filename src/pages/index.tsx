import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client"

function HomePage() {
  const [receivedData, setReceivedData] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:3002', { transports: ['websocket'] })
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
      <div><Link href="/potenit" target='_blank'>포테닛 물류센터 용 대시보드</Link></div>
      <div><Link href="/simulation" target='_blank'>가상 물류 로봇 용 대시보드</Link></div>
      <div><Link href="/hitek" target='_blank'>코리아하이텍 제조 로봇 용 대시보드</Link></div>
      <div><Link href="/map/real" target='_blank'>SmartLogisticsCenter</Link></div>
      <div><Link href="/map/isaac" target='_blank'>VirtualSmartLogisticsCenter</Link></div>
    </div>
  );
}

export default HomePage;
