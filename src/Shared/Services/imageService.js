import { HTTP_Request } from "../util/interceptors";
import { Endpoint } from "../util/endpoints";

const getImageServices = (obj) => {
  

  let formBody = new FormData();
  Object.keys(obj).forEach((key) => {
    formBody.append(key, obj[key]);
  });
  return HTTP_Request.post(Endpoint.getImage, formBody);
};

export { getImageServices };
