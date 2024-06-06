import { enqueueSnackbar } from "notistack";
import {
  getOneByIdService,
  getAllService,
  deleteByIdService,
  updateService,
  createService,
} from "../services/Periogram";
import useLoading from "./useLoading";
import { PeriogramFields } from "../../pages/PeriogramForm/types/PeriogramFields";

export default function usePeriogram() {
  const { setLoading } = useLoading();

  const getOneById = async (id: string) => {
    setLoading(true);
    const response = await getOneByIdService(id);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar periograma", { variant: "error" });
    setLoading(false);
  };

  const getAll = async (page: number, limit: number) => {
    setLoading(true);

    const response = await getAllService(page, limit);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar periogramas", { variant: "error" });
    setLoading(false);
  };

  const removePeriogram = async (id: string) => {
    setLoading(true);

    const response = await deleteByIdService(id);
    if (response) {
      enqueueSnackbar("periograma removido com sucesso", { variant: "success" });
      setLoading(false);

      return response;
    }
    enqueueSnackbar("Erro ao remover periograma", { variant: "error" });
    setLoading(false);
  };

  const updatePeriogram = async (id: string, data: PeriogramFields) => {
    setLoading(true);

    const response = await updateService(id, data);
    if (response) {
      enqueueSnackbar("periograma atualizado com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao atualizar periograma", { variant: "error" });
    setLoading(false);
  };

  const createPeriogram = async (data: PeriogramFields) => {
    setLoading(true);

    const response = await createService(data);
    if (response) {
      setLoading(false);
      return enqueueSnackbar("Periograma criado com sucesso", {
        variant: "success",
      });
    }
    enqueueSnackbar("Erro ao criar periograma", { variant: "error" });
    setLoading(false);
  };

  return {
    getOneById,
    getAll,
    removePeriogram,
    updatePeriogram,
    createPeriogram,
  };
}
