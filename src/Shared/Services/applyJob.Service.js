import {HTTP_Request} from '../util/interceptors'
import {Endpoint} from '../util/endpoints'

const getAllApliedJobs = async (query)=>{
    return await HTTP_Request.get(Endpoint.getMyAppliedJob+query) 
}
const applyJobs = async (obj)=>{
    return await HTTP_Request.post(Endpoint.applyJob,obj) 
}
export {
    getAllApliedJobs,
    applyJobs
}

