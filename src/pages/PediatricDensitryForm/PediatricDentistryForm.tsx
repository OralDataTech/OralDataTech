import { Controller, useForm } from "react-hook-form";
import style from "./PediatricDentistryForm.module.css";
import { PediatricDensitrySchema } from "./schema/PediatricDensitrySchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  PediatricDentistryCols,
  PediatricDentistryFields,
  cdisList,
  dentesList,
  icdasList,
} from "./types/PediatricDentistry";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import MoreOptions from "../../global/components/more-options/MoreOptions";
import { useEffect } from "react";
import useLoading from "../../global/hooks/useLoading";
import { LoadingButton } from "@mui/lab";
import usePediatricDentistry from "../../global/hooks/usePediatricDentistry";

export default function PediatricDentistryForm() {
  const { id, idPediatricDentistry } = useParams();
  const { getOneById, updatePediatricDentistry, createPediatricDentistry } =
    usePediatricDentistry();
  const navigate = useNavigate();
  const { loading } = useLoading();

  const {
    formState: { errors },
    control,
    setValue,
    watch,
    handleSubmit,
    getValues,
  } = useForm<PediatricDentistryFields>({
    resolver: yupResolver(PediatricDensitrySchema),
    defaultValues: {
      pai: "",
      mae: "",
      profissao_da_mae: "",
      profissao_do_pai: "",
      escolaridade_do_pai: "",
      escolaridade_da_mae: "",
      agua_encanada: false,
      vive_com: "",
      quem_cuida: "",
      nasceu_com_quantos_meses_gestacao: 0,
      peso_no_nascimento: "",
      quantas_visitas_a_mae_fez_no_pre_natal: "",
      visitou_dentista_durante_a_gravidez: "",
      motivo_visita_durante_a_gravidez: "",
      mamou_no_peito_quantos_meses: "",
      comia_algo_durante_sono_noturno: "",
      ate_que_idade_mamou_durante_o_sono: "",
      quando_comecou_limpar_a_boca_da_crianca: "",
      problemas_alergicos: "",
      medicamentos: "",
      ja_foi_anestesiado: false,
      reacao_a_anestesia: "",
      numero_de_escovacoes_diarias: 0,
      horarios_escovacao_diaria: "",
      desde_quando_essa_escovacao: "",
      quem_escova: "",
      aceita_escovacao: "",
      caso_nao_aceite: "",
      usa_fio_dental_diariamente: "",
      diario_alimentar_ultimas_24h: "",
      come_guloseimas_entre_refeicoes: "",
      como_classifica_a_saude_bucal_do_seu_filho: "",
      historia_de_carie_presente_ou_passado_na_familia: "",
      tem_irmaos: "",
      sabe_como_evitar_a_instalacao_da_doenca_carie_dentaria: "",
      como_classifica_sua_saude_bucal: "",
      o_que_pode_ser_feito_para_melhorar: "",
      crianca_ja_sofreu_algum_tipo_de_traumatismo_na_boca: "",
      tipo_traumatismo: "",
      idade_quando_sofreu_traumatismo: "",
      lesou_tecidos_moles: "",
      procurou_atendimento: "",
      tempo_que_demorou_para_atendimento: "",
      local_do_atendimento: "",
      dentes_afetados: "",
      sangramento_gengival_apos_escovacao: "",
      placa_visivel: "",
      dentes_com_descoloracao_sugestivas_de_traumas: "",
      tecidos_moles: "",
      denticao: "",
      denticao_decidua_tipo_de_arco_superior: "",
      denticao_decidua_tipo_de_arco_inferior: "",
      denticao_decidua_relacao_terminal_de_2_molares_direito: "",
      denticao_decidua_relacao_terminal_de_2_molares_esquerdo: "",
      diastemas_primarios_superior: "",
      diastemas_primarios_inferior: "",
      desticao_mista_molares_direito: "",
      desticao_mista_molares_esquerdo: "",
      desticao_mista_caninos_direito: "",
      desticao_mista_caninos_esquerdo: "",
      desticao_permanente_molares_direito: "",
      desticao_permanente_molares_esquerdo: "",
      desticao_permanente_caninos_direito: "",
      desticao_permanente_caninos_esquerdo: "",
      para_todos_os_tipos_de_denticao_linha_mediana: "",
      para_todos_os_tipos_de_denticao_mordida_aberta_anterior: "",
      cruzamentos: "",
      para_todos_os_tipos_de_denticao_bruxismo: "",
      horario: "",
      para_todos_os_tipos_de_denticao_habitos_nao_nutritivos: "",
      qual_habito: "",
      ate_que_idade: "",
      dentes: [
        {
          cdi: "",
          dente_analisado: "",
          icdas: "",
        },
      ],
      problemas_dentes: [
        {
          dente_com_problema: "",
          problemas: "",
          solucoes: "",
        },
      ],
      procedimentos_executados: "",
      id_medical_record: id,
    },
  });

  console.log(errors);

  useEffect(() => {
    async function getPediatricDentistry() {
      const data = await getOneById(idPediatricDentistry || "");
      const columns: PediatricDentistryCols[] = Object.keys(
        getValues()
      ) as PediatricDentistryCols[];

      for (const column of columns) {
        if (data[column]) setValue(column, data[column]);
      }
    }
    if (idPediatricDentistry) {
      getPediatricDentistry();
    }
  }, []);

  const onSubmit = async (data: PediatricDentistryFields) => {
    let response = null;
    if (idPediatricDentistry) {
      response = await updatePediatricDentistry(idPediatricDentistry, data);
    } else {
      response = await createPediatricDentistry({
        ...data,
        id_medical_record: id,
      });
    }
    if (response) navigate(`/prontuarios/${id}`);
  };

  return (
    <>
      <HeadTitleSection
        title={
          idPediatricDentistry
            ? "Editar Odontopediatria"
            : "Criar Odontopediatria"
        }
        backTo={`/prontuarios/${id}`}
      />
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className={`${style["form-pediatric"]} container`}
      >
        <p>Anamnese</p>
        <Divider />

        <Controller
          name="pai"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Nome do pai"
              variant="filled"
              fullWidth
              error={!!errors.pai}
              helperText={errors.pai?.message}
            />
          )}
        />

        <Controller
          name="profissao_do_pai"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Profissão do pai"
              variant="filled"
              fullWidth
              error={!!errors.profissao_do_pai}
              helperText={errors.profissao_do_pai?.message}
            />
          )}
        />

        <Controller
          name="escolaridade_do_pai"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Escolaridade do pai"
              variant="filled"
              fullWidth
              error={!!errors.escolaridade_do_pai}
              helperText={errors.escolaridade_do_pai?.message}
            />
          )}
        />

        <Controller
          name="mae"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Nome da mãe"
              variant="filled"
              fullWidth
              error={!!errors.mae}
              helperText={errors.mae?.message}
            />
          )}
        />

        <Controller
          name="profissao_da_mae"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Profissão da mãe"
              variant="filled"
              fullWidth
              error={!!errors.profissao_da_mae}
              helperText={errors.profissao_da_mae?.message}
            />
          )}
        />

        <Controller
          name="escolaridade_da_mae"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Escolaridade da mãe"
              variant="filled"
              fullWidth
              error={!!errors.escolaridade_da_mae}
              helperText={errors.escolaridade_da_mae?.message}
            />
          )}
        />

        <Controller
          name="agua_encanada"
          control={control}
          render={({ field }) => (
            <FormControl variant="filled" color="error">
              <InputLabel htmlFor="agua_encanada" color="error">
                Água encanada
              </InputLabel>
              <Select
                {...field}
                color="error"
                label="Água encanada"
                id="agua_encanada"
                variant="filled"
                fullWidth
                error={!!errors.agua_encanada}
              >
                <MenuItem value={"true"}>Água encanada</MenuItem>
                <MenuItem value={"false"}>Água não encanada</MenuItem>
              </Select>
              <small>{errors.agua_encanada?.message}</small>
            </FormControl>
          )}
        />

        <Controller
          name="vive_com"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Vive com quem?"
              variant="filled"
              fullWidth
              error={!!errors.vive_com}
              helperText={errors.vive_com?.message}
            />
          )}
        />

        <Controller
          name="quem_cuida"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Quem cuida?"
              variant="filled"
              fullWidth
              error={!!errors.quem_cuida}
              helperText={errors.quem_cuida?.message}
            />
          )}
        />

        <Controller
          name="nasceu_com_quantos_meses_gestacao"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              type="number"
              label="Nasceu com quandtos messes de gestação?"
              variant="filled"
              fullWidth
              error={!!errors.nasceu_com_quantos_meses_gestacao}
              helperText={errors.nasceu_com_quantos_meses_gestacao?.message}
            />
          )}
        />

        <Controller
          name="peso_no_nascimento"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              type="number"
              label="Peso no nascimento?"
              variant="filled"
              fullWidth
              error={!!errors.peso_no_nascimento}
              helperText={errors.peso_no_nascimento?.message}
            />
          )}
        />

        <Controller
          name="quantas_visitas_a_mae_fez_no_pre_natal"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              type="number"
              label="Quantas visitas a mae fez no pré natal"
              variant="filled"
              fullWidth
              error={!!errors.quantas_visitas_a_mae_fez_no_pre_natal}
              helperText={
                errors.quantas_visitas_a_mae_fez_no_pre_natal?.message
              }
            />
          )}
        />

        <Controller
          name="visitou_dentista_durante_a_gravidez"
          control={control}
          render={({ field }) => (
            <FormControl color="error" variant="filled">
              <InputLabel
                htmlFor="visitou_dentista_durante_a_gravidez"
                id="label-visitou_dentista_durante_a_gravidez"
                color="error"
              >
                Visitou dentista durante a gravidez
              </InputLabel>
              <Select
                {...field}
                color="error"
                id="visitou_dentista_durante_a_gravidez"
                label="Visitou o dentista durante a gravidez?"
                fullWidth
                error={!!errors.visitou_dentista_durante_a_gravidez}
              >
                <MenuItem value={"Sim"}>Sim</MenuItem>
                <MenuItem value={"Não"}>Não</MenuItem>
              </Select>
              <small>
                {errors.visitou_dentista_durante_a_gravidez?.message}
              </small>
            </FormControl>
          )}
        />

        {watch("visitou_dentista_durante_a_gravidez") === "Sim" && (
          <Controller
            name="motivo_visita_durante_a_gravidez"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                color="error"
                label="Motivo da visita durante a gravidez"
                variant="filled"
                fullWidth
                error={!!errors.motivo_visita_durante_a_gravidez}
                helperText={errors.motivo_visita_durante_a_gravidez?.message}
              />
            )}
          />
        )}

        <Controller
          name="mamou_no_peito_quantos_meses"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Mamou no peito quantos meses"
              variant="filled"
              fullWidth
              error={!!errors.mamou_no_peito_quantos_meses}
              helperText={errors.mamou_no_peito_quantos_meses?.message}
            />
          )}
        />

        <Controller
          name="comia_algo_durante_sono_noturno"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Comia algo durante sono noturno"
              variant="filled"
              fullWidth
              error={!!errors.comia_algo_durante_sono_noturno}
              helperText={errors.comia_algo_durante_sono_noturno?.message}
            />
          )}
        />

        <Controller
          name="ate_que_idade_mamou_durante_o_sono"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Até que idade mamou durante o sono"
              variant="filled"
              fullWidth
              error={!!errors.ate_que_idade_mamou_durante_o_sono}
              helperText={errors.ate_que_idade_mamou_durante_o_sono?.message}
            />
          )}
        />

        <Controller
          name="quando_comecou_limpar_a_boca_da_crianca"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Quando comecou limpar a boca da criança"
              variant="filled"
              fullWidth
              error={!!errors.quando_comecou_limpar_a_boca_da_crianca}
              helperText={
                errors.quando_comecou_limpar_a_boca_da_crianca?.message
              }
            />
          )}
        />

        <Controller
          name="problemas_alergicos"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Algum problema alérgico?"
              variant="filled"
              fullWidth
              error={!!errors.problemas_alergicos}
              helperText={errors.problemas_alergicos?.message}
            />
          )}
        />

        <Controller
          name="medicamentos"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Medicamentos?"
              variant="filled"
              fullWidth
              error={!!errors.medicamentos}
              helperText={errors.medicamentos?.message}
            />
          )}
        />

        <Controller
          name="ja_foi_anestesiado"
          control={control}
          render={({ field }) => (
            <FormControl color="error" variant="filled">
              <InputLabel htmlFor="ja_foi_anestesiado" color="error">
                Já foi anestesiado?
              </InputLabel>
              <Select
                {...field}
                color="error"
                label="Já foi anestesiado?"
                fullWidth
                id="ja_foi_anestesiado"
                error={!!errors.ja_foi_anestesiado}
              >
                <MenuItem value={"true"}>Sim</MenuItem>
                <MenuItem value={"false"}>Não</MenuItem>
              </Select>
              <small>{errors.ja_foi_anestesiado?.message}</small>
            </FormControl>
          )}
        />

        <Controller
          name="reacao_a_anestesia"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Reação a anestesia?"
              variant="filled"
              fullWidth
              error={!!errors.reacao_a_anestesia}
              helperText={errors.reacao_a_anestesia?.message}
            />
          )}
        />

        <Controller
          name="numero_de_escovacoes_diarias"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Numero de escovações diárias?"
              variant="filled"
              type="number"
              fullWidth
              error={!!errors.numero_de_escovacoes_diarias}
              helperText={errors.numero_de_escovacoes_diarias?.message}
            />
          )}
        />

        <Controller
          name="horarios_escovacao_diaria"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Horários de escovação diária?"
              variant="filled"
              fullWidth
              error={!!errors.horarios_escovacao_diaria}
              helperText={errors.horarios_escovacao_diaria?.message}
            />
          )}
        />

        <Controller
          name="desde_quando_essa_escovacao"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Desde quando essa escovação?"
              variant="filled"
              fullWidth
              error={!!errors.desde_quando_essa_escovacao}
              helperText={errors.desde_quando_essa_escovacao?.message}
            />
          )}
        />

        <Controller
          name="quem_escova"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Quem escova?"
              variant="filled"
              fullWidth
              error={!!errors.quem_escova}
              helperText={errors.quem_escova?.message}
            />
          )}
        />

        <Controller
          name="aceita_escovacao"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Aceita a escovação?"
              variant="filled"
              fullWidth
              error={!!errors.aceita_escovacao}
              helperText={errors.aceita_escovacao?.message}
            />
          )}
        />

        <Controller
          name="caso_nao_aceite"
          control={control}
          render={({ field }) => (
            <FormControl color="error" variant="filled">
              <InputLabel htmlFor="caso_nao_aceite" color="error">
                Caso não aceite?
              </InputLabel>
              <Select
                {...field}
                color="error"
                label="Caso não aceite?"
                variant="filled"
                id="caso_nao_aceite"
                fullWidth
                error={!!errors.caso_nao_aceite}
              >
                <MenuItem value={"Insiste"}>Insiste</MenuItem>
                <MenuItem value={"Desiste"}>Desiste</MenuItem>
              </Select>
              <small>{errors.caso_nao_aceite?.message}</small>
            </FormControl>
          )}
        />

        <Controller
          name="usa_fio_dental_diariamente"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Usa fio dental diariamente?"
              variant="filled"
              fullWidth
              error={!!errors.usa_fio_dental_diariamente}
              helperText={errors.usa_fio_dental_diariamente?.message}
            />
          )}
        />

        <Controller
          name="diario_alimentar_ultimas_24h"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Diário alimentar nas últimas 24h?"
              variant="filled"
              fullWidth
              error={!!errors.diario_alimentar_ultimas_24h}
              helperText={errors.diario_alimentar_ultimas_24h?.message}
            />
          )}
        />

        <Controller
          name="come_guloseimas_entre_refeicoes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Come guloseimas entre refeições?"
              variant="filled"
              fullWidth
              error={!!errors.come_guloseimas_entre_refeicoes}
              helperText={errors.come_guloseimas_entre_refeicoes?.message}
            />
          )}
        />

        <Controller
          name="como_classifica_a_saude_bucal_do_seu_filho"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Como classifica a saúde bucal do seu filho?"
              variant="filled"
              fullWidth
              error={!!errors.como_classifica_a_saude_bucal_do_seu_filho}
              helperText={
                errors.como_classifica_a_saude_bucal_do_seu_filho?.message
              }
            />
          )}
        />

        <Controller
          name="historia_de_carie_presente_ou_passado_na_familia"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="História de cárie presente ou passado na familia?"
              variant="filled"
              fullWidth
              error={!!errors.historia_de_carie_presente_ou_passado_na_familia}
              helperText={
                errors.historia_de_carie_presente_ou_passado_na_familia?.message
              }
            />
          )}
        />

        <Controller
          name="tem_irmaos"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Quantidade de irmãos?"
              variant="filled"
              fullWidth
              error={!!errors.tem_irmaos}
              helperText={errors.tem_irmaos?.message}
            />
          )}
        />

        <Controller
          name="sabe_como_evitar_a_instalacao_da_doenca_carie_dentaria"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Sabe como evitar a instalação da doença cárie dentária?"
              variant="filled"
              fullWidth
              error={
                !!errors.sabe_como_evitar_a_instalacao_da_doenca_carie_dentaria
              }
              helperText={
                errors.sabe_como_evitar_a_instalacao_da_doenca_carie_dentaria
                  ?.message
              }
            />
          )}
        />

        <Controller
          name="como_classifica_sua_saude_bucal"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Como classifica sua saúde bucal?"
              variant="filled"
              fullWidth
              error={!!errors.como_classifica_sua_saude_bucal}
              helperText={errors.como_classifica_sua_saude_bucal?.message}
            />
          )}
        />

        <Controller
          name="o_que_pode_ser_feito_para_melhorar"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="O que pode ser feito para melhorar?"
              variant="filled"
              fullWidth
              error={!!errors.o_que_pode_ser_feito_para_melhorar}
              helperText={errors.o_que_pode_ser_feito_para_melhorar?.message}
            />
          )}
        />

        <p>Sobre traumatismo buco-dentários</p>
        <Divider />

        <Controller
          name="crianca_ja_sofreu_algum_tipo_de_traumatismo_na_boca"
          control={control}
          render={({ field }) => (
            <FormControl color="error" variant="filled">
              <InputLabel
                htmlFor="crianca_ja_sofreu_algum_tipo_de_traumatismo_na_boca"
                color="error"
              >
                A criança já sofreu algum tipo de traumatismo na boca
              </InputLabel>
              <Select
                {...field}
                color="error"
                label="A criança já sofreu algum tipo de traumatismo na boca"
                id="crianca_ja_sofreu_algum_tipo_de_traumatismo_na_boca"
                fullWidth
                error={
                  !!errors.crianca_ja_sofreu_algum_tipo_de_traumatismo_na_boca
                }
              >
                <MenuItem value={"Sim"}>Sim</MenuItem>
                <MenuItem value={"Não"}>Não</MenuItem>
              </Select>
              <small>
                {
                  errors.crianca_ja_sofreu_algum_tipo_de_traumatismo_na_boca
                    ?.message
                }
              </small>
            </FormControl>
          )}
        />

        <Controller
          name="tipo_traumatismo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Tipo do traumatismo"
              variant="filled"
              fullWidth
              error={!!errors.tipo_traumatismo}
              helperText={errors.tipo_traumatismo?.message}
            />
          )}
        />

        <Controller
          name="idade_quando_sofreu_traumatismo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Idade quando sofreu traumatismo"
              variant="filled"
              fullWidth
              error={!!errors.idade_quando_sofreu_traumatismo}
              helperText={errors.idade_quando_sofreu_traumatismo?.message}
            />
          )}
        />

        <Controller
          name="lesou_tecidos_moles"
          control={control}
          render={({ field }) => (
            <FormControl color="error" variant="filled">
              <InputLabel htmlFor="lesou_tecidos_moles" color="error">
                Lesou tecidos moles
              </InputLabel>
              <Select
                {...field}
                color="error"
                label="Lesou tecidos moles"
                id="lesou_tecidos_moles"
                fullWidth
                error={!!errors.lesou_tecidos_moles}
              >
                <MenuItem value={"Sim"}>Sim</MenuItem>
                <MenuItem value={"Não"}>Não</MenuItem>
              </Select>
              <small>{errors.lesou_tecidos_moles?.message}</small>
            </FormControl>
          )}
        />

        <Controller
          name="procurou_atendimento"
          control={control}
          render={({ field }) => (
            <FormControl color="error" variant="filled">
              <InputLabel htmlFor="procurou_atendimento" color="error">
                Procurou atendimento?
              </InputLabel>
              <Select
                {...field}
                color="error"
                label="Procurou atendimento?"
                variant="filled"
                id="procurou_atendimento"
                fullWidth
                error={!!errors.procurou_atendimento}
              >
                <MenuItem value={"Sim"}>Sim</MenuItem>
                <MenuItem value={"Não"}>Não</MenuItem>
              </Select>
              <small>{errors.procurou_atendimento?.message}</small>
            </FormControl>
          )}
        />

        <Controller
          name="tempo_que_demorou_para_atendimento"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Tempo que demorou para atendimento?"
              variant="filled"
              fullWidth
              error={!!errors.tempo_que_demorou_para_atendimento}
              helperText={errors.tempo_que_demorou_para_atendimento?.message}
            />
          )}
        />

        <Controller
          name="local_do_atendimento"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Local do Atendimento"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.local_do_atendimento}
              helperText={errors.local_do_atendimento?.message}
            />
          )}
        />

        <Controller
          name="dentes_afetados"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentes Afetados"
              color="error"
              variant="filled"
              fullWidth
              error={!!errors.dentes_afetados}
              helperText={errors.dentes_afetados?.message}
            />
          )}
        />

        <p>Exame Clínico</p>
        <Divider />

        <Controller
          name="sangramento_gengival_apos_escovacao"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Sangramento Gengival Após Escovação"
              variant="filled"
              fullWidth
              color="error"
              error={!!errors.sangramento_gengival_apos_escovacao}
              helperText={errors.sangramento_gengival_apos_escovacao?.message}
            />
          )}
        />

        <Controller
          name="placa_visivel"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Placa Visível"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.placa_visivel}
              helperText={errors.placa_visivel?.message}
            />
          )}
        />

        <Controller
          name="dentes_com_descoloracao_sugestivas_de_traumas"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentes com Descoloração Sugestivas de Traumas"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.dentes_com_descoloracao_sugestivas_de_traumas}
              helperText={
                errors.dentes_com_descoloracao_sugestivas_de_traumas?.message
              }
            />
          )}
        />

        <Controller
          name="tecidos_moles"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Tecidos Moles"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.tecidos_moles}
              helperText={errors.tecidos_moles?.message}
            />
          )}
        />

        <Controller
          name="denticao"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentição"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.denticao}
              helperText={errors.denticao?.message}
            />
          )}
        />

        <Controller
          name="denticao_decidua_tipo_de_arco_superior"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentição Decidua - Tipo de Arco Superior"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.denticao_decidua_tipo_de_arco_superior}
              helperText={
                errors.denticao_decidua_tipo_de_arco_superior?.message
              }
            />
          )}
        />

        <Controller
          name="denticao_decidua_tipo_de_arco_inferior"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentição Decidua - Tipo de Arco Inferior"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.denticao_decidua_tipo_de_arco_inferior}
              helperText={
                errors.denticao_decidua_tipo_de_arco_inferior?.message
              }
            />
          )}
        />

        <Controller
          name="denticao_decidua_relacao_terminal_de_2_molares_direito"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentição Decidua - Relação Terminal de 2 Molares Direito"
              variant="filled"
              color="error"
              fullWidth
              error={
                !!errors.denticao_decidua_relacao_terminal_de_2_molares_direito
              }
              helperText={
                errors.denticao_decidua_relacao_terminal_de_2_molares_direito
                  ?.message
              }
            />
          )}
        />

        <Controller
          name="denticao_decidua_relacao_terminal_de_2_molares_esquerdo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentição Decidua - Relação Terminal de 2 Molares Esquerdo"
              variant="filled"
              color="error"
              fullWidth
              error={
                !!errors.denticao_decidua_relacao_terminal_de_2_molares_esquerdo
              }
              helperText={
                errors.denticao_decidua_relacao_terminal_de_2_molares_esquerdo
                  ?.message
              }
            />
          )}
        />

        <Controller
          name="diastemas_primarios_superior"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Diastemas Primários Superior"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.diastemas_primarios_superior}
              helperText={errors.diastemas_primarios_superior?.message}
            />
          )}
        />

        <Controller
          name="diastemas_primarios_inferior"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Diastemas Primários Inferior"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.diastemas_primarios_inferior}
              helperText={errors.diastemas_primarios_inferior?.message}
            />
          )}
        />

        <Controller
          name="desticao_mista_molares_direito"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentição Mista - Molares Direito"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.desticao_mista_molares_direito}
              helperText={errors.desticao_mista_molares_direito?.message}
            />
          )}
        />

        <Controller
          name="desticao_mista_molares_esquerdo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentição Mista - Molares Esquerdo"
              color="error"
              variant="filled"
              fullWidth
              error={!!errors.desticao_mista_molares_esquerdo}
              helperText={errors.desticao_mista_molares_esquerdo?.message}
            />
          )}
        />

        <Controller
          name="desticao_mista_caninos_direito"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentição Mista - Caninos Direito"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.desticao_mista_caninos_direito}
              helperText={errors.desticao_mista_caninos_direito?.message}
            />
          )}
        />

        <Controller
          name="desticao_mista_caninos_esquerdo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentição Mista - Caninos Esquerdo"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.desticao_mista_caninos_esquerdo}
              helperText={errors.desticao_mista_caninos_esquerdo?.message}
            />
          )}
        />

        <Controller
          name="desticao_permanente_molares_direito"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentição Permanente - Molares Direito"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.desticao_permanente_molares_direito}
              helperText={errors.desticao_permanente_molares_direito?.message}
            />
          )}
        />

        <Controller
          name="desticao_permanente_molares_esquerdo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentição Permanente - Molares Esquerdo"
              color="error"
              variant="filled"
              fullWidth
              error={!!errors.desticao_permanente_molares_esquerdo}
              helperText={errors.desticao_permanente_molares_esquerdo?.message}
            />
          )}
        />

        <Controller
          name="desticao_permanente_caninos_direito"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentição Permanente - Caninos Direito"
              color="error"
              variant="filled"
              fullWidth
              error={!!errors.desticao_permanente_caninos_direito}
              helperText={errors.desticao_permanente_caninos_direito?.message}
            />
          )}
        />

        <Controller
          name="desticao_permanente_caninos_esquerdo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dentição Permanente - Caninos Esquerdo"
              color="error"
              variant="filled"
              fullWidth
              error={!!errors.desticao_permanente_caninos_esquerdo}
              helperText={errors.desticao_permanente_caninos_esquerdo?.message}
            />
          )}
        />

        <Controller
          name="para_todos_os_tipos_de_denticao_linha_mediana"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Para Todos os Tipos de Dentição - Linha Mediana"
              color="error"
              variant="filled"
              fullWidth
              error={!!errors.para_todos_os_tipos_de_denticao_linha_mediana}
              helperText={
                errors.para_todos_os_tipos_de_denticao_linha_mediana?.message
              }
            />
          )}
        />

        <Controller
          name="para_todos_os_tipos_de_denticao_mordida_aberta_anterior"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Para Todos os Tipos de Dentição - Mordida Aberta Anterior"
              color="error"
              variant="filled"
              fullWidth
              error={
                !!errors.para_todos_os_tipos_de_denticao_mordida_aberta_anterior
              }
              helperText={
                errors.para_todos_os_tipos_de_denticao_mordida_aberta_anterior
                  ?.message
              }
            />
          )}
        />

        <Controller
          name="cruzamentos"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Cruzamentos"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.cruzamentos}
              helperText={errors.cruzamentos?.message}
            />
          )}
        />

        <Controller
          name="para_todos_os_tipos_de_denticao_bruxismo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Para Todos os Tipos de Dentição - Bruxismo"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.para_todos_os_tipos_de_denticao_bruxismo}
              helperText={
                errors.para_todos_os_tipos_de_denticao_bruxismo?.message
              }
            />
          )}
        />

        <Controller
          name="horario"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Horário"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.horario}
              helperText={errors.horario?.message}
            />
          )}
        />

        <Controller
          name="para_todos_os_tipos_de_denticao_habitos_nao_nutritivos"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Para Todos os Tipos de Dentição - Hábitos Não Nutritivos"
              variant="filled"
              color="error"
              fullWidth
              error={
                !!errors.para_todos_os_tipos_de_denticao_habitos_nao_nutritivos
              }
              helperText={
                errors.para_todos_os_tipos_de_denticao_habitos_nao_nutritivos
                  ?.message
              }
            />
          )}
        />

        <Controller
          name="qual_habito"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Qual Hábito"
              variant="filled"
              fullWidth
              color="error"
              error={!!errors.qual_habito}
              helperText={errors.qual_habito?.message}
            />
          )}
        />

        <Controller
          name="ate_que_idade"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Até que Idade"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.ate_que_idade}
              helperText={errors.ate_que_idade?.message}
            />
          )}
        />

        <Controller
          name="procedimentos_executados"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Procedimentos Executados"
              variant="filled"
              color="error"
              fullWidth
              error={!!errors.procedimentos_executados}
              helperText={errors.procedimentos_executados?.message}
            />
          )}
        />

        <p>Problemas dentários encontrados</p>
        <Divider />

        {watch("dentes") &&
          watch("dentes")?.map((_, index) => (
            <Box className={style["box-dente"]} key={index}>
              <MoreOptions
                sx={{
                  position: "absolute",
                  right: 0,
                  color: "var(--primary)",
                }}
                options={[
                  {
                    action: () => {
                      setValue(
                        "dentes",
                        watch("dentes")?.filter((_, i) => i !== index)
                      );
                    },
                    isLink: false,
                    name: "Remover",
                  },
                ]}
              />
              <Controller
                name={`dentes.${index}.dente_analisado`}
                control={control}
                render={({ field }) => (
                  <FormControl color="error" variant="filled">
                    <InputLabel htmlFor="dente_analisado" color="error">
                      Dente analisado
                    </InputLabel>
                    <Select
                      {...field}
                      color="error"
                      label="Dente analisado"
                      id="dente_analisado"
                      fullWidth
                      error={!!errors.dentes?.[index]?.dente_analisado}
                    >
                      {dentesList?.map((dente) => (
                        <MenuItem key={dente} value={dente}>
                          {dente}
                        </MenuItem>
                      ))}
                    </Select>
                    <small>
                      {errors.dentes?.[index]?.dente_analisado?.message}
                    </small>
                  </FormControl>
                )}
              />
              <FormControl className={style["form-control-dente"]}>
                <Controller
                  name={`dentes.${index}.cdi`}
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      sx={{ minWidth: "100%" }}
                      color="error"
                      variant="filled"
                    >
                      <InputLabel htmlFor="cdi" color="error">
                        CDI
                      </InputLabel>
                      <Select
                        {...field}
                        color="error"
                        label="CDI"
                        variant="filled"
                        id="cdi"
                        fullWidth
                        error={!!errors.dentes?.[index]?.cdi}
                      >
                        {cdisList?.map((cdi) => (
                          <MenuItem key={cdi} value={cdi}>
                            {cdi}
                          </MenuItem>
                        ))}
                      </Select>

                      <small>{errors.dentes?.[index]?.cdi?.message}</small>
                    </FormControl>
                  )}
                />
                <Controller
                  name={`dentes.${index}.icdas`}
                  control={control}
                  render={({ field }) => (
                    <FormControl sx={{ minWidth: "100%" }}>
                      <InputLabel htmlFor={`${index} - icdas`} color="error">
                        ICDAS
                      </InputLabel>
                      <Select
                        {...field}
                        color="error"
                        label="ICDAS"
                        variant="filled"
                        id={`${index} - icdas`}
                        fullWidth
                        error={!!errors.dentes?.[index]?.icdas}
                      >
                        {icdasList?.map((icda) => (
                          <MenuItem key={icda} value={icda}>
                            {icda}
                          </MenuItem>
                        ))}
                      </Select>
                      <small>{errors.dentes?.[index]?.icdas?.message}</small>
                    </FormControl>
                  )}
                />
              </FormControl>
            </Box>
          ))}

        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setValue("dentes", [
              ...(watch("dentes") || []),
              {
                cdi: "",
                dente_analisado: "",
                icdas: "",
              },
            ]);
          }}
        >
          Adicionar dente analisado
        </Button>

        <p>Problemas Dentários Encontrados</p>
        <Divider />

        {watch("problemas_dentes") &&
          watch("problemas_dentes")?.map((_, index) => (
            <Box className={style["box-dente"]} key={index}>
              <MoreOptions
                sx={{
                  position: "absolute",
                  right: 0,
                  color: "var(--primary)",
                }}
                options={[
                  {
                    action: () => {
                      setValue(
                        "problemas_dentes",
                        watch("problemas_dentes")?.filter((_, i) => i !== index)
                      );
                    },
                    isLink: false,
                    name: "Remover",
                  },
                ]}
              />
              <Controller
                name={`problemas_dentes.${index}.dente_com_problema`}
                control={control}
                render={({ field }) => (
                  <FormControl color="error" variant="filled">
                    <InputLabel
                      htmlFor={`${index}-dente_com_problema`}
                      color="error"
                    >
                      Dente com problema
                    </InputLabel>
                    <Select
                      {...field}
                      color="error"
                      label="Dente com problema"
                      id={`${index}-dente_com_problema`}
                      fullWidth
                      error={
                        !!errors.problemas_dentes?.[index]?.dente_com_problema
                      }
                    >
                      {dentesList?.map((dente) => (
                        <MenuItem key={dente} value={dente}>
                          {dente}
                        </MenuItem>
                      ))}
                    </Select>
                    <small>
                      {
                        errors.problemas_dentes?.[index]?.dente_com_problema
                          ?.message
                      }
                    </small>
                  </FormControl>
                )}
              />
              <FormControl className={style["form-control-dente"]}>
                <Controller
                  name={`problemas_dentes.${index}.problemas`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="error"
                      label="Problemas"
                      variant="filled"
                      fullWidth
                      error={!!errors.problemas_dentes?.[index]?.problemas}
                      helperText={
                        errors.problemas_dentes?.[index]?.problemas?.message
                      }
                    />
                  )}
                />
                <Controller
                  name={`problemas_dentes.${index}.solucoes`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="error"
                      label="Soluções"
                      variant="filled"
                      fullWidth
                      error={!!errors.problemas_dentes?.[index]?.solucoes}
                      helperText={
                        errors.problemas_dentes?.[index]?.solucoes?.message
                      }
                    />
                  )}
                />
              </FormControl>
            </Box>
          ))}

        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setValue("problemas_dentes", [
              ...(watch("problemas_dentes") || []),
              {
                dente_com_problema: "",
                problemas: "",
                solucoes: "",
              },
            ]);
          }}
        >
          Adicionar Problema
        </Button>

        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          gap={1}
          alignItems={"center"}
        >
          <Link to={`/prontuarios/${id}`}>
            <LoadingButton loading={loading} color="error">
              Voltar
            </LoadingButton>
          </Link>
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            color="error"
          >
            Salvar
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
}
