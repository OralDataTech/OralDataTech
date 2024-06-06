import {
  Box,
  FilledInput,
  FormControl,
  InputLabel,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import style from "./Forget.module.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ForgetValidation } from "./types/ForgetValidation";
import { ForgetSchema } from "./schemas/ForgetSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import useLoading from "../../global/hooks/useLoading";
import { Link } from "react-router-dom";
import useAuth from "../../global/hooks/useAuth";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

export default function ForgetPassForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ForgetValidation>({
    resolver: yupResolver<ForgetValidation>(ForgetSchema),
    defaultValues: {
      email: "",
    },
  });
  const { loading } = useLoading();
  const { forgetPass, resetPass, verifyCode } = useAuth();
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [codeInput, setCodeInput] = useState<string>("");
  const [passInput, setPassInput] = useState<string>("");

  const onSubmit: SubmitHandler<ForgetValidation> = async (data) => {
    const response = await forgetPass(data);
    if (response) {
      setEmail(data.email);
      setStep(1);
    }
  };

  const onSubmitCode = async () => {
    const response = await verifyCode(email, Number(codeInput));
    if (response) {
      setStep(2);
    } else {
      enqueueSnackbar("Código inválido", { variant: "error" });
    }
  };

  const onSubmitPass = async () => {
    await resetPass(email, passInput, Number(codeInput));
  };

  const steps = ["Digite seu e-mail", "Código de verificação", "Nova senha"];

  return (
    <Box component={"main"} className={`container ${style["form-container"]}`}>
      <Stepper
        activeStep={step}
        alternativeLabel
        sx={{
          backgroundColor: "var(--background-glass)",
          borderRadius: "10px",
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid var(--border-glass)",
          color: "error.main",
          "& .MuiStepLabel-label": {
            color: "error.main",
          },
          "& .MuiStepIcon-root": {
            color: "error.main",
          },
          "& .MuiStepIcon-active": {
            color: "var(--primary)",
          },
          "& .MuiStepIcon-completed": {
            color: "error.main",
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={`${style["form-login"]}`}
      >
        <h1>Redefinir senha</h1>

        {step === 0 && (
          <>
            <FormControl
              variant="filled"
              className={style["custom-form-group"]}
            >
              <InputLabel
                htmlFor="outlined-email"
                id="label-email"
                color="error"
              >
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
            <LoadingButton
              loading={loading}
              variant="contained"
              color="error"
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              Enviar código
            </LoadingButton>
          </>
        )}

        {step === 1 && (
          <>
            <FormControl
              variant="filled"
              className={style["custom-form-group"]}
            >
              <InputLabel htmlFor="outlined-cd" id="label-cd" color="error">
                Código
              </InputLabel>
              <FilledInput
                id="outlined-cd"
                aria-label="input de código"
                color="error"
                type="text"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
              ></FilledInput>
            </FormControl>

            <LoadingButton
              loading={loading}
              variant="contained"
              color="error"
              onClick={onSubmitCode}
              type="button"
            >
              Confirmar
            </LoadingButton>
          </>
        )}

        {step === 2 && (
          <>
            <FormControl
              variant="filled"
              className={style["custom-form-group"]}
            >
              <InputLabel htmlFor="outlined-cd" id="label-pass" color="error">
                Senha
              </InputLabel>
              <FilledInput
                id="outlined-pass"
                aria-label="input de senha"
                type="text"
                color="error"
                value={passInput}
                error={passInput.length < 8 ? true : false}
                onChange={(e) => setPassInput(e.target.value)}
              ></FilledInput>
              <small>
                {passInput.length < 8
                  ? "A senha deve ter no mínimo 8 caracteres"
                  : ""}
              </small>
            </FormControl>

            <LoadingButton
              loading={loading}
              variant="contained"
              color="error"
              onClick={() => {
                passInput.length < 8 ? () => {} : onSubmitPass();
              }}
            >
              Confirmar
            </LoadingButton>
          </>
        )}
      </Box>
      <Typography
        sx={{
          borderRadius: "1rem",
          padding: "0.3rem",
        }}
      >
        Voltar para o login?{" "}
        <Link to="/login">
          <LoadingButton loading={loading} variant="text" color="error">
            Clique aqui
          </LoadingButton>
        </Link>
      </Typography>
    </Box>
  );
}
