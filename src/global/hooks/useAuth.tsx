import { useNavigate } from "react-router-dom";
import {
  sign,
  forgetPassService,
  resetPassService,
  verifyCodeService,
  verifyToken as verifyTokenService,
} from "../../pages/Login/services/auth";
import { LoginValidation } from "../../pages/Login/types/LoginValidation";
import { enqueueSnackbar } from "notistack";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../types/User";
import { getOneByIdService } from "../services/Users";
import { io } from "socket.io-client";
import useLoading from "./useLoading";
import { ForgetValidation } from "../../pages/ForgetPass/types/ForgetValidation";

export default function useAuth() {
  const navigate = useNavigate();
  const { setUser, user, setToken, token } = useContext(AuthContext);
  const { setLoading } = useLoading();
  async function verifyTokenValid() {
    const token = verifyToken();
    if (token) {
      if (!user.id) {
        const response = await verifyTokenService(token);
        if (response?.user) {
          setTokenAndUser(token, response.user);
          return;
        } else {
          logout();
        }
      }
    }
    // else logout();
  }

  useEffect(() => {
    verifyTokenValid();
  }, []);

  const setTokenAndUser = (token: string, user: User) => {
    setToken(token);
    if (user) {
      refreshSessionInfos(user.id);
    }
  };

  const refreshSessionInfos = async (id: string) => {
    setUser(await getOneByIdService(id));
  };

  const login = async (credentials: LoginValidation) => {
    setLoading(true);
    const response = await sign(credentials);
    if (response) {
      enqueueSnackbar("Login realizado com sucesso!", {
        variant: "success",
      });
      Cookies.set("token", response.access_token);
      setToken(response.access_token);
      navigate("/");
    } else {
      enqueueSnackbar("Erro ao realizar login, verifique suas credenciais!", {
        variant: "error",
      });
    }
    setLoading(false);
  };

  const forgetPass = async (credentials: ForgetValidation) => {
    setLoading(true);
    const response = await forgetPassService(credentials);
    if (response) {
      enqueueSnackbar("Código enviado!", {
        variant: "success",
      });
      setLoading(false);

      return response;
    } else {
      enqueueSnackbar(
        "Erro ao solicitar a mudança de senha, verifique se o email está correto!",
        {
          variant: "error",
        }
      );
    }
    setLoading(false);
  };

  const verifyCode = async (email: string, code: number) => {
    setLoading(true);
    const response = await verifyCodeService(email, code);
    if (response) {
      enqueueSnackbar("Código confirmado!", {
        variant: "success",
      });
      setLoading(false);

      return response;
    } else {
      enqueueSnackbar("Código inválido, verifique se o código está correto!", {
        variant: "error",
      });
    }
    setLoading(false);
  };

  const resetPass = async (email: string, new_pass: string, code: number) => {
    setLoading(true);
    const response = await resetPassService(email, new_pass, code);
    if (response) {
      enqueueSnackbar("Faça login para prosseguir", {
        variant: "success",
      });
      setLoading(false);
      navigate("/login");
    } else {
      enqueueSnackbar(
        "Erro ao solicitar a mudança de senha, teste novamente mais tarde!",
        {
          variant: "error",
        }
      );
    }
    setLoading(false);
  };

  const verifyToken = () => {
    const token = Cookies.get("token") || undefined;
    return token;
  };

  const logout = async () => {
    const socket = io(import.meta.env.VITE_URL + "online-users");
    socket.send("message", { type: "exit", payload: user.id });
    Cookies.remove("token");
    setUser({} as User);
    navigate("/login");
  };

  const isAdmin = () => {
    return user.role === "admin";
  };

  const isTeacher = () => {
    return user.role === "teacher" || isAdmin();
  };

  const isTeacherOrAdmin = () => {
    return isTeacher() || isAdmin();
  };

  return {
    login,
    logout,
    verifyToken,
    isAdmin,
    refreshSessionInfos,
    isTeacher,
    user,
    token,
    isTeacherOrAdmin,
    forgetPass,
    resetPass,
    verifyCode,
  };
}
