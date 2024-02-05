import {HTTP_Request} from '../util/interceptors'
import {Endpoint} from '../util/endpoints'
import axios from "axios";

const AllProffessionalApi = async (query)=>{
   if(query){
    
    return await HTTP_Request.get(Endpoint.allProfessiional+query)
   }
   else{
    return await HTTP_Request.get(Endpoint.allProfessiional)
   } 
}
const professionProfile = async (query)=>{
   
     return await HTTP_Request.get(Endpoint.professionProfile+query)
    }
const inquiryFeedbackService = async (obj)=>{
    let formBoody = new FormData();
Object.keys(obj).forEach((key)=>{
    if(key =='attachments'){
        obj["attachments"].forEach((file, inx) => {
            formBoody.append(`attachments`, file)
          })

    }else{
        formBoody.append(key,obj[key])  
    }
})
   
     return await HTTP_Request.post(Endpoint.createFeedback,formBoody)
    }


export {
    AllProffessionalApi,
    professionProfile,
    inquiryFeedbackService
  
}

