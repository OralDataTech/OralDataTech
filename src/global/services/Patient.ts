import { api, configWithAuthorization } from "../api/api";
import { PatientFields } from "../../pages/PatientForm/types/PatientFiels";
import { AxiosError } from "axios";

export const getAllService = async (page: number, limit: number) => {
  try {
    const response = await api.get(
      `patient?page=${page}&limit=${limit}`,
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
    const response = await api.get(`patient/${id}`, configWithAuthorization());
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const deletePatientService = async (id: string) => {
  try {
    const response = await api.delete(
      `patient/${id}`,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePatientService = async (
  id: string,
  patientFields: PatientFields
) => {
  const response = await api
    .patch(`patient/${id}`, patientFields, configWithAuthorization())
    .then((response) => response.data)
    .catch((error: AxiosError) => error.response?.data);
  const data = await response.data;
  return data;
};

export const createPatientService = async (patientFields: PatientFields) => {
  const response = await api
    .post(`patient`, patientFields, configWithAuthorization())
    .then((response) => response.data)
    .catch((error: AxiosError) => error.response?.data);

  const data = await response;
  return data;
};
