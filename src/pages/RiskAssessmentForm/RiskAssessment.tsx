import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import useRiskAssessment from "../../global/hooks/useRiskAssessment";
import { RiskAssessment } from "../../global/types/RiskAssessment";
import {
  RiskAssessmentFieldsSelect,
  caries_biofilme,
  caries_fatores,
  caries_risco,
  encaminhamentos,
  escores,
  locais_atividades,
  periodontal_classificacao,
  periodontal_codigo,
  periodontal_criterios,
  proteses_cod,
  proteses_criterios,
  proteses_dimensoes,
  tecidos_moles_classificacao,
  tecidos_moles_codigo,
  tecidos_moles_criterios,
} from "./types/RiskAssessmentFields";
import { Link, useNavigate, useParams } from "react-router-dom";
import useLoading from "../../global/hooks/useLoading";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { RiskAssessmentSchema } from "./schema/RiskAssessmentSchema";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import style from "./RiskAssessment.module.css";
import useAuth from "../../global/hooks/useAuth";

export default function RiskAssessmentForm() {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const { id, idAssessment } = useParams();
  const { updateRiskAssessment, createRiskAssessment, getOneById } =
    useRiskAssessment();
  const navigate = useNavigate();
  const { loading } = useLoading();
  const { isTeacher } = useAuth();

  const {
    formState: { errors },
    control,
    setValue,
    watch,
    handleSubmit,
  } = useForm<RiskAssessmentFieldsSelect>({
    resolver: yupResolver(RiskAssessmentSchema),
    defaultValues: {
      id_medical_record: id || "",
      necessidade_de_protese_anotacoes: "",
      necessidade_de_protese_avaliacao: "",
      necessidade_de_protese_preencher: false,
      responsavel: "",
      risco_de_carie_anotacoes: "",
      risco_de_carie_avaliacao: "",
      risco_de_carie_biofilme: "",
      risco_de_carie_fator: "",
      risco_de_carie_preencher: false,
      risco_de_carie: 0,
      risco_familiar_anotacoes: "",
      risco_familiar_avaliacao: "",
      risco_familiar_escores: [""],
      risco_familiar_preencher: false,
      risco_periodontal_anotacoes: "",
      risco_periodontal_avaliacao: "",
      risco_periodontal_classificacao: "",
      risco_periodontal_codigo: "",
      risco_periodontal_preencher: false,
      risco_tecidos_moles_anotacoes: "",
      risco_tecidos_moles_avaliacao: "",
      risco_tecidos_moles_classificacao: "",
      risco_tecidos_moles_codigo: "",
      tem_risco_tecidos_moles: false,
      risco_de_carie_encaminhamento: "",
      risco_periodontal_criterio: "",
      risco_tecidos_moles_criterio: "",
      uso_de_protese_inferior_codigos: "",
      uso_de_protese_inferior_dimensoes: "",
      uso_de_protese_superior_codigos: "",
      uso_de_protese_superior_criterios: "",
      uso_de_protese_superior_dimensoes: "",
      uso_de_protese_inferior_criterios: "",
      local_da_atividade: locais_atividades[0],

      necessidade_de_ART: false,
      ART_realizada: false,
      quantas_ARTs_foram_realizadas: 0,
    },
  });

  const [localAtividadeSelect, setLocalAtividadeSelect] = useState<string>(
    locais_atividades[0]
  );

  useEffect(() => {
    changeEncaminhamento();
  }, [
    watch("risco_de_carie_fator"),
    watch("risco_de_carie_biofilme"),
    watch("risco_de_carie"),
  ]);

  useEffect(() => {
    changeCriteriosPeriodontia();
  }, [
    watch("risco_periodontal_codigo"),
    watch("risco_periodontal_classificacao"),
  ]);

  useEffect(() => {
    changeCriteriosTecidosMoles();
  }, [
    watch("risco_tecidos_moles_codigo"),
    watch("risco_tecidos_moles_classificacao"),
  ]);

  useEffect(() => {
    changeCriteriosProtese("inferior");
  }, [
    watch("uso_de_protese_inferior_codigos"),
    watch("uso_de_protese_inferior_dimensoes"),
  ]);

  useEffect(() => {
    changeCriteriosProtese("superior");
  }, [
    watch("uso_de_protese_superior_codigos"),
    watch("uso_de_protese_superior_dimensoes"),
  ]);

  const changeCriteriosProtese = (type: string) => {
    let codigo = watch("uso_de_protese_inferior_codigos");
    let dimensao = watch("uso_de_protese_inferior_dimensoes");
    let proteseName:
      | "uso_de_protese_inferior_criterios"
      | "uso_de_protese_superior_criterios" =
      "uso_de_protese_inferior_criterios";

    if (type === "superior") {
      codigo = watch("uso_de_protese_superior_codigos");
      dimensao = watch("uso_de_protese_superior_dimensoes");
      proteseName = "uso_de_protese_superior_criterios";
    }

    if (dimensao === proteses_dimensoes[0]) {
      if (codigo === "0") setValue(proteseName, proteses_criterios[0]);
      else if (codigo === "1") setValue(proteseName, proteses_criterios[1]);
      else if (codigo === "2") setValue(proteseName, proteses_criterios[2]);
      else if (codigo === "3") setValue(proteseName, proteses_criterios[3]);
      else if (codigo === "4") setValue(proteseName, proteses_criterios[4]);
      else if (codigo === "5") setValue(proteseName, proteses_criterios[5]);
      else if (codigo === "9") setValue(proteseName, proteses_criterios[6]);
      else setValue(proteseName, "");
    } else {
      if (codigo === "0") setValue(proteseName, proteses_criterios[7]);
      else if (codigo === "1") setValue(proteseName, proteses_criterios[8]);
      else if (codigo === "2") setValue(proteseName, proteses_criterios[9]);
      else if (codigo === "3") setValue(proteseName, proteses_criterios[10]);
      else if (codigo === "4") setValue(proteseName, proteses_criterios[11]);
      else if (codigo === "9") setValue(proteseName, proteses_criterios[12]);
      else setValue(proteseName, "");
    }
  };

  const changeCriteriosTecidosMoles = () => {
    const cod = watch("risco_tecidos_moles_codigo");
    const classificacao = watch("risco_tecidos_moles_classificacao");

    if (classificacao === tecidos_moles_classificacao[0] && cod === "0") {
      setValue("risco_tecidos_moles_criterio", tecidos_moles_criterios[0]);
    } else if (
      classificacao === tecidos_moles_classificacao[1] &&
      cod === "1"
    ) {
      setValue("risco_tecidos_moles_criterio", tecidos_moles_criterios[1]);
    } else if (
      classificacao === tecidos_moles_classificacao[2] &&
      cod === "2"
    ) {
      setValue("risco_tecidos_moles_criterio", tecidos_moles_criterios[2]);
    } else {
      setValue("risco_tecidos_moles_criterio", "");
    }
  };

  const changeCriteriosPeriodontia = () => {
    const classificacao = watch("risco_periodontal_classificacao");
    const codigo = watch("risco_periodontal_codigo");

    if (classificacao === periodontal_classificacao[0] && codigo === "0") {
      setValue("risco_periodontal_criterio", periodontal_criterios[0]);
    } else if (
      classificacao === periodontal_classificacao[0] &&
      codigo === "X"
    ) {
      setValue("risco_periodontal_criterio", periodontal_criterios[1]);
    } else if (
      classificacao === periodontal_classificacao[1] &&
      codigo === "1"
    ) {
      setValue("risco_periodontal_criterio", periodontal_criterios[2]);
    } else if (
      classificacao === periodontal_classificacao[1] &&
      codigo === "2"
    ) {
      setValue("risco_periodontal_criterio", periodontal_criterios[3]);
    } else if (
      classificacao === periodontal_classificacao[1] &&
      codigo === "B"
    ) {
      setValue("risco_periodontal_criterio", periodontal_criterios[4]);
    } else if (
      classificacao === periodontal_classificacao[2] &&
      codigo === "6"
    ) {
      setValue("risco_periodontal_criterio", periodontal_criterios[5]);
    } else if (
      classificacao === periodontal_classificacao[2] &&
      codigo === "8"
    ) {
      setValue("risco_periodontal_criterio", periodontal_criterios[6]);
    } else {
      setValue("risco_periodontal_criterio", "");
    }
  };

  const changeEncaminhamento = () => {
    const fator = watch("risco_de_carie_fator");
    const biofilme = watch("risco_de_carie_biofilme");
    const risco = watch("risco_de_carie");

    if (fator === caries_fatores[0] && biofilme === "-" && risco === 0) {
      setValue("risco_de_carie_encaminhamento", encaminhamentos[0]);
    } else if (
      (fator === caries_fatores[0] && biofilme === "+" && risco === 2) ||
      (fator === caries_fatores[1] && biofilme === "+" && risco === 2) ||
      (fator === caries_fatores[1] && biofilme === "-" && risco === 1) ||
      (fator === caries_fatores[2] && biofilme === "-" && risco === 1) ||
      (fator === caries_fatores[2] && biofilme === "+" && risco === 2) ||
      (fator === caries_fatores[3] && biofilme === "+OU-" && risco === 2)
    ) {
      setValue("risco_de_carie_encaminhamento", encaminhamentos[1]);
    } else if (
      fator === caries_fatores[4] &&
      biofilme === "+OU-" &&
      risco === 2
    ) {
      setValue("risco_de_carie_encaminhamento", encaminhamentos[2]);
    } else if (
      fator === caries_fatores[5] &&
      biofilme === "+OU-" &&
      risco === 2
    ) {
      setValue("risco_de_carie_encaminhamento", encaminhamentos[3]);
    } else if (
      fator === caries_fatores[6] &&
      biofilme === "+OU-" &&
      risco === 2
    ) {
      setValue("risco_de_carie_encaminhamento", encaminhamentos[4]);
    } else {
      setValue("risco_de_carie_encaminhamento", "");
    }
  };

  useEffect(() => {
    async function fetch() {
      const data: RiskAssessment = await getOneById(idAssessment || "");
      setValue("id_medical_record", id || "");
      setValue(
        "necessidade_de_protese_anotacoes",
        data.necessidade_de_protese_anotacoes
      );
      setValue(
        "necessidade_de_protese_avaliacao",
        data.necessidade_de_protese_avaliacao
      );
      setValue(
        "necessidade_de_protese_preencher",
        data.necessidade_de_protese_preencher
      );
      setValue("responsavel", data.responsavel);
      setValue("risco_de_carie_anotacoes", data.risco_de_carie_anotacoes);
      setValue("risco_de_carie_avaliacao", data.risco_de_carie_avaliacao);
      setValue("risco_de_carie_biofilme", data.risco_de_carie_biofilme);
      setValue("risco_de_carie_fator", data.risco_de_carie_fator);
      setValue("risco_de_carie_preencher", data.risco_de_carie_preencher);
      setValue("risco_de_carie", data.risco_de_carie);
      setValue("risco_familiar_anotacoes", data.risco_familiar_anotacoes);
      setValue("risco_familiar_avaliacao", data.risco_familiar_avaliacao);
      setValue(
        "risco_familiar_escores",
        (data.risco_familiar_escores &&
          data.risco_familiar_escores.map((escore) => escore.nome)) ||
          []
      );
      setValue("risco_familiar_preencher", data.risco_familiar_preencher);
      setValue("risco_periodontal_anotacoes", data.risco_periodontal_anotacoes);
      setValue("risco_periodontal_avaliacao", data.risco_periodontal_avaliacao);
      setValue(
        "risco_periodontal_classificacao",
        data.risco_periodontal_classificacao
      );
      setValue("risco_periodontal_codigo", data.risco_periodontal_codigo);
      setValue("risco_periodontal_preencher", data.risco_periodontal_preencher);
      setValue(
        "risco_tecidos_moles_anotacoes",
        data.risco_tecidos_moles_anotacoes
      );
      setValue(
        "risco_tecidos_moles_avaliacao",
        data.risco_tecidos_moles_avaliacao
      );
      setValue(
        "risco_tecidos_moles_classificacao",
        data.risco_tecidos_moles_classificacao
      );
      setValue("risco_tecidos_moles_codigo", data.risco_tecidos_moles_codigo);
      setValue("tem_risco_tecidos_moles", data.tem_risco_tecidos_moles);
      setValue(
        "risco_de_carie_encaminhamento",
        data.risco_de_carie_encaminhamento
      );
      setValue("risco_periodontal_criterio", data.risco_periodontal_criterio);
      setValue(
        "risco_tecidos_moles_criterio",
        data.risco_tecidos_moles_criterio
      );
      setValue(
        "uso_de_protese_inferior_codigos",
        data.uso_de_protese_inferior_codigos
      );
      setValue(
        "uso_de_protese_inferior_dimensoes",
        data.uso_de_protese_inferior_dimensoes
      );
      setValue(
        "uso_de_protese_superior_codigos",
        data.uso_de_protese_superior_codigos
      );
      setValue(
        "uso_de_protese_superior_criterios",
        data.uso_de_protese_superior_criterios
      );
      setValue(
        "uso_de_protese_superior_dimensoes",
        data.uso_de_protese_superior_dimensoes
      );
      setValue(
        "uso_de_protese_inferior_criterios",
        data.uso_de_protese_inferior_criterios
      );
      setValue("local_da_atividade", data.local_da_atividade);
      const local = data.local_da_atividade || "";
      setLocalAtividadeSelect(
        locais_atividades.includes(local) ? local : "Outro"
      );
      setValue("necessidade_de_ART", data.necessidade_de_ART);
      setValue("ART_realizada", data.ART_realizada);
      setValue(
        "quantas_ARTs_foram_realizadas",
        data.quantas_ARTs_foram_realizadas
      );
    }
    if (idAssessment) {
      fetch();
    }
  }, []);

  const sumScores =
    watch("risco_familiar_escores")
      ?.map((escore) => {
        return escores.find((e) => e.nome === (escore as unknown as string))
          ?.escore;
      })
      .reduce((a, b) => (a as number) + (b as number), 0) || 0;

  const onSubmit = async (data: RiskAssessmentFieldsSelect) => {
    let response = null;
    if (idAssessment) {
      response = await updateRiskAssessment(idAssessment, {
        ...data,
        risco_familiar_escores: escores.filter((escore) =>
          watch("risco_familiar_escores")?.includes(escore.nome)
        ),
      });
    } else {
      response = await createRiskAssessment({
        ...data,
        risco_familiar_escores: escores.filter((escore) =>
          watch("risco_familiar_escores")?.includes(escore.nome)
        ),
        id_medical_record: id || "",
      });
    }
    if (response) navigate(`/prontuarios/${id}`);
  };

  const clearValues = (type: string, clear: string) => {
    if (clear === "true") {
      if (type === "risco_de_carie_preencher") {
        setValue("risco_de_carie_fator", "");
        setValue("risco_de_carie_biofilme", "");
        setValue("risco_de_carie", 0);
        setValue("risco_de_carie_encaminhamento", "");
        setValue("risco_de_carie_avaliacao", "");
        setValue("risco_de_carie_anotacoes", "");
      } else if (type === "risco_periodontal_preencher") {
        setValue("risco_periodontal_classificacao", "");
        setValue("risco_periodontal_codigo", "");
        setValue("risco_periodontal_avaliacao", "");
        setValue("risco_periodontal_anotacoes", "");
      } else if (type === "tem_risco_tecidos_moles") {
        setValue("risco_tecidos_moles_classificacao", "");
        setValue("risco_tecidos_moles_codigo", "");
        setValue("risco_tecidos_moles_criterio", "");
        setValue("risco_tecidos_moles_avaliacao", "");
        setValue("risco_tecidos_moles_anotacoes", "");
      } else if (type === "necessidade_de_protese_preencher") {
        setValue("uso_de_protese_superior_dimensoes", "");
        setValue("uso_de_protese_superior_codigos", "");
        setValue("uso_de_protese_superior_criterios", "");
        setValue("uso_de_protese_inferior_dimensoes", "");
        setValue("uso_de_protese_inferior_codigos", "");
        setValue("uso_de_protese_inferior_criterios", "");
        setValue("necessidade_de_protese_avaliacao", "");
        setValue("necessidade_de_protese_anotacoes", "");
      } else if (type === "risco_familiar_preencher") {
        setValue("risco_familiar_escores", []);
      }
    }
  };

  return (
    <>
      <HeadTitleSection
        backTo={`/prontuarios/${id}`}
        title={
          idAssessment
            ? "Editar avaliação de risco"
            : "Criar avaliação de risco"
        }
      />
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className={`container ${style["form-risk"]}`}
      >
        <Controller
          control={control}
          name="responsavel"
          render={({ field }) => (
            <TextField
              {...field}
              label="Responsável (caso o paciente seja criança)"
              color="error"
              variant="filled"
              error={!!errors.responsavel}
              helperText={errors.responsavel?.message}
            />
          )}
        />
        <FormControl variant="filled" color="error">
          <InputLabel htmlFor="local_da_atividade">
            Local da atividade
          </InputLabel>
          <Select
            label="Local da atividade"
            id="local_da_atividade"
            value={localAtividadeSelect}
            onChange={(e) => {
              setLocalAtividadeSelect(e.target.value);
              setValue("local_da_atividade", e.target.value);
            }}
          >
            {locais_atividades.map((local, key) => (
              <MenuItem key={key} value={local}>
                {local}
              </MenuItem>
            ))}
          </Select>
          <small style={{ color: "red" }}>
            {errors.local_da_atividade?.message}
          </small>
        </FormControl>
        {localAtividadeSelect === "Outro" && (
          <Controller
            control={control}
            name="local_da_atividade"
            render={({ field }) => (
              <TextField
                {...field}
                label="Informe o local da atividade"
                color="error"
                variant="filled"
                error={!!errors.local_da_atividade}
                helperText={errors.local_da_atividade?.message}
              />
            )}
          />
        )}

        <Controller
          name="risco_de_carie_preencher"
          control={control}
          render={({ field }) => (
            <FormControl variant="filled" color="error">
              <InputLabel htmlFor="risco_de_carie_preencher">
                Há Risco de Cárie?
              </InputLabel>
              <Select
                label="Há Risco de Cárie?"
                id="risco_de_carie_preencher"
                {...field}
                error={!!errors.risco_de_carie_preencher}
                onChange={(e) => {
                  setValue(
                    "risco_de_carie_preencher",
                    e.target.value.toString() === "true" ? true : false
                  );
                  clearValues(
                    "risco_de_carie_preencher",
                    e.target.value.toString()
                  );
                }}
              >
                <MenuItem value={"true"}>Sim</MenuItem>
                <MenuItem value={"false"}>Não</MenuItem>
              </Select>
              <small style={{ color: "red" }}>
                {errors.risco_de_carie_preencher?.message}
              </small>
            </FormControl>
          )}
        />

        {watch("risco_de_carie_preencher").toString() === "true" && (
          <>
            <Divider />
            <small style={{ color: "red" }}>
              Preencha as informações de cárie
            </small>
            <Controller
              control={control}
              name="risco_de_carie_fator"
              render={({ field }) => (
                <FormControl variant="filled" color="error">
                  <InputLabel htmlFor="risco_de_carie_fator">Fator</InputLabel>
                  <Select
                    {...field}
                    label="Fator"
                    id="risco_de_carie_fator"
                    error={!!errors.risco_de_carie_fator}
                  >
                    {caries_fatores.map((fator, index) => (
                      <MenuItem key={index} value={fator}>
                        {fator}
                      </MenuItem>
                    ))}
                  </Select>
                  <small style={{ color: "red" }}>
                    {errors.risco_de_carie_fator?.message}
                  </small>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="risco_de_carie_biofilme"
              render={({ field }) => (
                <FormControl variant="filled" color="error">
                  <InputLabel htmlFor="risco_de_carie_biofilme">
                    Biofilme
                  </InputLabel>
                  <Select
                    {...field}
                    label="Biofilme"
                    id="risco_de_carie_biofilme"
                    error={!!errors.risco_de_carie_biofilme}
                  >
                    {caries_biofilme.map((bio, index) => (
                      <MenuItem key={index} value={bio}>
                        {bio}
                      </MenuItem>
                    ))}
                  </Select>
                  <small style={{ color: "red" }}>
                    {errors.risco_de_carie_biofilme?.message}
                  </small>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="risco_de_carie"
              render={({ field }) => (
                <FormControl variant="filled" color="error">
                  <InputLabel htmlFor="risco_de_carie">Risco</InputLabel>
                  <Select
                    {...field}
                    label="Risco"
                    id="risco_de_carie"
                    error={!!errors.risco_de_carie}
                  >
                    {caries_risco.map((risco, index) => (
                      <MenuItem key={index} value={risco}>
                        {risco}
                      </MenuItem>
                    ))}
                  </Select>
                  <small style={{ color: "red" }}>
                    {errors.risco_de_carie?.message}
                  </small>
                </FormControl>
              )}
            />

            <Alert severity="info">
              <strong>Encaminhamento:</strong>{" "}
              {watch("risco_de_carie_encaminhamento") || "Nenhum"}
            </Alert>

            <FormControl color="error">
              <FormLabel id="label-c-2">Necessidade de ART</FormLabel>
              <Controller
                name="necessidade_de_ART"
                control={control}
                render={({ field }) => (
                  <>
                    <RadioGroup
                      color="error"
                      row
                      aria-labelledby="label-c-2"
                      {...field}
                      name="row-radio-buttons-group-c-2"
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
                    <small>{errors.necessidade_de_ART?.message}</small>
                  </>
                )}
              />
            </FormControl>

            <FormControl color="error">
              <FormLabel id="label-c-3">ART Realizada</FormLabel>
              <Controller
                name="ART_realizada"
                control={control}
                render={({ field }) => (
                  <>
                    <RadioGroup
                      color="error"
                      row
                      aria-labelledby="label-c-3"
                      {...field}
                      name="row-radio-buttons-group-c-3"
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
                    <small>{errors.ART_realizada?.message}</small>
                  </>
                )}
              />
            </FormControl>

            <Controller
              control={control}
              name="quantas_ARTs_foram_realizadas"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Quantas ARTs foram realizadas?"
                  color="error"
                  variant="filled"
                  type="number"
                  error={!!errors.quantas_ARTs_foram_realizadas}
                  helperText={errors.quantas_ARTs_foram_realizadas?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="risco_de_carie_avaliacao"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Avaliação"
                  disabled={!isTeacher()}
                  color="error"
                  variant="filled"
                  error={!!errors.risco_de_carie_avaliacao}
                  helperText={errors.risco_de_carie_avaliacao?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="risco_de_carie_anotacoes"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Anotações"
                  color="error"
                  variant="filled"
                  error={!!errors.risco_de_carie_anotacoes}
                  helperText={errors.risco_de_carie_anotacoes?.message}
                />
              )}
            />

            <Divider />
          </>
        )}

        <Controller
          name="risco_periodontal_preencher"
          control={control}
          render={({ field }) => (
            <FormControl variant="filled" color="error">
              <InputLabel htmlFor="risco_de_carie_preencher">
                Há Risco Periodontal?
              </InputLabel>
              <Select
                {...field}
                label="Há Risco Periodontal?"
                id="risco_periodontal_preencher"
                error={!!errors.risco_periodontal_preencher}
                onChange={(e) => {
                  setValue(
                    "risco_periodontal_preencher",
                    e.target.value.toString() === "true" ? true : false
                  );
                  clearValues(
                    "risco_periodontal_preencher",
                    e.target.value.toString()
                  );
                }}
              >
                <MenuItem value={"true"}>Sim</MenuItem>
                <MenuItem value={"false"}>Não</MenuItem>
              </Select>
              <small style={{ color: "red" }}>
                {errors.risco_periodontal_preencher?.message}
              </small>
            </FormControl>
          )}
        />

        {watch("risco_periodontal_preencher").toString() === "true" && (
          <>
            <Divider />
            <small style={{ color: "red" }}>
              Preencha as informações de risco periodontal
            </small>
            <Controller
              control={control}
              name="risco_periodontal_classificacao"
              render={({ field }) => (
                <FormControl variant="filled" color="error">
                  <InputLabel htmlFor="risco_periodontal_classificacao">
                    Classificação
                  </InputLabel>
                  <Select
                    {...field}
                    label="Classificação"
                    id="risco_periodontal_classificacao"
                    error={!!errors.risco_periodontal_classificacao}
                  >
                    {periodontal_classificacao.map((classificacao, index) => (
                      <MenuItem key={index} value={classificacao}>
                        {classificacao}
                      </MenuItem>
                    ))}
                  </Select>
                  <small style={{ color: "red" }}>
                    {errors.risco_periodontal_classificacao?.message}
                  </small>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="risco_periodontal_codigo"
              render={({ field }) => (
                <FormControl variant="filled" color="error">
                  <InputLabel htmlFor="risco_periodontal_codigo">
                    Código
                  </InputLabel>
                  <Select
                    {...field}
                    label="Código"
                    id="risco_periodontal_codigo"
                    error={!!errors.risco_periodontal_codigo}
                  >
                    {periodontal_codigo.map((cod, index) => (
                      <MenuItem key={index} value={cod}>
                        {cod}
                      </MenuItem>
                    ))}
                  </Select>
                  <small style={{ color: "red" }}>
                    {errors.risco_periodontal_codigo?.message}
                  </small>
                </FormControl>
              )}
            />

            <Alert severity="info">
              <strong>Critério:</strong>{" "}
              {watch("risco_periodontal_criterio") || "Nenhum"}
            </Alert>

            <Controller
              control={control}
              name="risco_periodontal_avaliacao"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Avaliação"
                  disabled={!isTeacher()}
                  color="error"
                  variant="filled"
                  error={!!errors.risco_periodontal_avaliacao}
                  helperText={errors.risco_periodontal_avaliacao?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="risco_periodontal_anotacoes"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Anotações"
                  color="error"
                  variant="filled"
                  error={!!errors.risco_periodontal_anotacoes}
                  helperText={errors.risco_periodontal_anotacoes?.message}
                />
              )}
            />

            <Divider />
          </>
        )}

        <Controller
          name="tem_risco_tecidos_moles"
          control={control}
          render={({ field }) => (
            <FormControl variant="filled" color="error">
              <InputLabel htmlFor="tem_risco_tecidos_moles">
                Há Risco Para Tecidos Moles?
              </InputLabel>
              <Select
                {...field}
                label="Há Risco Periodontal?"
                id="tem_risco_tecidos_moles"
                error={!!errors.tem_risco_tecidos_moles}
                onChange={(e) => {
                  setValue(
                    "tem_risco_tecidos_moles",
                    e.target.value.toString() === "true" ? true : false
                  );
                  clearValues(
                    "tem_risco_tecidos_moles",
                    e.target.value.toString()
                  );
                }}
              >
                <MenuItem value={"true"}>Sim</MenuItem>
                <MenuItem value={"false"}>Não</MenuItem>
              </Select>
              <small style={{ color: "red" }}>
                {errors.tem_risco_tecidos_moles?.message}
              </small>
            </FormControl>
          )}
        />

        {watch("tem_risco_tecidos_moles").toString() === "true" && (
          <>
            <Divider />
            <small style={{ color: "red" }}>
              Preencha as informações de risco de tecidos moles
            </small>
            <Controller
              control={control}
              name="risco_tecidos_moles_classificacao"
              render={({ field }) => (
                <FormControl variant="filled" color="error">
                  <InputLabel htmlFor="risco_tecidos_moles_classificacao">
                    Classificação
                  </InputLabel>
                  <Select
                    {...field}
                    label="Classificação"
                    id="risco_tecidos_moles_classificacao"
                    error={!!errors.risco_tecidos_moles_classificacao}
                  >
                    {tecidos_moles_classificacao.map((classificacao, index) => (
                      <MenuItem key={index} value={classificacao}>
                        {classificacao}
                      </MenuItem>
                    ))}
                  </Select>
                  <small style={{ color: "red" }}>
                    {errors.risco_periodontal_classificacao?.message}
                  </small>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="risco_tecidos_moles_codigo"
              render={({ field }) => (
                <FormControl variant="filled" color="error">
                  <InputLabel htmlFor="risco_tecidos_moles_codigo">
                    Código
                  </InputLabel>
                  <Select
                    {...field}
                    label="Código"
                    id="risco_tecidos_moles_codigo"
                    error={!!errors.risco_tecidos_moles_codigo}
                  >
                    {tecidos_moles_codigo.map((cod, index) => (
                      <MenuItem key={index} value={cod}>
                        {cod}
                      </MenuItem>
                    ))}
                  </Select>
                  <small style={{ color: "red" }}>
                    {errors.risco_periodontal_codigo?.message}
                  </small>
                </FormControl>
              )}
            />

            <Alert severity="info">
              <strong>Critério:</strong>{" "}
              {watch("risco_tecidos_moles_criterio") || "Nenhum"}
            </Alert>

            <Controller
              control={control}
              name="risco_tecidos_moles_avaliacao"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Avaliação"
                  disabled={!isTeacher()}
                  color="error"
                  variant="filled"
                  error={!!errors.risco_tecidos_moles_avaliacao}
                  helperText={errors.risco_tecidos_moles_avaliacao?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="risco_tecidos_moles_anotacoes"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Anotações"
                  color="error"
                  variant="filled"
                  error={!!errors.risco_tecidos_moles_anotacoes}
                  helperText={errors.risco_tecidos_moles_anotacoes?.message}
                />
              )}
            />

            <Divider />
          </>
        )}

        <Controller
          name="necessidade_de_protese_preencher"
          control={control}
          render={({ field }) => (
            <FormControl variant="filled" color="error">
              <InputLabel htmlFor="necessidade_de_protese_preencher">
                Há Necessidade de Prótese?
              </InputLabel>
              <Select
                {...field}
                label="Há Risco Periodontal?"
                id="necessidade_de_protese_preencher"
                error={!!errors.necessidade_de_protese_preencher}
                onChange={(e) => {
                  setValue(
                    "necessidade_de_protese_preencher",
                    e.target.value.toString() === "true" ? true : false
                  );
                  clearValues(
                    "necessidade_de_protese_preencher",
                    e.target.value.toString()
                  );
                }}
              >
                <MenuItem value={"true"}>Sim</MenuItem>
                <MenuItem value={"false"}>Não</MenuItem>
              </Select>
              <small style={{ color: "red" }}>
                {errors.necessidade_de_protese_preencher?.message}
              </small>
            </FormControl>
          )}
        />

        {watch("necessidade_de_protese_preencher").toString() === "true" && (
          <>
            <Divider />
            <p>Preencha as informações de próteses</p>

            <small style={{ color: "red" }}>Superior</small>
            <Controller
              control={control}
              name="uso_de_protese_superior_dimensoes"
              render={({ field }) => (
                <FormControl variant="filled" color="error">
                  <InputLabel htmlFor="uso_de_protese_superior_dimensoes">
                    Dimensão
                  </InputLabel>
                  <Select
                    {...field}
                    label="Dimensão"
                    id="uso_de_protese_superior_dimensoes"
                    error={!!errors.uso_de_protese_superior_dimensoes}
                  >
                    {proteses_dimensoes.map((dim, index) => (
                      <MenuItem key={index} value={dim}>
                        {dim}
                      </MenuItem>
                    ))}
                  </Select>
                  <small style={{ color: "red" }}>
                    {errors.uso_de_protese_superior_dimensoes?.message}
                  </small>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="uso_de_protese_superior_codigos"
              render={({ field }) => (
                <FormControl variant="filled" color="error">
                  <InputLabel htmlFor="uso_de_protese_superior_codigos">
                    Código
                  </InputLabel>
                  <Select
                    {...field}
                    label="Código"
                    id="uso_de_protese_superior_codigos"
                    error={!!errors.uso_de_protese_superior_codigos}
                  >
                    {proteses_cod.map((cod, index) => (
                      <MenuItem key={index} value={cod}>
                        {cod}
                      </MenuItem>
                    ))}
                  </Select>
                  <small style={{ color: "red" }}>
                    {errors.uso_de_protese_superior_codigos?.message}
                  </small>
                </FormControl>
              )}
            />

            <Alert severity="info">
              <strong>Critério: </strong>{" "}
              {watch("uso_de_protese_superior_criterios") || "Nenhum"}
            </Alert>

            <small style={{ color: "red" }}>Inferior</small>
            <Controller
              control={control}
              name="uso_de_protese_inferior_dimensoes"
              render={({ field }) => (
                <FormControl variant="filled" color="error">
                  <InputLabel htmlFor="uso_de_protese_inferior_dimensoes">
                    Dimensão
                  </InputLabel>
                  <Select
                    {...field}
                    label="Dimensão"
                    id="uso_de_protese_inferior_dimensoes"
                    error={!!errors.uso_de_protese_superior_dimensoes}
                  >
                    {proteses_dimensoes.map((dim, index) => (
                      <MenuItem key={index} value={dim}>
                        {dim}
                      </MenuItem>
                    ))}
                  </Select>
                  <small style={{ color: "red" }}>
                    {errors.uso_de_protese_inferior_dimensoes?.message}
                  </small>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="uso_de_protese_inferior_codigos"
              render={({ field }) => (
                <FormControl variant="filled" color="error">
                  <InputLabel htmlFor="uso_de_protese_inferior_codigos">
                    Código
                  </InputLabel>
                  <Select
                    {...field}
                    label="Código"
                    id="uso_de_protese_inferior_codigos"
                    error={!!errors.uso_de_protese_inferior_codigos}
                  >
                    {proteses_cod.map((cod, index) => (
                      <MenuItem key={index} value={cod}>
                        {cod}
                      </MenuItem>
                    ))}
                  </Select>
                  <small style={{ color: "red" }}>
                    {errors.uso_de_protese_inferior_codigos?.message}
                  </small>
                </FormControl>
              )}
            />

            <Alert severity="info">
              <strong>Critério: </strong>{" "}
              {watch("uso_de_protese_inferior_criterios") || "Nenhum"}
            </Alert>

            <Controller
              control={control}
              name="necessidade_de_protese_avaliacao"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Avaliação"
                  disabled={!isTeacher()}
                  color="error"
                  variant="filled"
                  error={!!errors.necessidade_de_protese_avaliacao}
                  helperText={errors.necessidade_de_protese_avaliacao?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="necessidade_de_protese_anotacoes"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Anotações"
                  color="error"
                  variant="filled"
                  error={!!errors.necessidade_de_protese_anotacoes}
                  helperText={errors.necessidade_de_protese_anotacoes?.message}
                />
              )}
            />

            <Divider />
          </>
        )}

        <Controller
          name="risco_familiar_preencher"
          control={control}
          render={({ field }) => (
            <FormControl variant="filled" color="error">
              <InputLabel htmlFor="risco_familiar_preencher">
                Há Risco Familiar?
              </InputLabel>
              <Select
                {...field}
                label="Há Risco Familiar?"
                id="risco_familiar_preencher"
                error={!!errors.risco_familiar_preencher}
                onChange={(e) => {
                  setValue(
                    "risco_familiar_preencher",
                    e.target.value.toString() === "true" ? true : false
                  );
                  clearValues(
                    "risco_familiar_preencher",
                    e.target.value.toString()
                  );
                }}
              >
                <MenuItem value={"true"}>Sim</MenuItem>
                <MenuItem value={"false"}>Não</MenuItem>
              </Select>
              <small style={{ color: "red" }}>
                {errors.risco_familiar_preencher?.message}
              </small>
              <small style={{ color: "red" }}>
                {errors.risco_familiar_escores &&
                  errors.risco_familiar_escores?.length &&
                  errors.risco_familiar_escores?.length > 0 &&
                  "Precisa preencher pelomenos riscos familiares"}
              </small>
            </FormControl>
          )}
        />
        {watch("risco_familiar_preencher").toString() === "true" && (
          <>
            <Controller
              control={control}
              name="risco_familiar_escores"
              render={({ field }) => (
                <FormControl color="error" variant="filled">
                  <InputLabel id="demo-multiple-checkbox-label">
                    Escores
                  </InputLabel>
                  <Select
                    color="error"
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    label="Escores"
                    multiple
                    {...field}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {escores.map((escore) => (
                      <MenuItem key={escore.nome} value={escore.nome}>
                        <ListItemText primary={escore.nome} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Alert severity="info">
              <strong>Soma dos escores:</strong> {sumScores} -{" "}
              {sumScores && sumScores > 9
                ? "R3"
                : sumScores >= 7 && sumScores <= 9
                ? "R2"
                : sumScores !== 0
                ? "R1"
                : ""}
            </Alert>

            <Controller
              control={control}
              name="risco_familiar_avaliacao"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Avaliação"
                  disabled={!isTeacher()}
                  color="error"
                  variant="filled"
                  error={!!errors.risco_familiar_avaliacao}
                  helperText={errors.risco_familiar_avaliacao?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="risco_familiar_anotacoes"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Anotações"
                  color="error"
                  variant="filled"
                  error={!!errors.risco_familiar_anotacoes}
                  helperText={errors.risco_familiar_anotacoes?.message}
                />
              )}
            />

            <Divider />
          </>
        )}

        <Box display={"flex"} gap={1} justifyContent={"flex-end"}>
          <Link to={`/prontuarios/${id}`}>
            <LoadingButton loading={loading} color="error" type="submit">
              Voltar
            </LoadingButton>
          </Link>

          <LoadingButton
            loading={loading}
            color="error"
            variant="contained"
            type="submit"
          >
            Salvar
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
}
