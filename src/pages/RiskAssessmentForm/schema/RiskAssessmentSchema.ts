import * as yup from "yup";
import { RiskAssessmentFieldsSelect } from "../types/RiskAssessmentFields";

export const RiskAssessmentSchema = yup
  .object<RiskAssessmentFieldsSelect>()
  .shape({
    id_medical_record: yup.string().required("Campo Obrigatório"),
    responsavel: yup.string().required("Campo Obrigatório"),
    risco_de_carie_preencher: yup.boolean().required("Campo Obrigatório"),
    risco_de_carie_fator: yup.string(),
    risco_de_carie_biofilme: yup.string(),
    risco_de_carie: yup.number(),
    risco_de_carie_anotacoes: yup.string(),
    risco_de_carie_avaliacao: yup.string(),
    risco_periodontal_preencher: yup.boolean().required("Campo Obrigatório"),
    risco_periodontal_codigo: yup.string(),
    risco_periodontal_classificacao: yup.string(),
    risco_periodontal_anotacoes: yup.string(),
    risco_periodontal_avaliacao: yup.string(),
    tem_risco_tecidos_moles: yup.boolean().required("Campo Obrigatório"),
    risco_tecidos_moles_codigo: yup.string(),
    risco_tecidos_moles_classificacao: yup.string(),
    risco_tecidos_moles_anotacoes: yup.string(),
    risco_tecidos_moles_avaliacao: yup.string(),
    necessidade_de_protese_preencher: yup
      .boolean()
      .required("Campo Obrigatório"),
    uso_de_protese_superior_dimensoes: yup.string(),
    uso_de_protese_superior_codigos: yup.string(),
    uso_de_protese_superior_criterios: yup.string(),
    uso_de_protese_inferior_dimensoes: yup.string(),
    uso_de_protese_inferior_codigos: yup.string(),
    uso_de_protese_inferior_criterios: yup.string(),
    necessidade_de_protese_anotacoes: yup.string(),
    necessidade_de_protese_avaliacao: yup.string(),
    risco_familiar_preencher: yup.boolean().required("Campo Obrigatório"),
    risco_familiar_escores: yup
      .array()
      .of(yup.string().required("Campo obrigatório")),
    risco_familiar_anotacoes: yup.string(),
    risco_familiar_avaliacao: yup.string(),
    risco_de_carie_encaminhamento: yup.string(),
    risco_periodontal_criterio: yup.string(),
    risco_tecidos_moles_criterio: yup.string(),
    local_da_atividade: yup.string(),
    necessidade_de_ART: yup.boolean(),
    ART_realizada: yup.boolean(),
    quantas_ARTs_foram_realizadas: yup.number().typeError("Deve ser um número"),
  });
