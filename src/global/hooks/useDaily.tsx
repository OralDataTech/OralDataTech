import { enqueueSnackbar } from "notistack";
import {
  getOneByIdService,
  getAllService,
  deleteByIdService,
  updateService,
  createService,
} from "../services/DailyPlan";
import useLoading from "./useLoading";
import { DailyFields } from "../../pages/DailyClinicalProcedurePlanningForm/types/DailyFields";

export default function useDaily() {
  const { setLoading } = useLoading();

  const getOneById = async (id: string) => {
    setLoading(true);
    const response = await getOneByIdService(id);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar planejamento", { variant: "error" });
    setLoading(false);
  };

  const getAll = async (page: number, limit: number) => {
    setLoading(true);

    const response = await getAllService(page, limit);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar planejamentos", { variant: "error" });
    setLoading(false);
  };

  const removeDaily = async (id: string) => {
    setLoading(true);

    const response = await deleteByIdService(id);
    if (response) {
      enqueueSnackbar("planejamento removida com sucesso", {
        variant: "success",
      });
      setLoading(false);

      return response;
    }
    enqueueSnackbar("Erro ao remover planejamento", { variant: "error" });
    setLoading(false);
  };

  const updateDaily = async (id: string, data: DailyFields) => {
    setLoading(true);

    const response = await updateService(id, data);
    if (response) {
      enqueueSnackbar("planejamento atualizado com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao atualizar planejamento", { variant: "error" });
    setLoading(false);
  };

  const createDaily = async (data: DailyFields) => {
    setLoading(true);

    const response = await createService(data);
    if (response) {
      setLoading(false);
      return enqueueSnackbar("planejamento criada com sucesso", {
        variant: "success",
      });
    }
    enqueueSnackbar("Erro ao criar planejamento", { variant: "error" });
    setLoading(false);
  };

  return {
    getOneById,
    getAll,
    removeDaily,
    updateDaily,
    createDaily,
  };
}
