import * as yup from "yup";

export const PediatricDensitrySchema = yup.object().shape({
  pai: yup.string().required("Campo obrigatório"),
  mae: yup.string().required("Campo obrigatório"),
  profissao_da_mae: yup.string().required("Campo obrigatório"),
  profissao_do_pai: yup.string().required("Campo obrigatório"),
  escolaridade_do_pai: yup.string().required("Campo obrigatório"),
  escolaridade_da_mae: yup.string().required("Campo obrigatório"),
  agua_encanada: yup.boolean().required("Campo obrigatório"),
  vive_com: yup.string().required("Campo obrigatório"),
  quem_cuida: yup.string().required("Campo obrigatório"),
  nasceu_com_quantos_meses_gestacao: yup
    .number()
    .typeError("Forneça um número válido")
    .required("Campo obrigatório"),
  peso_no_nascimento: yup.string().required("Campo obrigatório"),
  quantas_visitas_a_mae_fez_no_pre_natal: yup
    .string()
    .required("Campo obrigatório"),
  visitou_dentista_durante_a_gravidez: yup
    .string()
    .required("Campo obrigatório"),
  motivo_visita_durante_a_gravidez: yup.string().required("Campo obrigatório"),
  mamou_no_peito_quantos_meses: yup.string().required("Campo obrigatório"),
  comia_algo_durante_sono_noturno: yup.string().required("Campo obrigatório"),
  ate_que_idade_mamou_durante_o_sono: yup
    .string()
    .required("Campo obrigatório"),
  quando_comecou_limpar_a_boca_da_crianca: yup
    .string()
    .required("Campo obrigatório"),
  problemas_alergicos: yup.string().required("Campo obrigatório"),
  medicamentos: yup.string().required("Campo obrigatório"),
  ja_foi_anestesiado: yup.boolean().required("Campo obrigatório"),
  reacao_a_anestesia: yup.string().required("Campo obrigatório"),
  numero_de_escovacoes_diarias: yup
    .number()
    .typeError("Forneça um número válido")
    .required("Campo obrigatório"),
  horarios_escovacao_diaria: yup.string().required("Campo obrigatório"),
  desde_quando_essa_escovacao: yup.string().required("Campo obrigatório"),
  quem_escova: yup.string().required("Campo obrigatório"),
  aceita_escovacao: yup.string().required("Campo obrigatório"),
  caso_nao_aceite: yup.string().required("Campo obrigatório"),
  usa_fio_dental_diariamente: yup.string().required("Campo obrigatório"),
  diario_alimentar_ultimas_24h: yup.string().required("Campo obrigatório"),
  come_guloseimas_entre_refeicoes: yup.string().required("Campo obrigatório"),
  como_classifica_a_saude_bucal_do_seu_filho: yup
    .string()
    .required("Campo obrigatório"),
  historia_de_carie_presente_ou_passado_na_familia: yup
    .string()
    .required("Campo obrigatório"),
  tem_irmaos: yup.string().required("Campo obrigatório"),
  sabe_como_evitar_a_instalacao_da_doenca_carie_dentaria: yup
    .string()
    .required("Campo obrigatório"),
  como_classifica_sua_saude_bucal: yup.string().required("Campo obrigatório"),
  o_que_pode_ser_feito_para_melhorar: yup.string().required("Campo obrigatório"),
  crianca_ja_sofreu_algum_tipo_de_traumatismo_na_boca: yup
    .string()
    .required("Campo obrigatório"),
  tipo_traumatismo: yup.string().required("Campo obrigatório"),
  idade_quando_sofreu_traumatismo: yup.string().required("Campo obrigatório"),
  lesou_tecidos_moles: yup.string().required("Campo obrigatório"),
  procurou_atendimento: yup.string().required("Campo obrigatório"),
  tempo_que_demorou_para_atendimento: yup
    .string()
    .required("Campo obrigatório"),
  local_do_atendimento: yup.string().required("Campo obrigatório"),
  dentes_afetados: yup.string().required("Campo obrigatório"),
  sangramento_gengival_apos_escovacao: yup
    .string()
    .required("Campo obrigatório"),
  placa_visivel: yup.string().required("Campo obrigatório"),
  dentes_com_descoloracao_sugestivas_de_traumas: yup
    .string()
    .required("Campo obrigatório"),
  tecidos_moles: yup.string().required("Campo obrigatório"),
  denticao: yup.string().required("Campo obrigatório"),
  denticao_decidua_tipo_de_arco_superior: yup
    .string()
    .required("Campo obrigatório"),
  denticao_decidua_tipo_de_arco_inferior: yup
    .string()
    .required("Campo obrigatório"),
  denticao_decidua_relacao_terminal_de_2_molares_direito: yup
    .string()
    .required("Campo obrigatório"),
  denticao_decidua_relacao_terminal_de_2_molares_esquerdo: yup
    .string()
    .required("Campo obrigatório"),
  diastemas_primarios_superior: yup.string().required("Campo obrigatório"),
  diastemas_primarios_inferior: yup.string().required("Campo obrigatório"),
  desticao_mista_molares_direito: yup.string().required("Campo obrigatório"),
  desticao_mista_molares_esquerdo: yup.string().required("Campo obrigatório"),
  desticao_mista_caninos_direito: yup.string().required("Campo obrigatório"),
  desticao_mista_caninos_esquerdo: yup.string().required("Campo obrigatório"),
  desticao_permanente_molares_direito: yup
    .string()
    .required("Campo obrigatório"),
  desticao_permanente_molares_esquerdo: yup
    .string()
    .required("Campo obrigatório"),
  desticao_permanente_caninos_direito: yup
    .string()
    .required("Campo obrigatório"),
  desticao_permanente_caninos_esquerdo: yup
    .string()
    .required("Campo obrigatório"),
  para_todos_os_tipos_de_denticao_linha_mediana: yup
    .string()
    .required("Campo obrigatório"),
  para_todos_os_tipos_de_denticao_mordida_aberta_anterior: yup
    .string()
    .required("Campo obrigatório"),
  cruzamentos: yup.string().required("Campo obrigatório"),
  para_todos_os_tipos_de_denticao_bruxismo: yup
    .string()
    .required("Campo obrigatório"),
  horario: yup.string().required("Campo obrigatório"),
  para_todos_os_tipos_de_denticao_habitos_nao_nutritivos: yup
    .string()
    .required("Campo obrigatório"),
  qual_habito: yup.string().required("Campo obrigatório"),
  ate_que_idade: yup.string().required("Campo obrigatório"),
  dentes: yup
    .array()
    .of(
      yup.object().shape({
        dente_analisado: yup.string().required("Campo obrigatório"),
        cdi: yup.string().required("Campo obrigatório"),
        icdas: yup.string().required("Campo obrigatório"),
      })
    )
    .optional(),
  problemas_dentes: yup
    .array()
    .of(
      yup.object().shape({
        dente_com_problema: yup.string().required("Campo obrigatório"),
        problemas: yup.string().required("Campo obrigatório"),
        solucoes: yup.string().required("Campo obrigatório"),
      })
    )
    .optional(),
  procedimentos_executados: yup.string().required("Campo obrigatório"),
});
