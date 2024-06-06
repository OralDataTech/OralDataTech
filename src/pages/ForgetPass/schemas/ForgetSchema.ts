import * as yup from "yup";

export const ForgetSchema = yup.object().shape({
  email: yup
    .string()
    .email("Formado de email inválido")
    .required("Email é obrigatório"),
});
