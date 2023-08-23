import ChartComponent from "@/components/DonutChart";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface RobotData {
  RemainingTaskCount: number;
  OngoingTaskCount: number;
  CompletedTaskCount: number;
  NewTaskCount: number;
  CumulativeTaskSpeed: number;
  AverageTaskSpeed: number;
  TaskProgress: [robotId: string, progress: string];
  RobotTaskStatus: [robotId: string, taskId: string, taskName: string, status: "start" | "progress" | "pause" | "complete"];
  BatteryRemain: [robotId: string, batteryStatus: number];
  BatteryStatus: [robotId: string, batteryStatus: "Using" | "Charging"];
  PerfirmableTaskCount: [robotId: string, count: number];
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
        values.split(' ').map((match) => isNaN(parseInt(match)) ? match.slice(1, -1) : parseInt(match)) || [];
        console.log(values)
    } else {
      parsedValues = parseInt(values);
    }

    console.log('parsedValues:', parsedValues)

    let output: { [key: string]: (string | number)[] | number } = {
      [key]: parsedValues,
    };
    console.log('output: ', output)
    return output;
  } else {
    console.log("No valid input found.");
    return {};
  }
}

function getRobotDataByRobotId(arr: (string|number)[]) {

}

export default function Potenit() {
  const chartData = [
    { name: "Red", value: 12 },
    { name: "Blue", value: 19 },
  ];

  const [receivedData, setReceivedData] = useState<RobotData>({
    RemainingTaskCount: 0,
    OngoingTaskCount: 0,
    CompletedTaskCount: 0,
    NewTaskCount: 0,
    CumulativeTaskSpeed: 0,
    AverageTaskSpeed: 0,
    TaskProgress: ["", ""],
    RobotTaskStatus: ["", "", "", "progress"],
    BatteryRemain: ["", 0],
    BatteryStatus: ["", "Using"],
    PerfirmableTaskCount: ["", 0],
  });

  const [robotStatus, setRobotStatus] = useState<RobotStatusData>({
    AMR_LIFT1: {},
    AMR_LIFT2: {},
    AMR_LIFT3: {},
    AMR_LIFT4: {},
    PALLETIZER1: {}
  });

  useEffect(() => {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("소켓 생성!");
    });

    socket.on("getData", (data) => {
      setReceivedData((prevReceivedData) => {
        const tempData = getKeyValueObject(data);
        return { ...prevReceivedData, ...tempData };
      });
    });
  }, []);

  useEffect(() => {
    setRobotStatus((prevRobotStatus) => {
      const temp:ObjectProps = {};
      if(receivedData.PerfirmableTaskCount[0]) {
        temp[`${receivedData.PerfirmableTaskCount[0]}`] = {PerfirmableTaskCount: receivedData.PerfirmableTaskCount[1]}
      }
      return { ...prevRobotStatus, ...temp};
    })
  }, [receivedData.PerfirmableTaskCount])

  useEffect(() => {
    setRobotStatus((prevRobotStatus) => {
      const temp:ObjectProps = {};
      if(receivedData.TaskProgress[0]) {
        temp[`${receivedData.TaskProgress[0]}`] = {TaskProgress: receivedData.TaskProgress[1]}
      }
      return { ...prevRobotStatus, ...temp};
    })
  }, [receivedData.TaskProgress])

  // @TODO 나머지 value들도 ...

  console.log('robotStatus', robotStatus)

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
                  {receivedData.RemainingTaskCount}
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
                  {receivedData.OngoingTaskCount}
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
                  {receivedData.CompletedTaskCount}
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
                  {receivedData.NewTaskCount}
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
                  {receivedData.CumulativeTaskSpeed}
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
                  {receivedData.AverageTaskSpeed}
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
                <div>진행도 {robotStatus['AMR_LIFT1'] ? robotStatus['AMR_LIFT1'].TaskProgress : "-/-"}</div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div> status</div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent data={chartData} />
                <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>{robotStatus['AMR_LIFT1'].PerfirmableTaskCount ? robotStatus['AMR_LIFT1'].PerfirmableTaskCount : 0}건</div>
              </div>
              <div className="w-full">
                <div className="font-bold">AMR_Lift2</div>
                <div>진행도</div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>taskName status</div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent data={chartData} />
                <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>10건</div>
              </div>
              <div className="w-full">
                <div className="font-bold">AMR_Lift3</div>
                <div>진행도</div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>taskName status</div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent data={chartData} />
                <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>10건</div>
              </div>
              <div className="w-full">
                <div className="font-bold">AMR_Lift4</div>
                <div>진행도</div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>taskName status</div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent data={chartData} />
                <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>10건</div>
              </div>
              <div className="w-full">
                <div className="font-bold">PALLETIZER1</div>
                <div>진행도</div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>taskName status</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
