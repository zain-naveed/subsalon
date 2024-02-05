import {HTTP_Request} from '../util/interceptors'
import {Endpoint} from '../util/endpoints'
import axios from "axios";

const AllSalonsApi = async (query)=>{
   if(query){
    
    return await HTTP_Request.get(Endpoint.AllSalonsApi+query)
   }
   else{
    return await HTTP_Request.get(Endpoint.AllSalonsApi)
   } 
}
const FavSaloonsApi = async (obj)=>{
    
    if(obj){
     return await HTTP_Request.post(Endpoint.FavSaloonsApi,obj)
    }
 }
 const RevFavSaloonsApi = async (obj)=>{
    
    if(obj){
     return await HTTP_Request.post(Endpoint.RevFavSaloonsApi,obj)
    }
 }
 const getSaloonJobs = async (salon)=>{
    
    return await HTTP_Request.get(Endpoint.saloonJobs+salon)
    
 }

 const getallJobFromSingleSaloon = async (salon)=>{
    
   return await HTTP_Request.get(Endpoint.getallJobFromSingleSaloon+salon)
   
}
const getSaloonbyId = async (id)=>{
   return await HTTP_Request.get(Endpoint.getSaloonbyId+id)
   
}


export {
    AllSalonsApi,
    FavSaloonsApi,
    RevFavSaloonsApi,
    getSaloonJobs,
    getallJobFromSingleSaloon,
    getSaloonbyId
}

