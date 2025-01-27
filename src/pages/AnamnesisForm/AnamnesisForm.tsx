import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import style from "./AnamnesisForm.module.css";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AnamnesisFields } from "./types/AnamnesisFields";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnamnesisSchema } from "./schemas/AnamnesisSchema";
import useAnamnesis from "../../global/hooks/useAnamnesis";
import useLoading from "../../global/hooks/useLoading";
import { LoadingButton } from "@mui/lab";

export default function AnamnesisForm() {
  const { id, idAnamnesis } = useParams();
  const { createAnamnesis, getOneById, updateAnamnesis } = useAnamnesis();
  const navigate = useNavigate();
  const { loading } = useLoading();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<AnamnesisFields>({
    resolver: yupResolver(AnamnesisSchema),
    defaultValues: {
      alguma_outra_doenca: "",
      enfermidades_nao_mencionadas: "",
      motivo_consulta: "",
      nome_medico: "",
      quais_medicacoes: "",
      quais_operacoes: "",
      queixa_principal_doenca_atual: "",
      sofre_quais_doencas: "Nenhuma",
      ultima_visita_ao_dentista: new Date().toISOString().split("T")[0],
      telefone_medico: "",
      qual_diabete_cancer_tuberculose_familia: "Nenhum",
      alguma_diabete_cancer_tuberculose_familia: false,
      alteracoes_de_sangue: false,
      asmatico: false,
      bebidas_alcoolicas: false,
      diabetico: false,
      dst: false,
      epileptico: false,
      esta_em_tratamento: false,
      esta_fazendo_uso_medicacao: false,
      fuma_tabaco_rape: false,
      gravidez: false,
      ja_foi_operado: false,
      pes_e_pernas_inchados: false,
      problemas_com_anestesia: false,
      problemas_com_cicatrizacao: false,
      problemas_seios_maxilares_frontal_etc: false,
      sente_muita_sede: false,
      sofre_alguma_doenca: false,
      alguma_alergia: false,
      quais_alergias: "",
    },
  });

  const onSubmit = async (data: AnamnesisFields) => {
    let response = null;
    if (idAnamnesis) {
      response = await updateAnamnesis(idAnamnesis, data);
    } else {
      response = await createAnamnesis({
        ...data,
        id_medical_record: id,
      });
    }
    if (response) {
      navigate(`/prontuarios/${id}`);
    }
  };

  useEffect(() => {
    async function fetchAnamnesis() {
      const data = await getOneById(idAnamnesis || "");
      setValue(
        "alguma_diabete_cancer_tuberculose_familia",
        data.alguma_diabete_cancer_tuberculose_familia
      );
      setValue(
        "qual_diabete_cancer_tuberculose_familia",
        data.qual_diabete_cancer_tuberculose_familia
      );

      setValue("alteracoes_de_sangue", data.alteracoes_de_sangue);
      setValue("asmatico", data.asmatico);
      setValue("bebidas_alcoolicas", data.bebidas_alcoolicas);
      setValue("diabetico", data.diabetico);
      setValue("dst", data.dst);
      setValue("epileptico", data.epileptico);
      setValue("esta_em_tratamento", data.esta_em_tratamento);
      setValue("esta_fazendo_uso_medicacao", data.esta_fazendo_uso_medicacao);
      setValue("fuma_tabaco_rape", data.fuma_tabaco_rape);
      setValue("gravidez", data.gravidez);
      setValue("ja_foi_operado", data.ja_foi_operado);
      setValue("motivo_consulta", data.motivo_consulta);
      setValue("nome_medico", data.nome_medico);
      setValue("pes_e_pernas_inchados", data.pes_e_pernas_inchados);
      setValue("problemas_com_anestesia", data.problemas_com_anestesia);
      setValue("problemas_com_cicatrizacao", data.problemas_com_cicatrizacao);
      setValue(
        "problemas_seios_maxilares_frontal_etc",
        data.problemas_seios_maxilares_frontal_etc
      );
      setValue("quais_medicacoes", data.quais_medicacoes);
      setValue("quais_operacoes", data.quais_operacoes);
      setValue(
        "queixa_principal_doenca_atual",
        data.queixa_principal_doenca_atual
      );
      setValue("sente_muita_sede", data.sente_muita_sede);
      setValue("sofre_alguma_doenca", data.sofre_alguma_doenca);
      setValue("sofre_quais_doencas", data.sofre_quais_doencas);
      setValue(
        "ultima_visita_ao_dentista",
        new Date(data.ultima_visita_ao_dentista).toISOString().split("T")[0]
      );
      setValue("telefone_medico", data.telefone_medico);
      setValue("alguma_outra_doenca", data.alguma_outra_doenca);
      setValue(
        "enfermidades_nao_mencionadas",
        data.enfermidades_nao_mencionadas
      );
      setValue("alguma_alergia", data.alguma_alergia);
      setValue("quais_alergias", data.quais_alergias);
    }
    if (idAnamnesis) {
      fetchAnamnesis();
    }
  }, []);

  return (
    <>
      <HeadTitleSection
        title={idAnamnesis ? "Editar Anamnese" : "Criar Anamnese"}
        backTo={`/prontuarios/${id}`}
      />
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className={`container ${style["form-anamnesis"]}`}
      >
        <FormControl color="error">
          <FormLabel id="label-q-1">
            Alguma Diabete, câncer, tuberculose na família?
          </FormLabel>
          <Controller
            name="alguma_diabete_cancer_tuberculose_familia"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-q-1"
                  {...field}
                  name="row-radio-buttons-group-q-1"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>
                  {errors.alguma_diabete_cancer_tuberculose_familia?.message}
                </small>
              </>
            )}
          />
        </FormControl>

        {String(watch("alguma_diabete_cancer_tuberculose_familia")) ===
          "true" && (
          <FormControl color="error">
            <Controller
              name="qual_diabete_cancer_tuberculose_familia"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  color="error"
                  variant="filled"
                  {...field}
                  label="Qual diabete, câncer, tuberculose na família?"
                  error={!!errors.qual_diabete_cancer_tuberculose_familia}
                  helperText={
                    errors.qual_diabete_cancer_tuberculose_familia?.message
                  }
                />
              )}
            />
          </FormControl>
        )}
        <FormControl color="error">
          <FormLabel id="label-alteracoes-de-sangue">
            Alterações de Sangue?
          </FormLabel>
          <Controller
            name="alteracoes_de_sangue"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-alteracoes-de-sangue"
                  {...field}
                  name="row-radio-buttons-group-alteracoes-de-sangue"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.alteracoes_de_sangue?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-asmatico">É asmático?</FormLabel>
          <Controller
            name="asmatico"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-asmatico"
                  {...field}
                  name="row-radio-buttons-group-asmatico"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.asmatico?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-bebidas-alcolicas">
            Bebidas alcoólicas?
          </FormLabel>
          <Controller
            control={control}
            name="bebidas_alcoolicas"
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-bebidas-alcolicas"
                  {...field}
                  name="row-radio-buttons-group-bebidas-alcolicas"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.bebidas_alcoolicas?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-diabetico">É diabético?</FormLabel>
          <Controller
            name="diabetico"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-diabetico"
                  {...field}
                  name="row-radio-buttons-group-diabetico"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.diabetico?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-dst">Tem DST?</FormLabel>
          <Controller
            name="dst"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-dst"
                  {...field}
                  name="row-radio-buttons-group-dst"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.dst?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-epileptico">É epiléptico?</FormLabel>
          <Controller
            name="epileptico"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-epileptico"
                  {...field}
                  name="row-radio-buttons-group-epileptico"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.epileptico?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-esta-fazendo-tratamento">
            Está em tratamento?
          </FormLabel>
          <Controller
            name="esta_em_tratamento"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-esta-fazendo-tratamento"
                  {...field}
                  name="row-radio-buttons-group-esta-em-tratamento"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.esta_fazendo_uso_medicacao?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-esta-fazendo-uso-medicacao">
            Está fazendo uso de medicação?
          </FormLabel>
          <Controller
            name="esta_fazendo_uso_medicacao"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-esta-fazendo-uso-medicacao"
                  {...field}
                  name="row-radio-buttons-group-esta-fazendo-uso-medicacao"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.esta_fazendo_uso_medicacao?.message}</small>
              </>
            )}
          />
        </FormControl>

        {watch("esta_fazendo_uso_medicacao").toString() === "true" && (
          <FormControl color="error">
            <Controller
              name="quais_medicacoes"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  variant="filled"
                  color="error"
                  {...field}
                  label="Quais medicações está utilizando?"
                  error={!!errors.quais_medicacoes}
                  helperText={errors.quais_medicacoes?.message}
                />
              )}
            />
          </FormControl>
        )}

        <FormControl color="error">
          <FormLabel id="label-alguma-alergia">Tem alguma alergia?</FormLabel>
          <Controller
            name="alguma_alergia"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-alguma-alergia"
                  {...field}
                  name="row-radio-buttons-group-label-alguma-alergia"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.alguma_alergia?.message}</small>
              </>
            )}
          />
        </FormControl>

        {watch("alguma_alergia").toString() === "true" && (
          <FormControl color="error">
            <Controller
              name="quais_alergias"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="filled"
                  color="error"
                  {...field}
                  label="Quais alergias?"
                  error={!!errors.quais_alergias}
                  helperText={errors.quais_alergias?.message}
                />
              )}
            />
          </FormControl>
        )}

        <FormControl color="error">
          <FormLabel id="label-fuma-tabaco-rape">
            Fuma tabaco ou rapé?
          </FormLabel>
          <Controller
            name="fuma_tabaco_rape"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-fuma-tabaco-rape"
                  {...field}
                  name="row-radio-buttons-group-fuma-tabaco-rape"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.fuma_tabaco_rape?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-gravidez">Gravidez?</FormLabel>

          <Controller
            name="gravidez"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-gravidez"
                  {...field}
                  name="row-radio-buttons-group-gravidez"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.ja_foi_operado?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-ja-foi-operado">
            Já fez alguma cirurgia?
          </FormLabel>
          <Controller
            name="ja_foi_operado"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-ja-foi-operado"
                  {...field}
                  name="row-radio-buttons-group-ja-foi-operado"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.ja_foi_operado?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-pes-e-pernas-inchados">
            Tem pés e pernas inchados?
          </FormLabel>
          <Controller
            name="pes_e_pernas_inchados"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-pes-e-pernas-inchados"
                  {...field}
                  name="row-radio-buttons-group-pes-e-pernas-inchados"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.pes_e_pernas_inchados?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-problemas-com-anestesia">
            Tem problemas com anestesia?
          </FormLabel>
          <Controller
            name="problemas_com_anestesia"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-problemas-com-anestesia"
                  {...field}
                  name="row-radio-buttons-group-problemas-com-anestesia"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.problemas_com_anestesia?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-problemas-com-cicatrizacao">
            Tem problemas com cicatrização?
          </FormLabel>
          <Controller
            name="problemas_com_cicatrizacao"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-problemas-com-cicatrizacao"
                  {...field}
                  name="row-radio-buttons-group-problemas-com-cicatrizacao"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.problemas_com_cicatrizacao?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-problemas-seios-maxilares-frontal-etc">
            Tem problemas com seios maxilares, frontal, etc.?
          </FormLabel>
          <Controller
            name="problemas_seios_maxilares_frontal_etc"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-problemas-seios-maxilares-frontal-etc"
                  {...field}
                  name="row-radio-buttons-group-problemas-seios-maxilares-frontal-etc"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>
                  {errors.problemas_seios_maxilares_frontal_etc?.message}
                </small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <Controller
            name="quais_operacoes"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                variant="filled"
                color="error"
                {...field}
                label="Quais operações já realizou?"
                error={!!errors.quais_operacoes}
                helperText={errors.quais_operacoes?.message}
              />
            )}
          />
        </FormControl>

        <FormControl color="error">
          <Controller
            name="queixa_principal_doenca_atual"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                variant="filled"
                color="error"
                {...field}
                label="Qual é a queixa principal da doença atual?"
                error={!!errors.queixa_principal_doenca_atual}
                helperText={errors.queixa_principal_doenca_atual?.message}
              />
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-sente-muita-sede">Sente muita sede?</FormLabel>
          <Controller
            name="sente_muita_sede"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-sente-muita-sede"
                  {...field}
                  name="row-radio-buttons-group-sente-muita-sede"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.sente_muita_sede?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-sofre-alguma-doenca">
            Sofre de alguma doença?
          </FormLabel>
          <Controller
            name="sofre_alguma_doenca"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  row
                  aria-labelledby="label-sofre-alguma-doenca"
                  {...field}
                  name="row-radio-buttons-group-sofre-alguma-doenca"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color="error" />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio color="error" />}
                    label="Não"
                  />
                </RadioGroup>
                <small>{errors.sofre_alguma_doenca?.message}</small>
              </>
            )}
          />
        </FormControl>

        {String(watch("sofre_alguma_doenca")) === "true" && (
          <FormControl color="error">
            <Controller
              name="sofre_quais_doencas"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  variant="filled"
                  color="error"
                  {...field}
                  label="Quais doenças?"
                  error={!!errors.sofre_quais_doencas}
                  helperText={errors.sofre_quais_doencas?.message}
                />
              )}
            />
          </FormControl>
        )}

        <FormControl color="error">
          <Controller
            name="ultima_visita_ao_dentista"
            control={control}
            render={({ field }) => (
              <TextField
                variant="filled"
                color="error"
                {...field}
                type="date"
                label="Última visita ao dentista"
                error={!!errors.ultima_visita_ao_dentista}
                helperText={errors.ultima_visita_ao_dentista?.message}
              />
            )}
          />
        </FormControl>

        <FormControl color="error">
          <Controller
            name="motivo_consulta"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                variant="filled"
                color="error"
                {...field}
                label="Qual o motivo da consulta?"
                error={!!errors.motivo_consulta}
                helperText={errors.motivo_consulta?.message}
              />
            )}
          />
        </FormControl>

        <FormControl color="error">
          <Controller
            name="nome_medico"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                variant="filled"
                color="error"
                {...field}
                label="Nome do médico responsável"
                error={!!errors.nome_medico}
                helperText={errors.nome_medico?.message}
              />
            )}
          />
        </FormControl>

        <FormControl color="error">
          <Controller
            name="telefone_medico"
            control={control}
            render={({ field }) => (
              <TextField
                variant="filled"
                color="error"
                {...field}
                label="Telefone do médico"
                error={!!errors.telefone_medico}
                helperText={errors.telefone_medico?.message}
              />
            )}
          />
        </FormControl>

        <FormControl color="error">
          <Controller
            name="alguma_outra_doenca"
            control={control}
            render={({ field }) => (
              <TextField
                variant="filled"
                color="error"
                id="alguma_outra_doenca"
                label="Alguma outra doença?"
                {...field}
                error={!!errors.alguma_outra_doenca}
                helperText={errors.alguma_outra_doenca?.message}
              />
            )}
          />
        </FormControl>
        <FormControl color="error">
          <Controller
            control={control}
            name="enfermidades_nao_mencionadas"
            render={({ field }) => (
              <TextField
                variant="filled"
                color="error"
                id="enfermidades_nao_mencionadas"
                label="Enfermidades não mencionadas?"
                {...field}
                error={!!errors.enfermidades_nao_mencionadas}
                helperText={errors.enfermidades_nao_mencionadas?.message}
              />
            )}
          />
        </FormControl>

        <Box display={"flex"} justifyContent={"flex-end"} gap={1}>
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
