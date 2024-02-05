import { HTTP_Request } from '../util/interceptors'
import { Endpoint } from '../util/endpoints'
const addCardService = async (obj) => {
    return await HTTP_Request.post(Endpoint.addCard, obj)
}
const delCardService = async (obj) => {
    return await HTTP_Request.post(Endpoint.delCard, obj)
}
const createSubscriptionService = async (obj) => {
    return await HTTP_Request.post(Endpoint.createSubscription, obj)
}

const updateSubscriptionServices = async (obj) => {
    return await HTTP_Request.post(Endpoint.updateSubscription, obj)
}

const cancelSubscriptonServices = async (obj) => {
    return await HTTP_Request.post(Endpoint.cancelSubscripton, obj)
}

const getAllCardsServices = async () => {
    return await HTTP_Request.get(Endpoint.getAllCards)
}

const getPrimaryCard = async (obj) => {
    return await HTTP_Request.post(Endpoint.PrimaryCard, obj);
}

const trialType = async (obj) => {
    return await HTTP_Request.post(Endpoint.trial_type, obj);
}

export {
    addCardService,
    createSubscriptionService,
    updateSubscriptionServices,
    cancelSubscriptonServices,
    getAllCardsServices,
    getPrimaryCard,
    delCardService,
    trialType
}
