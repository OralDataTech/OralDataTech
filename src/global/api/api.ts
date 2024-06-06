// Configuração da API
import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
export const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

export function configWithAuthorization(): AxiosRequestConfig {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
}

export function configUploadFile(): AxiosRequestConfig {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
}
