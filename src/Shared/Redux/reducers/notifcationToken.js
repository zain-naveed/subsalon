import { createSlice } from "@reduxjs/toolkit";

const initState = { notficationToken:"" };

export const notifcationTokenSlice = createSlice({
    name: "notification",
    initialState: initState,
    reducers: {
        setNotificationToken: (state, action) => {
        state.notficationToken = action.payload.notToken
        return state
      }
      ,
      resetNotificationToken: () => initState,
    },
  });
  
  export const { setNotificationToken,resetNotificationToken } = notifcationTokenSlice.actions;
  
  export default notifcationTokenSlice.reducer;