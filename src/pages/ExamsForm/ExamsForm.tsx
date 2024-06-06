import style from "./ExamsForm.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import { Box, TextField } from "@mui/material";
import { ExamFields } from "./types/ExamFields";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ExamSchema } from "./schemas/ExamSchema";
import { useEffect } from "react";
import useExams from "../../global/hooks/useExams";
import useLoading from "../../global/hooks/useLoading";
import { LoadingButton } from "@mui/lab";

export default function ExamsForm() {
  const { id, idExams } = useParams();
  const { createExam, updateExam, getOneById } = useExams();
  const navigate = useNavigate();
  const { loading } = useLoading();
  const {
    formState: { errors },
    control,
    setValue,
    handleSubmit,
  } = useForm<ExamFields>({
    resolver: yupResolver(ExamSchema),
    defaultValues: {
      anormalidades_encontradas: "",
      higiene_bucal: "",
      exames_complementares: "",
      exame_intrabucal_labios: "",
      exame_intrabucal_palato_duro: "",
      exame_intrabucal_lingua: "",
      exame_intrabucal_faringe: "",
      exame_intrabucal_gengivas: "",
      exame_intrabucal_habitos: "",
      exame_intrabucal_mucosa_jugal: "",
      exame_intrabucal_palato_mole: "",
      exame_intrabucal_assoalho_bucal: "",
      exame_intrabucal_glan_salivares: "",
      exame_intrabucal_atm: "",
      exame_intrabucal_outros: "",
      resultados_encontrados: "",
    },
  });

  useEffect(() => {
    async function fetchExam() {
      const data: ExamFields = await getOneById(idExams || "");
      setValue("anormalidades_encontradas", data.anormalidades_encontradas);
      setValue("higiene_bucal", data.higiene_bucal);
      setValue("exames_complementares", data.exames_complementares);
      setValue("exame_intrabucal_labios", data.exame_intrabucal_labios);
      setValue(
        "exame_intrabucal_palato_duro",
        data.exame_intrabucal_palato_duro
      );
      setValue("exame_intrabucal_lingua", data.exame_intrabucal_lingua);
      setValue("exame_intrabucal_faringe", data.exame_intrabucal_faringe);
      setValue("exame_intrabucal_gengivas", data.exame_intrabucal_gengivas);
      setValue("exame_intrabucal_habitos", data.exame_intrabucal_habitos);
      setValue(
        "exame_intrabucal_mucosa_jugal",
        data.exame_intrabucal_mucosa_jugal
      );
      setValue(
        "exame_intrabucal_palato_mole",
        data.exame_intrabucal_palato_mole
      );
      setValue(
        "exame_intrabucal_assoalho_bucal",
        data.exame_intrabucal_assoalho_bucal
      );
      setValue(
        "exame_intrabucal_glan_salivares",
        data.exame_intrabucal_glan_salivares
      );
      setValue("exame_intrabucal_atm", data.exame_intrabucal_atm);
      setValue("exame_intrabucal_outros", data.exame_intrabucal_outros);
      setValue("resultados_encontrados", data.resultados_encontrados);
    }
    if (idExams) {
      fetchExam();
    }
  }, []);

  const onSubmit = async (data: ExamFields) => {
    let response = null;
    if (idExams) {
      response = await updateExam(idExams, data);
    } else {
      response = await createExam({ ...data, id_medical_record: id });
    }
    if (response) navigate(`/prontuarios/${id}`);
  };

  return (
    <>
      <HeadTitleSection
        backTo={`/prontuarios/${id}`}
        title={
          idExams
            ? "Editar exames complementares"
            : "Criar exames complementares"
        }
      />
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className={`container ${style["form-exams"]}`}
      >
        <Controller
          name="anormalidades_encontradas"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Anormalidades Encontradas"
              variant="filled"
              color="error"
              error={!!errors.anormalidades_encontradas}
              helperText={
                errors.anormalidades_encontradas ? "Campo obrigatório" : ""
              }
            />
          )}
        />
        <Controller
          name="higiene_bucal"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              variant="filled"
              color="error"
              {...field}
              label="Higiene Bucal"
              error={!!errors.higiene_bucal}
              helperText={errors.higiene_bucal ? "Campo obrigatório" : ""}
            />
          )}
        />
        <Controller
          name="exames_complementares"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              color="error"
              label="Exames Complementares"
              error={!!errors.exames_complementares}
              helperText={
                errors.exames_complementares ? "Campo obrigatório" : ""
              }
            />
          )}
        />

        <Controller
          name="exame_intrabucal_labios"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              color="error"
              label="Exame Intrabucal Labios"
              error={!!errors.exame_intrabucal_labios}
              helperText={
                errors.exame_intrabucal_labios ? "Campo obrigatório" : ""
              }
            />
          )}
        />
        <Controller
          name="exame_intrabucal_palato_duro"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              color="error"
              label="Exame Intrabucal Palato Duro"
              error={!!errors.exame_intrabucal_palato_duro}
              helperText={
                errors.exame_intrabucal_palato_duro ? "Campo obrigatório" : ""
              }
            />
          )}
        />
        <Controller
          name="exame_intrabucal_lingua"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Exame Intrabucal Língua"
              variant="filled"
              color="error"
              error={!!errors.exame_intrabucal_lingua}
              helperText={
                errors.exame_intrabucal_lingua ? "Campo obrigatório" : ""
              }
            />
          )}
        />
        <Controller
          name="exame_intrabucal_faringe"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Exame Intrabucal Faringe"
              variant="filled"
              color="error"
              error={!!errors.exame_intrabucal_faringe}
              helperText={
                errors.exame_intrabucal_faringe ? "Campo obrigatório" : ""
              }
            />
          )}
        />
        <Controller
          name="exame_intrabucal_gengivas"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Exame Intrabucal Gengivas"
              variant="filled"
              color="error"
              error={!!errors.exame_intrabucal_gengivas}
              helperText={
                errors.exame_intrabucal_gengivas ? "Campo obrigatório" : ""
              }
            />
          )}
        />
        <Controller
          name="exame_intrabucal_habitos"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Exame Intrabucal Hábitos"
              variant="filled"
              color="error"
              error={!!errors.exame_intrabucal_habitos}
              helperText={
                errors.exame_intrabucal_habitos ? "Campo obrigatório" : ""
              }
            />
          )}
        />
        <Controller
          name="exame_intrabucal_mucosa_jugal"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Exame Intrabucal Mucosa Jugal"
              variant="filled"
              color="error"
              error={!!errors.exame_intrabucal_mucosa_jugal}
              helperText={
                errors.exame_intrabucal_mucosa_jugal ? "Campo obrigatório" : ""
              }
            />
          )}
        />
        <Controller
          name="exame_intrabucal_palato_mole"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Exame Intrabucal Palato Mole"
              variant="filled"
              color="error"
              error={!!errors.exame_intrabucal_palato_mole}
              helperText={
                errors.exame_intrabucal_palato_mole ? "Campo obrigatório" : ""
              }
            />
          )}
        />
        <Controller
          name="exame_intrabucal_assoalho_bucal"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Exame Intrabucal Assoalho Bucal"
              variant="filled"
              color="error"
              error={!!errors.exame_intrabucal_assoalho_bucal}
              helperText={
                errors.exame_intrabucal_assoalho_bucal
                  ? "Campo obrigatório"
                  : ""
              }
            />
          )}
        />
        <Controller
          name="exame_intrabucal_glan_salivares"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Exame Intrabucal Glândulas Salivares"
              variant="filled"
              color="error"
              error={!!errors.exame_intrabucal_glan_salivares}
              helperText={
                errors.exame_intrabucal_glan_salivares
                  ? "Campo obrigatório"
                  : ""
              }
            />
          )}
        />
        <Controller
          name="exame_intrabucal_atm"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Exame Intrabucal ATM"
              variant="filled"
              color="error"
              error={!!errors.exame_intrabucal_atm}
              helperText={
                errors.exame_intrabucal_atm ? "Campo obrigatório" : ""
              }
            />
          )}
        />
        <Controller
          name="exame_intrabucal_outros"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Exame Intrabucal Outros"
              variant="filled"
              color="error"
              error={!!errors.exame_intrabucal_outros}
              helperText={
                errors.exame_intrabucal_outros ? "Campo obrigatório" : ""
              }
            />
          )}
        />
        <Controller
          name="resultados_encontrados"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Resultados Encontrados"
              variant="filled"
              color="error"
              error={!!errors.resultados_encontrados}
              helperText={
                errors.resultados_encontrados ? "Campo obrigatório" : ""
              }
            />
          )}
        />
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
