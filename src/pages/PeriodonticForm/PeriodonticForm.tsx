import { Link, useNavigate, useParams } from "react-router-dom";
import usePeriodontics from "../../global/hooks/usePeriodontic";
import { Controller, useForm } from "react-hook-form";
import { PeriodonticSchema } from "./schemas/PeriodonticSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import { Box, TextField } from "@mui/material";
import style from "./PeriodonticForm.module.css";
import { useEffect } from "react";
import { PeriodonticFields } from "./types/PeriodonticFields";
import useLoading from "../../global/hooks/useLoading";
import { LoadingButton } from "@mui/lab";

export default function PeriodonticForm() {
  const { id, idPeriodontic } = useParams();
  const navigate = useNavigate();
  const { getOneById, createPeriodontics, updatePeriodontics } =
    usePeriodontics();
  const { loading } = useLoading();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<PeriodonticFields>({
    resolver: yupResolver(PeriodonticSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      s1: "",
      s2: "",
      s3: "",
      s4: "",
      s5: "",
      s6: "",
    },
  });

  useEffect(() => {
    async function fetchPeriodontic() {
      const data = await getOneById(idPeriodontic || "");
      setValue("date", new Date(data.date).toISOString().split("T")[0]);
      setValue("s1", data.s1);
      setValue("s2", data.s2);
      setValue("s3", data.s3);
      setValue("s4", data.s4);
      setValue("s5", data.s5);
      setValue("s6", data.s6);
    }
    if (idPeriodontic) {
      fetchPeriodontic();
    }
  }, []);

  const onSubmit = async (data: PeriodonticFields) => {
    let response = null;
    if (idPeriodontic) {
      response = await updatePeriodontics(idPeriodontic, {
        ...data,
      });
    } else {
      response = await createPeriodontics({ ...data, id_medical_record: id });
    }
    if (response) navigate(`/prontuarios/${id}`);
  };

  return (
    <>
      <HeadTitleSection
        title={idPeriodontic ? "Editar periodontia" : "Criar Periodontia"}
        backTo={`/prontuarios/${id}`}
      />
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className={`container ${style["periodontic-form"]}`}
      >
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <TextField label="Data" type="date" variant="filled" {...field} />
          )}
        />
        <Box className={style["input-tree-group"]}>
          <Controller
            name="s1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Sextante 1"
                variant="filled"
                color="error"
                fullWidth
                error={!!errors.s1}
                helperText={errors.s1?.message}
              />
            )}
          />
          <Controller
            name="s2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Sextante 2"
                variant="filled"
                color="error"
                fullWidth
                error={!!errors.s2}
                helperText={errors.s2?.message}
              />
            )}
          />
          <Controller
            name="s3"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Sextante 3"
                variant="filled"
                color="error"
                fullWidth
                error={!!errors.s3}
                helperText={errors.s3?.message}
              />
            )}
          />
        </Box>
        <Box className={style["input-tree-group"]}>
          <Controller
            name="s4"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Sextante 4"
                variant="filled"
                color="error"
                fullWidth
                error={!!errors.s4}
                helperText={errors.s4?.message}
              />
            )}
          />
          <Controller
            name="s5"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Sextante 5"
                variant="filled"
                color="error"
                fullWidth
                error={!!errors.s5}
                helperText={errors.s5?.message}
              />
            )}
          />
          <Controller
            name="s6"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Sextante 6"
                variant="filled"
                color="error"
                fullWidth
                error={!!errors.s6}
                helperText={errors.s6?.message}
              />
            )}
          />
        </Box>
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
