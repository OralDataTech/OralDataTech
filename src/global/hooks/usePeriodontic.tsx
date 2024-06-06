import { enqueueSnackbar } from "notistack";
import {
  getOneByIdService,
  getAllService,
  deleteByIdService,
  updateService,
  createService,
} from "../services/Periodontic";
import {
  PeriodonticFields,
  PeriodonticUpdateFields,
} from "../../pages/PeriodonticForm/types/PeriodonticFields";
import useLoading from "./useLoading";

export default function usePeriodontics() {
  const { setLoading } = useLoading();
  const getOneById = async (id: string) => {
    setLoading(true);
    const response = await getOneByIdService(id);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar periodontia", { variant: "error" });
    setLoading(false);
  };

  const getAll = async (page: number, limit: number) => {
    setLoading(true);
    const response = await getAllService(page, limit);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar periodontias", { variant: "error" });
    setLoading(false);
  };

  const removePeriodontics = async (id: string) => {
    setLoading(true);
    const response = await deleteByIdService(id);
    if (response) {
      enqueueSnackbar("Periodontia removida com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao remover periodontia", { variant: "error" });
    setLoading(false);
  };

  const updatePeriodontics = async (
    id: string,
    data: PeriodonticUpdateFields
  ) => {
    setLoading(true);
    const response = await updateService(id, data);

    if (response) {
      enqueueSnackbar("Periodontia atualizada com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao atualizar periodontia", { variant: "error" });
    setLoading(false);
  };

  const createPeriodontics = async (data: PeriodonticFields) => {
    setLoading(true);
    const response = await createService(data);
    if (response) {
      setLoading(false);
      enqueueSnackbar("Periodontia criada com sucesso", {
        variant: "success",
      });
      return response;
    }
    enqueueSnackbar("Erro ao criar periodontia", { variant: "error" });
    setLoading(false);
  };

  return {
    getOneById,
    getAll,
    removePeriodontics,
    updatePeriodontics,
    createPeriodontics,
  };
}
