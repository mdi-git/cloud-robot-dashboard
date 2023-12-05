import ChartComponent from "@/components/DonutChart";
import { Line } from "rc-progress";
import SocketComponent from "@/components/SocketComponent";
import { useAppSelector } from "@/hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons"

function Dashboard() {
  const selector = useAppSelector((state) => state.data);
  const potenitSelector = useAppSelector((state) => state.potenit);

  return (
    <>
      <SocketComponent />
      <div className="w-full">
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-3">
          <p className="font-bold text-lg text-center">대시보드</p>
        </div>
      </div>
      <div className="flex">
        <div className="flex text-center basis-5/12 mr-3">
          <div className="w-full">
            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-3">
              <p className="font-bold text-lg">포테닛 물류센터 용
              <a href="/map/real" target="_blank" className="text-blue-700" style={{textDecoration: 'none', color: 'rgb(29 78 216)'}}> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
              </p>
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
                    건/m
                  </span>
                </div>
              </div>
              <div className="basis-1/3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                  평균 작업 속도
                </h5>
                <div className="flex items-baseline text-gray-900 dark:text-white justify-center">
                  <span className="text-5xl font-extrabold tracking-tight">
                    {selector.real.AVERAGETASKSPEED.toFixed(0)}
                  </span>
                  <span className="ml-1 text-m font-normal text-gray-500 dark:text-gray-400">
                    건/m
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
                  <div className="font-bold mb-3">AMR_Lift1</div>
                  <div>
                    진행도 {eval(potenitSelector.AMR_LIFT1.TASKPROGRESS) * 100}%
                    <Line
                      className="m-auto mt-1 w-4/5 "
                      percent={
                        potenitSelector.AMR_LIFT1.TASKPROGRESS
                          ? eval(potenitSelector.AMR_LIFT1.TASKPROGRESS) * 100
                          : 0
                      }
                      strokeWidth={7}
                      strokeColor={colorByProgress(
                        potenitSelector.AMR_LIFT1.TASKPROGRESS
                      )}
                    />
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                  <div className="mt-5 font-bold">현재 진행중인 작업</div>
                  <div className="break-words">
                    {potenitSelector.AMR_LIFT1.ROBOTTASKSTATUS ? (
                      <div>
                        {potenitSelector.AMR_LIFT1.ROBOTTASKSTATUS[0]}
                        <div>
                          {potenitSelector.AMR_LIFT1.ROBOTTASKSTATUS[1]}
                        </div>
                      </div>
                    ) : (
                      "-"
                    )}{" "}
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
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
                  <div className="font-bold mb-3">AMR_Lift2</div>
                  <div>
                    진행도 {eval(potenitSelector.AMR_LIFT2.TASKPROGRESS) * 100}%
                    <Line
                      className="m-auto mt-1 w-4/5 "
                      percent={
                        potenitSelector.AMR_LIFT2.TASKPROGRESS
                          ? eval(potenitSelector.AMR_LIFT2.TASKPROGRESS) * 100
                          : 0
                      }
                      strokeWidth={7}
                      strokeColor={colorByProgress(
                        potenitSelector.AMR_LIFT2.TASKPROGRESS
                      )}
                    />
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                  <div className="mt-5 font-bold">현재 진행중인 작업</div>
                  <div>
                    {potenitSelector.AMR_LIFT2.ROBOTTASKSTATUS ? (
                      <div>
                        {potenitSelector.AMR_LIFT2.ROBOTTASKSTATUS[0]}
                        <div>
                          {potenitSelector.AMR_LIFT2.ROBOTTASKSTATUS[1]}
                        </div>
                      </div>
                    ) : (
                      "-"
                    )}{" "}
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
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
                  <div className="font-bold mb-3">AMR_Lift3</div>
                  <div>
                    진행도 {eval(potenitSelector.AMR_LIFT3.TASKPROGRESS) * 100}%
                    <Line
                      className="m-auto mt-1 w-4/5 "
                      percent={
                        potenitSelector.AMR_LIFT3.TASKPROGRESS
                          ? eval(potenitSelector.AMR_LIFT3.TASKPROGRESS) * 100
                          : 0
                      }
                      strokeWidth={7}
                      strokeColor={colorByProgress(
                        potenitSelector.AMR_LIFT3.TASKPROGRESS
                      )}
                    />
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                  <div className="mt-5 font-bold">현재 진행중인 작업</div>
                  <div>
                    {potenitSelector.AMR_LIFT3.ROBOTTASKSTATUS ? (
                      <div>
                        {potenitSelector.AMR_LIFT3.ROBOTTASKSTATUS[0]}
                        <div>
                          {potenitSelector.AMR_LIFT3.ROBOTTASKSTATUS[1]}
                        </div>
                      </div>
                    ) : (
                      "-"
                    )}{" "}
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
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
                  <div className="font-bold mb-3">AMR_Lift4</div>
                  <div>
                    진행도 {eval(potenitSelector.AMR_LIFT4.TASKPROGRESS) * 100}%
                    <Line
                      className="m-auto mt-1 w-4/5 "
                      percent={
                        potenitSelector.AMR_LIFT4.TASKPROGRESS
                          ? eval(potenitSelector.AMR_LIFT4.TASKPROGRESS) * 100
                          : 0
                      }
                      strokeWidth={7}
                      strokeColor={colorByProgress(
                        potenitSelector.AMR_LIFT4.TASKPROGRESS
                      )}
                    />
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                  <div className="mt-5 font-bold">현재 진행중인 작업</div>
                  <div>
                    {potenitSelector.AMR_LIFT4.ROBOTTASKSTATUS ? (
                      <div>
                        {potenitSelector.AMR_LIFT4.ROBOTTASKSTATUS[0]}
                        <div>
                          {potenitSelector.AMR_LIFT4.ROBOTTASKSTATUS[1]}
                        </div>
                      </div>
                    ) : (
                      "-"
                    )}{" "}
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
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
                  <div className="font-bold mb-3">PALLETIZER1</div>
                  <div>
                    진행도{" "}
                    {eval(potenitSelector.PALLETIZER1.TASKPROGRESS) * 100}%
                    <Line
                      className="m-auto mt-1 w-4/5 "
                      percent={
                        potenitSelector.PALLETIZER1.TASKPROGRESS
                          ? eval(potenitSelector.PALLETIZER1.TASKPROGRESS) * 100
                          : 0
                      }
                      strokeWidth={7}
                      strokeColor={colorByProgress(
                        potenitSelector.PALLETIZER1.TASKPROGRESS
                      )}
                    />
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                  <div className="mt-5 font-bold">현재 진행중인 작업</div>
                  <div>
                    {potenitSelector.PALLETIZER1.ROBOTTASKSTATUS ? (
                      <div>
                        {potenitSelector.PALLETIZER1.ROBOTTASKSTATUS[0]}
                        <div>
                          {potenitSelector.PALLETIZER1.ROBOTTASKSTATUS[1]}
                        </div>
                      </div>
                    ) : (
                      "-"
                    )}{" "}
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex text-center basis-5/12 mr-3">
          <div className="w-full">
            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-3">
              <p className="font-bold text-lg">가상 물류 로봇 용
              <a href="/map/isaac" target="_blank" className="text-blue-700" style={{textDecoration: 'none', color: 'rgb(29 78 216)'}}> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
              </p>
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
                    건/m
                  </span>
                </div>
              </div>
              <div className="basis-1/3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                  평균 작업 속도
                </h5>
                <div className="flex items-baseline text-gray-900 dark:text-white justify-center">
                  <span className="text-5xl font-extrabold tracking-tight">
                    {selector.simulation.AVERAGETASKSPEED.toFixed(0)}
                  </span>
                  <span className="ml-1 text-m font-normal text-gray-500 dark:text-gray-400">
                    건/m
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
                  <div className="font-bold mb-3">AMR_Lift5</div>
                  <div>
                    진행도 {eval(potenitSelector.AMR_LIFT5.TASKPROGRESS) * 100}%
                    <Line
                      className="m-auto mt-1 w-4/5 "
                      percent={
                        potenitSelector.AMR_LIFT5.TASKPROGRESS
                          ? eval(potenitSelector.AMR_LIFT5.TASKPROGRESS) * 100
                          : 0
                      }
                      strokeWidth={7}
                      strokeColor={colorByProgress(
                        potenitSelector.AMR_LIFT5.TASKPROGRESS
                      )}
                    />
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                  <div className="mt-5 font-bold">현재 진행중인 작업</div>
                  <div>
                    {potenitSelector.AMR_LIFT5.ROBOTTASKSTATUS ? (
                      <div>
                        {potenitSelector.AMR_LIFT5.ROBOTTASKSTATUS[0]}
                        <div>
                          {potenitSelector.AMR_LIFT5.ROBOTTASKSTATUS[1]}
                        </div>
                      </div>
                    ) : (
                      "-"
                    )}{" "}
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
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
                  <div className="font-bold mb-3">AMR_Lift6</div>
                  <div>
                    진행도 {eval(potenitSelector.AMR_LIFT6.TASKPROGRESS) * 100}%
                    <Line
                      className="m-auto mt-1 w-4/5 "
                      percent={
                        potenitSelector.AMR_LIFT6.TASKPROGRESS
                          ? eval(potenitSelector.AMR_LIFT6.TASKPROGRESS) * 100
                          : 0
                      }
                      strokeWidth={7}
                      strokeColor={colorByProgress(
                        potenitSelector.AMR_LIFT6.TASKPROGRESS
                      )}
                    />
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                  <div className="mt-5 font-bold">현재 진행중인 작업</div>
                  <div>
                    {potenitSelector.AMR_LIFT6.ROBOTTASKSTATUS ? (
                      <div>
                        {potenitSelector.AMR_LIFT6.ROBOTTASKSTATUS[0]}
                        <div>
                          {potenitSelector.AMR_LIFT6.ROBOTTASKSTATUS[1]}
                        </div>
                      </div>
                    ) : (
                      "-"
                    )}{" "}
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
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
                  <div className="font-bold mb-3">AMR_Lift7</div>
                  <div>
                    진행도 {eval(potenitSelector.AMR_LIFT7.TASKPROGRESS) * 100}%
                    <Line
                      className="m-auto mt-1 w-4/5 "
                      percent={
                        potenitSelector.AMR_LIFT7.TASKPROGRESS
                          ? eval(potenitSelector.AMR_LIFT7.TASKPROGRESS) * 100
                          : 0
                      }
                      strokeWidth={7}
                      strokeColor={colorByProgress(
                        potenitSelector.AMR_LIFT7.TASKPROGRESS
                      )}
                    />
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                  <div className="mt-5 font-bold">현재 진행중인 작업</div>
                  <div>
                    {potenitSelector.AMR_LIFT7.ROBOTTASKSTATUS ? (
                      <div>
                        {potenitSelector.AMR_LIFT7.ROBOTTASKSTATUS[0]}
                        <div>
                          {potenitSelector.AMR_LIFT7.ROBOTTASKSTATUS[1]}
                        </div>
                      </div>
                    ) : (
                      "-"
                    )}{" "}
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
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
                  <div className="font-bold mb-3">PALLETIZER2</div>
                  <div>
                    진행도{" "}
                    {eval(potenitSelector.PALLETIZER2.TASKPROGRESS) * 100}%
                    <Line
                      className="m-auto mt-1 w-4/5 "
                      percent={
                        potenitSelector.PALLETIZER2.TASKPROGRESS
                          ? eval(potenitSelector.PALLETIZER2.TASKPROGRESS) * 100
                          : 0
                      }
                      strokeWidth={7}
                      strokeColor={colorByProgress(
                        potenitSelector.PALLETIZER2.TASKPROGRESS
                      )}
                    />
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                  <div className="mt-5 font-bold">현재 진행중인 작업</div>
                  <div>
                    {potenitSelector.PALLETIZER2.ROBOTTASKSTATUS ? (
                      <div>
                        {potenitSelector.PALLETIZER2.ROBOTTASKSTATUS[0]}
                        <div>
                          {potenitSelector.PALLETIZER2.ROBOTTASKSTATUS[1]}
                        </div>
                      </div>
                    ) : (
                      "-"
                    )}{" "}
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                </div>
                <div className="w-full">
                  <div className="font-bold mb-3">PALLETIZER3</div>
                  <div>
                    진행도{" "}
                    {eval(potenitSelector.PALLETIZER3.TASKPROGRESS) * 100}%
                    <Line
                      className="m-auto mt-1 w-4/5 "
                      percent={
                        potenitSelector.PALLETIZER3.TASKPROGRESS
                          ? eval(potenitSelector.PALLETIZER3.TASKPROGRESS) * 100
                          : 0
                      }
                      strokeWidth={7}
                      strokeColor={colorByProgress(
                        potenitSelector.PALLETIZER3.TASKPROGRESS
                      )}
                    />
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                  <div className="mt-5 font-bold">현재 진행중인 작업</div>
                  <div>
                    {potenitSelector.PALLETIZER3.ROBOTTASKSTATUS ? (
                      <div>
                        {potenitSelector.PALLETIZER3.ROBOTTASKSTATUS[0]}
                        <div>
                          {potenitSelector.PALLETIZER3.ROBOTTASKSTATUS[1]}
                        </div>
                      </div>
                    ) : (
                      "-"
                    )}{" "}
                  </div>
                  <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex text-center basis-2/12">
          <div className="w-full">
            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-3">
              <p className="font-bold text-lg">코리아하이텍 제조 로봇 용</p>
            </div>
            <div className="flex justify-around">
              <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                  제조 완료된 물품 수
                </h5>
                <div className="flex items-baseline text-gray-900 dark:text-white justify-center">
                  <span className="text-5xl font-extrabold tracking-tight">
                    {selector.hitek.ASSEMBLEDITEMCOUNT}
                  </span>
                  <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                    건
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-around mt-3 invisible">
              <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                  제조 완료된 물품 수
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
            </div>
            <div className="mt-8 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-3">
              <p className="font-bold">로봇 현황표</p>
            </div>
            <div className="flex justify-around">
              <div className="w-full">
                <div className="font-bold mb-3">협동 로봇</div>
                <div>
                  진행도 {eval(potenitSelector.UR.TASKPROGRESS) * 100}%
                  <Line
                    className="m-auto mt-1 w-5/12 "
                    percent={
                      potenitSelector.UR.TASKPROGRESS
                        ? eval(potenitSelector.UR.TASKPROGRESS) * 100
                        : 0
                    }
                    strokeWidth={7}
                    strokeColor={colorByProgress(
                      potenitSelector.UR.TASKPROGRESS
                    )}
                  />
                </div>
                <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                <div className="mt-5 font-bold">현재 진행중인 작업</div>
                <div className="break-words">
                  {potenitSelector.UR.ROBOTTASKSTATUS ? (
                    <div>
                      {potenitSelector.UR.ROBOTTASKSTATUS[0]}
                      <div>{potenitSelector.UR.ROBOTTASKSTATUS[1]}</div>
                    </div>
                  ) : (
                    "-"
                  )}{" "}
                </div>
                <hr className="mt-3 mb-1 w-4/5 m-auto h-px border-indigo-900" />
                <hr className="mb-3 w-4/5 m-auto h-px border-indigo-900" />
              </div>
            </div>
            <div className="flex justify-around">
              <div className="w-full">
                <div className="font-bold mb-3">산업 로봇</div>
                <div>
                  진행도 {eval(potenitSelector.Epson.TASKPROGRESS) * 100}%
                  <Line
                    className="m-auto mt-1 w-5/12 "
                    percent={
                      potenitSelector.Epson.TASKPROGRESS
                        ? eval(potenitSelector.Epson.TASKPROGRESS) * 100
                        : 0
                    }
                    strokeWidth={7}
                    strokeColor={colorByProgress(
                      potenitSelector.Epson.TASKPROGRESS
                    )}
                  />
                </div>
                <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
                <div className="mt-5 font-bold">현재 진행중인 작업</div>
                <div className="break-words">
                  {potenitSelector.Epson.ROBOTTASKSTATUS ? (
                    <div>
                      {potenitSelector.Epson.ROBOTTASKSTATUS[0]}
                      <div>{potenitSelector.Epson.ROBOTTASKSTATUS[1]}</div>
                    </div>
                  ) : (
                    "-"
                  )}{" "}
                </div>
                <hr className="mt-3 mb-3 w-4/5 m-auto h-px border-indigo-900" />
              </div>
            </div>
            {/* <div>
              <div className="">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                    협동 로봇
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
              </div>
              <div className="mt-3">
                <div className=" p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                    산업 로봇
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
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

const colorByProgress = (value: string) => {
  if (value === "1/4") {
    return "#f87171";
  }
  if (value === "2/4") {
    return "#fdba74";
  }
  if (value === "3/4") {
    return "#86efac";
  }
  if (value === "4/4") {
    return "#38bdf8";
  }

  return "#06b6d4";
};
