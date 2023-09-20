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
            <p className="font-bold text-lg">가상 물류 로봇 용 대시보드</p>
          </div>
          <div className="flex justify-around">
            <div className="basis-1/3 mr-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                남은 작업 수
              </h5>
              <div className="flex items-baseline text-gray-900 dark:text-white justify-center">
                <span className="text-5xl font-extrabold tracking-tight">
                  {selector.simulation.REMAININGTASKCOUNT}
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
                  {selector.simulation.ONGOINGTASKCOUNT}
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
                  {selector.simulation.COMPLETEDTASKCOUNT}
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
                  {selector.simulation.NEWTASKCOUNT}
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
                  {selector.simulation.CUMULATIVETASKSPEED}
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
                  {selector.simulation.AVERAGETASKSPEED.toLocaleString()}
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
                <div className="font-bold">AMR_Lift5</div>
                <div>
                  진행도{" "}
                  {potenitSelector.AMR_LIFT5.TASKPROGRESS
                    ? potenitSelector.AMR_LIFT5.TASKPROGRESS +
                      `(${eval(potenitSelector.AMR_LIFT5.TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {potenitSelector.AMR_LIFT5.ROBOTTASKSTATUS
                    ? `${potenitSelector.AMR_LIFT5.ROBOTTASKSTATUS[0]} / ${potenitSelector.AMR_LIFT5.ROBOTTASKSTATUS[1]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (potenitSelector.AMR_LIFT5.BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: potenitSelector.AMR_LIFT5.BATTERYREMAIN
                        ? Number(potenitSelector.AMR_LIFT5.BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
              </div>
              <div className="w-full">
                <div className="font-bold">AMR_Lift6</div>
                <div>
                  진행도{" "}
                  {potenitSelector.AMR_LIFT6.TASKPROGRESS
                    ? potenitSelector.AMR_LIFT6.TASKPROGRESS +
                      `(${eval(potenitSelector.AMR_LIFT6.TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {potenitSelector.AMR_LIFT6.ROBOTTASKSTATUS
                    ? `${potenitSelector.AMR_LIFT6.ROBOTTASKSTATUS[0]} / ${potenitSelector.AMR_LIFT6.ROBOTTASKSTATUS[1]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (potenitSelector.AMR_LIFT6.BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: potenitSelector.AMR_LIFT6.BATTERYREMAIN
                        ? Number(potenitSelector.AMR_LIFT6.BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
              </div>
              <div className="w-full">
                <div className="font-bold">AMR_Lift7</div>
                <div>
                  진행도{" "}
                  {potenitSelector.AMR_LIFT7.TASKPROGRESS
                    ? potenitSelector.AMR_LIFT7.TASKPROGRESS +
                      `(${eval(potenitSelector.AMR_LIFT7.TASKPROGRESS) * 100}%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {potenitSelector.AMR_LIFT7.ROBOTTASKSTATUS
                    ? `${potenitSelector.AMR_LIFT7.ROBOTTASKSTATUS[0]} / ${potenitSelector.AMR_LIFT7.ROBOTTASKSTATUS[1]}`
                    : "-"}{" "}
                </div>
                <div className="mt-4">배터리 상황</div>
                <ChartComponent
                  data={[
                    {
                      name: "사용됨",
                      value:
                        100 - (potenitSelector.AMR_LIFT7.BATTERYREMAIN || 0),
                    },
                    {
                      name: "충전됨",
                      value: potenitSelector.AMR_LIFT7.BATTERYREMAIN
                        ? Number(potenitSelector.AMR_LIFT7.BATTERYREMAIN)
                        : 0,
                    },
                  ]}
                />
              </div>
              <div className="w-full">
                <div className="font-bold">PALLETIZER2</div>
                <div>
                  진행도{" "}
                  {potenitSelector.PALLETIZER2.TASKPROGRESS
                    ? potenitSelector.PALLETIZER2.TASKPROGRESS +
                      `(${
                        eval(potenitSelector.PALLETIZER2.TASKPROGRESS) * 100
                      }%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {potenitSelector.PALLETIZER2.ROBOTTASKSTATUS
                    ? `${potenitSelector.PALLETIZER2.ROBOTTASKSTATUS[0]} / ${potenitSelector.PALLETIZER2.ROBOTTASKSTATUS[1]} `
                    : "-"}{" "}
                </div>
              </div>
              <div className="w-full">
                <div className="font-bold">PALLETIZER3</div>
                <div>
                  진행도{" "}
                  {potenitSelector.PALLETIZER3.TASKPROGRESS
                    ? potenitSelector.PALLETIZER3.TASKPROGRESS +
                      `(${
                        eval(potenitSelector.PALLETIZER3.TASKPROGRESS) * 100
                      }%)`
                    : "-/-"}
                </div>
                <div className="mt-3 font-bold">현재 진행중인 작업</div>
                <div>
                  {potenitSelector.PALLETIZER3.ROBOTTASKSTATUS
                    ? `${potenitSelector.PALLETIZER3.ROBOTTASKSTATUS[0]} / ${potenitSelector.PALLETIZER3.ROBOTTASKSTATUS[1]} `
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
