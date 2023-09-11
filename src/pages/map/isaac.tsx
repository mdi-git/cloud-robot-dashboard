// 가상 맵?

import CoordinatePlane from "@/components/IsaacMap";
import { Coordinates } from "@/components/isaacMapPos";

export default function Isaac() {
    return (
        <>
        <div style={{overflow: 'hidden', height: '875px'}}>
            <CoordinatePlane 
            data={Coordinates}
            
            />
        </div>
        </>
    )
}