import * as yup from "yup";

export const OlearySchema = yup.object().shape({
  ntp: yup
    .number()
    .min(1, "Valor deve ser superior a 0")
    .required("Campo obrigatório"),
  ntd: yup
    .number()
    .min(1, "Valor deve ser superior a 0")
    .required("Campo obrigatório"),
  index: yup.number().required("Campo obrigatório"),
  date: yup.string().required("Campo obrigatório"),
  url_image: yup.string().required("Imagem é obrigatória"),
  avaliation: yup.string().required("Campo de avaliação obrigatório"),
  observation: yup.string().optional(),
});
