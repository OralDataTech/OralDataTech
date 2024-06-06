export type RiskAssessmentFields = {
  id_medical_record: string;
  responsavel: string;
  risco_de_carie_preencher: boolean;
  risco_de_carie_fator?: string;
  risco_de_carie_biofilme?: string;
  risco_de_carie?: number;
  risco_de_carie_anotacoes?: string;
  risco_de_carie_avaliacao?: string;
  risco_periodontal_preencher: boolean;
  risco_periodontal_codigo?: string;
  risco_periodontal_classificacao?: string;
  risco_periodontal_anotacoes?: string;
  risco_periodontal_avaliacao?: string;
  tem_risco_tecidos_moles: boolean;
  risco_tecidos_moles_codigo?: string;
  risco_tecidos_moles_classificacao?: string;
  risco_tecidos_moles_anotacoes?: string;
  risco_tecidos_moles_avaliacao?: string;
  necessidade_de_protese_preencher: boolean;
  uso_de_protese_superior_dimensoes?: string;
  uso_de_protese_superior_codigos?: string;
  uso_de_protese_superior_criterios?: string;
  uso_de_protese_inferior_dimensoes?: string;
  uso_de_protese_inferior_codigos?: string;
  uso_de_protese_inferior_criterios?: string;
  necessidade_de_protese_anotacoes?: string;
  necessidade_de_protese_avaliacao?: string;
  risco_familiar_preencher: boolean;
  risco_familiar_escores?: RiskAssessmentEscores[];
  risco_familiar_anotacoes?: string;
  risco_familiar_avaliacao?: string;
  risco_de_carie_encaminhamento?: string;
  risco_periodontal_criterio?: string;
  risco_tecidos_moles_criterio?: string;
};

export type RiskAssessmentFieldsSelect = {
  id_medical_record: string;
  responsavel: string;
  risco_de_carie_preencher: boolean;
  risco_de_carie_fator?: string;
  risco_de_carie_biofilme?: string;
  risco_de_carie?: number;
  risco_de_carie_anotacoes?: string;
  risco_de_carie_avaliacao?: string;
  risco_periodontal_preencher: boolean;
  risco_periodontal_codigo?: string;
  risco_periodontal_classificacao?: string;
  risco_periodontal_anotacoes?: string;
  risco_periodontal_avaliacao?: string;
  tem_risco_tecidos_moles: boolean;
  risco_tecidos_moles_codigo?: string;
  risco_tecidos_moles_classificacao?: string;
  risco_tecidos_moles_anotacoes?: string;
  risco_tecidos_moles_avaliacao?: string;
  necessidade_de_protese_preencher: boolean;
  uso_de_protese_superior_dimensoes?: string;
  uso_de_protese_superior_codigos?: string;
  uso_de_protese_superior_criterios?: string;
  uso_de_protese_inferior_dimensoes?: string;
  uso_de_protese_inferior_codigos?: string;
  uso_de_protese_inferior_criterios?: string;
  necessidade_de_protese_anotacoes?: string;
  necessidade_de_protese_avaliacao?: string;
  risco_familiar_preencher: boolean;
  risco_familiar_escores?: string[];
  risco_familiar_anotacoes?: string;
  risco_familiar_avaliacao?: string;
  risco_de_carie_encaminhamento?: string;
  risco_periodontal_criterio?: string;
  risco_tecidos_moles_criterio?: string;
  local_da_atividade?: string;
  necessidade_de_ART?: boolean;
  ART_realizada?: boolean;
  quantas_ARTs_foram_realizadas?: number;
};

export type RiskAssessmentEscores = {
  nome: string;
  escore: number;
};

export const locais_atividades = [
  "Creche/Escola",
  "CAPS",
  "CRAS/CREAS",
  "ILP/Abrigo",
  "5VD",
  "Outro",
];

