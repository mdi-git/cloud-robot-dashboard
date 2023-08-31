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


export let persistor = persistStore(store);
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
const App = ({ Component, pageProps }: AppProps) => {
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
  useEffect(() => {
    console.log(JSON.parse(selector.potenitChart));
    setReceivedData({ ...receivedData });
    setRobotStatus({ ...robotStatus, ...JSON.parse(selector.potenitChart) });
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
      dispatch(
        setDataState({
          ...selector,
          potenitChart: JSON.stringify({...JSON.parse(selector.potenitChart), ...temp})
        })
      )
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
      dispatch(
        setDataState({
          ...selector,
          potenitChart: JSON.stringify({...JSON.parse(selector.potenitChart), ...temp})
        })
      )
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
      dispatch(
        setDataState({
          ...selector,
          potenitChart: JSON.stringify({...JSON.parse(selector.potenitChart), ...temp})
        })
      )
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
      dispatch(
        setDataState({
          ...selector,
          potenitChart: JSON.stringify({...JSON.parse(selector.potenitChart), ...temp})
        })
      )
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
      dispatch(
        setDataState({
          ...selector,
          potenitChart: JSON.stringify({...JSON.parse(selector.potenitChart), ...temp})
        })
      )
      return { ...prevRobotStatus, ...temp };
    });
  }, [receivedData.PERFIRMABLETASKCOUNT]);

  useEffect(() => {
    setRobotStatus((prevRobotStatus) => {
      const temp: ObjectProps = {};
      const robotId = receivedData.ROBOTAT[0];
      if (robotId) {
        temp[`${robotId}`] = {
          ...prevRobotStatus[robotId],
          ROBOTAT: receivedData.ROBOTAT[1],
        };
      }
      dispatch(
        setDataState({
          ...selector,
          potenitChart: JSON.stringify({...JSON.parse(selector.potenitChart), ...temp})
        })
      )
      return { ...prevRobotStatus, ...temp };
    });
  }, [receivedData.ROBOTAT]);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <head>
            <link
              rel="stylesheet"
              href="https://cdn.rawgit.com/konvajs/konva/2.8.0/konva.min.css"
            />
          </head>
          <div className="p-12">
            <Component {...pageProps} />
          </div>
        </PersistGate>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(App);