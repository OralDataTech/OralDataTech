import { enqueueSnackbar } from "notistack";
import {
  getOneByIdService,
  getAllService,
  deleteByIdService,
  updateService,
  createService,
} from "../services/TreatmenPlan";
import { TreatmentPlanFields } from "../../pages/TreatmentForm/types/TreatmentPlanFields";
import useLoading from "./useLoading";

export default function useTreatment() {
  const { setLoading } = useLoading();
  const getOneById = async (id: string) => {
    setLoading(true);
    const response = await getOneByIdService(id);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar plano de tratamento", { variant: "error" });
    setLoading(false);
  };

  const getAll = async (page: number, limit: number) => {
    setLoading(true);
    const response = await getAllService(page, limit);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar plano de tratamenots", {
      variant: "error",
    });
    setLoading(false);
  };

  const removeTreatment = async (id: string) => {
    setLoading(true);
    const response = await deleteByIdService(id);
    if (response) {
      enqueueSnackbar("Plano de tratamento removida com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao remover plano de tratamento", {
      variant: "error",
    });
    setLoading(false);
  };

  const updateTreatment = async (id: string, data: TreatmentPlanFields) => {
    setLoading(true);
    const response = await updateService(id, data);
    if (response) {
      enqueueSnackbar("Plano de tratamento atualizada com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao atualizar plano de tratamento", {
      variant: "error",
    });
    setLoading(false);
  };

  const createTreatment = async (data: TreatmentPlanFields) => {
    setLoading(true);
    const response = await createService(data);
    if (response) {
      setLoading(false);
      enqueueSnackbar("Plano de tratamento criada com sucesso", {
        variant: "success",
      });
      return response;
    }
    enqueueSnackbar("Erro ao criar plano de tratamento", { variant: "error" });
    setLoading(false);
  };

  return {
    getOneById,
    getAll,
    removeTreatment,
    updateTreatment,
    createTreatment,
  };
}
