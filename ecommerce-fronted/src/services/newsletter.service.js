import { api } from "../utility/interceptor";

export const newsletter = async (data) => {
    try {
      const result = await api.post("/news-letter",data);
      console.log('result .....',result)
      return result?.data
    } catch (err) {
      return err;
    }
  };
  