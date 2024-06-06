import {
  Box,
  Button,
  FilledInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import style from "./ChangePassword.module.css";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { ChangePass } from "./types/ChangePass";
import { ChangePassSchema } from "./schemas/ChangePassSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import BackButton from "../../global/components/back-button/BackButton";
import useUsers from "../../global/hooks/useUsers";
import useAuth from "../../global/hooks/useAuth";
import useLoading from "../../global/hooks/useLoading";
import { LoadingButton } from "@mui/lab";

export default function ChangePassword() {
  const [viewPass, setViewPass] = useState(false);
  const { changePassword } = useUsers();
  const { user } = useAuth();
  const { loading } = useLoading();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ChangePass>({
    resolver: yupResolver(ChangePassSchema),
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
      oldPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ChangePass> = (data) => {
    changePassword(user.id, data);
  };

  return (
    <Box
      className={`${style["change-pass-container"]} container`}
      component={"main"}
    >
      <BackButton to="/perfil" />
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <h1>Mudar senha</h1>
        <FormControl variant="filled" className={style["custom-form-group"]}>
          <InputLabel
            htmlFor="outlined-old-pass"
            id="label-old-pass"
            color="error"
          >
            Sua senha
          </InputLabel>
          <Controller
            name="oldPassword"
            control={control}
            render={({ field }) => (
              <>
                <FilledInput
                  id="outlined-old-pass"
                  aria-label="input da antiga senha"
                  type={viewPass ? "text" : "password"}
                  color="error"
                  error={!!errors.oldPassword}
                  {...field}
                ></FilledInput>
                <small>{errors.oldPassword?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl variant="filled" className={style["custom-form-group"]}>
          <InputLabel
            htmlFor="outlined-new-pass"
            id="label-new-pass"
            color="error"
          >
            Nova Senha
          </InputLabel>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <>
                <FilledInput
                  id="outlined-new-pass"
                  aria-label="input da nova senha"
                  type={viewPass ? "text" : "password"}
                  color="error"
                  error={!!errors.newPassword}
                  {...field}
                ></FilledInput>
                <small>{errors.newPassword?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl variant="filled" className={style["custom-form-group"]}>
          <InputLabel
            htmlFor="outlined-repeat-pass"
            id="label-repeat-pass"
            color="error"
          >
            Confirme a senha
          </InputLabel>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <>
                <FilledInput
                  id="outlined-repeat-pass"
                  aria-label="input para repetir senha"
                  type={viewPass ? "text" : "password"}
                  color="error"
                  error={!!errors.confirmPassword}
                  {...field}
                ></FilledInput>
                <small>{errors.confirmPassword?.message}</small>
              </>
            )}
          />
        </FormControl>
        <Button
          variant="text"
          color="error"
          onClick={() => setViewPass(!viewPass)}
        >
          {viewPass ? "Esconder Senha" : "Exibir Senha"}
        </Button>
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
