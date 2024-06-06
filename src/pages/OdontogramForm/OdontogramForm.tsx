import style from "./OdontogramForm.module.css";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { OdontogramFields } from "./types/OdontogramFields";
import { OdontogramSchema } from "./schemas/OdontogramSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Textarea from "@mui/joy/Textarea";
import { ChangeEvent, useEffect, useState } from "react";
import useUsers from "../../global/hooks/useUsers";
import useOdontogram from "../../global/hooks/useOdontogram";
import useLoading from "../../global/hooks/useLoading";
import { LoadingButton } from "@mui/lab";

export default function OdontogramForm() {
  const { id, idOdontogram } = useParams();
  const [imageUrl, setImageUrl] = useState<string>(
    "../../../public/odontogram.webp"
  );
  const { changePhoto } = useUsers();
  const navigate = useNavigate();
  const { createOdontogram, updateOdontogram, getOneById } = useOdontogram();
  const { loading } = useLoading();
  const {
    formState: { errors },
    setValue,
    handleSubmit,
    control,
  } = useForm<OdontogramFields>({
    resolver: yupResolver(OdontogramSchema),
    defaultValues: {
      obs: "",
      url_image: "",
    },
  });

  useEffect(() => {
    async function getOdontogram() {
      const data = await getOneById(idOdontogram || "");
      setValue("obs", data.obs);
      setValue("url_image", data.url_image);
      setImageUrl(data.url_image || "../../../public/odontogram.webp");
    }
    if (idOdontogram) {
      getOdontogram();
    }
  }, []);

  const onSubmit = async (data: OdontogramFields) => {
    let response = null;
    if (idOdontogram) {
      response = await updateOdontogram(idOdontogram, data);
    } else {
      response = await createOdontogram({ ...data, id_medical_record: id });
    }
    if (response) navigate(`/prontuarios/${id}`);
  };

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
        title={idOdontogram ? "Editar Odontograma" : "Criar Odontograma"}
        backTo={`/prontuarios/${id}`}
      />
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className={`${style["form-odontogram"]} container`}
      >
        <img src={imageUrl} alt="Odontograma" />
        <small>
          Faça upload da imagem para que seu odontograma apareça aqui
        </small>

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
            {!errors.url_image?.message}
          </small>
        </Box>

        <Controller
          control={control}
          name="obs"
          render={({ field }) => (
            <>
              <Textarea
                color="danger"
                error={!!errors.obs}
                {...field}
                minRows={4}
                variant="outlined"
                placeholder="Obsevações adicionais"
              />
              <small>{errors.obs?.message}</small>
            </>
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
