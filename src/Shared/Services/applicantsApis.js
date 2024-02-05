import {HTTP_Request} from '../util/interceptors'
import {Endpoint} from '../util/endpoints'
import axios from "axios";

const allApplicants = async (id)=>{

    return await HTTP_Request.get(Endpoint.allApplicants+id)
   }
   const getApplicantProfile = async (id)=>{

    return await HTTP_Request.get(Endpoint.getApplicantProfile+id)
   }
  
   const AllGetApiApplicants = async (id,query)=>{

    return await HTTP_Request.get(Endpoint.AllaPPlicantsSaloon+id+query)
   }
   const actionOnApplicants = async (body)=>{

    return await HTTP_Request.put(Endpoint.aciontOnApplicant,body)
   }



export {
    allApplicants,
    getApplicantProfile,
    AllGetApiApplicants,
    actionOnApplicants
  
}

