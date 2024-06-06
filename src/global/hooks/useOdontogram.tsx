import { enqueueSnackbar } from "notistack";
import {
  getOneByIdService,
  getAllService,
  deleteByIdService,
  updateService,
  createService,
} from "../services/Odontogram";
import { OdontogramFields } from "../../pages/OdontogramForm/types/OdontogramFields";
import useLoading from "./useLoading";

export default function useOdontogram() {
  const { setLoading } = useLoading();
  const getOneById = async (id: string) => {
    setLoading(true);
    const response = await getOneByIdService(id);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar odontograma", { variant: "error" });
    setLoading(false);
  };

  const getAll = async (page: number, limit: number) => {
    setLoading(true);
    const response = await getAllService(page, limit);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar odontogramas", { variant: "error" });
    setLoading(false);
  };

  const removeOdontogram = async (id: string) => {
    setLoading(true);
    const response = await deleteByIdService(id);
    if (response) {
      enqueueSnackbar("Odontograma removida com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao remover odontograma", { variant: "error" });
    setLoading(false);
  };

  const updateOdontogram = async (id: string, data: OdontogramFields) => {
    setLoading(true);
    const response = await updateService(id, data);

    if (response) {
      enqueueSnackbar("Odontograma atualizada com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao atualizar odontograma", { variant: "error" });
    setLoading(false);
  };

  const createOdontogram = async (data: OdontogramFields) => {
    setLoading(true);
    const response = await createService(data);
    if (response) {
      setLoading(false);
      enqueueSnackbar("Odontograma criada com sucesso", {
        variant: "success",
      });
      return response;
    }
    enqueueSnackbar("Erro ao criar odontograma", { variant: "error" });
    setLoading(false);
  };

  return {
    getOneById,
    getAll,
    removeOdontogram,
    updateOdontogram,
    createOdontogram,
  };
}
