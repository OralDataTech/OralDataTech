import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { PatientFields } from "./types/PatientFiels";
import { PatientSchema } from "./schemas/PatientSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import style from "./PatientForm.module.css";
import usePatient from "../../global/hooks/usePatient";
import useLoading from "../../global/hooks/useLoading";
import { LoadingButton } from "@mui/lab";

export default function PatientForm() {
  const { id } = useParams();
  const { getOneById, create, update } = usePatient();
  const { loading } = useLoading();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm<PatientFields>({
    resolver: yupResolver(PatientSchema),
    defaultValues: {
      address: "",
      address_city: "",
      address_complement: "",
      address_neighborhood: "",
      address_number: 0,
      address_uf: "",
      address_zip_code: "",
      cpf: "",
      gender: "Outro",
      issuing_body: "",
      marital_status: "Solteiro",
      name: "",
      naturalness: "",
      phone: "",
      date_of_birth: undefined,
      profession: "",
      rg: "",
      social_name: "",
    },
  });

  useEffect(() => {
    async function getPatient() {
      const patient = await getOneById(id || "");

      const formatted_date_of_birth = patient.date_of_birth ? new Date(patient.date_of_birth).toISOString().split('T')[0] : '';
      // const date_date_of_birth: Date = new Date(formatted_date_of_birth);

      setValue("address", patient.address);
      setValue("address_city", patient.address_city);
      setValue("address_complement", patient.address_complement);
      setValue("address_neighborhood", patient.address_neighborhood);
      setValue("address_number", patient.address_number);
      setValue("address_uf", patient.address_uf);
      setValue("address_zip_code", patient.address_zip_code);
      setValue("cpf", patient.cpf);
      setValue("gender", patient.gender);
      setValue("issuing_body", patient.issuing_body || "");
      setValue("marital_status", patient.marital_status);
      setValue("name", patient.name);
      setValue("naturalness", patient.naturalness);
      setValue("phone", patient.phone);
      setValue("date_of_birth", formatted_date_of_birth);
      setValue("profession", patient.profession);
      setValue("rg", patient.rg || "");
      setValue("sus_card", patient.sus_card || "");
      setValue("social_name", patient.social_name || "");
      console.log(date_date_of_birth);
    }
    if (id) {
      getPatient();
    }
  }, []);

  const onSubmit = async (data: PatientFields) => {
    if (id) {
      return await update(id, data);
    }

    await create(data);
  };

  return (
    <>
      <HeadTitleSection
        title={id ? "Editar Paciente" : "Criar Paciente"}
        backTo="/pacientes"
      />
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component={"form"}
        className={`${style["form-patient"]} container`}
      >
        <p className={style["title-section"]}>Informações Gerais</p>
        <Divider />

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              color="error"
              variant="filled"
              sx={{ width: "100%" }}
              placeholder="Nome do paciente"
              label="Nome do paciente"
              {...field}
              error={!!errors.name}
              onChange={(e) => setValue("name", e.target.value.toUpperCase())}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="social_name"
          control={control}
          render={({ field }) => (
            <TextField
              color="error"
              variant="filled"
              sx={{ width: "100%" }}
              placeholder="Nome social do paciente"
              label="Nome social do paciente"
              {...field}
              error={!!errors.social_name}
              helperText={errors.social_name?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              color="error"
              variant="filled"
              sx={{ width: "100%" }}
              placeholder="Telefone do paciente"
              label="Telefone do paciente"
              error={!!errors.phone}
              {...field}
              helperText={errors.phone?.message}
            />
          )}
        />

        <Controller
          name="date_of_birth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              color="error"
              variant="filled"
              sx={{ width: "100%" }}
              placeholder="Data de nascimento do paciente"
              label="Data de nascimento do paciente"
              error={!!errors.date_of_birth}
              helperText={errors.date_of_birth?.message}
            />
          )}
        />

        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <TextField
              color="error"
              variant="filled"
              placeholder="CPF do paciente"
              label="CPF do paciente"
              sx={{ width: "100%" }}
              error={!!errors.cpf}
              {...field}
              helperText={errors.cpf?.message}
            />
          )}
        />

        <Box className={style["input-group"]}>
          <Controller
            name="rg"
            control={control}
            render={({ field }) => (
              <TextField
                color="error"
                variant="filled"
                placeholder="RG do paciente"
                label="RG do paciente"
                error={!!errors.rg}
                sx={{ width: "100%" }}
                {...field}
                helperText={errors.rg?.message}
              />
            )}
          />

          <Controller
            name="issuing_body"
            control={control}
            render={({ field }) => (
              <TextField
                color="error"
                variant="filled"
                placeholder="Orgão Emissor"
                label="Orgão Emissor"
                error={!!errors.issuing_body}
                sx={{ width: "100%" }}
                {...field}
                helperText={errors.issuing_body?.message}
              />
            )}
          />
        </Box>

        <Controller
          name="sus_card"
          control={control}
          render={({ field }) => (
            <TextField
              color="error"
              variant="filled"
              placeholder="N. Cartão do SUS"
              label="N. Cartão do SUS"
              error={!!errors.sus_card}
              sx={{ width: "100%" }}
              {...field}
              helperText={errors.sus_card?.message}
            />
          )}
        />

        <Controller
          name="naturalness"
          control={control}
          render={({ field }) => (
            <TextField
              color="error"
              variant="filled"
              placeholder="Naturalidade do paciente"
              label="Naturalidade do paciente"
              error={!!errors.naturalness}
              {...field}
              sx={{ width: "100%" }}
              helperText={errors.naturalness?.message}
            />
          )}
        />

        <FormControl sx={{ width: "100%" }} variant="filled">
          <InputLabel htmlFor="outlined-gender" id="label-gender" color="error">
            Gênero
          </InputLabel>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <>
                <Select
                  labelId="label-gender"
                  id="outlined-gender"
                  error={!!errors.gender}
                  variant="filled"
                  color="error"
                  {...field}
                  label="Gênero"
                  defaultValue={"Outro"}
                >
                  <MenuItem value={"Masculino"}>Masculino</MenuItem>
                  <MenuItem value={"Feminino"}>Feminino</MenuItem>
                  <MenuItem value={"Outro"}>Outro</MenuItem>
                </Select>
                <small>{errors.gender?.message}</small>
              </>
            )}
          />
        </FormControl>

        <FormControl sx={{ width: "100%" }} variant="filled">
          <InputLabel
            htmlFor="outlined-estado-civil"
            id="label-estado-civil"
            color="error"
          >
            Estrado Civil
          </InputLabel>

          <Controller
            name="marital_status"
            control={control}
            render={({ field }) => (
              <>
                <Select
                  labelId="label-estado-civil"
                  id="outlined-estado-civil"
                  error={!!errors.marital_status}
                  variant="filled"
                  color="error"
                  {...field}
                  label="Estrado Civil"
                  defaultValue={"Solteiro"}
                >
                  <MenuItem value={"Solteiro"}>Solteiro</MenuItem>
                  <MenuItem value={"Casado"}>Casado</MenuItem>
                  <MenuItem value={"Separado"}>Separado</MenuItem>
                  <MenuItem value={"Divorciado"}>Divorciado</MenuItem>
                  <MenuItem value={"Viúvo"}>Viúvo</MenuItem>
                  <MenuItem value={"Não se aplica"}>Não se aplica</MenuItem>
                </Select>
                <small>{errors.marital_status?.message}</small>
              </>
            )}
          />
        </FormControl>

        <Controller
          name="profession"
          control={control}
          render={({ field }) => (
            <TextField
              color="error"
              variant="filled"
              placeholder="Profissão do paciente"
              label="Profissão do paciente"
              error={!!errors.profession}
              {...field}
              sx={{ width: "100%" }}
              helperText={errors.profession?.message}
            />
          )}
        />

        <p className={style["title-section"]}>Informações de endereço</p>
        <Divider />

        <Box className={style["input-group"]}>
          <Controller
            name="address_zip_code"
            control={control}
            render={({ field }) => (
              <TextField
                color="error"
                variant="filled"
                placeholder="CEP"
                label="CEP"
                error={!!errors.address_zip_code}
                {...field}
                sx={{ width: "100%" }}
                helperText={errors.address_zip_code?.message}
              />
            )}
          />

          <Controller
            name="address_city"
            control={control}
            render={({ field }) => (
              <TextField
                color="error"
                variant="filled"
                placeholder="Cidade"
                label="Cidade"
                error={!!errors.address_city}
                {...field}
                sx={{ width: "100%" }}
                helperText={errors.address_city?.message}
              />
            )}
          />
        </Box>

        <Controller
          name="address_uf"
          control={control}
          render={({ field }) => (
            <TextField
              color="error"
              variant="filled"
              placeholder="Estado"
              label="Estado"
              error={!!errors.address_uf}
              {...field}
              sx={{ width: "100%" }}
              helperText={errors.address_uf?.message}
            />
          )}
        />

        <Controller
          name="address_neighborhood"
          control={control}
          render={({ field }) => (
            <TextField
              color="error"
              variant="filled"
              placeholder="Bairro"
              label="Bairro"
              error={!!errors.address_neighborhood}
              {...field}
              sx={{ width: "100%" }}
              helperText={errors.address_neighborhood?.message}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              color="error"
              variant="filled"
              placeholder="Endereço"
              label="Endereço"
              error={!!errors.address}
              {...field}
              sx={{ width: "100%" }}
              helperText={errors.address?.message}
            />
          )}
        />

        <Box className={style["input-group"]}>
          <Controller
            name="address_number"
            control={control}
            render={({ field }) => (
              <TextField
                color="error"
                variant="filled"
                placeholder="Número"
                label="Número"
                error={!!errors.address_number}
                {...field}
                sx={{ width: "100%" }}
                helperText={errors.address_number?.message}
              />
            )}
          />

          <Controller
            name="address_complement"
            control={control}
            render={({ field }) => (
              <TextField
                color="error"
                variant="filled"
                placeholder="Complemento"
                label="Complemento"
                error={!!errors.address_complement}
                {...field}
                sx={{ width: "100%" }}
                helperText={errors.address_complement?.message}
              />
            )}
          />
        </Box>

        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          color="error"
        >
          Salvar
        </LoadingButton>
      </Box>
    </>
  );
}
