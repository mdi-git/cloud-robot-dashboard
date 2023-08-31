// pages/index.tsx
import React from 'react';
import CoordinatePlane from '@/components/Map';
import {Coordinates, ObjNamePos} from "../../components/mapPos"

const Home: React.FC = () => {
  return (
    <div>
      <CoordinatePlane data={Coordinates} obj={ObjNamePos}/>
    </div>
  );
};

export default Home;
