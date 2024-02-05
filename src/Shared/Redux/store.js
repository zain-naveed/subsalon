import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import userSlice from './reducers/userSlice';
import chatSlice from './reducers/chatReducer';
import nofySlice from './reducers/notReducer';
import notficationToken from './reducers/notifcationToken';
import ServiceQuerySlice from './reducers/serviceQuerySlice';
// import userProfileDetail from "./reducers/userProfileSlice";

import rememberSlice from './reducers/remberSlice';

const rootReducer = combineReducers({
  user: userSlice,
  remeber:rememberSlice,
  chat:chatSlice,
  notfy:nofySlice,
  notifctnTokn:notficationToken,
  queryService:ServiceQuerySlice
  // pass:passWord,
  
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user","remeber","notifctnTokn"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["register"],
        ignoredActionPaths: ["rehydrate", "register"],
        ignoredPaths: ["register"],
      },
    }),

  //  composeWithDevTools()
});

const persistor = persistStore(store);
export { store, persistor };
