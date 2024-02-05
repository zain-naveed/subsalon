import { HTTP_Request } from '../util/interceptors'
import { Endpoint } from "../util/endpoints";

const getMyFav = (query) => {
  return HTTP_Request.get(Endpoint.myFavouritejobs+query);
};

const getMyFavSalon = (query) => {
  return HTTP_Request.get(Endpoint.myFavouriteSalon+query);
};

const FavProfessionalsApi = async (obj)=>{
  if(obj){
   return await HTTP_Request.post(Endpoint.FavProfessionalsApi,obj)
  }
}
const RevFavProfessionalsApi = async (obj)=>{
  if(obj){
   return await HTTP_Request.post(Endpoint.RevFavProfessionalsApi,obj)
  }
}
const getFavAllProvider = (query) => {
  if(query){
  return HTTP_Request.get(Endpoint.getFavAllProvider+query);
  }
  else{
    return HTTP_Request.get(Endpoint.getFavAllProvider);

  }
};



export { getMyFav, getMyFavSalon,FavProfessionalsApi,RevFavProfessionalsApi,getFavAllProvider };