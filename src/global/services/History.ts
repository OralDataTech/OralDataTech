import { api, configWithAuthorization } from "../api/api";

export const getAllService = async (page: number, limit: number) => {
  try {
    const response = await api.get(
      `history?page=${page}&limit=${limit}`,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneByIdService = async (id: string) => {
  try {
    const response = await api.get(`history/${id}`, configWithAuthorization());
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllNotCheckService = async (page: number, limit: number) => {
  try {
    const response = await api.get(
      `history/not-check?page=${page}&limit=${limit}`,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const toSignService = async (id_history: string, id_user: string) => {
  try {
    const response = await api.post(
      `history/tosign`,
      { id_history, id_user },
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
