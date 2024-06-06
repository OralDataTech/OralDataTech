import { PediatricDentistryFields } from "../../pages/PediatricDensitryForm/types/PediatricDentistry";

export type PediatricDentistries = PediatricDentistryFields & {
  id: string;
  created_at: string;
  updated_at: string;
};
