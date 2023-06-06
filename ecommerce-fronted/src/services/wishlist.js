import { token } from "../lib/constant";
import { api } from "../utility/interceptor";

const headers = {
  Authorization: token,
};

export const getAllWishlist = async () => {
  try {
    const response = await api.get("/wishlist",{headers,});
    return { data: response?.data };
  } catch (err) {
    return err
}
};

export const addWishList = async (product_id) => {
    console.log("valueee",product_id)
    try {
      const response = await api.post(`/wishlist`, {product_id}, {
        headers,
      });
      return response?.data;
    } catch (err) {
      return err;
    }
  };


  export const removeWishlist = async (id) => {
    try {
      const response = await api.delete(`/wishlist/${id}`, { headers });
      return { data: response?.data?.data };
    } catch (error) {
      return error;
    }
  };
  
  