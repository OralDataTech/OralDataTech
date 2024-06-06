import { Anamnesis } from "./Anamnesis";
import { DailyClinicalProcedurePlanning } from "./DailyClinicalProcedurePlanning";
import { Discipline } from "./Discipline";
import { Endodontic } from "./Endodontic";
import { Exam } from "./Exam";
import { OlearyIndex } from "./OLearyIndex";
import { Odontogram } from "./Odontogram";
import { Patient } from "./Patient";
import { PediatricDentistries } from "./PediatricDentistries";
import { Periodontic } from "./Periodontic";
import { Periogram } from "./Periogram";
import { RiskAssessment } from "./RiskAssessment";
import { TreatmentPlan } from "./TreatmentPlan";
import { User } from "./User";

export type MedicalRecord = {
  id: string;
  user: User;
  number: number;
  patient: Patient;
  created_at: Date;
  updated_at: Date;
  anamnesis: Anamnesis[];
  endodontics: Endodontic[];
  exams: Exam[];
  odontograms: Odontogram[];
  oLearyIndexes: OlearyIndex[];
  treatmentPlans: TreatmentPlan[];
  disciplines: Discipline[];
  periodontics: Periodontic[];
  history: History[];
  pediatricDentistries: PediatricDentistries[];
  dailyClinicalProcedurePlannings: DailyClinicalProcedurePlanning[];
  riskAssessments: RiskAssessment[];
  periograms: Periogram[];
};

export type Signature = {
  name: string;
  date: string;
};

export type History = {
  action: string;
  columns: { name: string; value: string | [] }[];
  date: Date;
  entity: string;
  id: string;
  signature: User | null;
  signatureDate: Date | null;
  medicalRecord: MedicalRecord;
};
