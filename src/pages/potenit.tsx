import ChartComponent from "@/components/DonutChart";
import { setDataState } from "@/features/dataSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

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
  ROBOTAT: [robotId: string, x: number, y: number];
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
            isNaN(parseInt(match)) ? match.slice(1, -1) : parseInt(match)
          ) || [];
    } else {
      parsedValues = parseInt(values);
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

export default function Potenit() {
  const selector = useAppSelector((state) => state.data);
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
    ROBOTAT: ["", 0, 0],
    
  });

  const [robotStatus, setRobotStatus] = useState<RobotStatusData>({
    AMR_LIFT1: {},
    AMR_LIFT2: {},
    AMR_LIFT3: {},
    AMR_LIFT4: {},
    PALLETIZER1: {},
    ...JSON.parse(selector.potenitChart),
  });

  const [realInfo, setRealInfo] = useState<RobotStatusData>({
    REMAININGTASKCOUNT: ["real", 0],
    ONGOINGTASKCOUNT: ["real", 0],
    COMPLETEDTASKCOUNT: ["real", 0],
    NEWTASKCOUNT: ["real", 0],
    CUMULATIVETASKSPEED: ["real", 0],
    AVERAGETASKSPEED: ["real", 0],
  })

  const [simulationInfo, setSimulationInfo] = useState<RobotStatusData>({
    REMAININGTASKCOUNT: ["simulation", 0],
    ONGOINGTASKCOUNT: ["simulation", 0],
    COMPLETEDTASKCOUNT: ["simulation", 0],
    NEWTASKCOUNT: ["simulation", 0],
    CUMULATIVETASKSPEED: ["simulation", 0],
    AVERAGETASKSPEED: ["simulation", 0],
  })

  useEffect(() => {
    console.log(JSON.parse(selector.potenitChart));
    setReceivedData({ ...receivedData });
    setRobotStatus({ ...robotStatus, ...JSON.parse(selector.potenitChart) });
    setRealInfo({...JSON.parse(selector.real)})
    setSimulationInfo({...JSON.parse(selector.real)});
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("소켓 생성!");
    });

    socket.on("getData", (data) => {
      // console.log(data, atob(data));
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
          real: JSON.stringify({ ...JSON.parse(selector.simulation), REMAININGTASKCOUNT: receivedData.REMAININGTASKCOUNT })
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
          real: JSON.stringify({ ...JSON.parse(selector.simulation), ONGOINGTASKCOUNT: receivedData.ONGOINGTASKCOUNT })
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
          real: JSON.stringify({ ...JSON.parse(selector.simulation), COMPLETEDTASKCOUNT: receivedData.COMPLETEDTASKCOUNT })
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
          real: JSON.stringify({ ...JSON.parse(selector.simulation), NEWTASKCOUNT: receivedData.NEWTASKCOUNT })
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
          real: JSON.stringify({ ...JSON.parse(selector.simulation), CUMULATIVETASKSPEED: receivedData.CUMULATIVETASKSPEED })
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
          real: JSON.stringify({ ...JSON.parse(selector.simulation), AVERAGETASKSPEED: receivedData.AVERAGETASKSPEED })
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
      return { ...prevRobotStatus, ...temp };
    });
  }, [receivedData.PERFIRMABLETASKCOUNT]);

  return (
    <>
      <div className="flex text-center">
        <div className="w-full">
          <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-3">
            <p className="font-bold text-lg">포테닛 물류센터 용 대시보드</p>
            {JSON.stringify(realInfo)} <br/>
            {JSON.stringify(simulationInfo)} <br/>
            {selector.real}
          </div>
          <div className="flex justify-around">
            <div className="basis-1/3 mr-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                남은 작업 수
              </h5>
              <div className="flex items-baseline text-gray-900 dark:text-white justify-center">
                <span className="text-5xl font-extrabold tracking-tight">
                  {realInfo.REMAININGTASKCOUNT[1]}
                </span>
                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  건
                </span>
              </div>
            </div>
            <div className="basis-1/3 mr-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                진행 중인 작업
              </h5>
              <div className="flex items-baseline text-gray-900 dark:text-white justify-center">
                <span className="text-5xl font-extrabold tracking-tight">
                  {realInfo.ONGOINGTASKCOUNT[1]}
                </span>
                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  건
                </span>
              </div>
            </div>
            <div className="basis-1/3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                완료된 작업
              </h5>
              <div className="flex items-baseline text-gray-900 dark:text-white justify-center">
                <span className="text-5xl font-extrabold tracking-tight">
                  {realInfo.COMPLETEDTASKCOUNT[1]}
                </span>
                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  건
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-around mt-3">
            <div className="basis-1/3 mr-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                신규 작업
              </h5>
              <div className="flex items-baseline text-gray-900 dark:text-white justify-center">
                <span className="text-5xl font-extrabold tracking-tight">
                  {realInfo.NEWTASKCOUNT[1]}
                </span>
                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  건
                </span>
              </div>
            </div>
            <div className="basis-1/3 mr-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                작업 누적 속도
              </h5>
              <div className="flex items-baseline text-gray-900 dark:text-white justify-center">
                <span className="text-5xl font-extrabold tracking-tight">
                  {realInfo.CUMULATIVETASKSPEED[1]}
                </span>
                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  건
                </span>
              </div>
            </div>
            <div className="basis-1/3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                평균 작업 속도
              </h5>
              <div className="flex items-baseline text-gray-900 dark:text-white justify-center">
                <span className="text-5xl font-extrabold tracking-tight">
                  {realInfo.AVERAGETASKSPEED[1]}
                </span>
                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  (속도)
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-8 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-3">
              <p className="font-bold">로봇 현황표</p>
            </div>
            <div className="flex justify-around">
              <div className="w-full">
                <div className="font-bold">AMR_Lift1</div>
                <div>
                  진행도{" "}
                  {robotStatus["AMR_LIFT1"].TASKPROGRESS
                    ? robotStatus["AMR_LIFT1"].TASKPROGRESS +
                      `(${eval(robotStatus["AMR_LIFT1"].TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {robotStatus["AMR_LIFT1"].ROBOTTASKSTATUS
                    ? `${robotStatus["AMR_LIFT1"].ROBOTTASKSTATUS[1]} / ${robotStatus["AMR_LIFT1"].ROBOTTASKSTATUS[2]} / ${robotStatus["AMR_LIFT1"].ROBOTTASKSTATUS[3]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (robotStatus["AMR_LIFT1"].BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: robotStatus["AMR_LIFT1"].BATTERYREMAIN
                        ? Number(robotStatus["AMR_LIFT1"].BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
                {/* <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>
                  {robotStatus["AMR_LIFT1"].PERFIRMABLETASKCOUNT
                    ? robotStatus["AMR_LIFT1"].PERFIRMABLETASKCOUNT
                    : 0}
                  건
                </div> */}
              </div>
              <div className="w-full">
                <div className="font-bold">AMR_Lift2</div>
                <div>
                  진행도{" "}
                  {robotStatus["AMR_LIFT2"].TASKPROGRESS
                    ? robotStatus["AMR_LIFT2"].TASKPROGRESS +
                      `(${eval(robotStatus["AMR_LIFT2"].TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {robotStatus["AMR_LIFT2"].ROBOTTASKSTATUS
                    ? `${robotStatus["AMR_LIFT2"].ROBOTTASKSTATUS[1]} / ${robotStatus["AMR_LIFT2"].ROBOTTASKSTATUS[2]} / ${robotStatus["AMR_LIFT2"].ROBOTTASKSTATUS[3]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (robotStatus["AMR_LIFT2"].BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: robotStatus["AMR_LIFT2"].BATTERYREMAIN
                        ? Number(robotStatus["AMR_LIFT2"].BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
                {/* <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>
                  {robotStatus["AMR_LIFT2"].PERFIRMABLETASKCOUNT
                    ? robotStatus["AMR_LIFT2"].PERFIRMABLETASKCOUNT
                    : 0}
                  건
                </div> */}
              </div>
              <div className="w-full">
                <div className="font-bold">AMR_Lift3</div>
                <div>
                  진행도{" "}
                  {robotStatus["AMR_LIFT3"].TASKPROGRESS
                    ? robotStatus["AMR_LIFT3"].TASKPROGRESS +
                      `(${eval(robotStatus["AMR_LIFT3"].TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {robotStatus["AMR_LIFT3"].ROBOTTASKSTATUS
                    ? `${robotStatus["AMR_LIFT3"].ROBOTTASKSTATUS[1]} / ${robotStatus["AMR_LIFT3"].ROBOTTASKSTATUS[2]} / ${robotStatus["AMR_LIFT3"].ROBOTTASKSTATUS[3]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (robotStatus["AMR_LIFT3"].BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: robotStatus["AMR_LIFT3"].BATTERYREMAIN
                        ? Number(robotStatus["AMR_LIFT3"].BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
                {/* <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>
                  {robotStatus["AMR_LIFT3"].PERFIRMABLETASKCOUNT
                    ? robotStatus["AMR_LIFT3"].PERFIRMABLETASKCOUNT
                    : 0}
                  건
                </div> */}
              </div>
              <div className="w-full">
                <div className="font-bold">AMR_Lift4</div>
                <div>
                  진행도{" "}
                  {robotStatus["AMR_LIFT4"].TASKPROGRESS
                    ? robotStatus["AMR_LIFT4"].TASKPROGRESS +
                      `(${eval(robotStatus["AMR_LIFT4"].TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {robotStatus["AMR_LIFT4"].ROBOTTASKSTATUS
                    ? `${robotStatus["AMR_LIFT4"].ROBOTTASKSTATUS[1]} / ${robotStatus["AMR_LIFT4"].ROBOTTASKSTATUS[2]} / ${robotStatus["AMR_LIFT4"].ROBOTTASKSTATUS[3]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (robotStatus["AMR_LIFT4"].BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: robotStatus["AMR_LIFT4"].BATTERYREMAIN
                        ? Number(robotStatus["AMR_LIFT4"].BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
                {/* <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>
                  {robotStatus["AMR_LIFT4"].PERFIRMABLETASKCOUNT
                    ? robotStatus["AMR_LIFT4"].PERFIRMABLETASKCOUNT
                    : 0}
                  건
                </div> */}
              </div>
              <div className="w-full">
                <div className="font-bold">PALLETIZER1</div>
                <div>
                  진행도{" "}
                  {robotStatus["PALLETIZER1"].TASKPROGRESS
                    ? robotStatus["PALLETIZER1"].TASKPROGRESS +
                      `(${eval(robotStatus["PALLETIZER1"].TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {robotStatus["PALLETIZER1"].ROBOTTASKSTATUS
                    ? `${robotStatus["PALLETIZER1"].ROBOTTASKSTATUS[1]} / ${robotStatus["PALLETIZER1"].ROBOTTASKSTATUS[2]} / ${robotStatus["PALLETIZER1"].ROBOTTASKSTATUS[3]}`
                    : "-"}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
