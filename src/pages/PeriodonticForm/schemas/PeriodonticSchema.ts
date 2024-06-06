import * as yup from "yup";

export const PeriodonticSchema = yup.object().shape({
  s1: yup.string().required("Campo obrigatório"),
  s2: yup.string().required("Campo obrigatório"),
  s3: yup.string().required("Campo obrigatório"),
  s4: yup.string().required("Campo obrigatório"),
  s5: yup.string().required("Campo obrigatório"),
  s6: yup.string().required("Campo obrigatório"),
  date: yup.string().required("Campo obrigatório"),
});
