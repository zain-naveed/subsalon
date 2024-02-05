import { HTTP_Request } from '../util/interceptors'
import { Endpoint } from '../util/endpoints'
import axios from "axios";

const getTaggingServices = async () => {
  return await HTTP_Request.get(Endpoint.tagging)
}

export {
  getTaggingServices
}