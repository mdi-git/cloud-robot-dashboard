import store, {wrapper} from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { io } from "socket.io-client";
import { setDataState } from "@/features/dataSlice";
import { setRobotPosState } from "@/features/robotPosSlice";


export let persistor = persistStore(store);
// interface RobotData {
//   REMAININGTASKCOUNT: [robotType: "real" | "simulation", count: number];
//   ONGOINGTASKCOUNT: [robotType: "real" | "simulation", count: number];
//   COMPLETEDTASKCOUNT: [robotType: "real" | "simulation", count: number];
//   NEWTASKCOUNT: [robotType: "real" | "simulation", count: number];
//   CUMULATIVETASKSPEED: [robotType: "real" | "simulation", count: number];
//   AVERAGETASKSPEED: [robotType: "real" | "simulation", count: number];
//   TASKPROGRESS: [robotId: string, progress: string];
//   ROBOTTASKSTATUS: [
//     robotId: string,
//     taskId: string,
//     taskName: string,
//     status: "start" | "progress" | "pause" | "complete"
//   ];
//   BATTERYREMAIN: [robotId: string, BATTERYSTATUS: number];
//   BATTERYSTATUS: [robotId: string, BATTERYSTATUS: "Using" | "Charging"];
//   PERFIRMABLETASKCOUNT: [robotId: string, count: number];
//   ROBOTAT: [robotId: "AMR_LIFT1" | "AMR_LIFT2" | "AMR_LIFT3" | "AMR_LIFT4", current: string, go: string];
//   ROBOTPOSITION: [
//     robotId: string,
//     x: number | string,
//     y: number | string,
//   ];
// }

// interface RobotStatusData {
//   [key: string]: any;
// }

// interface ObjectProps {
//   [key: string]: any;
// }

// function getKeyValueObject(str: string) {
//   let match = str.match(/\((\w+) (.+?)\)/);

//   if (match) {
//     let [, key, values] = match;
//     let parsedValues: (string | number)[] | number;

//     if (/"([^"]+)"/.test(values)) {
//       parsedValues =
//         values
//           .split(" ")
//           .map((match) =>
//             isNaN(parseFloat(match)) ? match.slice(1, -1) : parseFloat(match)
//           ) || [];
//     } else {
//       parsedValues = parseFloat(values);
//     }

//     let output: { [key: string]: (string | number)[] | number } = {
//       [key.toUpperCase()]: parsedValues,
//     };
//     return output;
//   } else {
//     console.log("No valid input found.");
//     return {};
//   }
// }
const App = ({ Component, pageProps }: AppProps) => {
  
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="p-12">
            <Component {...pageProps} />
          </div>
        </PersistGate>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(App);