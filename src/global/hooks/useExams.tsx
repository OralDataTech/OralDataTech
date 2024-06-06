import { enqueueSnackbar } from "notistack";
import {
  getOneByIdService,
  getAllService,
  deleteByIdService,
  updateService,
  createService,
} from "../services/Exams";
import { ExamFields } from "../../pages/ExamsForm/types/ExamFields";
import useLoading from "./useLoading";

export default function useExams() {
  const { setLoading } = useLoading();
  const getOneById = async (id: string) => {
    setLoading(true);
    const response = await getOneByIdService(id);

    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar exame", { variant: "error" });
    setLoading(false);
  };

  const getAll = async (page: number, limit: number) => {
    setLoading(true);
    const response = await getAllService(page, limit);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar exame", { variant: "error" });
    setLoading(false);
  };

  const removeExam = async (id: string) => {
    setLoading(true);
    const response = await deleteByIdService(id);
    if (response) {
      enqueueSnackbar("Exame removida com sucesso", { variant: "success" });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao remover exame", { variant: "error" });
    setLoading(false);
  };

  const updateExam = async (id: string, data: ExamFields) => {
    setLoading(true);
    const response = await updateService(id, data);
    if (response) {
      enqueueSnackbar("Exame atualizada com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao atualizar exame", { variant: "error" });
    setLoading(false);
  };

  const createExam = async (data: ExamFields) => {
    setLoading(true);
    const response = await createService(data);
    if (response) {
      setLoading(false);
      enqueueSnackbar("Exame criado com sucesso", {
        variant: "success",
      });
      return response;
    }
    enqueueSnackbar("Erro ao criar exame", { variant: "error" });
    setLoading(false);
  };

  return {
    getOneById,
    getAll,
    removeExam,
    updateExam,
    createExam,
  };
}
