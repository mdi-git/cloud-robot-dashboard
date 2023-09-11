// pages/index.tsx
import React, { useState, useEffect } from "react";
import CoordinatePlane from "@/components/Map";
import { Coordinates, ObjNamePos } from "../../components/mapPos";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { io } from "socket.io-client";
import { setDataState } from "@/features/dataSlice";
import { setRobotPosState } from "@/features/robotPosSlice";
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
  ROBOTAT: [
    robotId: "AMR_LIFT1" | "AMR_LIFT2" | "AMR_LIFT3" | "AMR_LIFT4",
    current: string,
    go: string
  ];
  ROBOTPOSITION: [
    robotId: "AMR_LIFT1" | "AMR_LIFT2" | "AMR_LIFT3" | "AMR_LIFT4",
    x: number | string,
    y: number | string
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
  const robotSelector = useAppSelector((state) => state.robot);
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

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  useEffect(() => {
    setReceivedData({ ...receivedData });
    setRobotStatus({ ...robotStatus, ...JSON.parse(selector.potenitChart) });
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
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
    const isReal = receivedData.REMAININGTASKCOUNT[0] === "real";
    if (isReal) {
      dispatch(
        setDataState({
          ...selector,
          real: JSON.stringify({
            ...JSON.parse(selector.real),
            REMAININGTASKCOUNT: receivedData.REMAININGTASKCOUNT,
          }),
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: JSON.stringify({
            ...JSON.parse(selector.simulation),
            REMAININGTASKCOUNT: receivedData.REMAININGTASKCOUNT,
          }),
        })
      );
    }
  }, [receivedData.REMAININGTASKCOUNT]);

  useEffect(() => {
    const isReal = receivedData.ONGOINGTASKCOUNT[0] === "real";
    if (isReal) {
      dispatch(
        setDataState({
          ...selector,
          real: JSON.stringify({
            ...JSON.parse(selector.real),
            ONGOINGTASKCOUNT: receivedData.ONGOINGTASKCOUNT,
          }),
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: JSON.stringify({
            ...JSON.parse(selector.simulation),
            ONGOINGTASKCOUNT: receivedData.ONGOINGTASKCOUNT,
          }),
        })
      );
    }
  }, [receivedData.ONGOINGTASKCOUNT]);

  useEffect(() => {
    const isReal = receivedData.COMPLETEDTASKCOUNT[0] === "real";
    if (isReal) {
      dispatch(
        setDataState({
          ...selector,
          real: JSON.stringify({
            ...JSON.parse(selector.real),
            COMPLETEDTASKCOUNT: receivedData.COMPLETEDTASKCOUNT,
          }),
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: JSON.stringify({
            ...JSON.parse(selector.simulation),
            COMPLETEDTASKCOUNT: receivedData.COMPLETEDTASKCOUNT,
          }),
        })
      );
    }
  }, [receivedData.COMPLETEDTASKCOUNT]);

  useEffect(() => {
    const isReal = receivedData.NEWTASKCOUNT[0] === "real";
    if (isReal) {
      dispatch(
        setDataState({
          ...selector,
          real: JSON.stringify({
            ...JSON.parse(selector.real),
            NEWTASKCOUNT: receivedData.NEWTASKCOUNT,
          }),
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: JSON.stringify({
            ...JSON.parse(selector.simulation),
            NEWTASKCOUNT: receivedData.NEWTASKCOUNT,
          }),
        })
      );
    }
  }, [receivedData.NEWTASKCOUNT]);

  useEffect(() => {
    const isReal = receivedData.CUMULATIVETASKSPEED[0] === "real";
    if (isReal) {
      dispatch(
        setDataState({
          ...selector,
          real: JSON.stringify({
            ...JSON.parse(selector.real),
            CUMULATIVETASKSPEED: receivedData.CUMULATIVETASKSPEED,
          }),
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: JSON.stringify({
            ...JSON.parse(selector.simulation),
            CUMULATIVETASKSPEED: receivedData.CUMULATIVETASKSPEED,
          }),
        })
      );
    }
  }, [receivedData.CUMULATIVETASKSPEED]);

  useEffect(() => {
    const isReal = receivedData.AVERAGETASKSPEED[0] === "real";
    if (isReal) {
      dispatch(
        setDataState({
          ...selector,
          real: JSON.stringify({
            ...JSON.parse(selector.real),
            AVERAGETASKSPEED: receivedData.AVERAGETASKSPEED,
          }),
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: JSON.stringify({
            ...JSON.parse(selector.simulation),
            AVERAGETASKSPEED: receivedData.AVERAGETASKSPEED,
          }),
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
          potenitChart: JSON.stringify({
            ...JSON.parse(selector.potenitChart),
            ...temp,
          }),
        })
      );
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
          potenitChart: JSON.stringify({
            ...JSON.parse(selector.potenitChart),
            ...temp,
          }),
        })
      );
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
          potenitChart: JSON.stringify({
            ...JSON.parse(selector.potenitChart),
            ...temp,
          }),
        })
      );
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
          potenitChart: JSON.stringify({
            ...JSON.parse(selector.potenitChart),
            ...temp,
          }),
        })
      );
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
          potenitChart: JSON.stringify({
            ...JSON.parse(selector.potenitChart),
            ...temp,
          }),
        })
      );
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
        ROBOTPOSITION: [
          receivedData.ROBOTPOSITION[1],
          receivedData.ROBOTPOSITION[2],
        ],
      };
      if (robotId === "AMR_LIFT1") {
        if(receivedData.ROBOTPOSITION[1] != robot1Pos[0] && receivedData.ROBOTPOSITION[2] != robot1Pos[1]) {
          setRobotPos(
            [receivedData.ROBOTPOSITION[1], receivedData.ROBOTPOSITION[2]].map(
              Number
            )
          );
        }
      }
       
        
      if (robotId === "AMR_LIFT2") {
        if(receivedData.ROBOTPOSITION[1] != robot2Pos[0] && receivedData.ROBOTPOSITION[2] != robot2Pos[1]) {
          setRobotPos2(
            [receivedData.ROBOTPOSITION[1], receivedData.ROBOTPOSITION[2]].map(
              Number
            )
          );
        }
      }
      
        
      if (robotId === "AMR_LIFT3") {
        if(receivedData.ROBOTPOSITION[1] != robot3Pos[0] && receivedData.ROBOTPOSITION[2] != robot3Pos[1]) {
          setRobotPos3(
            [receivedData.ROBOTPOSITION[1], receivedData.ROBOTPOSITION[2]].map(
              Number
            )
          );
        }
      }
      if (robotId === "AMR_LIFT4") {
        if(receivedData.ROBOTPOSITION[1] != robot4Pos[0] && receivedData.ROBOTPOSITION[2] != robot4Pos[1]) {
          setRobotPos4(
            [receivedData.ROBOTPOSITION[1], receivedData.ROBOTPOSITION[2]].map(
              Number
            )
          );
        }
      }
    }
    dispatch(
      setRobotPosState({
        ...robotSelector,
        ...JSON.parse(JSON.stringify(temp)),
      })
    );
    console.log({
      ...robotSelector,
      ...JSON.parse(JSON.stringify(temp)),
    });
  }, [receivedData.ROBOTPOSITION]);

 useState<number|string>(robotSelector.AMR_LIFT1.ROBOTAT[0] === "" ? 4 : robotSelector.AMR_LIFT1.ROBOTAT[0]);
  const [robot1Pos, setRobotPos] = useState(
    // robotSelector.AMR_LIFT1.ROBOTPOSITION.length !== 2 &&
      robotSelector.AMR_LIFT1.ROBOTPOSITION[0] === ""
      ? [1, 1]
      : robotSelector.AMR_LIFT1.ROBOTPOSITION.map((el) => Number(el))
  );

  // const [robot2, setRobot2] = useState<number|string>(robotSelector.AMR_LIFT2.ROBOTAT[0] === "" ? 4 : robotSelector.AMR_LIFT2.ROBOTAT[0]);
  const [robot2Pos, setRobotPos2] = useState(
    // robotSelector.AMR_LIFT2.ROBOTPOSITION.length !== 2 &&
      robotSelector.AMR_LIFT2.ROBOTPOSITION[0] === ""
      ? [1, 1]
      : robotSelector.AMR_LIFT2.ROBOTPOSITION.map((el) => Number(el))
  );

  // const [robo31, setRobot3] = useState<number|string>(robotSelector.AMR_LIFT3.ROBOTAT[0] === "" ? 4 : robotSelector.AMR_LIFT3.ROBOTAT[0]);
  const [robot3Pos, setRobotPos3] = useState(
    // robotSelector.AMR_LIFT3.ROBOTPOSITION.length !== 2 &&
      robotSelector.AMR_LIFT3.ROBOTPOSITION[0] === ""
      ? [1, 1]
      : robotSelector.AMR_LIFT3.ROBOTPOSITION.map((el) => Number(el))
  );

  // const [robot4, setRobot4] = useState<number|string>(robotSelector.AMR_LIFT4.ROBOTAT[0] === "" ? 4 : robotSelector.AMR_LIFT4.ROBOTAT[0]);
  const [robot4Pos, setRobotPos4] = useState(
    // robotSelector.AMR_LIFT4.ROBOTPOSITION.length !== 2 &&
      robotSelector.AMR_LIFT4.ROBOTPOSITION[0] === ""
      ? [1, 1]
      : robotSelector.AMR_LIFT4.ROBOTPOSITION.map((el) => Number(el))
  );
  return (
    <>
      {isLoading && (
        <div
          className="bg-white w-full h-screen absolute"
          style={{ zIndex: 9999 }}
        >
          <div role="status" className="absolute inset-x-2/4 inset-y-2/4">
            <svg
              aria-hidden="true"
              className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <div style={{ overflow: "hidden", height: "875px" }}>
        {JSON.stringify(robotSelector.AMR_LIFT1.ROBOTPOSITION)} /{" "}
        {JSON.stringify(robotSelector.AMR_LIFT2.ROBOTPOSITION)} /{" "}
        {JSON.stringify(robotSelector.AMR_LIFT3.ROBOTPOSITION)} /{" "}
        {JSON.stringify(robotSelector.AMR_LIFT4.ROBOTPOSITION)}
        <CoordinatePlane
          data={Coordinates}
          obj={ObjNamePos}
          robot1Pos={robot1Pos}
          robot2Pos={robot2Pos}
          robot3Pos={robot3Pos}
          robot4Pos={robot4Pos}
        />
      </div>
    </>
  );
};

export default Real;
