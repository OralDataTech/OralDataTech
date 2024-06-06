import { MedicalRecord } from "./MedicalRecord";

export type Patient = {
  address: string;
  address_city: string;
  address_complement: string;
  address_neighborhood: string;
  address_number: number;
  address_uf: string;
  address_zip_code: number;
  cpf: number;
  sus_card: string;
  created_at: Date;
  gender: string;
  id: string;
  issuing_body: string;
  marital_status: string;
  social_name: string;
  name: string;
  naturalness: string;
  medicalRecords: MedicalRecord[];
  phone: string;
  profession: string;
  rg: string;
  updated_at: Date;
};
