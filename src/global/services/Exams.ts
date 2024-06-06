import { ExamFields } from "../../pages/ExamsForm/types/ExamFields";
import { api, configWithAuthorization } from "../api/api";

export const getAllService = async (page: number, limit: number) => {
  try {
    const response = await api.get(
      `exams?page=${page}&limit=${limit}`,
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
    const response = await api.get(`exams/${id}`, configWithAuthorization());
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteByIdService = async (id: string) => {
  try {
    const response = await api.delete(`exams/${id}`, configWithAuthorization());
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateService = async (id: string, exams: ExamFields) => {
  try {
    const response = await api.patch(
      `exams/${id}`,
      exams,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (exams: ExamFields) => {
  try {
    const response = await api.post(`exams`, exams, configWithAuthorization());
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
