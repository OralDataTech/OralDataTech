import {
  Box,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import style from "./Login.module.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginValidation } from "./types/LoginValidation";
import { LoginSchema } from "./schemas/LoginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../global/hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import useLoading from "../../global/hooks/useLoading";
import { useState } from "react";
import useIcons from "../../global/hooks/useIcons";
import { Link } from "react-router-dom";
export default function Login() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginValidation>({
    resolver: yupResolver<LoginValidation>(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useAuth();
  const { loading } = useLoading();

  const [showPassword, setShowPassword] = useState(false);
  const { VisibilityOffRoundedIcon, VisibilityRoundedIcon } = useIcons();
  const onSubmit: SubmitHandler<LoginValidation> = (data) => {
    login(data);
  };

  return (
    <Box component={"main"} className={`container ${style["form-container"]}`}>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        className={`${style["form-login"]}`}
      >
        <h1>Login</h1>

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
                  {...field}
                ></FilledInput>
                <small>{errors.email?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl variant="filled" className={style["custom-form-group"]}>
          <InputLabel htmlFor="outlined-pass" id="label-pass" color="error">
            Senha
          </InputLabel>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <>
                <FilledInput
                  id="outlined-pass"
                  aria-label="input de senha"
                  type={showPassword ? "text" : "password"}
                  color="error"
                  error={!!errors.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffRoundedIcon />
                        ) : (
                          <VisibilityRoundedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...field}
                ></FilledInput>
                <small>{errors.password?.message}</small>
              </>
            )}
          />
        </FormControl>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="error"
          type="submit"
        >
          Entrar
        </LoadingButton>
      </Box>
      <Typography
        sx={{
          backgroundColor: "var(--background)",
          padding: "0.3rem",
        }}
      >
        Esqueceu sua senha?{" "}
        <Link to="/redefinir-senha">
          <LoadingButton loading={loading} variant="text" color="error">
            Clique aqui
          </LoadingButton>
        </Link>
      </Typography>
    </Box>
  );
}
