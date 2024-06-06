import { OdontogramFields } from "../../pages/OdontogramForm/types/OdontogramFields";
import { api, configWithAuthorization } from "../api/api";

export const getAllService = async (page: number, limit: number) => {
  try {
    const response = await api.get(
      `odontogram?page=${page}&limit=${limit}`,
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
      `odontogram/${id}`,
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
      `odontogram/${id}`,
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
  odontogram: OdontogramFields
) => {
  try {
    const response = await api.patch(
      `odontogram/${id}`,
      odontogram,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (odontogram: OdontogramFields) => {
  try {
    const response = await api.post(
      `odontogram`,
      odontogram,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
