import * as yup from "yup";

export const AnamnesisSchema = yup.object().shape({
  queixa_principal_doenca_atual: yup.string().required("Campo obrigatório"),
  ultima_visita_ao_dentista: yup.string().required("Campo obrigatório"),
  motivo_consulta: yup.string().required("Campo obrigatório"),
  sofre_alguma_doenca: yup.boolean().required("Campo obrigatório"),
  sofre_quais_doencas: yup.string().required("Campo obrigatório"),
  esta_em_tratamento: yup.boolean().required("Campo obrigatório"),
  gravidez: yup.boolean().required("Campo obrigatório"),
  esta_fazendo_uso_medicacao: yup.boolean().required("Campo obrigatório"),
  quais_medicacoes: yup.string(),
  nome_medico: yup.string().required("Campo obrigatório"),
  telefone_medico: yup.string().required("Campo obrigatório"),
  ja_foi_operado: yup.boolean().required("Campo obrigatório"),
  quais_operacoes: yup.string().required("Campo obrigatório"),
  problemas_com_cicatrizacao: yup.boolean().required("Campo obrigatório"),
  problemas_com_anestesia: yup.boolean().required("Campo obrigatório"),
  pes_e_pernas_inchados: yup.boolean().required("Campo obrigatório"),
  problemas_seios_maxilares_frontal_etc: yup
    .boolean()
    .required("Campo obrigatório"),
  sente_muita_sede: yup.boolean().required("Campo obrigatório"),
  alteracoes_de_sangue: yup.boolean().required("Campo obrigatório"),
  diabetico: yup.boolean().required("Campo obrigatório"),
  asmatico: yup.boolean().required("Campo obrigatório"),
  epileptico: yup.boolean().required("Campo obrigatório"),
  dst: yup.boolean().required("Campo obrigatório"),
  fuma_tabaco_rape: yup.boolean().required("Campo obrigatório"),
  bebidas_alcoolicas: yup.boolean().required("Campo obrigatório"),
  enfermidades_nao_mencionadas: yup.string().required("Campo obrigatório"),
  alguma_diabete_cancer_tuberculose_familia: yup
    .boolean()
    .required("Campo obrigatório"),
  qual_diabete_cancer_tuberculose_familia: yup
    .string()
    .required("Campo obrigatório"),
  alguma_outra_doenca: yup.string().required("Campo obrigatório"),
  alguma_alergia: yup.boolean().required("Campo obrigatório"),
  quais_alergias: yup.string(),
});
