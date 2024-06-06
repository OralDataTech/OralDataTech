import { api, configWithAuthorization } from "../../../global/api/api";
import { ForgetValidation } from "../../ForgetPass/types/ForgetValidation";
import { LoginValidation } from "../types/LoginValidation";

export const sign = async (credentials: LoginValidation) => {
  try {
    const response = await api.post(
      "auth/login",
      {
        email: credentials.email,
        pass: credentials.password,
      },
      configWithAuthorization()
    );
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export const forgetPassService = async (credentials: ForgetValidation) => {
  try {
    const response = await api.post("user/code-generate", {
      email: credentials.email,
    });
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyCodeService = async (email: string, code: number) => {
  try {
    const response = await api.post("user/code-verify", {
      email,
      code,
    });
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export const resetPassService = async (
  email: string,
  new_pass: string,
  code: number
) => {
  try {
    const response = await api.post("user/pass/restart", {
      email,
      new_pass,
      code,
    });
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = async (token: string) => {
  try {
    const response = await api.get(`auth/validate-token?token=${token}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
