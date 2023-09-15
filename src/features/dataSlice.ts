import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';

interface ObjType {
  REMAININGTASKCOUNT: [type: "real" | "simulation", count: number];
  ONGOINGTASKCOUNT : [type: "real" | "simulation", count: number];
  COMPLETEDTASKCOUNT : [type: "real" | "simulation", count: number];
  NEWTASKCOUNT : [type: "real" | "simulation", count: number];
  CUMULATIVETASKSPEED : [type: "real" | "simulation", count: number];
  AVERAGETASKSPEED : [type: "real" | "simulation", count: number];
}

interface DataType {
  real: ObjType;
  simulation: ObjType;
  potenitChart: string;

}
// Initial state
export const initialState: DataType = {
  real: {
    REMAININGTASKCOUNT: ["real", 0],
    ONGOINGTASKCOUNT: ["real", 0],
    COMPLETEDTASKCOUNT: ["real", 0],
    NEWTASKCOUNT: ["real", 0],
    CUMULATIVETASKSPEED: ["real", 0],
    AVERAGETASKSPEED: ["real", 0],
  },
  simulation: {
    REMAININGTASKCOUNT: ["simulation", 0],
    ONGOINGTASKCOUNT: ["simulation", 0],
    COMPLETEDTASKCOUNT: ["simulation", 0],
    NEWTASKCOUNT: ["simulation", 0],
    CUMULATIVETASKSPEED: ["simulation", 0],
    AVERAGETASKSPEED: ["simulation", 0],
  },
  potenitChart:
    '{"AMR_LIFT1":{},"AMR_LIFT2":{},"AMR_LIFT3":{},"AMR_LIFT4":{},"PALLETIZER1":{}}',
};
// Actual Slice
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Action to set the authentication status
    setDataState(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.data
      };
    }
  }
});

const {actions, reducer: dataReducer} = dataSlice;

export const { setDataState } = actions;

export default dataReducer;