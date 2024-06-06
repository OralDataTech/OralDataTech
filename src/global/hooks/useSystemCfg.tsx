import { changeActiveService, getConfigService } from "../services/System";
import useLoading from "./useLoading";

export default function useSystemCfg() {
  const { setLoading, loading } = useLoading();
  const changeActiveSystem = async (active: boolean) => {
    setLoading(true);
    await changeActiveService(active);
    setLoading(false);
  };

  const getConfig = async () => {
    setLoading(true);
    const response = await getConfigService();
    setLoading(false);
    return response;
  };

  const verifySystemActive = async () => {
    setLoading(true);
    const config = await getConfig();
    setLoading(false);
    return config.active;
  };

  return {
    changeActiveSystem,
    getConfig,
    verifySystemActive,
    loading,
  };
}
