import { enqueueSnackbar } from "notistack";
import {
  getOneByIdService,
  getAllService,
  deleteByIdService,
  updateService,
  createService,
} from "../services/RiskAssessment";
import useLoading from "./useLoading";
import { RiskAssessmentFields } from "../../pages/RiskAssessmentForm/types/RiskAssessmentFields";

export default function useRiskAssessment() {
  const { setLoading } = useLoading();

  const getOneById = async (id: string) => {
    setLoading(true);
    const response = await getOneByIdService(id);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar avaliação de risco", { variant: "error" });
    setLoading(false);
  };

  const getAll = async (page: number, limit: number) => {
    setLoading(true);

    const response = await getAllService(page, limit);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar avaliação de risco", { variant: "error" });
    setLoading(false);
  };

  const removeRiskAssessment = async (id: string) => {
    setLoading(true);

    const response = await deleteByIdService(id);
    if (response) {
      enqueueSnackbar("Avaliação de risco removida com sucesso", {
        variant: "success",
      });
      setLoading(false);

      return response;
    }
    enqueueSnackbar("Erro ao remover avaliação de risco", { variant: "error" });
    setLoading(false);
  };

  const updateRiskAssessment = async (
    id: string,
    data: RiskAssessmentFields
  ) => {
    setLoading(true);

    const response = await updateService(id, data);
    if (response) {
      enqueueSnackbar("Avaliação de risco atualizado com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao atualizar avaliação de risco", {
      variant: "error",
    });
    setLoading(false);
  };

  const createRiskAssessment = async (data: RiskAssessmentFields) => {
    setLoading(true);

    const response = await createService(data);
    if (response) {
      setLoading(false);
      return enqueueSnackbar("Avaliação de risco criada com sucesso", {
        variant: "success",
      });
    }
    enqueueSnackbar("Erro ao criar avaliação de risco", { variant: "error" });
    setLoading(false);
  };

  return {
    getOneById,
    getAll,
    removeRiskAssessment,
    updateRiskAssessment,
    createRiskAssessment,
  };
}
