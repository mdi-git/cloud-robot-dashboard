import { HYDRATE } from "next-redux-wrapper";
import { createSlice } from "@reduxjs/toolkit";

interface RobotData {
  TASKPROGRESS: string;
  ROBOTTASKSTATUS: [taskName: string, status: "start" | "progress" | "pause" | "complete"];
  BATTERYREMAIN: number;
  BATTERYSTATUS: "Using" | "Charging";
  PERFIRMABLETASKCOUNT: number;
  ROBOTAT: [current: string, go: string];
  ROBOTPOSITION: [x: number | string, y: number | string];
}

interface ChartType {
  AMR_LIFT1: RobotData;
  AMR_LIFT2: RobotData;
  AMR_LIFT3: RobotData;
  AMR_LIFT4: RobotData;
  AMR_LIFT5: RobotData;
  AMR_LIFT6: RobotData;
  AMR_LIFT7: RobotData;
  PALLETIZER1: RobotData;
  PALLETIZER2: RobotData;
  PALLETIZER3: RobotData;
}
// Initial state
export const initialState: ChartType = {
  AMR_LIFT1: {
    TASKPROGRESS: "1/4",
    ROBOTTASKSTATUS: ["MoveToLocation", "progress"],
    BATTERYREMAIN: 0,
    BATTERYSTATUS: "Using",
    PERFIRMABLETASKCOUNT: 0,
    ROBOTAT: ["", ""],
    ROBOTPOSITION: [-100, -100],
  },
  AMR_LIFT2: {
    TASKPROGRESS: "1/4",
    ROBOTTASKSTATUS: ["MoveToLocation", "progress"],
    BATTERYREMAIN: 0,
    BATTERYSTATUS: "Using",
    PERFIRMABLETASKCOUNT: 0,
    ROBOTAT: ["", ""],
    ROBOTPOSITION: [-100, -100],
  },
  AMR_LIFT3: {
    TASKPROGRESS: "1/4",
    ROBOTTASKSTATUS: ["MoveToLocation", "progress"],
    BATTERYREMAIN: 0,
    BATTERYSTATUS: "Using",
    PERFIRMABLETASKCOUNT: 0,
    ROBOTAT: ["", ""],
    ROBOTPOSITION: [-100, -100],
  },
  AMR_LIFT4: {
    TASKPROGRESS: "1/4",
    ROBOTTASKSTATUS: ["MoveToLocation", "progress"],
    BATTERYREMAIN: 0,
    BATTERYSTATUS: "Using",
    PERFIRMABLETASKCOUNT: 0,
    ROBOTAT: ["", ""],
    ROBOTPOSITION: [-100, -100],
  },
  AMR_LIFT5: {
    TASKPROGRESS: "1/4",
    ROBOTTASKSTATUS: ["MoveToLocation", "progress"],
    BATTERYREMAIN: 0,
    BATTERYSTATUS: "Using",
    PERFIRMABLETASKCOUNT: 0,
    ROBOTAT: ["", ""],
    ROBOTPOSITION: [-100, -100],
  },
  AMR_LIFT6: {
    TASKPROGRESS: "1/4",
    ROBOTTASKSTATUS: ["MoveToLocation", "progress"],
    BATTERYREMAIN: 0,
    BATTERYSTATUS: "Using",
    PERFIRMABLETASKCOUNT: 0,
    ROBOTAT: ["", ""],
    ROBOTPOSITION: [-100, -100],
  },
  AMR_LIFT7: {
    TASKPROGRESS: "1/4",
    ROBOTTASKSTATUS: ["MoveToLocation", "progress"],
    BATTERYREMAIN: 0,
    BATTERYSTATUS: "Using",
    PERFIRMABLETASKCOUNT: 0,
    ROBOTAT: ["", ""],
    ROBOTPOSITION: [-100, -100],
  },

  PALLETIZER1: {
    TASKPROGRESS: "1/4",
    ROBOTTASKSTATUS: ["MoveToLocation", "progress"],
    BATTERYREMAIN: 0,
    BATTERYSTATUS: "Using",
    PERFIRMABLETASKCOUNT: 0,
    ROBOTAT: ["", ""],
    ROBOTPOSITION: [0, 0],
  },
  PALLETIZER2: {
    TASKPROGRESS: "1/4",
    ROBOTTASKSTATUS: ["MoveToLocation", "progress"],
    BATTERYREMAIN: 0,
    BATTERYSTATUS: "Using",
    PERFIRMABLETASKCOUNT: 0,
    ROBOTAT: ["", ""],
    ROBOTPOSITION: [0, 0],
  },
  PALLETIZER3: {
    TASKPROGRESS: "1/4",
    ROBOTTASKSTATUS: ["MoveToLocation", "progress"],
    BATTERYREMAIN: 0,
    BATTERYSTATUS: "Using",
    PERFIRMABLETASKCOUNT: 0,
    ROBOTAT: ["", ""],
    ROBOTPOSITION: [0, 0],
  },
};
// Actual Slice
export const potenitSlice = createSlice({
  name: "potenit",
  initialState,
  reducers: {
    // Action to set the authentication status
    setPotenitState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.data,
      };
    },
  },
});

const { actions, reducer: potenitReducer } = potenitSlice;

export const { setPotenitState } = actions;

export default potenitReducer;
