import * as yup from "yup";

export const ChangePassSchema = yup.object().shape({
  oldPassword: yup.string().required("Forneça sua senha"),
  newPassword: yup
    .string()
    .required("Forneça sua nova senha")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),

  confirmPassword: yup
    .string()
    .required("Repita sua nova senha")
    .oneOf([yup.ref("newPassword")], "As senhas devem ser iguais")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
});
