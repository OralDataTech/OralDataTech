import {
  getAllService,
  createPatientService,
  getOneByIdService,
  updatePatientService,
  deletePatientService,
} from "../services/Patient";
import { enqueueSnackbar } from "notistack";
import { PatientFields } from "../../pages/PatientForm/types/PatientFiels";
import { useNavigate } from "react-router-dom";
import useLoading from "./useLoading";

export default function usePatient() {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const getAll = async (page: number, limit: number) => {
    setLoading(true);
    const response = await getAllService(page, limit);
    if (!response.message) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar(response.message, { variant: "error" });
    setLoading(false);
  };

  const getOneById = async (id: string) => {
    setLoading(true);
    const response = await getOneByIdService(id);
    if (!response.message) {
      setLoading(false);
      return response;
    }
    enqueueSnackbar(response.message, { variant: "error" });
    setLoading(false);
  };

  const deletePatient = async (id: string) => {
    setLoading(true);
    const response = await deletePatientService(id);
    if (!response) {
      enqueueSnackbar("Erro ao deletar o paciente", { variant: "error" });
      setLoading(false);
      return;
    }
    enqueueSnackbar("Usuário deletado com sucesso", { variant: "success" });
    setLoading(false);
    return navigate("/");
  };

  const create = async (patient: PatientFields) => {
    setLoading(true);
    const response = await createPatientService(patient);

    if (!response.message) {
      enqueueSnackbar("Usuário criado com sucesso", { variant: "success" });
      setLoading(false);
      return navigate("/pacientes");
    }
    enqueueSnackbar(response.message, {
      variant: "error",
    });
    setLoading(false);
  };

  const update = async (id: string, patient: PatientFields) => {
    setLoading(true);
    const response = await updatePatientService(id, patient);

    if (!response?.message) {
      enqueueSnackbar("Usuário editado com sucesso", { variant: "success" });
      setLoading(false);
      return navigate("/pacientes");
    }
    enqueueSnackbar(response.message, {
      variant: "error",
    });
    setLoading(false);
  };

  return {
    getAll,
    create,
    getOneById,
    update,
    deletePatient,
  };
}
