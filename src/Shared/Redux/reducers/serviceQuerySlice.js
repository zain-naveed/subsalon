import { createSlice } from "@reduxjs/toolkit";

const initState = { service:"" };

export const serviceQuerySlice = createSlice({
    name: "service",
    initialState: initState,
    reducers: {
        
        setServiceQuery: (state, action) => {
        state.service = action.payload.service
        return state
      }
      ,
      resetServiceQuery: () => initState,
    },
  });
  
  export const { setServiceQuery,resetServiceQuery } = serviceQuerySlice.actions;
  
  export default serviceQuerySlice.reducer;