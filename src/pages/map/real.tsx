// pages/index.tsx
import React, {useState, useEffect} from 'react';
import CoordinatePlane from '@/components/Map';
import {Coordinates, ObjNamePos} from "../../components/mapPos"
import { useAppDispatch, useAppSelector } from '@/hooks';
import { io } from 'socket.io-client';
import { setDataState } from '@/features/dataSlice';
import { setRobotPosState } from '@/features/robotPosSlice';
interface RobotData {
  REMAININGTASKCOUNT: [robotType: "real" | "simulation", count: number];
  ONGOINGTASKCOUNT: [robotType: "real" | "simulation", count: number];
  COMPLETEDTASKCOUNT: [robotType: "real" | "simulation", count: number];
  NEWTASKCOUNT: [robotType: "real" | "simulation", count: number];
  CUMULATIVETASKSPEED: [robotType: "real" | "simulation", count: number];
  AVERAGETASKSPEED: [robotType: "real" | "simulation", count: number];
  TASKPROGRESS: [robotId: string, progress: string];
  ROBOTTASKSTATUS: [
    robotId: string,
    taskId: string,
    taskName: string,
    status: "start" | "progress" | "pause" | "complete"
  ];
  BATTERYREMAIN: [robotId: string, BATTERYSTATUS: number];
  BATTERYSTATUS: [robotId: string, BATTERYSTATUS: "Using" | "Charging"];
  PERFIRMABLETASKCOUNT: [robotId: string, count: number];
  ROBOTAT: [robotId: "AMR_LIFT1" | "AMR_LIFT2" | "AMR_LIFT3" | "AMR_LIFT4", current: string, go: string];
  ROBOTPOSITION: [
    robotId: "AMR_LIFT1" | "AMR_LIFT2" | "AMR_LIFT3" | "AMR_LIFT4",
    x: number | string,
    y: number | string,
  ];
}

interface RobotStatusData {
  [key: string]: any;
}

interface ObjectProps {
  [key: string]: any;
}

