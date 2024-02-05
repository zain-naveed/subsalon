import {HTTP_Request} from '../util/interceptors'
import {Endpoint} from '../util/endpoints'

const getAllRequestJobs = async (query)=>{
    return await HTTP_Request.get(Endpoint.getAllMyJobRequest+query) 
}
const offerJobService = async (body)=>{
    return await HTTP_Request.post(Endpoint.offerJob,body) 
}
const JobResAction = async (obj)=>{
    return await HTTP_Request.put(Endpoint.actionJobRes,obj) 
}
export {
    getAllRequestJobs,
    JobResAction,
    offerJobService
}

