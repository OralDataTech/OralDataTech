import * as yup from "yup";
import { EdodonticFields } from "../types/EdodonticFields";

export const EdodonticSchema = yup.object<EdodonticFields>().shape({
  queixa_principal: yup.string().required("Campo Obrigatório"),
  sede: yup.string().required("Campo Obrigatório"),
  aparecimento: yup.string().required("Campo Obrigatório"),
  duracao: yup.string().required("Campo Obrigatório"),
  frequencia: yup.string().required("Campo Obrigatório"),
  intensidade: yup.string().required("Campo Obrigatório"),
  inspecao_dente: yup.string().required("Campo Obrigatório"),
  regiao_dente: yup.string().required("Campo Obrigatório"),
  estrutura_dentaria: yup.string().required("Campo Obrigatório"),
  edema_local: yup.string().required("Campo Obrigatório"),
  coloracao_dentaria: yup.string().required("Campo Obrigatório"),
  coloracao_tecidual: yup.string().required("Campo Obrigatório"),
  fistula: yup.string().required("Campo Obrigatório"),
  palpacao_coronaria: yup.string().required("Campo Obrigatório"),
  palpacao_periapical: yup.string().required("Campo Obrigatório"),
  palpacao_edema: yup.string().required("Campo Obrigatório"),
  palpacao_mobilidade: yup.string().required("Campo Obrigatório"),
  percussao_vertical: yup.string().required("Campo Obrigatório"),
  percussao_horizontal: yup.string().required("Campo Obrigatório"),
  sensibilidade_pulpar_frio: yup.string().required("Campo Obrigatório"),
  sensibilidade_pulpar_calor: yup.string().required("Campo Obrigatório"),
  canal_radicular: yup.string().required("Campo Obrigatório"),
  sensibilidade_pulpar_teste_mecanico: yup
    .string()
    .required("Campo Obrigatório"),
  sensibilidade_pulpar_teste_anestesia: yup
    .string()
    .required("Campo Obrigatório"),
  observacoes: yup.string().required("Campo Obrigatório"),
  camara_pulpar: yup.string().required("Campo Obrigatório"),
  regiao_periapical: yup.string().required("Campo Obrigatório"),
  patologia_pulpar: yup.string().required("Campo Obrigatório"),
  patologia_periapical: yup.string().required("Campo Obrigatório"),
  plano_tratamento: yup.string().required("Campo Obrigatório"),
  instrumentacao_tecnica: yup.string().required("Campo Obrigatório"),
  dentes: yup
    .array()
    .of(
      yup.object().shape({
        dente: yup.string(),
        referencia: yup.string(),
        ctp: yup.string(),
        crd: yup.string(),
        crt: yup.string(),
        iai: yup.string(),
        iaf: yup.string(),
        im: yup.string(),
        cad: yup.string(),
        visto_professor: yup.string().optional(),
      })
    )
    .optional(),
  obturacao_tecnica: yup.string().required("Campo Obrigatório"),
  obturacao_cimento: yup.string().required("Campo Obrigatório"),
  obturacao_restaurador_provisorio: yup.string().required("Campo Obrigatório"),
});
