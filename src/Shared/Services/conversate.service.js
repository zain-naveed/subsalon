import { HTTP_Request } from '../util/interceptors'
import { Endpoint } from "../util/endpoints";

const createConversation = (obj) => {
  return HTTP_Request.post(Endpoint.createConversation, obj);
}
const getAllConversation = (userId) => {
  return HTTP_Request.get(Endpoint.getAllConversation + userId);
}
const getmessagefromConservation = (convId) => {
  return HTTP_Request.get(Endpoint.getMessage + convId);
}
const checkConservationServ = (obj) => {
  return HTTP_Request.post(Endpoint.checkConversation, obj);
}
const deleteConversationService = (id, obj) => {
  return HTTP_Request.post(Endpoint.delConversation + id, obj);
}
const getReadMsgServices = (obj) => {
  return HTTP_Request.post(Endpoint.getReadMsg, obj);
}

export { createConversation, getAllConversation, getmessagefromConservation, checkConservationServ, deleteConversationService, getReadMsgServices };