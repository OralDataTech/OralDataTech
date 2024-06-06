import { api, configWithAuthorization } from "../api/api";

export const getStatisticsService = async () => {
  try {
    const response = await api.get(`metrics`, configWithAuthorization());
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
