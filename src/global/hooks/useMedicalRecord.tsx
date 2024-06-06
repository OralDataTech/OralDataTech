import { enqueueSnackbar } from "notistack";
import {
  getAllService,
  getOneByService,
  createService,
  deleteService,
  addDisciplineService,
  removeDisciplineService,
  toSign,
} from "../services/MedicalRecord";
import { useNavigate } from "react-router-dom";
import useLoading from "./useLoading";

export default function useMedicalRecord() {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const getAll = async (page: number, limit: number) => {
    setLoading(true);
    const data = await getAllService(page, limit);
    setLoading(false);
    return data;
  };

  const addDicipline = async (
    idDiscipline: string,
    idMedicalRecord: string
  ) => {
    setLoading(true);
    await addDisciplineService(idDiscipline, idMedicalRecord);
    setLoading(false);
  };

  const signMedicalRecord = async (name: string, idMedicalRecord: string) => {
    setLoading(true);
    await toSign(idMedicalRecord, name);
    setLoading(false);
  };

  const removeDicipline = async (
    idDiscipline: string,
    idMedicalRecord: string
  ) => {
    setLoading(true);
    await removeDisciplineService(idDiscipline, idMedicalRecord);
    setLoading(false);
  };

  const getOneById = async (id: string) => {
    setLoading(true);
    const data = await getOneByService(id);
    setLoading(false);
    return data;
  };

  const create = async (idPatient: string, idUser: string) => {
    setLoading(true);
    const data = await createService(idPatient, idUser);
    setLoading(false);
    return data;
  };

  const remove = async (id: string) => {
    setLoading(true);
    const response = await deleteService(id);
    if (!response) {
      enqueueSnackbar("Erro ao excluir prontuário", { variant: "error" });
      setLoading(false);
      return;
    }
    enqueueSnackbar("Prontuário excluído com sucesso", { variant: "success" });
    setLoading(false);
    navigate("/");
  };

  return {
    getAll,
    getOneById,
    create,
    remove,
    addDicipline,
    removeDicipline,
    signMedicalRecord,
  };
}
