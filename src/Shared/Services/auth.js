import {HTTP_Request} from '../util/interceptors'
import {Endpoint} from '../util/endpoints'
import axios from "axios";

const loginApiService = async (obj)=>{
    return await HTTP_Request.post(Endpoint.LoginApi,obj)  
}
const resetPassService = async (obj)=>{
    return await HTTP_Request.post(Endpoint.ResetPassApi,obj)
}
const forgetApiService = async (obj)=>{  
    return await HTTP_Request.post(Endpoint.ForgetPassApi,obj)
}
const signUpApiService = async (obj)=>{
    return await HTTP_Request.post(Endpoint.RegisApi,obj)  
}
const socialLoginService = async (obj)=>{
    return await HTTP_Request.post(Endpoint.socialLogin,obj)
   
}
const emailVerified = async (query)=>{
    return await HTTP_Request.post(Endpoint.emailVerified+query)
   
}
const resendEmailVerified = async (userId)=>{
    return await HTTP_Request.post(Endpoint.resendVerifyEmail+userId)
   
}
const ownerDashboard = async (query)=>{
    return await HTTP_Request.get(Endpoint.ownerDashboard+query)
   
}
const beforeLogin = async (query)=>{
    return await HTTP_Request.get(Endpoint.beforeLogin+query)
   
}
export {
    resendEmailVerified,
    loginApiService,
    resetPassService,
    forgetApiService,
    signUpApiService,
    socialLoginService,
    emailVerified,
    ownerDashboard,
    beforeLogin
}

