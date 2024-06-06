export type DentePediatric = {
  dente_analisado: string;
  cdi: string;
  icdas: string;
};

export type DenteProblem = {
  dente_com_problema: string;
  problemas: string;
  solucoes: string;
};

export type PediatricDentistryCols =
  | "pai"
  | "mae"
  | "profissao_da_mae"
  | "profissao_do_pai"
  | "escolaridade_do_pai"
  | "escolaridade_da_mae"
  | "agua_encanada"
  | "vive_com"
  | "quem_cuida"
  | "nasceu_com_quantos_meses_gestacao"
  | "peso_no_nascimento"
  | "quantas_visitas_a_mae_fez_no_pre_natal"
  | "visitou_dentista_durante_a_gravidez"
  | "motivo_visita_durante_a_gravidez"
  | "mamou_no_peito_quantos_meses"
  | "comia_algo_durante_sono_noturno"
  | "ate_que_idade_mamou_durante_o_sono"
  | "quando_comecou_limpar_a_boca_da_crianca"
  | "problemas_alergicos"
  | "medicamentos"
  | "ja_foi_anestesiado"
  | "reacao_a_anestesia"
  | "numero_de_escovacoes_diarias"
  | "horarios_escovacao_diaria"
  | "desde_quando_essa_escovacao"
  | "quem_escova"
  | "aceita_escovacao"
  | "caso_nao_aceite"
  | "usa_fio_dental_diariamente"
  | "diario_alimentar_ultimas_24h"
  | "come_gulosemas_entre_refeicoes"
  | "como_classifica_a_saude_bucal_do_seu_filho"
  | "historia_de_carie_presente_ou_passado_na_familia"
  | "tem_irmaos"
  | "sabe_como_evitar_a_instalacao_da_doenca_carie_dentaria"
  | "como_classifica_sua_saude_bucal"
  | "oque_pode_ser_feito_para_melhorar"
  | "crianca_ja_sofreu_algum_tipo_de_traumatismo_na_boca"
  | "tipo_traumatismo"
  | "idade_quando_sofreu_traumatismo"
  | "lesou_tecidos_moles"
  | "procurou_atendimento"
  | "tempo_que_demorou_para_atendimento"
  | "local_do_atendimento"
  | "dentes_afetados"
  | "sangramento_gengival_apos_escovacao"
  | "placa_visivel"
  | "dentes_com_descoloracao_sugestivas_de_traumas"
  | "tecidos_moles"
  | "denticao"
  | "denticao_decidual_tipo_de_arco_superior"
  | "denticao_decidual_tipo_de_arco_inferior"
  | "denticao_decidual_relacao_terminal_de_2_molares_direito"
  | "denticao_decidual_relacao_terminal_de_2_molares_esquerdo"
  | "diastemas_primarias_superior"
  | "diastemas_primarias_inferior"
  | "desticao_mista_molares_direito"
  | "desticao_mista_molares_esquerdo"
  | "desticao_mista_caninos_direito"
  | "desticao_mista_caninos_esquerdo"
  | "desticao_permanente_molares_direito"
  | "desticao_permanente_molares_esquerdo"
  | "desticao_permanente_caninos_direito"
  | "desticao_permanente_caninos_esquerdo"
  | "para_todos_os_tipos_de_denticao_linha_mediana"
  | "para_todos_os_tipos_de_denticao_mordida_aberta_anterior"
  | "cruzamentos"
  | "para_todos_os_tipos_de_denticao_bruxismo"
  | "horario"
  | "para_todos_os_tipos_de_denticao_habitos_nao_nutritivos"
  | "qual_habito"
  | "ate_que_idade"
  | "dentes"
  | "problemas_dentes"
  | "procedimentos_executados"
  | "id_medical_record";

