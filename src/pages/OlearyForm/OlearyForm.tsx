import style from "./OlearyForm.module.css";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OlearyFields } from "./types/OlearyFields";
import { OlearySchema } from "./schemas/OlearySchema";
import useIndex from "../../global/hooks/useOleary";
import { ChangeEvent, useEffect, useState } from "react";
import useLoading from "../../global/hooks/useLoading";
import { LoadingButton } from "@mui/lab";
import useIcons from "../../global/hooks/useIcons";
import useUsers from "../../global/hooks/useUsers";

export default function OlearyForm() {
  const { id, idOleary } = useParams();
  const { createIndex, updateIndex, getOneById } = useIndex();
  const { loading } = useLoading();
  const navigate = useNavigate();
  const { changePhoto } = useUsers();
  const [imageUrl, setImageUrl] = useState<string>(
    "../../../public/odontogram.webp"
  );

  const { WarningRoundedIcon, ErrorRoundedIcon, CheckCircleRoundedIcon } =
    useIcons();
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<OlearyFields>({
    resolver: yupResolver(OlearySchema),
    defaultValues: {
      url_image: "",
      date: new Date().toISOString().split("T")[0],
      index: 0,
      ntd: 0,
      ntp: 0,
      avaliation: "extracampo",
      observation: "",
    },
  });

  useEffect(() => {
    async function getOleary() {
      const data = await getOneById(idOleary || "");
      setValue("url_image", data.url_image);
      setValue("date", new Date(data.date).toISOString().split("T")[0]);
      setValue("index", data.index);
      setValue("ntd", data.ntd);
      setValue("ntp", data.ntp);
      setValue("avaliation", data.avaliation);
      setValue("observation", data.observation);
      setImageUrl(data.url_image || "../../../public/odontogram.webp");
    }

    if (idOleary) {
      getOleary();
    }
  }, []);

  const onSubmit = async (data: OlearyFields) => {
    let response = null;

    if (idOleary) {
      response = await updateIndex(idOleary, {
        ...data,
        index: Number(getIndex()),
      });
    } else {
      response = await createIndex({
        ...data,
        index: Number(getIndex()),
        id_medical_record: id,
      });
    }
    if (response) {
      navigate(`/prontuarios/${id}`);
    }
  };

  function getIndex() {
    return ((watch("ntp") * 100) / (watch("ntd") * 4)).toFixed(2) || 0;
  }

  const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const photo = event.target.files?.[0];
    if (photo) {
      const response = await changePhoto(photo);
      setValue("url_image", response);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(photo);
    }
  };

  return (
    <>
      <HeadTitleSection
        title={
          idOleary
            ? "Editar Índice de Placa O'leary"
            : "Criar Índice de Placa O'leary"
        }
        backTo={`/prontuarios/${id}`}
      />
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className={`${style["form-oleary"]} container`}
      >
        <img src={imageUrl} alt="Odontograma" />
        <Box>
          <TextField
            type="file"
            label="Imagem"
            onChange={handleChangeImage}
            variant="standard"
            color="error"
            fullWidth
          />
          <small
            style={{
              color: "#d62f2f",
            }}
          >
            {errors.url_image?.message}
          </small>
        </Box>

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Data"
              variant="filled"
              error={!!errors.date}
              helperText={errors.date?.message}
              color="error"
              type="date"
            />
          )}
        />

        <Controller
          name="ntd"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="NTD"
              variant="filled"
              error={!!errors.ntd}
              helperText={errors.ntd?.message}
              color="error"
              type="number"
            />
          )}
        />

        <Controller
          name="ntp"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="NTP"
              error={!!errors.ntp}
              helperText={errors.ntp?.message}
              variant="filled"
              color="error"
              type="number"
            />
          )}
        />

        <Controller
          name="index"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={getIndex() + "%"}
              disabled
              label="Índice"
              error={!!errors.index}
              helperText={errors.index?.message}
              variant="filled"
              color="error"
              type="text"
            />
          )}
        />

        <ToggleButtonGroup
          color="primary"
          disabled
          value={
            Number(getIndex()) < 20
              ? "Bom"
              : Number(getIndex()) < 50
              ? "Regular"
              : "Ruim"
          }
          className={style["classification"]}
          exclusive
          aria-label="Platform"
        >
          <ToggleButton value="Bom" color="success">
            <CheckCircleRoundedIcon />
            Bom
          </ToggleButton>
          <ToggleButton value="Regular" color="warning">
            <WarningRoundedIcon />
            Regular
          </ToggleButton>
          <ToggleButton value="Ruim" color="error">
            <ErrorRoundedIcon />
            Ruim
          </ToggleButton>
        </ToggleButtonGroup>

        {Number(getIndex()) >= 50 && watch("avaliation") === "intracampo" && (
          <Alert severity="error">
            <strong>Atenção:</strong> Risco Biológico Eminente
          </Alert>
        )}

        <FormControl variant="filled" className={style["custom-form-group"]}>
          <InputLabel
            htmlFor="outlined-avaliation"
            id="label-avaliation"
            color="error"
          >
            Avaliação de campo
          </InputLabel>
          <Controller
            name="avaliation"
            control={control}
            render={({ field }) => (
              <>
                <Select
                  labelId="label-avaliation"
                  id="outlined-avaliation"
                  error={!!errors.avaliation}
                  {...field}
                  color="error"
                  label="Avaliação de campo"
                >
                  <MenuItem value={"extracampo"}>Extracampo</MenuItem>
                  <MenuItem value={"intracampo"}>Intracampo</MenuItem>
                </Select>

                <small>{errors.avaliation?.message}</small>
              </>
            )}
          />
        </FormControl>

        <Controller
          name="observation"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Observações"
              variant="filled"
              error={!!errors.observation}
              helperText={errors.observation?.message}
              color="error"
              type="text"
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
