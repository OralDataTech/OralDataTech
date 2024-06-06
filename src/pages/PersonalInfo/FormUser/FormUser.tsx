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
import { yupResolver } from "@hookform/resolvers/yup";
import style from "./FormUser.module.css";
import { useEffect } from "react";
import HeadTitleSection from "../../../global/components/head-section/HeadTitleSection";
import useUsers from "../../../global/hooks/useUsers";
import { PersonalFieldsSchema } from "../schemas/UserFieldsSchema";
import { PersonalFields } from "../types/PersonalFields";
import { useParams } from "react-router-dom";
import useIcons from "../../../global/hooks/useIcons";
import { User } from "../../../global/types/User";
import { LoadingButton } from "@mui/lab";
import useLoading from "../../../global/hooks/useLoading";

export default function FormUser() {
  const { updateUser, getOnById, createUser } = useUsers();
  const { id } = useParams();
  const { loading } = useLoading();
  const { verifyPhotoPath } = useIcons();

  useEffect(() => {
    async function fetch() {
      const response = await getOnById(id as string);
      setValue("email", response.email);
      setValue("name", response.name);
      setValue("role", response.role);
      setValue("gender", response.gender);
      setValue("photo", response.photo || "");
    }
    if (id) {
      fetch();
    }
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(PersonalFieldsSchema),
    defaultValues: {
      email: "",
      gender: "" || "Masculino",
      name: "",
      role: "user",
      photo: "",
    },
  });

  const onSubmit: SubmitHandler<PersonalFields> = (data) => {
    if (id) {
      return updateUser(id as string, data);
    }
    createUser(data);
  };

  return (
    <Box
      className={`${style["personal-infos-container"]}`}
      component={"main"}
      display={"flex"}
    >
      <HeadTitleSection backTo="/usuarios" title="Informações pessoais" />

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
          <Avatar
            alt="foto de perfil"
            src={verifyPhotoPath({ gender: watch("gender") } as User)}
          />
          <TextField
            id="outlined-email"
            aria-label="input de enviar nova imagem"
            type="file"
            color="error"
            sx={{
              width: "80%",
              borderRadius: "5px",
            }}
            disabled
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
                  disabled={!!id}
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
                  error={!!errors.role}
                  {...field}
                  color="error"
                  label="Privilégio"
                >
                  <MenuItem value={"admin"}>Administrador</MenuItem>
                  <MenuItem value={"teacher"}>Professor</MenuItem>
                  <MenuItem value={"user"}>Aluno</MenuItem>
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
                  {...field}
                  color="error"
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
          disabled={loading}
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
