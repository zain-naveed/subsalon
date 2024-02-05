import { createSlice } from "@reduxjs/toolkit";

const initState = {
  user: {},
  tokens: null,
  status: null,
  maxJobRate: null,
  hourRate: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUser: (state, action) => {
      let tempObj = { ...state, ...action.payload };
      return tempObj;
    },
    resetUser: () => initState,
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
