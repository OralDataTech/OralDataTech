import {
  PediatricDentistryFields,
  PediatricDentistryFieldsUpdate,
} from "../../pages/PediatricDensitryForm/types/PediatricDentistry";
import { api, configWithAuthorization } from "../api/api";

export const getAllService = async (page: number, limit: number) => {
  try {
    const response = await api.get(
      `pediatric-dentistry?page=${page}&limit=${limit}`,
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
      `pediatric-dentistry/${id}`,
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
      `pediatric-dentistry/${id}`,
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
  edodontic: PediatricDentistryFieldsUpdate
) => {
  try {
    const response = await api.patch(
      `pediatric-dentistry/${id}`,
      edodontic,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (edodontic: PediatricDentistryFields) => {
  try {
    const response = await api.post(
      `pediatric-dentistry`,
      edodontic,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
