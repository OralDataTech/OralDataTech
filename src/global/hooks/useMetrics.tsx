import { enqueueSnackbar } from "notistack";
import { getStatisticsService } from "../services/Metrics";
import useLoading from "./useLoading";

export default function useMetrics() {
  const { setLoading } = useLoading();

  const getStatistics = async () => {
    setLoading(true);

    const response = await getStatisticsService();
    if (!response) {
      setLoading(false);

      return enqueueSnackbar("Erro ao buscar estatisticas", {
        variant: "error",
      });
    }
    setLoading(false);
    return response;
  };

  return {
    getStatistics,
  };
}
