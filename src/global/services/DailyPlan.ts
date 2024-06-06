import { DailyFields } from "../../pages/DailyClinicalProcedurePlanningForm/types/DailyFields";
import { api, configWithAuthorization } from "../api/api";

export const getAllService = async (page: number, limit: number) => {
  try {
    const response = await api.get(
      `daily-clinical-procedure-planning?page=${page}&limit=${limit}`,
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
      `daily-clinical-procedure-planning/${id}`,
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
      `daily-clinical-procedure-planning/${id}`,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateService = async (id: string, dailyFields: DailyFields) => {
  try {
    const response = await api.patch(
      `daily-clinical-procedure-planning/${id}`,
      dailyFields,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (dailyFields: DailyFields) => {
  try {
    const response = await api.post(
      `daily-clinical-procedure-planning`,
      dailyFields,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
