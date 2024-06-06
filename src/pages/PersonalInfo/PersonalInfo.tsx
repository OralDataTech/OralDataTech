import {
  Avatar,
  Box,
  FilledInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PersonalFieldsSchema } from "./schemas/UserFieldsSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../global/hooks/useAuth";
import style from "./PersonalInfo.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import useUsers from "../../global/hooks/useUsers";
import { PersonalFields } from "./types/PersonalFields";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import { LoadingButton } from "@mui/lab";
import useLoading from "../../global/hooks/useLoading";

export default function PersonalInfo() {
  const { user } = useAuth();
  const { loading } = useLoading();
  const { changePhoto, updateUser } = useUsers();
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(PersonalFieldsSchema),
    defaultValues: {
      email: user.email,
      gender: user.gender || "Masculino",
      name: user.name,
      role: user.role || "user",
      photo: user.photo || "",
    },
  });

  useEffect(() => {
    // setValue("photo", user.photo);
    setValue("email", user.email);
    setValue("name", user.name);
    setValue("role", user.role);
    setValue("gender", user.gender);
  }, [user]);

  const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const photo = event.target.files?.[0];
    if (photo) {
      const response = await changePhoto(photo);
      setValue("photo", response);
      setImageUrl(response);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageSrc(reader.result);
        }
      };
      reader.readAsDataURL(photo);
    }
  };

  const onSubmit: SubmitHandler<PersonalFields> = (data) => {
    if (imageUrl) {
      updateUser(user.id, { ...data, photo: imageUrl });
    } else {
      updateUser(user.id, data);
    }
  };

  return (
    <Box
      className={`${style["personal-infos-container"]}`}
      component={"main"}
      display={"flex"}
    >
      <HeadTitleSection
        backTo={`/perfil/${user.id}`}
        title="Informações pessoais"
      />

      <Box
        component={"form"}
        className="container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>Foto do perfil</label>
        <FormControl
          variant="filled"
          className={style["custom-form-group-image"]}
        >
          <Avatar alt="foto de perfil" src={imageSrc ? imageSrc : user.photo} />
          <TextField
            id="outlined-email"
            aria-label="input de enviar nova imagem"
            type="file"
            sx={{
              width: "80%",
              borderRadius: "5px",
            }}
            onChange={handleChangeImage}
          />
        </FormControl>

        {/*  */}

        <FormControl variant="filled" className={style["custom-form-group"]}>
          <InputLabel htmlFor="outlined-email" id="label-email" color="error">
            E-mail
          </InputLabel>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <>
                <FilledInput
                  id="outlined-email"
                  aria-label="input de email"
                  type="text"
                  color="error"
                  error={!!errors.email}
                  disabled
                  {...field}
                ></FilledInput>
                <small>{errors.email?.message}</small>
              </>
            )}
          />
        </FormControl>

        {/*  */}

        <FormControl variant="filled" className={style["custom-form-group"]}>
          <InputLabel htmlFor="outlined-name" id="label-name" color="error">
            Nome
          </InputLabel>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <FilledInput
                  id="outlined-name"
                  aria-label="input de nome"
                  type="text"
                  color="error"
                  error={!!errors.name}
                  {...field}
                ></FilledInput>
                <small>{errors.name?.message}</small>
              </>
            )}
          />
        </FormControl>

        {/*  */}

        <FormControl variant="filled" className={style["custom-form-group"]}>
          <InputLabel htmlFor="outlined-role" id="label-role" color="error">
            Privilégio
          </InputLabel>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <>
                <Select
                  labelId="label-role"
                  id="outlined-role"
                  color="error"
                  error={!!errors.role}
                  {...field}
                  disabled={user.role === "admin" ? false : true}
                  label="Privilégio"
                >
                  <MenuItem value={"admin"}>Administrador</MenuItem>
                  <MenuItem value={"teacher"}>Professor</MenuItem>
                  <MenuItem value={"user"}>Usuário</MenuItem>
                </Select>

                <small>{errors.role?.message}</small>
              </>
            )}
          />
        </FormControl>

        {/*  */}

        <FormControl variant="filled" className={style["custom-form-group"]}>
          <InputLabel htmlFor="outlined-gender" id="label-gender" color="error">
            Gênero
          </InputLabel>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <>
                <Select
                  labelId="label-gender"
                  id="outlined-gender"
                  error={!!errors.gender}
                  color="error"
                  {...field}
                  label="Gênero"
                >
                  <MenuItem value={"Masculino"}>Masculino</MenuItem>
                  <MenuItem value={"Feminino"}>Feminino</MenuItem>
                  <MenuItem value={"Outro"}>Outro</MenuItem>
                </Select>

                <small>{errors.gender?.message}</small>
              </>
            )}
          />
        </FormControl>
        {/*  */}
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
  );
}
