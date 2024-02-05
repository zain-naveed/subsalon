import axios from "axios";
import { store } from "../Redux/store";
import { BaseUrl } from "./constant";
import { resetUser } from '../Redux/reducers/userSlice'
import { toastMessage } from "../";
import {} from '../../App'
export const HTTP_Request = axios.create({
  baseURL: BaseUrl,
});

HTTP_Request.interceptors.request.use(
  (config) => {
    const { user } = store.getState().root;
    if (user.tokens) {
      config.headers.Authorization = `Bearer ${user.tokens}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);
HTTP_Request.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if(err?.response?.status == 401){
      const { user } = store.getState().root;
        if(user?.tokens){

          store.dispatch(resetUser())
          toastMessage("error",err?.response?.data?.message)
        }
    }
    return Promise.reject(err);
  }
);

export const initialConfig = (user) => {
  // setupAxios(user);
};
