import ChartComponent from "@/components/DonutChart";
import { setDataState } from "@/features/dataSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface RobotData {
  REMAININGTASKCOUNT: number;
  ONGOINGTASKCOUNT: number;
  COMPLETEDTASKCOUNT: number;
  NEWTASKCOUNT: number;
  CUMULATIVETASKSPEED: number;
  AVERAGETASKSPEED: number;
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
    // REMAININGTASKCOUNT: 0,
    // ONGOINGTASKCOUNT: 0,
    // COMPLETEDTASKCOUNT: 0,
    // NEWTASKCOUNT: 0,
    // CUMULATIVETASKSPEED: 0,
    // AVERAGETASKSPEED: 0,

    TASKPROGRESS: ["", ""],
    ROBOTTASKSTATUS: ["", "", "", "progress"],
    BATTERYREMAIN: ["", 0],
    BATTERYSTATUS: ["", "Using"],
    PERFIRMABLETASKCOUNT: ["", 0],
    ROBOTAT: ["", 0, 0],
    ...JSON.parse(selector.potenitInfo),
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
    console.log(JSON.parse(selector.potenitChart));
    setReceivedData({ ...receivedData, ...JSON.parse(selector.potenitInfo) });
    setRobotStatus({ ...robotStatus, ...JSON.parse(selector.potenitChart) });
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("소켓 생성!");
    });

    socket.on("getData", (data) => {
      console.log(data, atob(data));
      setReceivedData((prevReceivedData) => {
        const tempData = getKeyValueObject(atob(data));
        dispatch(
          setDataState({
            ...selector,
            potenitInfo: JSON.stringify({ ...prevReceivedData, ...tempData }),
            potenitChart: JSON.stringify({...robotStatus})
          })
        );
        return { ...prevReceivedData, ...tempData };
      });
    });
  }, []);

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
          </div>
          <div className="flex justify-around">
            <div className="basis-1/3 mr-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                남은 작업 수
              </h5>
              <div className="flex items-baseline text-gray-900 dark:text-white justify-center">
                <span className="text-5xl font-extrabold tracking-tight">
                  {receivedData.REMAININGTASKCOUNT}
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
                  {receivedData.ONGOINGTASKCOUNT}
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
                  {receivedData.COMPLETEDTASKCOUNT}
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
                  {receivedData.NEWTASKCOUNT}
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
                  {receivedData.CUMULATIVETASKSPEED}
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
                  {receivedData.AVERAGETASKSPEED}
                </span>
                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  건
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
                <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>
                  {robotStatus["AMR_LIFT1"].PERFIRMABLETASKCOUNT
                    ? robotStatus["AMR_LIFT1"].PERFIRMABLETASKCOUNT
                    : 0}
                  건
                </div>
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
                <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>
                  {robotStatus["AMR_LIFT2"].PERFIRMABLETASKCOUNT
                    ? robotStatus["AMR_LIFT2"].PERFIRMABLETASKCOUNT
                    : 0}
                  건
                </div>
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
                <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>
                  {robotStatus["AMR_LIFT3"].PERFIRMABLETASKCOUNT
                    ? robotStatus["AMR_LIFT3"].PERFIRMABLETASKCOUNT
                    : 0}
                  건
                </div>
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
                <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>
                  {robotStatus["AMR_LIFT4"].PERFIRMABLETASKCOUNT
                    ? robotStatus["AMR_LIFT4"].PERFIRMABLETASKCOUNT
                    : 0}
                  건
                </div>
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
