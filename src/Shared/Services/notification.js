import { HTTP_Request } from '../util/interceptors'
import { Endpoint } from "../util/endpoints";

const getAllNotification = () => {
  return HTTP_Request.get(Endpoint.getAllNotification);
};
const notificationTokenApi = (token) => {
  return HTTP_Request.get(Endpoint.notificationToken+token);
};
const readAllnotifyApi = () => {
  return HTTP_Request.get(Endpoint.readAllnotify);
};
export  {
    getAllNotification,
    notificationTokenApi,
    readAllnotifyApi
}