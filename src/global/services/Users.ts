import { AxiosError } from "axios";
import { ChangePass } from "../../pages/ChangePassword/types/ChangePass";
import { PersonalFields } from "../../pages/PersonalInfo/types/PersonalFields";
import { api, configUploadFile, configWithAuthorization } from "../api/api";

export const getAllService = async (page: number, limit: number) => {
  try {
    const response = await api.get(
      `user?page=${page}&limit=${limit}`,
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
    const response = await api.get(`user/${id}`, configWithAuthorization());
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePass = async (id: string, passProps: ChangePass) => {
  try {
    const response = await api.patch(
      `user/pass/${id}`,
      {
        old_pass: passProps.oldPassword,
        new_pass: passProps.newPassword,
      },
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserService = async (id: string) => {
  try {
    const response = await api.delete(`user/${id}`, configWithAuthorization());
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserService = async (
  id: string,
  userFields: PersonalFields
) => {
  try {
    const response = await api.patch(
      `user/${id}`,
      userFields,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createUserService = async (userFields: PersonalFields) => {
  try {
    const response = await api.post(
      `user`,
      userFields,
      configWithAuthorization()
    );
    const data = await response.data;
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      return { message: "Usuário já existe" };
    }
    return error;
  }
};

export const uploadImage = async (photo: File) => {
  const formData = new FormData();
  formData.append("photo", photo);

  try {
    const response = await api.post("image", formData, configUploadFile());
    return await response.data;
  } catch (error) {
    console.error(error);
  }
};
