import { HTTP_Request } from '../util/interceptors'
import { Endpoint } from "../util/endpoints";



const createSalonServices = (obj) => {
  let formBody = new FormData();
  Object.keys(obj).forEach((key) => {
    if (key == 'certifImg') {
      obj["certifImg"].forEach((file, inx) => {
        formBody.append(`certifImg`, file)
      })
    } else {

      formBody.append(key, obj[key]);
    }
  });
  return HTTP_Request.post(Endpoint.createSalon, formBody);
}

export { createSalonServices };