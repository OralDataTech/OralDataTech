import {
  EdodonticFields,
  EdodonticUpdateFields,
} from "../../pages/EdodonticForm/types/EdodonticFields";
import { api, configWithAuthorization } from "../api/api";

export const getAllService = async (page: number, limit: number) => {
  try {
    const response = await api.get(
      `endodontics?page=${page}&limit=${limit}`,
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
      `endodontics/${id}`,
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
      `endodontics/${id}`,
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
  edodontic: EdodonticUpdateFields
) => {
  try {
    const response = await api.patch(
      `endodontics/${id}`,
      edodontic,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (edodontic: EdodonticFields) => {
  try {
    const response = await api.post(
      `endodontics`,
      edodontic,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
