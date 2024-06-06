import * as yup from "yup";

export const PeriogramSchema = yup.object().shape({
  id_medical_record: yup.string().optional(),
  image: yup.string().required("Campo obrigatório"),
});
