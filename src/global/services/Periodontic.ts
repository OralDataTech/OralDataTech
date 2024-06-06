import {
  PeriodonticFields,
  PeriodonticUpdateFields,
} from "../../pages/PeriodonticForm/types/PeriodonticFields";
import { api, configWithAuthorization } from "../api/api";

export const getAllService = async (page: number, limit: number) => {
  try {
    const response = await api.get(
      `periodontics?page=${page}&limit=${limit}`,
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
      `periodontics/${id}`,
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
      `periodontics/${id}`,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateService = async (
  id: string,
  periodontics: PeriodonticUpdateFields
) => {
  try {
    const response = await api.patch(
      `periodontics/${id}`,
      periodontics,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (periodontics: PeriodonticFields) => {
  try {
    const response = await api.post(
      `periodontics`,
      periodontics,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
