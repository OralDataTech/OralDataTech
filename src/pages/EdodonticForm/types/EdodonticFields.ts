export type EdodonticFields = {
  id_medical_record?: string;
  queixa_principal: string;
  sede: string;
  aparecimento: string;
  duracao: string;
  frequencia: string;
  intensidade: string;
  inspecao_dente: string;
  regiao_dente: string;
  estrutura_dentaria: string;
  edema_local: string;
  coloracao_dentaria: string;
  coloracao_tecidual: string;
  fistula: string;
  palpacao_coronaria: string;
  palpacao_periapical: string;
  palpacao_edema: string;
  palpacao_mobilidade: string;
  canal_radicular: string;
  percussao_vertical: string;
  percussao_horizontal: string;
  sensibilidade_pulpar_frio: string;
  sensibilidade_pulpar_calor: string;
  sensibilidade_pulpar_teste_mecanico: string;
  sensibilidade_pulpar_teste_anestesia: string;
  observacoes: string;
  camara_pulpar: string;
  regiao_periapical: string;
  patologia_pulpar: string;
  patologia_periapical: string;
  plano_tratamento: string;
  instrumentacao_tecnica: string;
  dentes?: Dente[];
  obturacao_tecnica: string;
  obturacao_cimento: string;
  obturacao_restaurador_provisorio: string;
};

export type EdodonticUpdateFields = {
  queixa_principal: string;
  sede: string;
  aparecimento: string;
  duracao: string;
  frequencia: string;
  intensidade: string;
  inspecao_dente: string;
  regiao_dente: string;
  estrutura_dentaria: string;
  edema_local: string;
  coloracao_dentaria: string;
  coloracao_tecidual: string;
  fistula: string;
  palpacao_coronaria: string;
  palpacao_periapical: string;
  palpacao_edema: string;
  palpacao_mobilidade: string;
  canal_radicular: string;
  percussao_vertical: string;
  percussao_horizontal: string;
  sensibilidade_pulpar_frio: string;
  sensibilidade_pulpar_calor: string;
  sensibilidade_pulpar_teste_mecanico: string;
  sensibilidade_pulpar_teste_anestesia: string;
  observacoes: string;
  camara_pulpar: string;
  regiao_periapical: string;
  patologia_pulpar: string;
  patologia_periapical: string;
  plano_tratamento: string;
  instrumentacao_tecnica: string;
  dentes?: Dente[];
  obturacao_tecnica: string;
  obturacao_cimento: string;
  obturacao_restaurador_provisorio: string;
};

export type Dente = {
  dente?: string;
  referencia?: string;
  ctp?: string;
  crd?: string;
  crt?: string;
  iai?: string;
  iaf?: string;
  cad?: string;
  im?: string;
  visto_professor?: string;
};
