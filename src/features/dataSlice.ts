import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';

interface ObjType {
  REMAININGTASKCOUNT: number;
  ONGOINGTASKCOUNT : number;
  COMPLETEDTASKCOUNT : number;
  NEWTASKCOUNT : number;
  CUMULATIVETASKSPEED : number;
  AVERAGETASKSPEED : number;
}
interface DataType {
  real: ObjType;
  simulation: ObjType;
}
// Initial state
export const initialState: DataType = {
  real: {
    REMAININGTASKCOUNT: 0,
    ONGOINGTASKCOUNT: 0,
    COMPLETEDTASKCOUNT: 0,
    NEWTASKCOUNT: 0,
    CUMULATIVETASKSPEED: 0,
    AVERAGETASKSPEED: 0,
  },
  simulation: {
    REMAININGTASKCOUNT:  0,
    ONGOINGTASKCOUNT:  0,
    COMPLETEDTASKCOUNT:  0,
    NEWTASKCOUNT:  0,
    CUMULATIVETASKSPEED:  0,
    AVERAGETASKSPEED:  0,
  },
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