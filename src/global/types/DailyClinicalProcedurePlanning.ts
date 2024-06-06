import { User } from "./User";

export type DailyClinicalProcedurePlanning = {
  id: string;
  data: Date;
  avaliacao_professor: string;
  aspectos_relevantes_da_anamnese: string;
  aspectos_relevantes_do_exame_radiografico: string;
  diagnostico: string;
  procedimento: string;
  protocolo_clinico: string;
  created_at: Date;
  updated_at: Date;
  aluno_asb: User;
  aluno_cd: User;
  professor: User;
};
