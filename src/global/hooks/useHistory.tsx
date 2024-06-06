import { enqueueSnackbar } from "notistack";
import {
  getOneByIdService,
  getAllService,
  getAllNotCheckService,
  toSignService,
} from "../services/History";
import useLoading from "./useLoading";
import useAuth from "./useAuth";

export default function useHistory() {
  const { setLoading, loading } = useLoading();
  const { user } = useAuth();

  const getOneById = async (id: string) => {
    setLoading(true);
    const response = await getOneByIdService(id);

    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar histórico", { variant: "error" });
    setLoading(false);
  };

  const getAll = async (page: number, limit: number) => {
    setLoading(true);
    const response = await getAllService(page, limit);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar histórico", { variant: "error" });
    setLoading(false);
  };

  const getAllNotCheck = async (page: number, limit: number) => {
    setLoading(true);
    const response = await getAllNotCheckService(page, limit);
    if (response) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao buscar histórico", { variant: "error" });
    setLoading(false);
  };

  const toSign = async (id: string) => {
    setLoading(true);
    const response = await toSignService(id, user.id);
    if (response) {
      enqueueSnackbar("Exame assinado com sucesso", {
        variant: "success",
      });
      setLoading(false);
      return response;
    }
    enqueueSnackbar("Erro ao assinar o histórico", { variant: "error" });
    setLoading(false);
  };

  return {
    getOneById,
    getAll,
    toSign,
    getAllNotCheck,
    loading,
  };
}
