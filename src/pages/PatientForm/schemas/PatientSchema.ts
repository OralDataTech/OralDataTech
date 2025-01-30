import * as yup from "yup";

export const PatientSchema = yup.object().shape({
  address: yup.string().required("O endereço é obrigatório"),
  address_city: yup.string().required("A cidade é obrigatória"),
  address_complement: yup.string().required("O complemento é obrigatório"),
  address_neighborhood: yup.string().required("O bairro é obrigatório"),
  address_number: yup.number().required("O número é obrigatório"),
  address_uf: yup.string().required("O estado é obrigatório"),
  address_zip_code: yup
    .string()
    .required("O CEP é obrigatório")
    .max(8, "O CEP deve ter 8 dígitos")
    .min(8, "O CEP deve ter 8 dígitos")
    .matches(/^\d+$/, "O CEP deve conter apenas números"),
  cpf: yup
    .string()
    .required("O CPF é obrigatório")
    .max(11, "O CPF deve ter 11 dígitos")
    .min(11, "O CPF deve ter 11 dígitos")
    .matches(/^\d+$/, "O CPF deve conter apenas números"),
  gender: yup.string().required("O gênero é obrigatório"),
  issuing_body: yup.string().optional(),
  marital_status: yup.string().required("O estado civil é obrigatório"),
  name: yup
    .string()
    .required("O nome é obrigatório")
    .transform((_, originalValue) =>
      originalValue ? originalValue.toUpperCase() : ""
    ),
  social_name: yup.string().required("O nome social é obrigatório"),
  naturalness: yup.string().required("A naturalidade é obrigatória"),
  phone: yup
    .string()
    .required("O telefone é obrigatório")
    .matches(/^\d+$/, "O telefone deve conter apenas números")
    .min(11, "O telefone deve ter no mínimo 11 dígitos")
    .max(11, "O telefone deve ter no máximo 11 dígitos"),
  date_of_birth: yup
    .date()
    .required("A data de nascimento é obrigatória")
    .test("isNotFutureDate", "A data de nascimento não pode ser no futuro", (value) => {
      return value <= new Date();
    })
    .transform((value) => {
      // Verifica se a string pode ser convertida para uma data válida
      if (typeof value === 'string') {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date; // Retorna um objeto Date
        }
      }
      return value; // Retorna o valor original caso a data seja inválida
    }),  
  profession: yup.string().required("A profissão é obrigatória"),
  rg: yup.string().optional(),
  sus_card: yup.string().optional(),
});
