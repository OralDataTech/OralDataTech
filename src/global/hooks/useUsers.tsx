import { enqueueSnackbar } from "notistack";
import { ChangePass } from "../../pages/ChangePassword/types/ChangePass";
import {
  getAllService,
  updatePass,
  uploadImage,
  updateUserService,
  getOneByIdService,
  createUserService,
  deleteUserService,
} from "../services/Users";
import { useNavigate } from "react-router-dom";
import { PersonalFields } from "../../pages/PersonalInfo/types/PersonalFields";
import useAuth from "./useAuth";
import useLoading from "./useLoading";

export default function useUsers() {
  const navigator = useNavigate();
  const { refreshSessionInfos, user } = useAuth();
  const { setLoading } = useLoading();

  const getAll = async (page: number, limit: number) => {
    setLoading(true);
    const data = await getAllService(page, limit);
    setLoading(false);
    return data;
  };

  const getOnById = async (id: string) => {
    setLoading(true);
    const data = await getOneByIdService(id);
    setLoading(false);
    return data;
  };

  const changePassword = async (id: string, passProps: ChangePass) => {
    setLoading(true);
    const response = await updatePass(id, passProps);
    if (response) {
      enqueueSnackbar("Senha alterada com sucesso!", { variant: "success" });
      refreshSessionInfos(id);
      navigator("/perfil");
    } else {
      enqueueSnackbar("Senha antiga incorreta!", { variant: "error" });
    }
    setLoading(false);
  };

  const changePhoto = async (photo: File) => {
    setLoading(true);
    const response = await uploadImage(photo);
    if (response) {
      refreshSessionInfos(user.id);
      setLoading(false);
      return response.url;
    } else {
      enqueueSnackbar("Senha antiga incorreta!", { variant: "error" });
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    const response = await deleteUserService(id);
    if (!response.message) {
      refreshSessionInfos(user.id);
      enqueueSnackbar("Usuário deletado com sucesso!", { variant: "success" });
      navigator("/usuarios");
      setLoading(false);
      return;
    }
    setLoading(false);
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const updateUser = async (id: string, userUpdate: PersonalFields) => {
    setLoading(true);
    const response = await updateUserService(id, userUpdate);
    if (response) {
      refreshSessionInfos(user.id);
      enqueueSnackbar("Sucesso ao editar os dados", {
        variant: "success",
      });
      navigator("/usuarios");
    } else {
      enqueueSnackbar("Ocorreu algum problema ao editar seus dados", {
        variant: "error",
      });
    }
    setLoading(false);
  };

  const createUser = async (user: PersonalFields) => {
    setLoading(true);
    const response = await createUserService(user);

    if (!response.message) {
      enqueueSnackbar("Sucesso ao criar usuário", {
        variant: "success",
      });
      navigator("/usuarios");
    } else {
      enqueueSnackbar(response.message, {
        variant: "error",
      });
    }
    setLoading(false);
  };

  return {
    getAll,
    changePassword,
    changePhoto,
    updateUser,
    getOnById,
    createUser,
    deleteUser,
  };
}
