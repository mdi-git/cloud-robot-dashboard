import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';

interface DataType {
  potenitInfo: string;
  potenitChart: string;

}
// Initial state
export const initialState: DataType = {
  potenitInfo: '{"REMAININGTASKCOUNT":0,"ONGOINGTASKCOUNT":0,"COMPLETEDTASKCOUNT":0,"NEWTASKCOUNT":0,"CUMULATIVETASKSPEED":0,"AVERAGETASKSPEED":0}',
  potenitChart: '{"AMR_LIFT1":{},"AMR_LIFT2":{},"AMR_LIFT3":{},"AMR_LIFT4":{},"PALLETIZER1":{}}'
  
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