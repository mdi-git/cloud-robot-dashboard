import { setDataState } from "@/features/dataSlice";
import { setPotenitState } from "@/features/potenitSlice";
import { setRobotPosState } from "@/features/robotPosSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "dotenv/config";

let socksrv = "localhost";
// let socksrv = "13.124.24.230";
let socksrvp = 3002;

if (process.env.SOCK != null) {
  console.log("SOCK:" + process.env.SOCK + " / " + socksrvp);
  socksrv = process.env.SOCK;
}

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
  ASSEMBLEDITEMCOUNT: number;
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

const SocketComponent = ({}) => {
  const selector = useAppSelector((state) => state.data);
  const robotSelector = useAppSelector((state) => state.robot);
  const potenitSelector = useAppSelector((state) => state.potenit);
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
    ROBOTPOSITION: ["AMR_LIFT1", 0, 0],
    ASSEMBLEDITEMCOUNT: 0,
  });

  const [robotStatus, setRobotStatus] = useState<RobotStatusData>({
    AMR_LIFT1: {},
    AMR_LIFT2: {},
    AMR_LIFT3: {},
    AMR_LIFT4: {},
    PALLETIZER1: {},
    UR: {},
    Epson: {},
    ...JSON.parse(JSON.stringify(potenitSelector)),
  });

  useEffect(() => {
    setReceivedData({ ...receivedData });
    setRobotStatus({
      ...robotStatus,
      ...JSON.parse(JSON.stringify(potenitSelector)),
    });

    const socket = io("http://" + socksrv + ":" + socksrvp, {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("소켓 생성!");
    });

    socket.on("getData", (data) => {
      // console.log(atob(data));
      setReceivedData((prevReceivedData) => {
        const tempData = getKeyValueObject(atob(data));
        return { ...prevReceivedData, ...tempData };
      });
    });
  }, []);

  // for Korea Hitek
  useEffect(() => {
    dispatch(
      setDataState({
        ...selector,
        hitek: {
          ...selector.hitek,
          ASSEMBLEDITEMCOUNT: receivedData.ASSEMBLEDITEMCOUNT,
        },
      })
    );
  }, [receivedData.ASSEMBLEDITEMCOUNT]);

  useEffect(() => {
    const isReal = receivedData.REMAININGTASKCOUNT[0] === "real";
    if (isReal) {
      dispatch(
        setDataState({
          ...selector,
          real: {
            ...selector.real,
            REMAININGTASKCOUNT: receivedData.REMAININGTASKCOUNT[1],
          },
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: {
            ...selector.simulation,
            REMAININGTASKCOUNT: receivedData.REMAININGTASKCOUNT[1],
          },
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
          real: {
            ...selector.real,
            ONGOINGTASKCOUNT: receivedData.ONGOINGTASKCOUNT[1],
          },
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: {
            ...selector.simulation,
            ONGOINGTASKCOUNT: receivedData.ONGOINGTASKCOUNT[1],
          },
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
          real: {
            ...selector.real,
            COMPLETEDTASKCOUNT: receivedData.COMPLETEDTASKCOUNT[1],
          },
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: {
            ...selector.simulation,
            COMPLETEDTASKCOUNT: receivedData.COMPLETEDTASKCOUNT[1],
          },
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
          real: {
            ...selector.real,
            NEWTASKCOUNT: receivedData.NEWTASKCOUNT[1],
          },
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: {
            ...selector.simulation,
            NEWTASKCOUNT: receivedData.NEWTASKCOUNT[1],
          },
        })
      );
    }
  }, [receivedData.NEWTASKCOUNT]);

  // useEffect(() => {
  //   const isReal = receivedData.AVERAGETASKSPEED[0] === "real";
  //   if (isReal) {
  //     dispatch(
  //       setDataState({
  //         ...selector,
  //         real: {
  //           ...selector.real,
  //           CUMULATIVETASKSPEED: [...selector.real.CUMULATIVETASKSPEED, receivedData.AVERAGETASKSPEED[1]],
  //         },
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       setDataState({
  //         ...selector,
  //         simulation: {
  //           ...selector.simulation,
  //           CUMULATIVETASKSPEED: [...selector.real.CUMULATIVETASKSPEED, receivedData.AVERAGETASKSPEED[1]],
  //         },
  //       })
  //     );
  //   }
  // }, [receivedData.AVERAGETASKSPEED]);

  useEffect(() => {
    const isReal = receivedData.AVERAGETASKSPEED[0] === "real";
    if (isReal) {
      dispatch(
        setDataState({
          ...selector,
          real: {
            ...selector.real,
            AVERAGETASKSPEED: receivedData.AVERAGETASKSPEED[1],
            CUMULATIVETASKSPEED: [...selector.real.CUMULATIVETASKSPEED, receivedData.AVERAGETASKSPEED[1]].filter(el => el !== 0)
          },
        })
      );
    } else {
      dispatch(
        setDataState({
          ...selector,
          simulation: {
            ...selector.simulation,
            AVERAGETASKSPEED: receivedData.AVERAGETASKSPEED[1],
            CUMULATIVETASKSPEED: [...selector.real.CUMULATIVETASKSPEED, receivedData.AVERAGETASKSPEED[1]].filter(el => el !== 0)
          },
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

        dispatch(
          setPotenitState({
            ...potenitSelector,
            ...temp,
          })
        );
      }

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
          ROBOTTASKSTATUS: [
            receivedData.ROBOTTASKSTATUS[2],
            receivedData.ROBOTTASKSTATUS[3],
          ],
        };

        console.log(temp)

        dispatch(
          setPotenitState({
            ...potenitSelector,
            ...temp,
          })
        );
      }

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
        dispatch(
          setPotenitState({
            ...potenitSelector,
            ...temp,
          })
        );
      }

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
        dispatch(
          setPotenitState({
            ...potenitSelector,
            ...temp,
          })
        );
      }

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
        dispatch(
          setPotenitState({
            ...potenitSelector,
            ...temp,
          })
        );
      }

      return { ...prevRobotStatus, ...temp };
    });
  }, [receivedData.PERFIRMABLETASKCOUNT]);

  useEffect(() => {
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
    }
    // console.log(temp, robotSelector);
    dispatch(
      setRobotPosState({
        ...robotSelector,
        ...JSON.parse(JSON.stringify(temp)),
      })
    );
  }, [receivedData.ROBOTPOSITION]);

  useEffect(() => {
    // setRobotStatus((prevRobotStatus) => {

    //   return { ...prevRobotStatus, ...temp };
    // });

    const temp: ObjectProps = {};
    const robotId = receivedData.ROBOTAT[0];
    if (robotId) {
      temp[`${robotId}`] = {
        ...robotSelector[`${robotId}`],
        ROBOTAT: [receivedData.ROBOTAT[1], receivedData.ROBOTAT[2]],
      };
    }
    dispatch(
      setRobotPosState({
        ...robotSelector,
        ...JSON.parse(JSON.stringify(temp)),
      })
    );
  }, [receivedData.ROBOTAT]);

  return <></>;
};

export default SocketComponent;
