import {
  OlearyFields,
  OlearyUpdateFields,
} from "../../pages/OlearyForm/types/OlearyFields";
import { api, configWithAuthorization } from "../api/api";

export const getAllService = async (page: number, limit: number) => {
  try {
    const response = await api.get(
      `o-leary-index?page=${page}&limit=${limit}`,
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
      `o-leary-index/${id}`,
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
      `o-leary-index/${id}`,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateService = async (id: string, oleary: OlearyUpdateFields) => {
  try {
    const response = await api.patch(
      `o-leary-index/${id}`,
      {
        ntp: oleary.ntp,
        ntd: oleary.ntd,
        index: oleary.index,
        date: oleary.date,
        url_image: oleary.url_image,
        avaliation: oleary.avaliation,
        observation: oleary.observation,
      },
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (oleary: OlearyFields) => {
  try {
    const response = await api.post(
      `o-leary-index`,
      oleary,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
