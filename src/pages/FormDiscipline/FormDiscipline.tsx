import { Box, TextField } from "@mui/material";
import style from "./FormDiscipline.module.css";
import { useParams } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DisciplineSchema } from "./Schemas/DisciplineSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import useDisciplines from "../../global/hooks/useDisciplines";
import { DisciplineValidation } from "./types/DisciplineValidation";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import useLoading from "../../global/hooks/useLoading";
import { LoadingButton } from "@mui/lab";

export default function FormDiscipline() {
  const { id } = useParams();
  const { create, getOneByid, update } = useDisciplines();
  const { loading } = useLoading();
  useEffect(() => {
    async function fetchDiscipline() {
      const response = await getOneByid(id || "");
      setValue("name", response.name);
      setValue("description", response.description);
      setValue("period", response.period);
      setValue("ch", response.ch);
    }
    if (id) {
      fetchDiscipline();
    }
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver<DisciplineValidation>(DisciplineSchema),
    defaultValues: {
      name: "",
      description: "",
      period: "",
      ch: "",
    },
  });

  const onSubmit: SubmitHandler<DisciplineValidation> = async (
    data: DisciplineValidation
  ) => {
    if (id) {
      return await update(data, id);
    }
    await create(data);
  };

  return (
    <>
      <HeadTitleSection
        backTo="/disciplinas"
        title={id ? "Editar disciplina" : "Nova disciplina"}
      />
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className={`${style["form-discipline"]} container`}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome"
              variant="filled"
              color="error"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Descrição"
              color="error"
              variant="filled"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        <Controller
          name="ch"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Carga Horária"
              color="error"
              variant="filled"
              error={!!errors.ch}
              helperText={errors.ch?.message}
            />
          )}
        />
        <Controller
          name="period"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Período"
              color="error"
              variant="filled"
              error={!!errors.period}
              helperText={errors.period?.message}
            />
          )}
        />
        <LoadingButton
          loading={loading}
          variant="contained"
          color="error"
          type="submit"
        >
          Salvar
        </LoadingButton>
      </Box>
    </>
  );
}
