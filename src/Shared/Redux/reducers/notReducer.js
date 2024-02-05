import { createSlice } from "@reduxjs/toolkit";

const initState = { notify:false,services:[] };

export const notifcationSlice = createSlice({
    name: "notification",
    initialState: initState,
    reducers: {
      setNotification: (state, action) => {
      let remObj = { 
        ...state,
        ...action.payload};
        return remObj;
      }
      ,
      resetsetNotification: () => initState,
    },
  });
  
  export const { setNotification,resetsetNotification } = notifcationSlice.actions;
  
  export default notifcationSlice.reducer;