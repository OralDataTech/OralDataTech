import * as yup from "yup";
import { DailyFields } from "../types/DailyFields";

export const DailySchema = yup.object<DailyFields>().shape({
  data: yup.string().required("Campo obrigatório"),
  id_medical_record: yup.string().required("Campo obrigatório"),
  id_aluno_cd: yup.string().required("Campo obrigatório"),
  id_aluno_asb: yup.string().required("Campo obrigatório"),
  id_professor: yup.string().required("Campo obrigatório"),
  avaliacao_professor: yup.string(),
  aspectos_relevantes_da_anamnese: yup.string().required("Campo obrigatório"),
  aspectos_relevantes_do_exame_radiografico: yup
    .string()
    .required("Campo obrigatório"),
  diagnostico: yup.string().required("Campo obrigatório"),
  procedimento: yup.string().required("Campo obrigatório"),
  protocolo_clinico: yup.string().required("Campo obrigatório"),
});
