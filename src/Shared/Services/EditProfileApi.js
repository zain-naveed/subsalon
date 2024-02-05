import { HTTP_Request } from '../util/interceptors'
import { Endpoint } from "../util/endpoints";

const getCovidServices = (body) => {
  return HTTP_Request.post(Endpoint.covidApi, body);
};

const getExperienceServices = (body) => {
  let formBody = new FormData();
  Object.keys(body).forEach((key)=>{
    if(key == "certificationImgs"){
      body["certificationImgs"].forEach((file,inx)=>{
        formBody.append(`certificationImgs[${inx}]` , file)
      })
    }else{

      formBody.append(key,body[key])
    }
  })

  
  return HTTP_Request.post(Endpoint.experienceApi, formBody);
};

const IndiviualInfoServices = (obj) => {
  let formBody = new FormData();
  Object.keys(obj).forEach((key) => {
    formBody.append(key, obj[key]);
  });
  return HTTP_Request.post(Endpoint.updateProfile, formBody);
}

export { getCovidServices, getExperienceServices, IndiviualInfoServices };