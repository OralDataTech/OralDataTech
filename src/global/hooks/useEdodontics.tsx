import { enqueueSnackbar } from "notistack";
import {
  getOneByIdService,
  getAllService,
  deleteByIdService,
  updateService,
  createService,
} from "../services/Edodontics";
import {
  EdodonticFields,
  EdodonticUpdateFields,
} from "../../pages/EdodonticForm/types/EdodonticFields";
import useLoading from "./useLoading";

export default function useEdodontics() {
  const { setLoading } = useLoading();

  const getOneById = async (id: string) => {
    setLoading(true);
    const response = await getOneByIdService(id);
    if (response) {
      setLoading(false);

      return response;
    }
    enqueueSnackbar("Erro ao buscar edodontia", { variant: "error" });
    setLoading(false);
  };

  const getAll = async (page: number, limit: number) => {
    setLoading(true);

    const response = await getAllService(page, limit);
    if (response) {
      setLoading(false);

      return response;
    }
    enqueueSnackbar("Erro ao buscar edodontias", { variant: "error" });
    setLoading(false);
  };

  const removeEdodontics = async (id: string) => {
    setLoading(true);

    const response = await deleteByIdService(id);
    if (response) {
      enqueueSnackbar("Edodontia removida com sucesso", { variant: "success" });
      setLoading(false);

      return response;
    }
    enqueueSnackbar("Erro ao remover edodontia", { variant: "error" });
    setLoading(false);
  };

  const updateEdodontics = async (id: string, data: EdodonticUpdateFields) => {
    setLoading(true);

    const response = await updateService(id, data);
    if (response) {
      enqueueSnackbar("Edodontia atualizada com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao atualizar edodontia", { variant: "error" });
    setLoading(false);
  };

  const createEdodontics = async (data: EdodonticFields) => {
    setLoading(true);

    const response = await createService(data);
    if (response) {
      setLoading(false);
      enqueueSnackbar("Edodontia criada com sucesso", {
        variant: "success",
      });
      return response;
    }
    enqueueSnackbar("Erro ao criar edodontia", { variant: "error" });
    setLoading(false);
  };

  return {
    getOneById,
    getAll,
    removeEdodontics,
    updateEdodontics,
    createEdodontics,
  };
}