export type PediatricDentistryFields = {
  id_medical_record?: string;
  pai: string;
  mae: string;
  profissao_da_mae: string;
  profissao_do_pai: string;
  escolaridade_do_pai: string;
  escolaridade_da_mae: string;
  agua_encanada: boolean;
  vive_com: string;
  quem_cuida: string;
  nasceu_com_quantos_meses_gestacao: number;
  peso_no_nascimento: string;
  quantas_visitas_a_mae_fez_no_pre_natal: string;
  visitou_dentista_durante_a_gravidez: string;
  motivo_visita_durante_a_gravidez: string;
  mamou_no_peito_quantos_meses: string;
  comia_algo_durante_sono_noturno: string;
  ate_que_idade_mamou_durante_o_sono: string;
  quando_comecou_limpar_a_boca_da_crianca: string;
  problemas_alergicos: string;
  medicamentos: string;
  ja_foi_anestesiado: boolean;
  reacao_a_anestesia: string;
  numero_de_escovacoes_diarias: number;
  horarios_escovacao_diaria: string;
  desde_quando_essa_escovacao: string;
  quem_escova: string;
  aceita_escovacao: string;
  caso_nao_aceite: string;
  usa_fio_dental_diariamente: string;
  diario_alimentar_ultimas_24h: string;
  come_gulosemas_entre_refeicoes: string;
  como_classifica_a_saude_bucal_do_seu_filho: string;
  historia_de_carie_presente_ou_passado_na_familia: string;
  tem_irmaos: string;
  sabe_como_evitar_a_instalacao_da_doenca_carie_dentaria: string;
  como_classifica_sua_saude_bucal: string;
  oque_pode_ser_feito_para_melhorar: string;
  crianca_ja_sofreu_algum_tipo_de_traumatismo_na_boca: string;
  tipo_traumatismo: string;
  idade_quando_sofreu_traumatismo: string;
  lesou_tecidos_moles: string;
  procurou_atendimento: string;
  tempo_que_demorou_para_atendimento: string;
  local_do_atendimento: string;
  dentes_afetados: string;
  sangramento_gengival_apos_escovacao: string;
  placa_visivel: string;
  dentes_com_descoloracao_sugestivas_de_traumas: string;
  tecidos_moles: string;
  denticao: string;
  denticao_decidual_tipo_de_arco_superior: string;
  denticao_decidual_tipo_de_arco_inferior: string;
  denticao_decidual_relacao_terminal_de_2_molares_direito: string;
  denticao_decidual_relacao_terminal_de_2_molares_esquerdo: string;
  diastemas_primarias_superior: string;
  diastemas_primarias_inferior: string;
  desticao_mista_molares_direito: string;
  desticao_mista_molares_esquerdo: string;
  desticao_mista_caninos_direito: string;
  desticao_mista_caninos_esquerdo: string;
  desticao_permanente_molares_direito: string;
  desticao_permanente_molares_esquerdo: string;
  desticao_permanente_caninos_direito: string;
  desticao_permanente_caninos_esquerdo: string;
  para_todos_os_tipos_de_denticao_linha_mediana: string;
  para_todos_os_tipos_de_denticao_mordida_aberta_anterior: string;
  cruzamentos: string;
  para_todos_os_tipos_de_denticao_bruxismo: string;
  horario: string;
  para_todos_os_tipos_de_denticao_habitos_nao_nutritivos: string;
  qual_habito: string;
  ate_que_idade: string;
  procedimentos_executados: string;
  dentes?: DentePediatric[];
  problemas_dentes?: DenteProblem[];
};

