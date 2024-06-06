import { enqueueSnackbar } from "notistack";
import {
  getOneByIdService,
  getAllService,
  deleteByIdService,
  updateService,
  createService,
} from "../services/Anamnesis";
import { AnamnesisFields } from "../../pages/AnamnesisForm/types/AnamnesisFields";
import useLoading from "./useLoading";

export default function useAnamnesis() {
  const { setLoading } = useLoading();

  const getOneById = async (id: string) => {
    setLoading(true);
    const response = await getOneByIdService(id);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar anamnese", { variant: "error" });
    setLoading(false);
  };

  const getAll = async (page: number, limit: number) => {
    setLoading(true);

    const response = await getAllService(page, limit);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar anamneses", { variant: "error" });
    setLoading(false);
  };

  const removeAnamnesis = async (id: string) => {
    setLoading(true);

    const response = await deleteByIdService(id);
    if (response) {
      enqueueSnackbar("Anamnese removida com sucesso", { variant: "success" });
      setLoading(false);

      return response;
    }
    enqueueSnackbar("Erro ao remover anamnese", { variant: "error" });
    setLoading(false);
  };

  const updateAnamnesis = async (id: string, data: AnamnesisFields) => {
    setLoading(true);

    const response = await updateService(id, data);
    if (response) {
      enqueueSnackbar("Anamnese atualizada com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao atualizar anamnese", { variant: "error" });
    setLoading(false);
  };

  const createAnamnesis = async (data: AnamnesisFields) => {
    setLoading(true);

    const response = await createService(data);
    if (response) {
      setLoading(false);
      return enqueueSnackbar("Anamnese criada com sucesso", {
        variant: "success",
      });
    }
    enqueueSnackbar("Erro ao criar anamnese", { variant: "error" });
    setLoading(false);
  };

  return {
    getOneById,
    getAll,
    removeAnamnesis,
    updateAnamnesis,
    createAnamnesis,
  };
}