export const caries_fatores = [
  "A - Sem histórico de cárie, somente hígidos",
  "B - Presença de restauração",
  "C - Cárie crônica / restauração provisória",
  "D - Mancha branca ativa",
  "E - Lesão Classe I de black, sem compromentimento pulpar",
  "F - Lesão Classe II, III, IV, V, sem compromentimento pulpar",
  "G - Compromentimento pulpar ou periapical: dor, pulpite, abcesso, foco residual",
];

export const encaminhamentos = [
  "Promoção / Educação",
  "Promoção / Educação / Fluor tópico ",
  "Promoção / Educação / Fluor tópico / ART",
  "Promoção / Educação / Fluor tópico / Selante / Trat. Restaurador Convencional TRC",
  "Promoção / Educação / Fluor tópico / Selante / Urgência ** / Trat. Restaurador Convencional TRC",
];

export const caries_biofilme = ["-", "+", "+OU-"];

export const caries_risco = [0, 1, 2];

export const periodontal_codigo = ["0", "X", "1", "2", "6", "8", "B"];

export const periodontal_classificacao = [
  "Baixo risco",
  "Risco moderado",
  "Alto risco",
];

export const periodontal_criterios = [
  "Elemento com periodonto sadio",
  "Ausência de dentes no sextante",
  "Elemento com gengivite",
  "Elemento com cálculo supra gengival",
  "Sequela de doença periodontal anterior",
  "Elemento com cálculo subgengival (visível pelo afastamento/retração gengival) e com mobilidade reversível ou sem mobilidade",
  "Elemento com mobilidade irreversível e perda de função",
];

export const tecidos_moles_codigo = ["0", "1", "2"];

export const tecidos_moles_classificacao = [
  "Baixo risco",
  "Risco moderado",
  "Alto risco",
];

export const tecidos_moles_criterios = [
  "Tecidos normais",
  "Alterações sem suspeita de malignidade, não contemplamos no código 2",
  "Alterações com suspeita de malignidade. Úlceras com mais de 15 dias de evolução, com sintologia dolorosa ou não, bordas elevadas ou não; lesões brancas e negras com áreas ulceradas; lesões vermelhas com limites bem definidos, sugerindo eritoplastia; nódulos de crescimento rápido com áreas ulceradas.",
];

export const proteses_cod = ["0", "1", "2", "3", "4", "5", "9"];

export const proteses_dimensoes = ["Uso de prótese", "Necessidade de prótese"];

export const proteses_criterios = [
  "Não usa prótese dentária",
  "Usa uma ou mais pontes fixas",
  "Usa prótese parcial removível",
  "Usa uma ponte fixa e prótese parcial removível",
  "Usa prótese dentária total removível",
  "Usa prótese dentária total fixa (sobredentadura)",
  "Sem Informação",

  "Não necessita prótese dentária",
  "Necessita de uma prótese, fixa ou removível, para substituição de um elemento",
  "Necessita de uma prótese, fixa ou removível, para substituição de mais de um elemento",
  "Necessita uma combinação de próteses, fixas e/ou removíveis, para substituição de um e/ou mais elementos(s)",
  "Necessita de protese dentária total",
  "Sem informação",
];

export const escores: RiskAssessmentEscores[] = [
  {
    nome: "Acamado",
    escore: 3,
  },
  {
    nome: "Deficiência física",
    escore: 3,
  },
  {
    nome: "Deficiência mental",
    escore: 3,
  },
  {
    nome: "Baixas condições de saneamento e/ou higiene",
    escore: 3,
  },
  {
    nome: "Risco para desnutrição >P10",
    escore: 2,
  },
  {
    nome: "Uso de drogas lícitas e ilicitas",
    escore: 2,
  },
  {
    nome: "Desemprego",
    escore: 2,
  },
  {
    nome: "Doença crônica",
    escore: 2,
  },
  {
    nome: "Violência familiar",
    escore: 2,
  },
  {
    nome: "Analfabetismo",
    escore: 1,
  },
  {
    nome: "Menor de um ano",
    escore: 1,
  },
  {
    nome: "Maior de setenta anos",
    escore: 1,
  },
  {
    nome: "Relação morador/cômodo",
    escore: 1,
  },
];
