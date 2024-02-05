import { createSlice } from "@reduxjs/toolkit";

const initState = { email: "", password:"",remberCheck:false };

export const remberSlice = createSlice({
    name: "remeber",
    initialState: initState,
    reducers: {
      setRember: (state, action) => {
      let remObj = { ...state,...action.payload };
        return remObj;
      }
      ,
      resetRem: () => initState,
    },
  });
  
  export const { setRember,resetRem } = remberSlice.actions;
  
  export default remberSlice.reducer;