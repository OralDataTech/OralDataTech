import { Controller, useForm } from "react-hook-form";
import style from "./EdodonticForm.module.css";
import { EdodonticSchema } from "./schemas/EdodonticSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EdodonticFields } from "./types/EdodonticFields";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import MoreOptions from "../../global/components/more-options/MoreOptions";
import { useEffect } from "react";
import useEdodontics from "../../global/hooks/useEdodontics";
import useLoading from "../../global/hooks/useLoading";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../global/hooks/useAuth";

export default function EdodonticForm() {
  const { id, idEdodontic } = useParams();
  const { getOneById, updateEdodontics, createEdodontics } = useEdodontics();
  const navigate = useNavigate();
  const { loading } = useLoading();
  const { isTeacher } = useAuth();
  const {
    formState: { errors },
    control,
    setValue,
    watch,
    handleSubmit,
  } = useForm<EdodonticFields>({
    resolver: yupResolver(EdodonticSchema),
    defaultValues: {
      aparecimento: "",
      sede: "",
      duracao: "",
      camara_pulpar: "",
      coloracao_dentaria: "",
      coloracao_tecidual: "",
      edema_local: "",
      canal_radicular: "",
      estrutura_dentaria: "",
      frequencia: "",
      inspecao_dente: "",
      intensidade: "",
      observacoes: "",
      palpacao_coronaria: "",
      palpacao_edema: "",
      palpacao_periapical: "",
      palpacao_mobilidade: "",
      patologia_periapical: "Tecidos apicais normais",
      patologia_pulpar: "Polpa normal",
      percussao_horizontal: "",
      percussao_vertical: "",
      plano_tratamento: "Índicação dentística",
      queixa_principal: "",
      regiao_dente: "",
      regiao_periapical: "",
      sensibilidade_pulpar_calor: "",
      sensibilidade_pulpar_frio: "",
      sensibilidade_pulpar_teste_anestesia: "",
      sensibilidade_pulpar_teste_mecanico: "",
      fistula: "",
      instrumentacao_tecnica: "",
      obturacao_cimento: "",
      obturacao_restaurador_provisorio: "",
      obturacao_tecnica: "",
      dentes: [
        {
          ctp: "Não informado",
          crd: "Não informado",
          crt: "Não informado",
          dente: "Não informado",
          iaf: "Não informado",
          iai: "Não informado",
          im: "Não informado",
          cad: "Não informado",
          referencia: "Não informado",
          visto_professor: "Não informado",
        },
      ],
    },
  });

  useEffect(() => {
    async function getEdodontic() {
      const data = await getOneById(idEdodontic || "");
      setValue("aparecimento", data.aparecimento);
      setValue("sede", data.sede);
      setValue("duracao", data.duracao);
      setValue("camara_pulpar", data.camara_pulpar);
      setValue("coloracao_dentaria", data.coloracao_dentaria);
      setValue("coloracao_tecidual", data.coloracao_tecidual);
      setValue("edema_local", data.edema_local);
      setValue("canal_radicular", data.canal_radicular);
      setValue("estrutura_dentaria", data.estrutura_dentaria);
      setValue("frequencia", data.frequencia);

      setValue("inspecao_dente", data.inspecao_dente);
      setValue("intensidade", data.intensidade);
      setValue("observacoes", data.observacoes);
      setValue("palpacao_coronaria", data.palpacao_coronaria);
      setValue("palpacao_edema", data.palpacao_edema);
      setValue("palpacao_periapical", data.palpacao_periapical);
      setValue("palpacao_mobilidade", data.palpacao_mobilidade);
      setValue("patologia_periapical", data.patologia_periapical);
      setValue("patologia_pulpar", data.patologia_pulpar);
      setValue("percussao_horizontal", data.percussao_horizontal);
      setValue("percussao_vertical", data.percussao_vertical);
      setValue("plano_tratamento", data.plano_tratamento);
      setValue("queixa_principal", data.queixa_principal);
      setValue("regiao_dente", data.regiao_dente);
      setValue("regiao_periapical", data.regiao_periapical);
      setValue("sensibilidade_pulpar_calor", data.sensibilidade_pulpar_calor);
      setValue("sensibilidade_pulpar_frio", data.sensibilidade_pulpar_frio);
      setValue(
        "sensibilidade_pulpar_teste_anestesia",
        data.sensibilidade_pulpar_teste_anestesia
      );
      setValue(
        "sensibilidade_pulpar_teste_mecanico",
        data.sensibilidade_pulpar_teste_mecanico
      );
      setValue("fistula", data.fistula);
      setValue("instrumentacao_tecnica", data.instrumentacao_tecnica);
      setValue("obturacao_cimento", data.obturacao_cimento);
      setValue(
        "obturacao_restaurador_provisorio",
        data.obturacao_restaurador_provisorio
      );
      setValue("obturacao_tecnica", data.obturacao_tecnica);
      setValue("dentes", data.dentes);
    }
    if (idEdodontic) {
      getEdodontic();
    }
  }, []);

  const onSubmit = async (data: EdodonticFields) => {
    let response = null;
    if (idEdodontic) {
      response = await updateEdodontics(idEdodontic, data);
    } else {
      response = await createEdodontics({ ...data, id_medical_record: id });
    }
    if (response) navigate(`/prontuarios/${id}`);
  };

  return (
    <>
      <HeadTitleSection
        title={idEdodontic ? "Editar Endodontia" : "Criar Endodontia"}
        backTo={`/prontuarios/${id}`}
      />
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className={`${style["form-edodontic"]} container`}
      >
        <p>Anamnese</p>
        <Divider />

        <Controller
          name="queixa_principal"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Queixa Principal"
              variant="filled"
              fullWidth
              error={!!errors.queixa_principal}
              helperText={errors.queixa_principal?.message}
            />
          )}
        />

        <p>Características clínicas da dor</p>
        <Divider />
        <FormControl color="error">
          <FormLabel id="label-b">Sede</FormLabel>
          <Controller
            name="sede"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-b"
                  {...field}
                  name="row-radio-buttons-group-b"
                >
                  <FormControlLabel
                    value={"Localizada"}
                    control={<Radio color="error" />}
                    label="Localizada"
                  />
                  <FormControlLabel
                    value={"Difusa"}
                    control={<Radio color="error" />}
                    label="Difusa"
                  />
                </RadioGroup>
                <small>{errors.sede?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-b-2">Aparecimento</FormLabel>
          <Controller
            name="aparecimento"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-b-2"
                  {...field}
                  name="row-radio-buttons-group-b-2"
                >
                  <FormControlLabel
                    value={"Provocado"}
                    control={<Radio color="error" />}
                    label="Provocado"
                  />
                  <FormControlLabel
                    value={"Espontâneo"}
                    control={<Radio color="error" />}
                    label="Espontâneo"
                  />
                  <FormControlLabel
                    value={"Simultâneo"}
                    control={<Radio color="error" />}
                    label="Simultâneo"
                  />
                </RadioGroup>
                <small>{errors.aparecimento?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-b-3">Duração</FormLabel>
          <Controller
            name="duracao"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-b-3"
                  {...field}
                  name="row-radio-buttons-group-b-3"
                >
                  <FormControlLabel
                    value={"Curta"}
                    control={<Radio color="error" />}
                    label="Curta"
                  />
                  <FormControlLabel
                    value={"Longa"}
                    control={<Radio color="error" />}
                    label="Longa"
                  />
                </RadioGroup>
                <small>{errors.duracao?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-b-4">Frequência</FormLabel>
          <Controller
            name="frequencia"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-b-4"
                  {...field}
                  name="row-radio-buttons-group-b-4"
                >
                  <FormControlLabel
                    value={"Intermitente"}
                    control={<Radio color="error" />}
                    label="Intermitente"
                  />
                  <FormControlLabel
                    value={"Contínua"}
                    control={<Radio color="error" />}
                    label="Contínua"
                  />
                </RadioGroup>
                <small>{errors.frequencia?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-b-5">Intensidade</FormLabel>
          <Controller
            name="intensidade"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-b-5"
                  {...field}
                  name="row-radio-buttons-group-b-5"
                >
                  <FormControlLabel
                    value={"Leve"}
                    control={<Radio color="success" />}
                    label="Leve"
                  />
                  <FormControlLabel
                    value={"Moderada"}
                    control={<Radio color="warning" />}
                    label="Moderada"
                  />
                  <FormControlLabel
                    value={"Intensa"}
                    control={<Radio color="error" />}
                    label="Intensa"
                  />
                </RadioGroup>
                <small>{errors.frequencia?.message}</small>
              </>
            )}
          />
        </FormControl>

        <p>Exame Clínico</p>
        <Divider />

        <Controller
          name="inspecao_dente"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Inspeção do dente"
              variant="filled"
              fullWidth
              error={!!errors.inspecao_dente}
              helperText={errors.inspecao_dente?.message}
            />
          )}
        />

        <Controller
          name="regiao_dente"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Região do dente"
              variant="filled"
              fullWidth
              error={!!errors.regiao_dente}
              helperText={errors.regiao_dente?.message}
            />
          )}
        />

        <FormControl color="error">
          <FormLabel id="label-c">Estrutura Dentária</FormLabel>
          <Controller
            name="estrutura_dentaria"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-c"
                  {...field}
                  name="row-radio-buttons-group-c"
                >
                  <FormControlLabel
                    value={"Íntegra"}
                    control={<Radio color="error" />}
                    label="Íntegra"
                  />
                  <FormControlLabel
                    value={"Cariada"}
                    control={<Radio color="error" />}
                    label="Cariada"
                  />
                  <FormControlLabel
                    value={"Restaurada"}
                    control={<Radio color="error" />}
                    label="Restaurada"
                  />
                  <FormControlLabel
                    value={"Fraturada"}
                    control={<Radio color="error" />}
                    label="Fraturada"
                  />
                </RadioGroup>
                <small>{errors.estrutura_dentaria?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-c-1">Coloração Dentária</FormLabel>
          <Controller
            name="coloracao_dentaria"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-c-1"
                  {...field}
                  name="row-radio-buttons-group-c-1"
                >
                  <FormControlLabel
                    value={"Normal"}
                    control={<Radio color="error" />}
                    label="Normal"
                  />
                  <FormControlLabel
                    value={"Modificada"}
                    control={<Radio color="error" />}
                    label="Modificada"
                  />
                </RadioGroup>
                <small>{errors.coloracao_dentaria?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-c-2">Coloração Tecidual</FormLabel>
          <Controller
            name="coloracao_tecidual"
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
                    value={"Normal"}
                    control={<Radio color="error" />}
                    label="Normal"
                  />
                  <FormControlLabel
                    value={"Modificada"}
                    control={<Radio color="error" />}
                    label="Modificada"
                  />
                </RadioGroup>
                <small>{errors.coloracao_tecidual?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-c-3">Edema Local</FormLabel>
          <Controller
            name="edema_local"
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
                    value={"Ausente"}
                    control={<Radio color="error" />}
                    label="Ausente"
                  />
                  <FormControlLabel
                    value={"Difuso"}
                    control={<Radio color="error" />}
                    label="Difuso"
                  />
                  <FormControlLabel
                    value={"Intrabucal"}
                    control={<Radio color="error" />}
                    label="Intrabucal"
                  />
                  <FormControlLabel
                    value={"Extrabucal"}
                    control={<Radio color="error" />}
                    label="Extrabucal"
                  />
                </RadioGroup>
                <small>{errors.edema_local?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-c-4">Fístula</FormLabel>
          <Controller
            name="fistula"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-c-4"
                  {...field}
                  name="row-radio-buttons-group-c-4"
                >
                  <FormControlLabel
                    value={"Ausente"}
                    control={<Radio color="error" />}
                    label="Ausente"
                  />
                  <FormControlLabel
                    value={"Mucosa"}
                    control={<Radio color="error" />}
                    label="Mucosa"
                  />
                  <FormControlLabel
                    value={"Cutânea"}
                    control={<Radio color="error" />}
                    label="Cutânea"
                  />
                </RadioGroup>
                <small>{errors.fistula?.message}</small>
              </>
            )}
          />
        </FormControl>

        <p>Palpação</p>
        <Divider />

        <FormControl color="error">
          <FormLabel id="label-d">Coronária</FormLabel>
          <Controller
            name="palpacao_coronaria"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-d"
                  {...field}
                  name="row-radio-buttons-group-d"
                >
                  <FormControlLabel
                    value={"Presença de dor"}
                    control={<Radio color="error" />}
                    label="Presença de dor"
                  />
                  <FormControlLabel
                    value={"Ausência de dor"}
                    control={<Radio color="error" />}
                    label="Ausência de dor"
                  />
                </RadioGroup>
                <small>{errors.palpacao_coronaria?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-d-1">Periapical</FormLabel>
          <Controller
            name="palpacao_periapical"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-d-1"
                  {...field}
                  name="row-radio-buttons-group-d-1"
                >
                  <FormControlLabel
                    value={"Presença de dor"}
                    control={<Radio color="error" />}
                    label="Presença de dor"
                  />
                  <FormControlLabel
                    value={"Ausência de dor"}
                    control={<Radio color="error" />}
                    label="Ausência de dor"
                  />
                </RadioGroup>
                <small>{errors.palpacao_periapical?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-d-2">Edema</FormLabel>
          <Controller
            name="palpacao_edema"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-d-2"
                  {...field}
                  name="row-radio-buttons-group-d-2"
                >
                  <FormControlLabel
                    value={"Ausente"}
                    control={<Radio color="error" />}
                    label="Ausente"
                  />
                  <FormControlLabel
                    value={"Em evolução"}
                    control={<Radio color="error" />}
                    label="Em evolução"
                  />
                  <FormControlLabel
                    value={"Evoluído"}
                    control={<Radio color="error" />}
                    label="Evoluído"
                  />
                </RadioGroup>
                <small>{errors.palpacao_edema?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-d-3">Mobilidade</FormLabel>
          <Controller
            name="palpacao_mobilidade"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-d-3"
                  {...field}
                  name="row-radio-buttons-group-d-3"
                >
                  <FormControlLabel
                    value={"Ausente"}
                    control={<Radio color="error" />}
                    label="Ausente"
                  />
                  <FormControlLabel
                    value={"Presente"}
                    control={<Radio color="error" />}
                    label="Presente"
                  />
                </RadioGroup>
                <small>{errors.palpacao_mobilidade?.message}</small>
              </>
            )}
          />
        </FormControl>

        <p>Percussão</p>
        <Divider />

        <FormControl color="error">
          <FormLabel id="label-e">Vertical</FormLabel>
          <Controller
            name="percussao_vertical"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-e"
                  {...field}
                  name="row-radio-buttons-group-e"
                >
                  <FormControlLabel
                    value={"Ausência de dor"}
                    control={<Radio color="error" />}
                    label="Ausência de dor"
                  />
                  <FormControlLabel
                    value={"Presença de dor"}
                    control={<Radio color="error" />}
                    label="Presença de dor"
                  />
                </RadioGroup>
                <small>{errors.percussao_vertical?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-e-1">Horizontal</FormLabel>
          <Controller
            name="percussao_horizontal"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-e-1"
                  {...field}
                  name="row-radio-buttons-group-e-1"
                >
                  <FormControlLabel
                    value={"Ausência de dor"}
                    control={<Radio color="error" />}
                    label="Ausência de dor"
                  />
                  <FormControlLabel
                    value={"Presença de dor"}
                    control={<Radio color="error" />}
                    label="Presença de dor"
                  />
                </RadioGroup>
                <small>{errors.percussao_horizontal?.message}</small>
              </>
            )}
          />
        </FormControl>

        <p>Exame de Sensibilidade pulpar</p>
        <Divider />

        <FormControl color="error">
          <FormLabel id="label-f">Teste Térmico (Frio)</FormLabel>
          <Controller
            name="sensibilidade_pulpar_frio"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-f"
                  {...field}
                  name="row-radio-buttons-group-f"
                >
                  <FormControlLabel
                    value={"Ausência de sensibilidade"}
                    control={<Radio color="error" />}
                    label="Ausência de sensibilidade"
                  />
                  <FormControlLabel
                    value={"Alívio"}
                    control={<Radio color="error" />}
                    label="Alívio"
                  />

                  <FormControlLabel
                    value={"Estímulo"}
                    control={<Radio color="error" />}
                    label="Estímulo"
                  />

                  <FormControlLabel
                    value={"Teste não realizado"}
                    control={<Radio color="error" />}
                    label="Teste não realizado"
                  />
                </RadioGroup>
                <small>{errors.sensibilidade_pulpar_frio?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-f-1">Teste Térmico (Calor)</FormLabel>
          <Controller
            name="sensibilidade_pulpar_calor"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-f-1"
                  {...field}
                  name="row-radio-buttons-group-f-1"
                >
                  <FormControlLabel
                    value={"Ausência de sensibilidade"}
                    control={<Radio color="error" />}
                    label="Ausência de sensibilidade"
                  />
                  <FormControlLabel
                    value={"Alívio"}
                    control={<Radio color="error" />}
                    label="Alívio"
                  />

                  <FormControlLabel
                    value={"Estímulo"}
                    control={<Radio color="error" />}
                    label="Estímulo"
                  />
                  <FormControlLabel
                    value={"Teste não realizado"}
                    control={<Radio color="error" />}
                    label="Teste não realizado"
                  />
                </RadioGroup>
                <small>{errors.sensibilidade_pulpar_calor?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-f-3">Teste Mecânico</FormLabel>
          <Controller
            name="sensibilidade_pulpar_teste_mecanico"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-f-3"
                  {...field}
                  name="row-radio-buttons-group-f-3"
                >
                  <FormControlLabel
                    value={"Ausência de dor"}
                    control={<Radio color="error" />}
                    label="Ausência de dor"
                  />
                  <FormControlLabel
                    value={"Presença de dor"}
                    control={<Radio color="error" />}
                    label="Presença de dor"
                  />
                  <FormControlLabel
                    value={"Teste não realizado"}
                    control={<Radio color="error" />}
                    label="Teste não realizado"
                  />
                </RadioGroup>
                <small>
                  {errors.sensibilidade_pulpar_teste_mecanico?.message}
                </small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-f-4">Teste Anestesia</FormLabel>
          <Controller
            name="sensibilidade_pulpar_teste_anestesia"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-f-4"
                  {...field}
                  name="row-radio-buttons-group-f-4"
                >
                  <FormControlLabel
                    value={"Ausência de dor"}
                    control={<Radio color="error" />}
                    label="Ausência de dor"
                  />
                  <FormControlLabel
                    value={"Presença de dor"}
                    control={<Radio color="error" />}
                    label="Presença de dor"
                  />
                  <FormControlLabel
                    value={"Teste não realizado"}
                    control={<Radio color="error" />}
                    label="Teste não realizado"
                  />
                </RadioGroup>
                <small>
                  {errors.sensibilidade_pulpar_teste_anestesia?.message}
                </small>
              </>
            )}
          />
        </FormControl>

        <Controller
          name="observacoes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Observações"
              variant="filled"
              fullWidth
              error={!!errors.observacoes}
              helperText={errors.observacoes?.message}
            />
          )}
        />

        <p>Análise de aspecto radiográfico</p>
        <Divider />

        <FormControl color="error">
          <FormLabel id="label-g">Câmara Pulpar</FormLabel>
          <Controller
            name="camara_pulpar"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-g"
                  {...field}
                  name="row-radio-buttons-group-g"
                >
                  <FormControlLabel
                    value={"Normal"}
                    control={<Radio color="error" />}
                    label="Normal"
                  />

                  <FormControlLabel
                    value={"Atresiada"}
                    control={<Radio color="error" />}
                    label="Atresiada"
                  />

                  <FormControlLabel
                    value={"Cálculo"}
                    control={<Radio color="error" />}
                    label="Cálculo"
                  />

                  <FormControlLabel
                    value={"Cariada"}
                    control={<Radio color="error" />}
                    label="Cariada"
                  />

                  <FormControlLabel
                    value={"Ampla"}
                    control={<Radio color="error" />}
                    label="Ampla"
                  />

                  <FormControlLabel
                    value={"Calcificada"}
                    control={<Radio color="error" />}
                    label="Calcificada"
                  />

                  <FormControlLabel
                    value={"Obturada"}
                    control={<Radio color="error" />}
                    label="Obturada"
                  />
                </RadioGroup>
                <small>{errors.camara_pulpar?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-g-1">Canal Radicular</FormLabel>
          <Controller
            name="canal_radicular"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-g-1"
                  {...field}
                  name="row-radio-buttons-group-g-1"
                >
                  <FormControlLabel
                    value={"Normal"}
                    control={<Radio color="error" />}
                    label="Normal"
                  />

                  <FormControlLabel
                    value={"Atresiada"}
                    control={<Radio color="error" />}
                    label="Atresiada"
                  />

                  <FormControlLabel
                    value={"Reabsorção interna"}
                    control={<Radio color="error" />}
                    label="Reabsorção interna"
                  />

                  <FormControlLabel
                    value={"Reabsorção externa"}
                    control={<Radio color="error" />}
                    label="Reabsorção externa"
                  />

                  <FormControlLabel
                    value={"Obturado totalmente"}
                    control={<Radio color="error" />}
                    label="Obturado totalmente"
                  />

                  <FormControlLabel
                    value={"Obturado parcialmente"}
                    control={<Radio color="error" />}
                    label="Obturado parcialmente"
                  />
                  <FormControlLabel
                    value={"Rizogênese incompleta"}
                    control={<Radio color="error" />}
                    label="Rizogênese incompleta"
                  />
                </RadioGroup>
                <small>{errors.canal_radicular?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl color="error">
          <FormLabel id="label-g-2">Região Periapical</FormLabel>
          <Controller
            name="regiao_periapical"
            control={control}
            render={({ field }) => (
              <>
                <RadioGroup
                  color="error"
                  row
                  aria-labelledby="label-g-2"
                  {...field}
                  name="row-radio-buttons-group-g-2"
                >
                  <FormControlLabel
                    value={"Ligamento periodontal normal"}
                    control={<Radio color="error" />}
                    label="Ligamento periodontal normal"
                  />

                  <FormControlLabel
                    value={"Ligamento periodontal alargado"}
                    control={<Radio color="error" />}
                    label="Ligamento periodontal alargado"
                  />

                  <FormControlLabel
                    value={"Hipercementose"}
                    control={<Radio color="error" />}
                    label="Hipercementose"
                  />

                  <FormControlLabel
                    value={"Reabsorção periapical"}
                    control={<Radio color="error" />}
                    label="Reabsorção periapical"
                  />

                  <FormControlLabel
                    value={"Rarefação óssea difusa"}
                    control={<Radio color="error" />}
                    label="Rarefação óssea difusa"
                  />

                  <FormControlLabel
                    value={"Rarefação óssea circunscrita"}
                    control={<Radio color="error" />}
                    label="Rarefação óssea circunscrita"
                  />

                  <FormControlLabel
                    value={"Osteosclerose"}
                    control={<Radio color="error" />}
                    label="Osteosclerose"
                  />
                </RadioGroup>
                <small>{errors.regiao_periapical?.message}</small>
              </>
            )}
          />
        </FormControl>

        <p>Diagnóstico Provável</p>
        <Divider />

        <Controller
          name="patologia_pulpar"
          control={control}
          render={({ field }) => (
            <>
              <FormControl variant="filled">
                <InputLabel
                  htmlFor="patologia_pulpar"
                  id="label-patologia_pulpar"
                  color="error"
                >
                  Patologia Pulpar
                </InputLabel>
                <Select
                  {...field}
                  color="error"
                  id="patologia_pulpar"
                  label="Patologia Pulpar"
                  error={!!errors.patologia_pulpar}
                  defaultValue="Polpa normal"
                  fullWidth
                >
                  <MenuItem value={"Polpa normal"}>Polpa normal</MenuItem>
                  <MenuItem value={"Polpa reversível"}>
                    Polpa reversível
                  </MenuItem>
                  <MenuItem value={"Polpa ireversível sintomática"}>
                    Polpa ireversível sintomática
                  </MenuItem>
                  <MenuItem value={"Polpa ireversível assintomática"}>
                    Polpa ireversível assintomática
                  </MenuItem>
                  <MenuItem value={"Necrose pulpar"}>Necrose Pulpar</MenuItem>
                  <MenuItem value={"Previamente tratado"}>
                    Previamente tratado
                  </MenuItem>
                  <MenuItem value={"Terapia previamente iniciada"}>
                    Terapia previamente iniciada
                  </MenuItem>
                </Select>
              </FormControl>
              <small>{errors.patologia_pulpar?.message}</small>
            </>
          )}
        />

        <Controller
          name="patologia_periapical"
          control={control}
          render={({ field }) => (
            <>
              <FormControl variant="filled">
                <InputLabel
                  htmlFor="patologia_periapical"
                  id="label-patologia_periapical"
                  color="error"
                >
                  Patologia Periapical
                </InputLabel>
                <Select
                  {...field}
                  color="error"
                  id="patologia_periapical"
                  label="Patologia Periapical"
                  error={!!errors.patologia_periapical}
                  fullWidth
                >
                  <MenuItem value={"Tecidos apicais normais"}>
                    Tecidos apicais normais
                  </MenuItem>
                  <MenuItem value={"Periodontite apical sintomática"}>
                    Periodontite apical sintomática
                  </MenuItem>
                  <MenuItem value={"Periodontite apical assintomática"}>
                    Periodontite apical assintomática
                  </MenuItem>
                  <MenuItem value={"Abcesso apical agudo"}>
                    Abcesso apical agudo
                  </MenuItem>
                  <MenuItem value={"Abcesso crônico"}>Abcesso crônico</MenuItem>
                  <MenuItem value={"Osteíte condensante"}>
                    Osteíte condensante
                  </MenuItem>
                </Select>
              </FormControl>
              <small>{errors.patologia_periapical?.message}</small>
            </>
          )}
        />

        <Controller
          name="plano_tratamento"
          control={control}
          render={({ field }) => (
            <>
              <FormControl variant="filled">
                <InputLabel
                  htmlFor="plano_tratamento"
                  id="label-plano_tratamento"
                  color="error"
                >
                  Plano de Tratamento
                </InputLabel>
                <Select
                  {...field}
                  color="error"
                  id="plano_tratamento"
                  defaultValue="Normal"
                  error={!!errors.plano_tratamento}
                  fullWidth
                >
                  <MenuItem value={"Índicação dentística"}>
                    Índicação dentística
                  </MenuItem>
                  <MenuItem value={"Tratamento conservador"}>
                    Tratamento conservador
                  </MenuItem>
                  <MenuItem value={"Biopulpectomia"}>Biopulpectomia</MenuItem>
                  <MenuItem value={"Necropulpectomia I"}>
                    Necropulpectomia I
                  </MenuItem>
                  <MenuItem value={"Necropulpectomia II"}>
                    Necropulpectomia II
                  </MenuItem>
                  <MenuItem value={"Retratamento Edodôntico"}>
                    Retratamento Edodôntico
                  </MenuItem>

                  <MenuItem value={"Cirurgia parendodôntica"}>
                    Cirurgia parendodôntica
                  </MenuItem>
                  <MenuItem value={"Atendimento urgência"}>
                    Atendimento urgência
                  </MenuItem>
                </Select>
              </FormControl>
              <small>{errors.plano_tratamento?.message}</small>
            </>
          )}
        />

        <p>Instrumentação</p>
        <Divider />

        <Controller
          name="instrumentacao_tecnica"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Técnica de instrumentação"
              variant="filled"
              fullWidth
              error={!!errors.instrumentacao_tecnica}
              helperText={errors.instrumentacao_tecnica?.message}
            />
          )}
        />

        {watch("dentes") &&
          watch("dentes")?.map((_, index) => (
            <Box className={style["box-dente"]} key={index}>
              <MoreOptions
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 5,
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
              <FormControl className={style["form-control-dente"]}>
                <Controller
                  name={`dentes.${index}.dente`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="error"
                      label="Dente"
                      variant="filled"
                      fullWidth
                      error={!!errors.dentes?.[index]?.dente}
                      helperText={errors.dentes?.[index]?.dente?.message}
                    />
                  )}
                />
                <Controller
                  name={`dentes.${index}.referencia`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="error"
                      label="Referência"
                      variant="filled"
                      fullWidth
                      error={!!errors.dentes?.[index]?.referencia}
                      helperText={errors.dentes?.[index]?.referencia?.message}
                    />
                  )}
                />
              </FormControl>
              <Controller
                name={`dentes.${index}.cad`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    color="error"
                    label="CAD"
                    variant="filled"
                    fullWidth
                    error={!!errors.dentes?.[index]?.cad}
                    helperText={errors.dentes?.[index]?.cad?.message}
                  />
                )}
              />
              <FormControl className={style["form-control-dente"]}>
                <Controller
                  name={`dentes.${index}.ctp`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="error"
                      label="CTP"
                      variant="filled"
                      fullWidth
                      error={!!errors.dentes?.[index]?.ctp}
                      helperText={errors.dentes?.[index]?.ctp?.message}
                    />
                  )}
                />
                <Controller
                  name={`dentes.${index}.crd`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="error"
                      label="CRD"
                      variant="filled"
                      fullWidth
                      error={!!errors.dentes?.[index]?.crd}
                      helperText={errors.dentes?.[index]?.crd?.message}
                    />
                  )}
                />
                <Controller
                  name={`dentes.${index}.crt`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="error"
                      label="CRT"
                      variant="filled"
                      fullWidth
                      error={!!errors.dentes?.[index]?.crt}
                      helperText={errors.dentes?.[index]?.crt?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl className={style["form-control-dente"]}>
                <Controller
                  name={`dentes.${index}.iaf`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="error"
                      label="IAF"
                      variant="filled"
                      fullWidth
                      error={!!errors.dentes?.[index]?.iaf}
                      helperText={errors.dentes?.[index]?.iaf?.message}
                    />
                  )}
                />
                <Controller
                  name={`dentes.${index}.iai`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="error"
                      label="IAI"
                      variant="filled"
                      fullWidth
                      error={!!errors.dentes?.[index]?.iai}
                      helperText={errors.dentes?.[index]?.iai?.message}
                    />
                  )}
                />
                <Controller
                  name={`dentes.${index}.im`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="error"
                      label="IM"
                      variant="filled"
                      fullWidth
                      error={!!errors.dentes?.[index]?.im}
                      helperText={errors.dentes?.[index]?.im?.message}
                    />
                  )}
                />
              </FormControl>

              <Controller
                name={`dentes.${index}.visto_professor`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    color="error"
                    label="Visto Professor"
                    variant="filled"
                    fullWidth
                    disabled={!isTeacher()}
                    error={!!errors.dentes?.[index]?.visto_professor}
                    helperText={
                      errors.dentes?.[index]?.visto_professor?.message
                    }
                  />
                )}
              />
            </Box>
          ))}

        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setValue("dentes", [
              ...(watch("dentes") || []),
              {
                ctp: "Não informado",
                crd: "Não informado",
                crt: "Não informado",
                dente: "Não informado",
                iaf: "Não informado",
                iai: "Não informado",
                im: "Não informado",
                cad: "Não informado",
                referencia: "Não informado",
                visto_professor: "Não informado",
              },
            ]);
          }}
        >
          Adicionar Dente
        </Button>

        <p>Obturação</p>
        <Divider />

        <Controller
          name="obturacao_tecnica"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Técnica de obturação"
              variant="filled"
              fullWidth
              error={!!errors.obturacao_tecnica}
              helperText={errors.obturacao_tecnica?.message}
            />
          )}
        />

        <Controller
          name="obturacao_cimento"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Cimento obturador"
              variant="filled"
              fullWidth
              error={!!errors.obturacao_cimento}
              helperText={errors.obturacao_cimento?.message}
            />
          )}
        />

        <Controller
          name="obturacao_restaurador_provisorio"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="error"
              label="Restaurador provisório"
              variant="filled"
              fullWidth
              error={!!errors.obturacao_restaurador_provisorio}
              helperText={errors.obturacao_restaurador_provisorio?.message}
            />
          )}
        />

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
