import { createSlice } from "@reduxjs/toolkit";

const initState = { receiver:null };

export const chatSlice = createSlice({
    name: "chat",
    initialState: initState,
    reducers: {
      setChatUser: (state, action) => {
      let remObj = { 
        ...state,
        receiver:action.payload};
        return remObj;
      }
      ,
      resetChatUser: () => initState,
    },
  });
  
  export const { setChatUser,resetChatUser } = chatSlice.actions;
  
  export default chatSlice.reducer;