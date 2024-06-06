import * as yup from "yup";

export const ExamSchema = yup.object().shape({
  id_medical_record: yup.string().optional(),
  anormalidades_encontradas: yup.string().required("Campo obrigatório"),
  higiene_bucal: yup.string().required("Campo obrigatório"),
  exames_complementares: yup.string().required("Campo obrigatório"),
  exame_intrabucal_labios: yup.string().required("Campo obrigatório"),
  exame_intrabucal_palato_duro: yup.string().required("Campo obrigatório"),
  exame_intrabucal_lingua: yup.string().required("Campo obrigatório"),
  exame_intrabucal_faringe: yup.string().required("Campo obrigatório"),
  exame_intrabucal_gengivas: yup.string().required("Campo obrigatório"),
  exame_intrabucal_habitos: yup.string().required("Campo obrigatório"),
  exame_intrabucal_mucosa_jugal: yup.string().required("Campo obrigatório"),
  exame_intrabucal_palato_mole: yup.string().required("Campo obrigatório"),
  exame_intrabucal_assoalho_bucal: yup.string().required("Campo obrigatório"),
  exame_intrabucal_glan_salivares: yup.string().required("Campo obrigatório"),
  exame_intrabucal_atm: yup.string().required("Campo obrigatório"),
  exame_intrabucal_outros: yup.string().required("Campo obrigatório"),
  resultados_encontrados: yup.string().required("Campo obrigatório"),
});
