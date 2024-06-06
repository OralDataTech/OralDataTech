import { Alert, Box } from "@mui/material";
import style from "./MedicalRecordCard.module.css";
import { MedicalRecord } from "../../types/MedicalRecord";
import MedicalRecordBasic from "../medical-record-basic-infos/MedicalRecordBasic";
import CheckStep from "../check-step/CheckStep";
import MoreOptions from "../more-options/MoreOptions";
import useMedicalRecord from "../../hooks/useMedicalRecord";
import ConfirmModal from "../confirm-action/ConfirmAction";
import { useState } from "react";

interface CardPropertyProps {
  medicalRecord: MedicalRecord;
  showOptions?: boolean;
}

export default function MedicalRecordCard({
  medicalRecord,
  showOptions = true,
}: CardPropertyProps) {
  const [open, setOpen] = useState(false);
  const { remove } = useMedicalRecord();
  const checkExistance = (value: unknown[]) => {
    return value && value.length > 0;
  };

  const handleDeleteMedicalRecord = () => {
    remove(medicalRecord.id);
  };

  const verifyIsRiskInOleary = () => {
    return (
      medicalRecord &&
      medicalRecord?.oLearyIndexes.filter(
        (oleary) =>
          Number(oleary.index) >= 50 && oleary.avaliation === "intracampo"
      ).length > 0
    );
  };

  return (
    <>
      <Box className={style["full-medical-record"]}>
        {showOptions && (
          <>
            <ConfirmModal
              dispach={handleDeleteMedicalRecord}
              onClose={() => setOpen(false)}
              open={open}
              severity="error"
            />

            <MoreOptions
              sx={{
                position: "absolute",
                right: "1rem",
                top: "1rem",
              }}
              options={[
                {
                  isLink: true,
                  name: "Editar",
                  action: () => {},
                  to: `${medicalRecord.id}`,
                },
                {
                  name: "Excluir",
                  action: () => setOpen(true),
                  isLink: false,
                },
              ]}
            />
          </>
        )}

        <MedicalRecordBasic showBorder={false} medicalRecord={medicalRecord} />
        <Box className={style["medical-record-steps"]}>
          <CheckStep
            title={`Exames (${medicalRecord.exams.length})`}
            check={checkExistance(medicalRecord.exams)}
          />
          <CheckStep
            title={`Anamnese (${medicalRecord.anamnesis.length})`}
            check={checkExistance(medicalRecord.anamnesis)}
          />
          <CheckStep
            title={`Disciplinas (${medicalRecord.disciplines.length})`}
            check={checkExistance(medicalRecord.disciplines)}
          />
          <CheckStep
            title={`Endodontia (${medicalRecord.endodontics.length})`}
            check={checkExistance(medicalRecord.endodontics)}
          />
          <CheckStep
            title={`Odontograma (${medicalRecord.odontograms.length})`}
            check={checkExistance(medicalRecord.odontograms)}
          />
          <CheckStep
            title={`Periodontia (${medicalRecord.periodontics.length})`}
            check={checkExistance(medicalRecord.periodontics)}
          />
          <CheckStep
            title={`Periograma (${
              medicalRecord.periograms?.length || 0
            })`}
            check={checkExistance(medicalRecord.periograms)}
          />
          <CheckStep
            title={`Índice O'Leary (${medicalRecord.oLearyIndexes.length})`}
            check={checkExistance(medicalRecord.oLearyIndexes)}
          />
          <CheckStep
            title={`Plano de Tratamento (${medicalRecord.treatmentPlans.length})`}
            check={checkExistance(medicalRecord.treatmentPlans)}
          />
          <CheckStep
            title={`Odontopediatria (${
              medicalRecord.pediatricDentistries?.length || 0
            })`}
            check={checkExistance(medicalRecord.pediatricDentistries)}
          />
          <CheckStep
            title={`Planejamento de procedimento clínico diário (${
              medicalRecord.dailyClinicalProcedurePlannings?.length || 0
            })`}
            check={checkExistance(
              medicalRecord.dailyClinicalProcedurePlannings
            )}
          />

          <CheckStep
            title={`Avaliação de risco (${
              medicalRecord.riskAssessments?.length || 0
            })`}
            check={checkExistance(medicalRecord.riskAssessments)}
          />
        </Box>
        <Box padding={"1rem"}>
          {verifyIsRiskInOleary() && (
            <Alert severity="error">
              <strong>Atenção</strong>, nesse prontuário há um ou mais índices
              de placa O'leary com <strong>ALTO RISCO BIOLÓGICO</strong>.
            </Alert>
          )}
        </Box>
      </Box>
    </>
  );
}
