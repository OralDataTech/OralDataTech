import * as yup from "yup";

export const PersonalFieldsSchema = yup.object().shape({
  email: yup
    .string()
    .email("Formado de email inválido")
    .required("Email é obrigatório"),
  name: yup.string().required("Nome é obrigatório").max(20, "Nome muito longo"),
  photo: yup.string().optional(),
  role: yup.string().required("Privilégio é obrigatório"),
  gender: yup.string().required("Gênero é obrigatório"),
});
