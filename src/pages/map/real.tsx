// pages/index.tsx
import React from 'react';
import CoordinatePlane from '@/components/Map';
import {Coordinates, ObjNamePos} from "../../components/mapPos"
import { useAppSelector } from '@/hooks';

const Home: React.FC = () => {
  
  const selector = useAppSelector((state) => state.data)
  const robotData = {...JSON.parse(selector.potenitChart)}
  return (
    <div>
      <CoordinatePlane data={Coordinates} obj={ObjNamePos} />
    </div>
  );
}; 

export default Home;
