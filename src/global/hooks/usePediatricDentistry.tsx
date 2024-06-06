import { enqueueSnackbar } from "notistack";
import {
  getOneByIdService,
  getAllService,
  deleteByIdService,
  updateService,
  createService,
} from "../services/PediatricDentistry";
import useLoading from "./useLoading";
import { PediatricDentistryFields } from "../../pages/PediatricDensitryForm/types/PediatricDentistry";

export default function usePediatricDentistry() {
  const { setLoading } = useLoading();
  const getOneById = async (id: string) => {
    setLoading(true);
    const response = await getOneByIdService(id);

    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar odontropediatria", { variant: "error" });
    setLoading(false);
  };

  const getAll = async (page: number, limit: number) => {
    setLoading(true);
    const response = await getAllService(page, limit);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar odontropediatria", { variant: "error" });
    setLoading(false);
  };

  const removePediatricDentistry = async (id: string) => {
    setLoading(true);
    const response = await deleteByIdService(id);
    if (response) {
      enqueueSnackbar("Odontropediatria removida com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao remover odontropediatria", { variant: "error" });
    setLoading(false);
  };

  const updatePediatricDentistry = async (
    id: string,
    data: PediatricDentistryFields
  ) => {
    setLoading(true);
    const response = await updateService(id, data);
    if (response) {
      enqueueSnackbar("Odontropediatria atualizada com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao atualizar odontropediatria", { variant: "error" });
    setLoading(false);
  };

  const createPediatricDentistry = async (data: PediatricDentistryFields) => {
    setLoading(true);
    const response = await createService(data);
    if (response) {
      setLoading(false);
      enqueueSnackbar("Odontropediatria criado com sucesso", {
        variant: "success",
      });
      return response;
    }
    enqueueSnackbar("Erro ao criar odontropediatria", { variant: "error" });
    setLoading(false);
  };

  return {
    getOneById,
    getAll,
    createPediatricDentistry,
    updatePediatricDentistry,
    removePediatricDentistry,
  };
}
