export type OlearyFields = {
  id_medical_record?: string;
  ntp: number;
  ntd: number;
  index: number;
  date: string;
  observation?: string;
  url_image: string;
  avaliation: string;
};

export type OlearyUpdateFields = {
  ntp: number;
  ntd: number;
  index: number;
  observation?: string;
  date: string;
  url_image?: string;
  avaliation: string;
};
