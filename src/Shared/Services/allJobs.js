import { HTTP_Request } from '../util/interceptors'
import { Endpoint } from '../util/endpoints'
import axios from "axios";

const AllJobsApi = async (query) => {
   if (query) {
      
      return await HTTP_Request.get(Endpoint.AllJobsApi+query)
   }
   else {
      return await HTTP_Request.get(Endpoint.AllJobsApi)
   }
}
const FavJobsApi = async (obj) => {
   
   if (obj) {
      return await HTTP_Request.post(Endpoint.FavJobsApi, obj)
   }
}
const RevFavJobsApi = async (obj) => {
   
   if (obj) {
      return await HTTP_Request.post(Endpoint.RevFavJobsApi, obj)
   }
}
const getAllOpenJob = async (query) => {

   return await HTTP_Request.get(Endpoint.ownerOpenJob + query)
}
const getAllCloseJob = async (query) => {
   return await HTTP_Request.get(Endpoint.ownerCloseJob + query)
}

const getSingleJob = async (id) => {
   return await HTTP_Request.get(Endpoint.getSingleJob + id)
}
const getSingleforNotifyJob = async (id) => {
   return await HTTP_Request.get(Endpoint.getSingleJobforNotfctn + id)
}
const getAllApplicant = async (id) => {
   return await HTTP_Request.get(Endpoint.getApplicants + id)
}

const PostAJobServices = (obj) => {
   return HTTP_Request.post(Endpoint.postAJob, obj);
};

const deleteAJob = async (id) => {
   return await HTTP_Request.delete(Endpoint.deleteAJob + id)
}

const ReOpenJob = async (obj,id) => {
   return await HTTP_Request.patch(Endpoint.ReOpen + id, obj)
}

export {
   AllJobsApi,
   FavJobsApi,
   RevFavJobsApi,
   getAllOpenJob,
   getAllCloseJob,
   getSingleJob,
   getAllApplicant,
   PostAJobServices,
   deleteAJob,
   ReOpenJob,
   getSingleforNotifyJob
}

