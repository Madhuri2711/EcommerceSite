import { api } from "../utility/interceptor";

export const getNotification = async () => {
  try {
    const response = await api.get("/notification");
    return response?.data;
  } catch (err) {
    return err;
  }
};

export const getNotificationCount = async () => {
  try {
    const response = await api.get("/notification/count");
    return response?.data;
  } catch (err) {
    return err;
  }
};

export const acceptorDeclinedNotification = async (id, value) => {
  try {
    const response = await api.post(`/make-offer/seller/${id}`, value);
    return response?.data;
  } catch (err) {
    return err;
  }
};

export const bargainingMakeOffer = async (id, value) => {
  try {
    const response = await api.post(`/make-offer/again/${id}`, value);
    return response?.data;
  } catch (err) {
    return err;
  }
};


export const allVisibleNotification  = async() => {
  try {
    const response  = await api.get('/notification/all-visible')
    console.log("response",response)
    return response?.data    
  } catch (error) {
    return error
  }
}