import { Box, Button, Fab, Modal } from "@mui/material";
import style from "./SelectPatient.module.css";
import { Fragment, useEffect, useState } from "react";
import usePatient from "../../hooks/usePatient";
import { Patient } from "../../types/Patient";
import PatientCard from "../patient-card/PatientCard";
import useIcons from "../../hooks/useIcons";

interface SelectPatientProps {
  dispach: (idPatient: string) => void;
  open: boolean;
  onClose: () => void;
}

export default function SelectPatient({
  dispach,
  onClose,
  open,
}: SelectPatientProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getAll } = usePatient();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { CheckRoundedIcon, CloseRoundedIcon } = useIcons();

  useEffect(() => {
    async function getPatients() {
      const response = await getAll(page, 10);
      setTotalPages(response.total_pages);
      setPatients([...patients, ...response.results]);
    }
    getPatients();
  }, [page]);

  return (
    <Modal
      className={style["modal-select-patient"]}
      open={open}
      onClose={onClose}
    >
      <>
        <Box className={`${style["modal-select-patient-container"]} container`}>
          <Box className={style["description"]}>
            <Button
              startIcon={<CloseRoundedIcon />}
              onClick={onClose}
              variant="text"
              color="error"
            >
              Fechar
            </Button>
            <h2>Selecione o paciente</h2>
            <small>
              Esse paciente será aquele que você criará o prontuário
            </small>
          </Box>
          {patients.map((patient) => (
            <Fragment key={patient.id}>
              {patient.medicalRecords?.length === 0 && (
                <Button
                  className={style["button-select"]}
                  onClick={() => setSelectedPatient(patient)}
                  key={patient.id}
                >
                  <PatientCard patient={patient} />
                </Button>
              )}
            </Fragment>
          ))}
          {page < totalPages && (
            <Button
              onClick={() => setPage(page + 1)}
              variant="contained"
              color="error"
            >
              Ver mais
            </Button>
          )}
        </Box>
        {selectedPatient && (
          <Fab
            color={"success"}
            variant="extended"
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              gap: "1rem",
            }}
            onClick={() => dispach(selectedPatient?.id || "")}
          >
            <CheckRoundedIcon /> Confirmar
          </Fab>
        )}
      </>
    </Modal>
  );
}