function getKeyValueObject(str: string) {
  let match = str.match(/\((\w+) (.+?)\)/);

  if (match) {
    let [, key, values] = match;
    let parsedValues: (string | number)[] | number;

    if (/"([^"]+)"/.test(values)) {
      parsedValues =
        values
          .split(" ")
          .map((match) =>
            isNaN(parseFloat(match)) ? match.slice(1, -1) : parseFloat(match)
          ) || [];
    } else {
      parsedValues = parseFloat(values);
    }

    let output: { [key: string]: (string | number)[] | number } = {
      [key.toUpperCase()]: parsedValues,
    };
    return output;
  } else {
    console.log("No valid input found.");
    return {};
  }
}
const Real: React.FC = () => {
  const selector = useAppSelector((state) => state.data);
    const robotSelector = useAppSelector((state) => state.robot)
  const dispatch = useAppDispatch();

  const [receivedData, setReceivedData] = useState<RobotData>({
    REMAININGTASKCOUNT: ["real", 0],
    ONGOINGTASKCOUNT: ["real", 0],
    COMPLETEDTASKCOUNT: ["real", 0],
    NEWTASKCOUNT: ["real", 0],
    CUMULATIVETASKSPEED: ["real", 0],
    AVERAGETASKSPEED: ["real", 0],
    TASKPROGRESS: ["", ""],
    ROBOTTASKSTATUS: ["", "", "", "progress"],
    BATTERYREMAIN: ["", 0],
    BATTERYSTATUS: ["", "Using"],
    PERFIRMABLETASKCOUNT: ["", 0],
    ROBOTAT: ["AMR_LIFT1", "", ""],
    ROBOTPOSITION: [
      "AMR_LIFT1",
      robotSelector.AMR_LIFT1.ROBOTPOSITION[0] === ""
        ? 0
        : robotSelector.AMR_LIFT1.ROBOTPOSITION[0],
      robotSelector.AMR_LIFT1.ROBOTPOSITION[1] === ""
        ? 0
        : robotSelector.AMR_LIFT1.ROBOTPOSITION[1],
    ],
  });

  const [robotStatus, setRobotStatus] = useState<RobotStatusData>({
    AMR_LIFT1: {},
    AMR_LIFT2: {},
    AMR_LIFT3: {},
    AMR_LIFT4: {},
    PALLETIZER1: {},
    ...JSON.parse(selector.potenitChart),
  });
  useEffect(() => {
    setReceivedData({ ...receivedData });
    setRobotStatus({ ...robotStatus, ...JSON.parse(selector.potenitChart) });
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("소켓 생성!");
    });

    socket.on("getData", (data) => {
      setReceivedData((prevReceivedData) => {
        const tempData = getKeyValueObject(atob(data));
        return { ...prevReceivedData, ...tempData };
      });
    });
  }, []);

  useEffect(() => {
    const isReal = receivedData.REMAININGTASKCOUNT[0] === "real"
    if (isReal) {
      dispatch(
        setDataState({
          ...selector,
          real: JSON.stringify({ ...JSON.parse(selector.real), REMAININGTASKCOUNT: receivedData.REMAININGTASKCOUNT })
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: JSON.stringify({ ...JSON.parse(selector.simulation), REMAININGTASKCOUNT: receivedData.REMAININGTASKCOUNT })
        })
      );
    }
  }, [receivedData.REMAININGTASKCOUNT]);

  useEffect(() => {
    const isReal = receivedData.ONGOINGTASKCOUNT[0] === "real"
    if (isReal) {
      dispatch(
        setDataState({
          ...selector,
          real: JSON.stringify({ ...JSON.parse(selector.real), ONGOINGTASKCOUNT: receivedData.ONGOINGTASKCOUNT })
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: JSON.stringify({ ...JSON.parse(selector.simulation), ONGOINGTASKCOUNT: receivedData.ONGOINGTASKCOUNT })
        })
      );
    }
  }, [receivedData.ONGOINGTASKCOUNT]);

  useEffect(() => {

    const isReal = receivedData.COMPLETEDTASKCOUNT[0] === "real"
    if (isReal) {
      dispatch(
        setDataState({
          ...selector,
          real: JSON.stringify({ ...JSON.parse(selector.real), COMPLETEDTASKCOUNT: receivedData.COMPLETEDTASKCOUNT })
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: JSON.stringify({ ...JSON.parse(selector.simulation), COMPLETEDTASKCOUNT: receivedData.COMPLETEDTASKCOUNT })
        })
      );
    }
  
  }, [receivedData.COMPLETEDTASKCOUNT]);

  useEffect(() => {

    const isReal = receivedData.NEWTASKCOUNT[0] === "real"
    if (isReal) {
      dispatch(
        setDataState({
          ...selector,
          real: JSON.stringify({ ...JSON.parse(selector.real), NEWTASKCOUNT: receivedData.NEWTASKCOUNT })
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: JSON.stringify({ ...JSON.parse(selector.simulation), NEWTASKCOUNT: receivedData.NEWTASKCOUNT })
        })
      );
    }
  }, [receivedData.NEWTASKCOUNT]);

  useEffect(() => {

    const isReal = receivedData.CUMULATIVETASKSPEED[0] === "real"
    if (isReal) {
      dispatch(
        setDataState({
          ...selector,
          real: JSON.stringify({ ...JSON.parse(selector.real), CUMULATIVETASKSPEED: receivedData.CUMULATIVETASKSPEED })
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: JSON.stringify({ ...JSON.parse(selector.simulation), CUMULATIVETASKSPEED: receivedData.CUMULATIVETASKSPEED })
        })
      );
    }
  }, [receivedData.CUMULATIVETASKSPEED]);

  useEffect(() => {

    const isReal = receivedData.AVERAGETASKSPEED[0] === "real"
    if (isReal) {
      dispatch(
        setDataState({
          ...selector,
          real: JSON.stringify({ ...JSON.parse(selector.real), AVERAGETASKSPEED: receivedData.AVERAGETASKSPEED })
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: JSON.stringify({ ...JSON.parse(selector.simulation), AVERAGETASKSPEED: receivedData.AVERAGETASKSPEED })
        })
      );
    }
  }, [receivedData.AVERAGETASKSPEED]);

  useEffect(() => {
    setRobotStatus((prevRobotStatus) => {
      const temp: ObjectProps = {};
      const robotId = receivedData.TASKPROGRESS[0];
      if (robotId) {
        temp[`${robotId}`] = {
          ...prevRobotStatus[robotId],
          TASKPROGRESS: receivedData.TASKPROGRESS[1],
        };
      }
      dispatch(
        setDataState({
          ...selector,
          potenitChart: JSON.stringify({...JSON.parse(selector.potenitChart), ...temp})
        })
      )
      return { ...prevRobotStatus, ...temp };
    });
  }, [receivedData.TASKPROGRESS]);

  useEffect(() => {
    setRobotStatus((prevRobotStatus) => {
      const temp: ObjectProps = {};
      const robotId = receivedData.ROBOTTASKSTATUS[0];
      if (robotId) {
        temp[`${robotId}`] = {
          ...prevRobotStatus[robotId],
          ROBOTTASKSTATUS: receivedData.ROBOTTASKSTATUS[1],
        };
      }
      dispatch(
        setDataState({
          ...selector,
          potenitChart: JSON.stringify({...JSON.parse(selector.potenitChart), ...temp})
        })
      )
      return { ...prevRobotStatus, ...temp };
    });
  }, [receivedData.ROBOTTASKSTATUS]);

  useEffect(() => {
    setRobotStatus((prevRobotStatus) => {
      const temp: ObjectProps = {};
      const robotId = receivedData.BATTERYREMAIN[0];
      if (robotId) {
        temp[`${robotId}`] = {
          ...prevRobotStatus[robotId],
          BATTERYREMAIN: receivedData.BATTERYREMAIN[1],
        };
      }
      dispatch(
        setDataState({
          ...selector,
          potenitChart: JSON.stringify({...JSON.parse(selector.potenitChart), ...temp})
        })
      )
      return { ...prevRobotStatus, ...temp };
    });
  }, [receivedData.BATTERYREMAIN]);

  useEffect(() => {
    setRobotStatus((prevRobotStatus) => {
      const temp: ObjectProps = {};
      const robotId = receivedData.BATTERYSTATUS[0];
      if (robotId) {
        temp[`${robotId}`] = {
          ...prevRobotStatus[robotId],
          BATTERYSTATUS: receivedData.BATTERYSTATUS[1],
        };
      }
      dispatch(
        setDataState({
          ...selector,
          potenitChart: JSON.stringify({...JSON.parse(selector.potenitChart), ...temp})
        })
      )
      return { ...prevRobotStatus, ...temp };
    });
  }, [receivedData.BATTERYSTATUS]);

  useEffect(() => {
    setRobotStatus((prevRobotStatus) => {
      const temp: ObjectProps = {};
      const robotId = receivedData.PERFIRMABLETASKCOUNT[0];
      if (robotId) {
        temp[`${robotId}`] = {
          ...prevRobotStatus[robotId],
          PERFIRMABLETASKCOUNT: receivedData.PERFIRMABLETASKCOUNT[1],
        };
      }
      dispatch(
        setDataState({
          ...selector,
          potenitChart: JSON.stringify({...JSON.parse(selector.potenitChart), ...temp})
        })
      )
      return { ...prevRobotStatus, ...temp };
    });
  }, [receivedData.PERFIRMABLETASKCOUNT]);

  useEffect(() => {
    // setRobotStatus((prevRobotStatus) => {
      
    //   return { ...prevRobotStatus, ...temp };
    // });

    const temp: ObjectProps = {};
      const robotId = receivedData.ROBOTPOSITION[0];
      if (robotId) {
        temp[`${robotId}`] = {
          ...robotSelector[`${robotId}`],
          ROBOTPOSITION: [receivedData.ROBOTPOSITION[1], receivedData.ROBOTPOSITION[2]],
        };
        if(robotId === "AMR_LIFT1") setRobotPos([receivedData.ROBOTPOSITION[1], receivedData.ROBOTPOSITION[2]].map(Number))
        if(robotId === "AMR_LIFT2") setRobotPos2([receivedData.ROBOTPOSITION[1], receivedData.ROBOTPOSITION[2]].map(Number))
        if(robotId === "AMR_LIFT3") setRobotPos3([receivedData.ROBOTPOSITION[1], receivedData.ROBOTPOSITION[2]].map(Number))
        if(robotId === "AMR_LIFT4") setRobotPos4([receivedData.ROBOTPOSITION[1], receivedData.ROBOTPOSITION[2]].map(Number))
      }
      dispatch(
        setRobotPosState({
          ...robotSelector,
          ...JSON.parse(JSON.stringify(temp))
        })
      )
      console.log({
        ...robotSelector,
        ...JSON.parse(JSON.stringify(temp))
      })
  }, [receivedData.ROBOTPOSITION]);

  // useEffect(() => {
  //   // setRobotStatus((prevRobotStatus) => {
      
  //   //   return { ...prevRobotStatus, ...temp };
  //   // });

  //   const temp: ObjectProps = {};
  //     const robotId = receivedData.ROBOTAT[0];
  //     if (robotId) {
  //       temp[`${robotId}`] = {
  //         ...robotSelector[`${robotId}`],
  //         ROBOTAT: [receivedData.ROBOTAT[1], receivedData.ROBOTAT[2]],
  //       };
  //       if(robotId === "AMR_LIFT1") setRobot1(receivedData.ROBOTAT[1])
  //     }
  //     dispatch(
  //       setRobotPosState({
  //         ...robotSelector,
  //         ...JSON.parse(JSON.stringify(temp))
  //       })
  //     )
  //     console.log({
  //       ...robotSelector,
  //       ...JSON.parse(JSON.stringify(temp))
  //     })
  // }, [receivedData.ROBOTAT]);
  // const [robot1, setRobot1] = useState<number|string>(robotSelector.AMR_LIFT1.ROBOTAT[0] === "" ? 4 : robotSelector.AMR_LIFT1.ROBOTAT[0]);
  const [robot1Pos, setRobotPos] = useState(robotSelector.AMR_LIFT1.ROBOTPOSITION.length !== 2 && robotSelector.AMR_LIFT1.ROBOTPOSITION[0] === "" ? [1, 1] : robotSelector.AMR_LIFT1.ROBOTPOSITION.map(el => Number(el)))

  // const [robot2, setRobot2] = useState<number|string>(robotSelector.AMR_LIFT2.ROBOTAT[0] === "" ? 4 : robotSelector.AMR_LIFT2.ROBOTAT[0]);
  const [robot2Pos, setRobotPos2] = useState(robotSelector.AMR_LIFT2.ROBOTPOSITION.length !== 2 && robotSelector.AMR_LIFT2.ROBOTPOSITION[0] === "" ? [1, 1] : robotSelector.AMR_LIFT2.ROBOTPOSITION.map(el => Number(el)))

  // const [robo31, setRobot3] = useState<number|string>(robotSelector.AMR_LIFT3.ROBOTAT[0] === "" ? 4 : robotSelector.AMR_LIFT3.ROBOTAT[0]);
  const [robot3Pos, setRobotPos3] = useState(robotSelector.AMR_LIFT3.ROBOTPOSITION.length !== 2 && robotSelector.AMR_LIFT3.ROBOTPOSITION[0] === "" ? [1, 1] : robotSelector.AMR_LIFT3.ROBOTPOSITION.map(el => Number(el)))

  // const [robot4, setRobot4] = useState<number|string>(robotSelector.AMR_LIFT4.ROBOTAT[0] === "" ? 4 : robotSelector.AMR_LIFT4.ROBOTAT[0]);
  const [robot4Pos, setRobotPos4] = useState(robotSelector.AMR_LIFT4.ROBOTPOSITION.length !== 2 && robotSelector.AMR_LIFT4.ROBOTPOSITION[0] === "" ? [1, 1] : robotSelector.AMR_LIFT4.ROBOTPOSITION.map(el => Number(el)))
  return (
    <div style={{ overflow: "hidden", height: "875px" }}>
      {JSON.stringify(robotSelector.AMR_LIFT1.ROBOTPOSITION)} / {JSON.stringify(robotSelector.AMR_LIFT2.ROBOTPOSITION)} / {JSON.stringify(robotSelector.AMR_LIFT3.ROBOTPOSITION)} / {JSON.stringify(robotSelector.AMR_LIFT4.ROBOTPOSITION)}
      <CoordinatePlane
        data={Coordinates}
        obj={ObjNamePos}
        robot1Pos={robot1Pos}
        robot2Pos={robot2Pos}
        robot3Pos={robot3Pos}
        robot4Pos={robot4Pos}
      />
    </div>
  );
}; 

export default Real;
