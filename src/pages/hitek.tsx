import SocketComponent from "@/components/SocketComponent";
import { useAppSelector } from "@/hooks";

export default function Hitek() {
    const selector = useAppSelector((state) => state.data);
    const potenitSelector = useAppSelector((state: { potenit: any; }) => state.potenit);
    return (
      <>
        <SocketComponent />
        <div className="flex text-center">
          <div className="w-full">
            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-3">
              <p className="font-bold text-lg">가상 물류 로봇 용 대시보드</p>
            </div>
            <div className="flex justify-around">
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
           <div>
           <div className="flex justify-around">
              <div className="basis-1/2 mr-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
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
              <div className="basis-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
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
           </div>
          </div>
        </div>
      </>
    );
}