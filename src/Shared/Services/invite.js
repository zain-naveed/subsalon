import { HTTP_Request } from "../util/interceptors";
import { Endpoint } from "../util/endpoints";
import axios from "axios";

const inviteSaloon = async (obj) => {
  return await HTTP_Request.post(Endpoint.inviteSaloon, obj);
};

export { inviteSaloon };
