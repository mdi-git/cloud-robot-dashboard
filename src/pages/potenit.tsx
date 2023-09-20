import ChartComponent from "@/components/DonutChart";
import SocketComponent from "@/components/SocketComponent";
import { useAppDispatch, useAppSelector } from "@/hooks";

export default function Potenit() {
  const selector = useAppSelector((state) => state.data);
  const robotSelector = useAppSelector((state) => state.robot);
  const potenitSelector = useAppSelector((state) => state.potenit);

  return (
    <>
    <SocketComponent />
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
                  {selector.real.REMAININGTASKCOUNT}
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
                  {selector.real.ONGOINGTASKCOUNT}
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
                  {selector.real.COMPLETEDTASKCOUNT}
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
                  {selector.real.NEWTASKCOUNT}
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
                  {selector.real.CUMULATIVETASKSPEED}
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
                  {selector.real.AVERAGETASKSPEED.toLocaleString()}
                </span>
                <span className="ml-1 text-m font-normal text-gray-500 dark:text-gray-400">
                  mm/s
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
                  {potenitSelector.AMR_LIFT1.TASKPROGRESS
                    ? potenitSelector.AMR_LIFT1.TASKPROGRESS +
                      `(${eval(potenitSelector.AMR_LIFT1.TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {potenitSelector.AMR_LIFT1.ROBOTTASKSTATUS
                    ? `${potenitSelector.AMR_LIFT1.ROBOTTASKSTATUS[0]} / ${potenitSelector.AMR_LIFT1.ROBOTTASKSTATUS[1]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (potenitSelector.AMR_LIFT1.BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: potenitSelector.AMR_LIFT1.BATTERYREMAIN
                        ? Number(potenitSelector.AMR_LIFT1.BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
              </div>
              <div className="w-full">
                <div className="font-bold">AMR_Lift2</div>
                <div>
                  진행도{" "}
                  {potenitSelector.AMR_LIFT2.TASKPROGRESS
                    ? potenitSelector.AMR_LIFT2.TASKPROGRESS +
                      `(${eval(potenitSelector.AMR_LIFT2.TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {potenitSelector.AMR_LIFT2.ROBOTTASKSTATUS
                    ? `${potenitSelector.AMR_LIFT2.ROBOTTASKSTATUS[0]} / ${potenitSelector.AMR_LIFT2.ROBOTTASKSTATUS[1]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (potenitSelector.AMR_LIFT2.BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: potenitSelector.AMR_LIFT2.BATTERYREMAIN
                        ? Number(potenitSelector.AMR_LIFT2.BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
              </div>
              <div className="w-full">
                <div className="font-bold">AMR_Lift3</div>
                <div>
                  진행도{" "}
                  {potenitSelector.AMR_LIFT3.TASKPROGRESS
                    ? potenitSelector.AMR_LIFT3.TASKPROGRESS +
                      `(${eval(potenitSelector.AMR_LIFT3.TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {potenitSelector.AMR_LIFT3.ROBOTTASKSTATUS
                    ? `${potenitSelector.AMR_LIFT3.ROBOTTASKSTATUS[0]} / ${potenitSelector.AMR_LIFT3.ROBOTTASKSTATUS[1]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (potenitSelector.AMR_LIFT3.BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: potenitSelector.AMR_LIFT3.BATTERYREMAIN
                        ? Number(potenitSelector.AMR_LIFT3.BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
              </div>
              <div className="w-full">
                <div className="font-bold">AMR_Lift4</div>
                <div>
                  진행도{" "}
                  {potenitSelector.AMR_LIFT4.TASKPROGRESS
                    ? potenitSelector.AMR_LIFT4.TASKPROGRESS +
                      `(${eval(potenitSelector.AMR_LIFT4.TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {potenitSelector.AMR_LIFT4.ROBOTTASKSTATUS
                    ? `${potenitSelector.AMR_LIFT4.ROBOTTASKSTATUS[0]} / ${potenitSelector.AMR_LIFT4.ROBOTTASKSTATUS[1]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (potenitSelector.AMR_LIFT4.BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: potenitSelector.AMR_LIFT4.BATTERYREMAIN
                        ? Number(potenitSelector.AMR_LIFT4.BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
              </div>
              <div className="w-full">
                <div className="font-bold">PALLETIZER1</div>
                <div>
                  진행도{" "}
                  {potenitSelector.PALLETIZER1.TASKPROGRESS
                    ? potenitSelector.PALLETIZER1.TASKPROGRESS +
                      `(${
                        eval(potenitSelector.PALLETIZER1.TASKPROGRESS) * 100
                      }%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {potenitSelector.PALLETIZER1.ROBOTTASKSTATUS
                    ? `${potenitSelector.PALLETIZER1.ROBOTTASKSTATUS[0]} / ${potenitSelector.PALLETIZER1.ROBOTTASKSTATUS[1]} `
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
