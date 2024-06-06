import { AxiosError } from "axios";
import { api, configWithAuthorization } from "../api/api";
import { enqueueSnackbar } from "notistack";

export const getAllService = async (page: number, limit: number) => {
  try {
    const response = await api.get(
      `medical-record?page=${page}?limit=${limit}`,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneByService = async (id: string) => {
  try {
    const response = await api.get(
      `medical-record/${id}`,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (patient: string, user: string) => {
  try {
    const response = await api.post(
      `medical-record`,
      {
        id_patient: patient,
        id_user: user,
      },
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeDisciplineService = async (
  idDiscipline: string,
  idMedicalRecord: string
) => {
  try {
    const response = await api.post(
      `medical-record/discipline/pop`,
      {
        id_discipline: idDiscipline,
        id_medical_record: idMedicalRecord,
      },
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addDisciplineService = async (
  idDiscipline: string,
  idMedicalRecord: string
) => {
  try {
    const response = await api.post(
      `medical-record/discipline`,
      {
        id_discipline: idDiscipline,
        id_medical_record: idMedicalRecord,
      },
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const toSign = async (idMedicalRecord: string, name: string) => {
  const response = await api
    .post(
      `medical-record/tosign`,
      {
        id_medical_record: idMedicalRecord,
        name,
      },
      configWithAuthorization()
    )
    .then((response) => response.data)
    .catch((error: AxiosError<{ message: string }>) =>
      enqueueSnackbar(error.response?.data.message, { variant: "error" })
    );

  const data = response;
  return data;
};

export const deleteService = async (id: string) => {
  try {
    const response = await api.delete(
      `medical-record/${id}`,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
