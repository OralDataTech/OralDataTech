import { Link, useNavigate, useParams } from "react-router-dom";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import useTreatment from "../../global/hooks/useTreatment";
import style from "./TreatmentForm.module.css";
import { Box, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TreatmentPlanFields } from "./types/TreatmentPlanFields";
import { TreatmentPlanSchema } from "./schemas/TreatmentPlanSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import useLoading from "../../global/hooks/useLoading";

export default function TreatmentForm() {
  const { id, idTreatment } = useParams();
  const { createTreatment, getOneById, updateTreatment } = useTreatment();
  const { loading } = useLoading();
  const navigate = useNavigate();
  const {
    setValue,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<TreatmentPlanFields>({
    resolver: yupResolver(TreatmentPlanSchema),
    defaultValues: {
      clareamento_nao_vital: "",
      clareamento_vital: "",
      endodontias: "",
      exodontias: "",
      id_medical_record: "",
      protese_fixa: "",
      protese_parcial_removivel: "",
      protese_total: "",
      radiografias: "",
      restauracao_amalgama_c1: "",
      restauracao_amalgama_c1_complexa: "",
      restauracao_amalgama_c1_tres_faces: "",
      restauracao_amalgama_c2_duas_faces: "",
      restauracao_div: "",
      restauracao_resina_c1: "",
      restauracao_resina_c1_tres_faces: "",
      restauracao_resina_c2_duas_faces: "",
      restauracao_resina_c4: "",
      restauracao_resina_c5: "",
      restauracao_resina_complexa: "",
      selantes: "",
      tratamento_periodontal: "",
    },
  });

  useEffect(() => {
    async function getTreatment() {
      const response = await getOneById(idTreatment || "");
      setValue("id_medical_record", response.id_medical_record);
      setValue("clareamento_nao_vital", response.clareamento_nao_vital);
      setValue("clareamento_vital", response.clareamento_vital);
      setValue("endodontias", response.endodontias);
      setValue("exodontias", response.exodontias);
      setValue("protese_fixa", response.protese_fixa);
      setValue("protese_parcial_removivel", response.protese_parcial_removivel);
      setValue("protese_total", response.protese_total);
      setValue("radiografias", response.radiografias);
      setValue("restauracao_amalgama_c1", response.restauracao_amalgama_c1);
      setValue(
        "restauracao_amalgama_c1_complexa",
        response.restauracao_amalgama_c1_complexa
      );
      setValue(
        "restauracao_amalgama_c1_tres_faces",
        response.restauracao_amalgama_c1_tres_faces
      );
      setValue(
        "restauracao_amalgama_c2_duas_faces",
        response.restauracao_amalgama_c2_duas_faces
      );
      setValue("restauracao_div", response.restauracao_div);
      setValue("restauracao_resina_c1", response.restauracao_resina_c1);
      setValue(
        "restauracao_resina_c1_tres_faces",
        response.restauracao_resina_c1_tres_faces
      );
      setValue(
        "restauracao_resina_c2_duas_faces",
        response.restauracao_resina_c2_duas_faces
      );
      setValue("restauracao_resina_c4", response.restauracao_resina_c4);
      setValue("restauracao_resina_c5", response.restauracao_resina_c5);
      setValue(
        "restauracao_resina_complexa",
        response.restauracao_resina_complexa
      );
      setValue("selantes", response.selantes);
      setValue("tratamento_periodontal", response.tratamento_periodontal);
    }
    if (idTreatment) {
      getTreatment();
    }
  }, []);

  const onSubmit = async (data: TreatmentPlanFields) => {
    let response = null;
    if (idTreatment) {
      response = await updateTreatment(idTreatment, data);
    } else {
      response = await createTreatment({ ...data, id_medical_record: id });
    }
    if (response) navigate(`/prontuarios/${id}`);
  };

  return (
    <>
      <HeadTitleSection
        backTo={`/prontuarios/${id}`}
        title={idTreatment ? "Editar plano" : "Criar plano"}
      />
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className={`container ${style["form-treatment"]}`}
      >
        <Controller
          name="clareamento_nao_vital"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Clareamento não vital"
              variant="filled"
              color="error"
              error={!!errors.clareamento_nao_vital}
              helperText={errors.clareamento_nao_vital?.message}
            />
          )}
        />

        <Controller
          name="clareamento_vital"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Clareamento vital"
              variant="filled"
              color="error"
              error={!!errors.clareamento_vital}
              helperText={errors.clareamento_vital?.message}
            />
          )}
        />

        <Controller
          name="endodontias"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Endodontias"
              variant="filled"
              color="error"
              error={!!errors.endodontias}
              helperText={errors.endodontias?.message}
            />
          )}
        />

        <Controller
          name="exodontias"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Exodontias"
              variant="filled"
              color="error"
              error={!!errors.exodontias}
              helperText={errors.exodontias?.message}
            />
          )}
        />
        <Controller
          name="protese_fixa"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Prótese Fixa"
              variant="filled"
              color="error"
              error={!!errors.protese_fixa}
              helperText={errors.protese_fixa?.message}
            />
          )}
        />
        <Controller
          name="protese_parcial_removivel"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Prótese Parcial Removível"
              variant="filled"
              color="error"
              error={!!errors.protese_parcial_removivel}
              helperText={errors.protese_parcial_removivel?.message}
            />
          )}
        />
        <Controller
          name="protese_total"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Prótese Total"
              variant="filled"
              color="error"
              error={!!errors.protese_total}
              helperText={errors.protese_total?.message}
            />
          )}
        />
        <Controller
          name="radiografias"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Radiografias"
              variant="filled"
              color="error"
              error={!!errors.radiografias}
              helperText={errors.radiografias?.message}
            />
          )}
        />

        <Controller
          name="restauracao_amalgama_c1"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Restauração Amálgama C1"
              variant="filled"
              color="error"
              error={!!errors.restauracao_amalgama_c1}
              helperText={errors.restauracao_amalgama_c1?.message}
            />
          )}
        />
        <Controller
          name="restauracao_amalgama_c1_complexa"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Restauração Amálgama C1 Complexa"
              variant="filled"
              color="error"
              error={!!errors.restauracao_amalgama_c1_complexa}
              helperText={errors.restauracao_amalgama_c1_complexa?.message}
            />
          )}
        />
        <Controller
          name="restauracao_amalgama_c1_tres_faces"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Restauração Amálgama C1 Três Faces"
              variant="filled"
              color="error"
              error={!!errors.restauracao_amalgama_c1_tres_faces}
              helperText={errors.restauracao_amalgama_c1_tres_faces?.message}
            />
          )}
        />
        <Controller
          name="restauracao_amalgama_c2_duas_faces"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Restauração Amálgama C2 Duas Faces"
              variant="filled"
              color="error"
              error={!!errors.restauracao_amalgama_c2_duas_faces}
              helperText={errors.restauracao_amalgama_c2_duas_faces?.message}
            />
          )}
        />
        <Controller
          name="restauracao_div"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Restauração Div"
              variant="filled"
              color="error"
              error={!!errors.restauracao_div}
              helperText={errors.restauracao_div?.message}
            />
          )}
        />
        <Controller
          name="restauracao_resina_c1"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Restauração Resina C1"
              variant="filled"
              color="error"
              error={!!errors.restauracao_resina_c1}
              helperText={errors.restauracao_resina_c1?.message}
            />
          )}
        />
        <Controller
          name="restauracao_resina_c1_tres_faces"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Restauração Resina C1 Três Faces"
              variant="filled"
              color="error"
              error={!!errors.restauracao_resina_c1_tres_faces}
              helperText={errors.restauracao_resina_c1_tres_faces?.message}
            />
          )}
        />
        <Controller
          name="restauracao_resina_c2_duas_faces"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Restauração Resina C2 Duas Faces"
              variant="filled"
              color="error"
              error={!!errors.restauracao_resina_c2_duas_faces}
              helperText={errors.restauracao_resina_c2_duas_faces?.message}
            />
          )}
        />
        <Controller
          name="restauracao_resina_c4"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Restauração Resina C4"
              variant="filled"
              color="error"
              error={!!errors.restauracao_resina_c4}
              helperText={errors.restauracao_resina_c4?.message}
            />
          )}
        />
        <Controller
          name="restauracao_resina_c5"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Restauração Resina C5"
              variant="filled"
              color="error"
              error={!!errors.restauracao_resina_c5}
              helperText={errors.restauracao_resina_c5?.message}
            />
          )}
        />
        <Controller
          name="restauracao_resina_complexa"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Restauração Resina Complexa"
              variant="filled"
              color="error"
              error={!!errors.restauracao_resina_complexa}
              helperText={errors.restauracao_resina_complexa?.message}
            />
          )}
        />
        <Controller
          name="selantes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Selantes"
              variant="filled"
              color="error"
              error={!!errors.selantes}
              helperText={errors.selantes?.message}
            />
          )}
        />
        <Controller
          name="tratamento_periodontal"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Tratamento Periodontal"
              variant="filled"
              color="error"
              error={!!errors.tratamento_periodontal}
              helperText={errors.tratamento_periodontal?.message}
            />
          )}
        />

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
