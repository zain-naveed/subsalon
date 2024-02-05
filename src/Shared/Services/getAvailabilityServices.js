import { HTTP_Request } from '../util/interceptors'
import { Endpoint } from '../util/endpoints'
import axios from "axios";

const getAvailability = async (obj) => {
  return await HTTP_Request.post(Endpoint.availability, obj)
}

const getAvailabilityBack = async () => {
  return await HTTP_Request.get(Endpoint.availabilityBack)
}

export {
  getAvailability,
  getAvailabilityBack
}