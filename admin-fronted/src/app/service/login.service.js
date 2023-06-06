import axios from "axios";
import { BASE_URL } from "../../lib/constant";
export const verifyTokenService = async (accesstoken) => {
    let res = await axios
      .post(`${BASE_URL}/verifytoken`, {
        headers: { "Access-Control-Allow-Origin": "*" },
        Authorization: `Bearer ${accesstoken}`,
      })
      .catch((error) => {
        return error;
      });
    return res;
  };