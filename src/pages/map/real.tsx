// pages/index.tsx
import React, {useState} from 'react';
import CoordinatePlane from '@/components/Map';
import {Coordinates, ObjNamePos} from "../../components/mapPos"
import { useAppSelector } from '@/hooks';

const Home: React.FC = () => {
  
  const selector = useAppSelector((state) => state.data)
  const robotData = {...JSON.parse(selector.potenitChart)}
  /**
   * 
   * TODO
   * 1. 로봇 별로 좌표 (robot position) 관리하기
   * 2. 로봇의 좌표가 경로를 벗어날 시 조정하기 ? 
   * 3. 
   */
  const [robot1, setRobot1] = useState<string>('4');
  setInterval(() => {
    setRobot1('145')
  }, 2000)
  return (
    <div style={{overflow: 'hidden', height: '875px'}}>
      <CoordinatePlane data={Coordinates} obj={ObjNamePos} robot1={robot1}/>
    </div>
  );
}; 

export default Home;
