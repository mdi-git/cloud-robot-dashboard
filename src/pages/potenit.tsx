import ChartComponent from "@/components/DonutChart";
import { useAppSelector } from "@/hooks";

export default function Potenit() {
  const selector = useAppSelector((state) => state.data);

  return (
    <>
      <div className="flex text-center">
        <div className="w-full">
          <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-3">
            <p className="font-bold text-lg">포테닛 물류센터 용 대시보드</p>
            {/* {JSON.stringify(JSON.parse(selector.potenitChart))} <br/> */}
            {selector.potenitChart}
          </div>
          <div className="flex justify-around">
            <div className="basis-1/3 mr-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                남은 작업 수
              </h5>
              <div className="flex items-baseline text-gray-900 dark:text-white justify-center">
                <span className="text-5xl font-extrabold tracking-tight">
                  {JSON.parse(selector.real).REMAININGTASKCOUNT[1]}
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
                  {JSON.parse(selector.real).ONGOINGTASKCOUNT[1]}
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
                  {JSON.parse(selector.real).COMPLETEDTASKCOUNT[1]}
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
                  {JSON.parse(selector.real).NEWTASKCOUNT[1]}
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
                  {JSON.parse(selector.real).CUMULATIVETASKSPEED[1]}
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
                  {JSON.parse(selector.real).AVERAGETASKSPEED[1]}
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
                  {JSON.parse(selector.potenitChart)["AMR_LIFT1"].TASKPROGRESS
                    ? JSON.parse(selector.potenitChart)["AMR_LIFT1"].TASKPROGRESS +
                      `(${eval(JSON.parse(selector.potenitChart)["AMR_LIFT1"].TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {JSON.parse(selector.potenitChart)["AMR_LIFT1"].ROBOTTASKSTATUS
                    ? `${JSON.parse(selector.potenitChart)["AMR_LIFT1"].ROBOTTASKSTATUS[1]} / ${JSON.parse(selector.potenitChart)["AMR_LIFT1"].ROBOTTASKSTATUS[2]} / ${JSON.parse(selector.potenitChart)["AMR_LIFT1"].ROBOTTASKSTATUS[3]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (JSON.parse(selector.potenitChart)["AMR_LIFT1"].BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: JSON.parse(selector.potenitChart)["AMR_LIFT1"].BATTERYREMAIN
                        ? Number(JSON.parse(selector.potenitChart)["AMR_LIFT1"].BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
                {/* <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>
                  {JSON.parse(selector.potenitChart)["AMR_LIFT1"].PERFIRMABLETASKCOUNT
                    ? JSON.parse(selector.potenitChart)["AMR_LIFT1"].PERFIRMABLETASKCOUNT
                    : 0}
                  건
                </div> */}
              </div>
              <div className="w-full">
                <div className="font-bold">AMR_Lift2</div>
                <div>
                  진행도{" "}
                  {JSON.parse(selector.potenitChart)["AMR_LIFT2"].TASKPROGRESS
                    ? JSON.parse(selector.potenitChart)["AMR_LIFT2"].TASKPROGRESS +
                      `(${eval(JSON.parse(selector.potenitChart)["AMR_LIFT2"].TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {JSON.parse(selector.potenitChart)["AMR_LIFT2"].ROBOTTASKSTATUS
                    ? `${JSON.parse(selector.potenitChart)["AMR_LIFT2"].ROBOTTASKSTATUS[1]} / ${JSON.parse(selector.potenitChart)["AMR_LIFT2"].ROBOTTASKSTATUS[2]} / ${JSON.parse(selector.potenitChart)["AMR_LIFT2"].ROBOTTASKSTATUS[3]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (JSON.parse(selector.potenitChart)["AMR_LIFT2"].BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: JSON.parse(selector.potenitChart)["AMR_LIFT2"].BATTERYREMAIN
                        ? Number(JSON.parse(selector.potenitChart)["AMR_LIFT2"].BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
                {/* <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>
                  {JSON.parse(selector.potenitChart)["AMR_LIFT2"].PERFIRMABLETASKCOUNT
                    ? JSON.parse(selector.potenitChart)["AMR_LIFT2"].PERFIRMABLETASKCOUNT
                    : 0}
                  건
                </div> */}
              </div>
              <div className="w-full">
                <div className="font-bold">AMR_Lift3</div>
                <div>
                  진행도{" "}
                  {JSON.parse(selector.potenitChart)["AMR_LIFT3"].TASKPROGRESS
                    ? JSON.parse(selector.potenitChart)["AMR_LIFT3"].TASKPROGRESS +
                      `(${eval(JSON.parse(selector.potenitChart)["AMR_LIFT3"].TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {JSON.parse(selector.potenitChart)["AMR_LIFT3"].ROBOTTASKSTATUS
                    ? `${JSON.parse(selector.potenitChart)["AMR_LIFT3"].ROBOTTASKSTATUS[1]} / ${JSON.parse(selector.potenitChart)["AMR_LIFT3"].ROBOTTASKSTATUS[2]} / ${JSON.parse(selector.potenitChart)["AMR_LIFT3"].ROBOTTASKSTATUS[3]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (JSON.parse(selector.potenitChart)["AMR_LIFT3"].BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: JSON.parse(selector.potenitChart)["AMR_LIFT3"].BATTERYREMAIN
                        ? Number(JSON.parse(selector.potenitChart)["AMR_LIFT3"].BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
                {/* <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>
                  {JSON.parse(selector.potenitChart)["AMR_LIFT3"].PERFIRMABLETASKCOUNT
                    ? JSON.parse(selector.potenitChart)["AMR_LIFT3"].PERFIRMABLETASKCOUNT
                    : 0}
                  건
                </div> */}
              </div>
              <div className="w-full">
                <div className="font-bold">AMR_Lift4</div>
                <div>
                  진행도{" "}
                  {JSON.parse(selector.potenitChart)["AMR_LIFT4"].TASKPROGRESS
                    ? JSON.parse(selector.potenitChart)["AMR_LIFT4"].TASKPROGRESS +
                      `(${eval(JSON.parse(selector.potenitChart)["AMR_LIFT4"].TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {JSON.parse(selector.potenitChart)["AMR_LIFT4"].ROBOTTASKSTATUS
                    ? `${JSON.parse(selector.potenitChart)["AMR_LIFT4"].ROBOTTASKSTATUS[1]} / ${JSON.parse(selector.potenitChart)["AMR_LIFT4"].ROBOTTASKSTATUS[2]} / ${JSON.parse(selector.potenitChart)["AMR_LIFT4"].ROBOTTASKSTATUS[3]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (JSON.parse(selector.potenitChart)["AMR_LIFT4"].BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: JSON.parse(selector.potenitChart)["AMR_LIFT4"].BATTERYREMAIN
                        ? Number(JSON.parse(selector.potenitChart)["AMR_LIFT4"].BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
                {/* <div className="mt-4 font-bold">
                  배터리 잔량에 따른 수행 가능 작업 수
                </div>
                <div>
                  {JSON.parse(selector.potenitChart)["AMR_LIFT4"].PERFIRMABLETASKCOUNT
                    ? JSON.parse(selector.potenitChart)["AMR_LIFT4"].PERFIRMABLETASKCOUNT
                    : 0}
                  건
                </div> */}
              </div>
              <div className="w-full">
                <div className="font-bold">PALLETIZER1</div>
                <div>
                  진행도{" "}
                  {JSON.parse(selector.potenitChart)["PALLETIZER1"].TASKPROGRESS
                    ? JSON.parse(selector.potenitChart)["PALLETIZER1"].TASKPROGRESS +
                      `(${eval(JSON.parse(selector.potenitChart)["PALLETIZER1"].TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {JSON.parse(selector.potenitChart)["PALLETIZER1"].ROBOTTASKSTATUS
                    ? `${JSON.parse(selector.potenitChart)["PALLETIZER1"].ROBOTTASKSTATUS[1]} / ${JSON.parse(selector.potenitChart)["PALLETIZER1"].ROBOTTASKSTATUS[2]} / ${JSON.parse(selector.potenitChart)["PALLETIZER1"].ROBOTTASKSTATUS[3]}`
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
