import { enqueueSnackbar } from "notistack";
import { api, configWithAuthorization } from "../api/api";
import { AxiosError } from "axios";

export const changeActiveService = async (active: boolean) => {
  const response = await api
    .patch(`system-config`, { active }, configWithAuthorization())
    .then((response) => response.data)
    .catch((error: AxiosError<{ message: string }>) =>
      enqueueSnackbar(error.response?.data?.message as string, {
        variant: "error",
      })
    );

  const data = await response;
  return data;
};

export const getConfigService = async () => {
  const response = await api
    .get(`system-config`, configWithAuthorization())
    .then((response) => response.data)
    .catch((error: AxiosError<{ message: string }>) =>
      enqueueSnackbar(error.response?.data?.message as string, {
        variant: "error",
      })
    );

  return response;
};
