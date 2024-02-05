import { HTTP_Request } from '../util/interceptors'
import { Endpoint } from "../util/endpoints";

const writeReviewService = (id,obj) => {
  return HTTP_Request.post(Endpoint.writeReview+id, obj);
}
const getReviewService = (id) => {
  return HTTP_Request.get(Endpoint.getAppliantReview+id);
}

export { writeReviewService,getReviewService };