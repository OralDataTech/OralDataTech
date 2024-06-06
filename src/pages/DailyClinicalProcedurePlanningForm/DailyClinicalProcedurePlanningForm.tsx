import { LoadingButton } from "@mui/lab";
import style from "./DailyClinicalProcedurePlanningForm.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DailyFields } from "./types/DailyFields";
import { yupResolver } from "@hookform/resolvers/yup";
import { DailySchema } from "./schema/DailySchema";
import useLoading from "../../global/hooks/useLoading";
import useDaily from "../../global/hooks/useDaily";
import SelectUser from "./components/select-user/SelectUser";
import { User } from "../../global/types/User";
import useAuth from "../../global/hooks/useAuth";
export default function DailyClinicalProcedurePlanningForm() {
  const { id, idDaily } = useParams();
  const navigate = useNavigate();
  const { loading } = useLoading();
  const { createDaily, getOneById, updateDaily } = useDaily();
  const { isTeacher } = useAuth();

  const [alunoASB, setAlunoASB] = useState<User>();
  const [alunoCD, setAlunoCD] = useState<User>();
  const [professor, setProfessor] = useState<User>();

  const {
    formState: { errors },
    control,
    setValue,
    handleSubmit,
  } = useForm<DailyFields>({
    resolver: yupResolver(DailySchema),
    defaultValues: {
      aspectos_relevantes_da_anamnese: "",
      aspectos_relevantes_do_exame_radiografico: "",
      avaliacao_professor: "",
      data: new Date().toISOString().split("T")[0],
      diagnostico: "",
      id_aluno_asb: "",
      id_aluno_cd: "",
      id_medical_record: id,
      id_professor: "",
      procedimento: "",
      protocolo_clinico: "",
    },
  });

  useEffect(() => {
    async function fetch() {
      const data = await getOneById(idDaily || "");
      setValue(
        "aspectos_relevantes_da_anamnese",
        data.aspectos_relevantes_da_anamnese
      );
      setValue(
        "aspectos_relevantes_do_exame_radiografico",
        data.aspectos_relevantes_do_exame_radiografico
      );
      setValue("avaliacao_professor", data.avaliacao_professor);
      setValue("data", new Date(data.data).toISOString().split("T")[0]);
      setValue("diagnostico", data.diagnostico);

      setValue("id_aluno_asb", data.aluno_asb.id);
      setValue("id_aluno_cd", data.aluno_cd.id);
      setValue("id_professor", data.professor.id);

      setAlunoASB(data.aluno_asb);
      setAlunoCD(data.aluno_cd);
      setProfessor(data.professor);

      setValue("procedimento", data.procedimento);
      setValue("protocolo_clinico", data.protocolo_clinico);
    }
    if (idDaily) {
      fetch();
    }
  }, []);

  const onSubmit = async (data: DailyFields) => {
    let response = null;
    if (idDaily) {
      response = await updateDaily(idDaily, data);
    } else {
      response = await createDaily({ ...data, id_medical_record: id || "" });
    }
    if (response) navigate(`/prontuarios/${id}`);
  };

  return (
    <>
      <HeadTitleSection
        backTo={`/prontuarios/${id}`}
        title={
          idDaily
            ? "Editar Plano de Tratamento Clínico Diário"
            : "Criar Plano de Tratamento Clínico Diário"
        }
      />
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className={`container ${style["form-daily"]}`}
      >
        <Controller
          name="aspectos_relevantes_da_anamnese"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Aspectos relevantes da anamnese"
              variant="filled"
              color="error"
              error={!!errors.aspectos_relevantes_da_anamnese}
              helperText={
                errors.aspectos_relevantes_da_anamnese
                  ? "Campo obrigatório"
                  : ""
              }
            />
          )}
        />

        <Controller
          name="data"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Aspectos relevantes da anamnese"
              variant="filled"
              color="error"
              type="date"
              error={!!errors.data}
              helperText={errors.data ? "Campo obrigatório" : ""}
            />
          )}
        />

        <Controller
          name="aspectos_relevantes_do_exame_radiografico"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Aspectos relevantes do exame radiográfico"
              variant="filled"
              color="error"
              error={!!errors.aspectos_relevantes_do_exame_radiografico}
              helperText={
                errors.aspectos_relevantes_do_exame_radiografico
                  ? "Campo obrigatório"
                  : ""
              }
            />
          )}
        />

        <Controller
          name="procedimento"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Procedimento"
              variant="filled"
              color="error"
              error={!!errors.procedimento}
              helperText={errors.procedimento ? "Campo obrigatório" : ""}
            />
          )}
        />

        <Controller
          name="protocolo_clinico"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Protocolo Clínico"
              variant="filled"
              color="error"
              error={!!errors.protocolo_clinico}
              helperText={errors.protocolo_clinico ? "Campo obrigatório" : ""}
            />
          )}
        />

        <Controller
          name="diagnostico"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Diagnóstico"
              variant="filled"
              color="error"
              error={!!errors.diagnostico}
              helperText={errors.diagnostico ? "Campo obrigatório" : ""}
            />
          )}
        />

        <Controller
          name="avaliacao_professor"
          control={control}
          defaultValue=""
          disabled={!isTeacher}
          render={({ field }) => (
            <TextField
              {...field}
              label="Avaliação do Professor"
              variant="filled"
              disabled={!isTeacher()}
              color="error"
              error={!!errors.avaliacao_professor}
              helperText={errors.avaliacao_professor ? "Campo obrigatório" : ""}
            />
          )}
        />

        <SelectUser
          type="studentASB"
          disabledEdit={!!idDaily}
          defaultUser={alunoASB}
          dispach={(user) => {
            setAlunoASB(user);
            setValue("id_aluno_asb", user.id);
          }}
        />
        <SelectUser
          type="studentCD"
          defaultUser={alunoCD}
          disabledEdit={!!idDaily}
          dispach={(user) => {
            setAlunoCD(user);
            setValue("id_aluno_cd", user.id);
          }}
        />
        <SelectUser
          type="teacher"
          disabledEdit={!!idDaily}
          defaultUser={professor}
          dispach={(user) => {
            setProfessor(user);
            setValue("id_professor", user.id);
          }}
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
