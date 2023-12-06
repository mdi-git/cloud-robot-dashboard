// 가상 맵?

import CoordinatePlane from "@/components/IsaacMap";
import SocketComponent from "@/components/SocketComponent";
import { Coordinates } from "@/components/isaacMapPos";
import { useAppSelector } from "@/hooks";

export default function Isaac() {
  const robotSelector = useAppSelector((state) => state.robot);
  return (
    <>
      <SocketComponent />
      <div
        style={{ overflow: "hidden", height: "875px" }}
        className="bg-slate-800"
      >
        {/* {JSON.stringify(robotSelector.AMR_LIFT7.ROBOTAT)} /{" "}
        {JSON.stringify(robotSelector.AMR_LIFT7.ROBOTPOSITION)} */}
       <h1 className="text-lg p-3"><span className="bg-slate-600 rounded text-white-800 pr-3 pl-3 pb-1 pt-1">가상 물류센터</span></h1>
        <CoordinatePlane
          data={Coordinates}
          robot5Pos={robotSelector.AMR_LIFT5.ROBOTPOSITION.map(Number)}
          robot6Pos={robotSelector.AMR_LIFT6.ROBOTPOSITION.map(Number)}
          robot7Pos={robotSelector.AMR_LIFT7.ROBOTPOSITION.map(Number)}
        />
      </div>
    </>
  );
}
