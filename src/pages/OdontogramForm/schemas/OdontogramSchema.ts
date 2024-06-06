import * as yup from "yup";

export const OdontogramSchema = yup.object().shape({
  id_medical_record: yup.string().optional(),
  url_image: yup.string().required("Campo obrigatório"),
  obs: yup.string().required("Campo obrigatório"),
});
