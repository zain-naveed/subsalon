import { HTTP_Request } from '../util/interceptors'
import { Endpoint } from '../util/endpoints'

const changeUserDetail = async (obj) => {
    
    if (obj) {
       return await HTTP_Request.put(Endpoint.changeUserDetail,obj)
    }
 }
const emailNotify = async (obj) => {
    
    if (obj) {
       return await HTTP_Request.post(Endpoint.emailPerference,obj)
    }
 }
 export {
    changeUserDetail,
    emailNotify

 }