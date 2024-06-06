import { enqueueSnackbar } from "notistack";
import {
  getAllService,
  createService,
  getOneByIdService,
  updateService,
  deleteByIdService,
} from "../services/Disciplines";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import { DisciplineValidation } from "../../pages/FormDiscipline/types/DisciplineValidation";

export default function useDisciplines() {
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  const getAll = async (page: number, limit: number) => {
    setLoading(true);
    const data = await getAllService(page, limit);
    setLoading(false);
    return data;
  };

  function getAbreviation(name: string) {
    const words = name.split(" ");
    const firstLetters = words.map((word) => word[0]);
    return firstLetters.join("").substring(0, 3);
  }

  const getOneByid = async (id: string) => {
    setLoading(true);
    const data = await getOneByIdService(id);
    setLoading(false);
    return data;
  };

  const deleteByid = async (id: string) => {
    setLoading(true);
    const data = await deleteByIdService(id);
    if (data && data.affected > 0) {
      enqueueSnackbar("Disciplina deletada com sucesso!", {
        variant: "success",
      });
      return data;
    } else {
      enqueueSnackbar("Erro ao deletar disciplina!", { variant: "error" });
    }
    setLoading(false);
  };

  const create = async (discipline: DisciplineValidation) => {
    setLoading(true);
    const data = await createService(discipline);
    if (data) {
      navigate("/disciplinas");
      setLoading(false);

      return enqueueSnackbar("Disciplina criada com sucesso!", {
        variant: "success",
      });
    }
    return data;
  };

  const update = async (discipline: DisciplineValidation, id: string) => {
    setLoading(true);
    const data = await updateService(discipline, id);
    if (data) {
      navigate("/disciplinas");
      setLoading(false);

      return enqueueSnackbar("Disciplina editada com sucesso!", {
        variant: "success",
      });
    }
    return data;
  };
  return {
    getAll,
    create,
    loading,
    getOneByid,
    update,
    deleteByid,
    getAbreviation,
  };
}
