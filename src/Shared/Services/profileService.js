import {HTTP_Request} from '../util/interceptors'
import {Endpoint} from '../util/endpoints'
import axios from "axios";

const updateProfileService = async (obj)=>{
    return await HTTP_Request.post(Endpoint.updateProfile,obj)
   
}
const DeleteAccountService = async (id)=>{
    return await HTTP_Request.delete(`${Endpoint.deleteAccountApi}${id}`)
}
export {
    updateProfileService,
    DeleteAccountService
}