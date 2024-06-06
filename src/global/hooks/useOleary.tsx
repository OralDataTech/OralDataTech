import { enqueueSnackbar } from "notistack";
import {
  getOneByIdService,
  getAllService,
  deleteByIdService,
  updateService,
  createService,
} from "../services/Oleary";
import {
  OlearyFields,
  OlearyUpdateFields,
} from "../../pages/OlearyForm/types/OlearyFields";
import useLoading from "./useLoading";

export default function useIndex() {
  const { setLoading } = useLoading();
  const getOneById = async (id: string) => {
    setLoading(true);
    const response = await getOneByIdService(id);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar índice", { variant: "error" });
    setLoading(false);
  };

  const getAll = async (page: number, limit: number) => {
    setLoading(true);
    const response = await getAllService(page, limit);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar índices", { variant: "error" });
    setLoading(false);
  };

  const removeIndex = async (id: string) => {
    setLoading(true);
    const response = await deleteByIdService(id);
    if (response) {
      enqueueSnackbar("Índice removida com sucesso", { variant: "success" });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao remover índice", { variant: "error" });
    setLoading(false);
  };

  const updateIndex = async (id: string, data: OlearyUpdateFields) => {
    setLoading(true);
    const response = await updateService(id, data);
    if (response) {
      enqueueSnackbar("Índice atualizada com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao atualizar índice", { variant: "error" });
    setLoading(false);
  };

  const createIndex = async (data: OlearyFields) => {
    setLoading(true);
    const response = await createService(data);
    if (response) {
      setLoading(false);
      enqueueSnackbar("Índice criada com sucesso", {
        variant: "success",
      });
      return response;
    }
    enqueueSnackbar("Erro ao criar índice", { variant: "error" });
    setLoading(false);
  };

  return {
    getOneById,
    getAll,
    removeIndex,
    updateIndex,
    createIndex,
  };
}
