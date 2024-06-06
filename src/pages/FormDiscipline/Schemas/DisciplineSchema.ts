import * as yup from "yup";

export const DisciplineSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  period: yup.string().required("Período é obrigatório"),
  ch: yup.string().required("Carga horária é obrigatório"),
});
