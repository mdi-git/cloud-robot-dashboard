import ChartComponent from "@/components/DonutChart";

export default function Potenit() {
    
    const chartData = [
        { name: 'Red', value: 12 },
        { name: 'Blue', value: 19 },
        { name: 'Yellow', value: 3 },
        { name: 'Green', value: 5 },
        { name: 'Purple', value: 2 },
        { name: 'Orange', value: 3 },
      ];
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
                  49
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
                  49
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
                  49
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
                  49
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
                  49
                </span>
                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  건
                </span>
              </div>
            </div>
            <div className="basis-1/3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                로봇 현황표
              </h5>
              <div className="flex items-baseline text-gray-900 dark:text-white justify-center">
                <span className="text-5xl font-extrabold tracking-tight">
                  49
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
            <div className="flex">
            <ChartComponent data={chartData} />
            <ChartComponent data={chartData} />
            <ChartComponent data={chartData} />
            <ChartComponent data={chartData} />
            <ChartComponent data={chartData} />
            </div>
          </div>
        </div>
        <div className="w-full">ff</div>
      </div>
    </>
  );
}
