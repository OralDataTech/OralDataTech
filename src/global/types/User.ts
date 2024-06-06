import { MedicalRecord } from "./MedicalRecord";

export type User = {
  id: string;
  email: string;
  name: string;
  photo?: string | undefined;
  role: string;
  gender: string;
  medicalRecords: MedicalRecord[];
  created_at: Date;
  updated_at: Date;
};