export type PediatricDentistryFieldsUpdate = {
  pai: string;
  mae: string;
  profissao_da_mae: string;
  profissao_do_pai: string;
  escolaridade_do_pai: string;
  escolaridade_da_mae: string;
  agua_encanada: boolean;
  vive_com: string;
  quem_cuida: string;
  nasceu_com_quantos_meses_gestacao: number;
  peso_no_nascimento: string;
  quantas_visitas_a_mae_fez_no_pre_natal: string;
  visitou_dentista_durante_a_gravidez: string;
  motivo_visita_durante_a_gravidez: string;
  mamou_no_peito_quantos_meses: string;
  comia_algo_durante_sono_noturno: string;
  ate_que_idade_mamou_durante_o_sono: string;
  quando_comecou_limpar_a_boca_da_crianca: string;
  problemas_alergicos: string;
  medicamentos: string;
  ja_foi_anestesiado: boolean;
  reacao_a_anestesia: string;
  numero_de_escovacoes_diarias: number;
  horarios_escovacao_diaria: string;
  desde_quando_essa_escovacao: string;
  quem_escova: string;
  aceita_escovacao: string;
  caso_nao_aceite: string;
  usa_fio_dental_diariamente: string;
  diario_alimentar_ultimas_24h: string;
  come_gulosemas_entre_refeicoes: string;
  como_classifica_a_saude_bucal_do_seu_filho: string;
  historia_de_carie_presente_ou_passado_na_familia: string;
  tem_irmaos: string;
  sabe_como_evitar_a_instalacao_da_doenca_carie_dentaria: string;
  como_classifica_sua_saude_bucal: string;
  oque_pode_ser_feito_para_melhorar: string;
  crianca_ja_sofreu_algum_tipo_de_traumatismo_na_boca: string;
  tipo_traumatismo: string;
  idade_quando_sofreu_traumatismo: string;
  lesou_tecidos_moles: string;
  procurou_atendimento: string;
  tempo_que_demorou_para_atendimento: string;
  local_do_atendimento: string;
  dentes_afetados: string;
  sangramento_gengival_apos_escovacao: string;
  placa_visivel: string;
  dentes_com_descoloracao_sugestivas_de_traumas: string;
  tecidos_moles: string;
  denticao: string;
  denticao_decidual_tipo_de_arco_superior: string;
  denticao_decidual_tipo_de_arco_inferior: string;
  denticao_decidual_relacao_terminal_de_2_molares_direito: string;
  denticao_decidual_relacao_terminal_de_2_molares_esquerdo: string;
  diastemas_primarias_superior: string;
  diastemas_primarias_inferior: string;
  desticao_mista_molares_direito: string;
  desticao_mista_molares_esquerdo: string;
  desticao_mista_caninos_direito: string;
  desticao_mista_caninos_esquerdo: string;
  desticao_permanente_molares_direito: string;
  desticao_permanente_molares_esquerdo: string;
  desticao_permanente_caninos_direito: string;
  desticao_permanente_caninos_esquerdo: string;
  para_todos_os_tipos_de_denticao_linha_mediana: string;
  para_todos_os_tipos_de_denticao_mordida_aberta_anterior: string;
  cruzamentos: string;
  para_todos_os_tipos_de_denticao_bruxismo: string;
  horario: string;
  para_todos_os_tipos_de_denticao_habitos_nao_nutritivos: string;
  qual_habito: string;
  ate_que_idade: string;
  procedimentos_executados: string;
  dentes?: DentePediatric[];
  problemas_dentes?: DenteProblem[];
};

export const cdisList = [
  "A - Higido",
  "B - Mancha branca",
  "C - Cariado",
  "D - Restaurado com cárie",
  "E - Restaurado sem cárie",
  "F - Extraído por cárie",
  "G - Extraído por qualquer razão",
  "H - Selantes de fissuras",
  "T - Trauma",
  "HC - Hipocalcificado",
  "HP - Hipoplasia",
  "TE - Tratamento endodôntico",
];

export const icdasList = [
  "0 - Nenhuma ou sutil alteração de translucidez do esmalte após secagem por 5s",
  "1 - Opacidade notável após secagem por 5s ou pigmanetação em fóssulas e fissuras",
  "2 - Opacidade notável na presença de humidade ou pigmentação que extrapola fundo de fóssulas e fissuras",
  "3 - Cavitação apenas em esmalte",
  "4 - Sombreamento apenas em dentina subjacente",
  "5 - Cavitação em esmalte com exposição de dentina (até 1/2 da superficie da face analisada)",
  "6 - Cavitação em esmalte com exposição de dentina (mais de 1/2 da superficie da face analisada)",
];

export const dentesList = [
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "51",
  "52",
  "53",
  "54",
  "55",
  "61",
  "62",
  "63",
  "64",
  "65",
  "71",
  "72",
  "73",
  "74",
  "75",
  "81",
  "82",
  "83",
  "84",
  "85",
];
