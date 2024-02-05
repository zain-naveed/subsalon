import {HTTP_Request} from '../util/interceptors'
import {Endpoint} from '../util/endpoints'

const getPublicJobs = async ()=>{
    return await HTTP_Request.get(Endpoint.publicJob)
   
}
const newsLetter = async (obj)=>{
    return await HTTP_Request.post(Endpoint.subscribeNewsLetter,obj)
   
}
const servicesGet = async (query)=>{
    
    return await HTTP_Request.get(Endpoint.servicesGet+query)
   
}

export {
    getPublicJobs,
    newsLetter,
    servicesGet
}