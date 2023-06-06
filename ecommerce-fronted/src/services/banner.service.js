import { api } from "../utility/interceptor";

export const getBanner = async () => {
  try {
    const result = await api.get("/public-banner");
    return { status: 200, data: result?.data?.data };
  } catch (err) {
    return err;
  }
};
