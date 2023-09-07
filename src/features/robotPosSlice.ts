import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';

interface ObjType {
  ROBOTAT: [current: string, go: string];
  ROBOTPOSITION: [
    x: number | string,
    y: number | string,
  ];
}

interface DataType {
  AMR_LIFT1: ObjType,
  AMR_LIFT2: ObjType,
  AMR_LIFT3: ObjType,
  AMR_LIFT4: ObjType,
  // PALLETIZER1: ObjType,
}
// Initial state
export const initialState: DataType = {
  AMR_LIFT1: {ROBOTAT: ["", ""], ROBOTPOSITION: ["", ""]},
  AMR_LIFT2: {ROBOTAT: ["", ""], ROBOTPOSITION: ["", ""]},
  AMR_LIFT3: {ROBOTAT: ["", ""], ROBOTPOSITION: ["", ""]},
  AMR_LIFT4: {ROBOTAT: ["", ""], ROBOTPOSITION: ["", ""]},
  // PALLETIZER1: {ROBOTAT: ["", ""], ROBOTPOSITION: ["", ""]},
  
};
// Actual Slice
export const robotPosSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Action to set the authentication status
    setRobotPosState(state, action) {
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

const {actions, reducer: robotPosReducer} = robotPosSlice;

export const { setRobotPosState } = actions;

export default robotPosReducer;