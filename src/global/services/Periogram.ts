import { PeriogramFields } from "../../pages/PeriogramForm/types/PeriogramFields";
import { api, configWithAuthorization } from "../api/api";

export const getAllService = async (page: number, limit: number) => {
  try {
    const response = await api.get(
      `periogram?page=${page}&limit=${limit}`,
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
    const response = await api.get(
      `periogram/${id}`,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteByIdService = async (id: string) => {
  try {
    const response = await api.delete(
      `periogram/${id}`,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateService = async (id: string, periogram: PeriogramFields) => {
  try {
    const response = await api.patch(
      `periogram/${id}`,
      periogram,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (periogram: PeriogramFields) => {
  try {
    const response = await api.post(
      `periogram`,
      periogram,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
