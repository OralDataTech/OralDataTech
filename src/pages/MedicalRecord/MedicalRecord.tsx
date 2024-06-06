import { Box, Button } from "@mui/material";
import style from "./MedicalRecord.module.css";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import { useEffect, useState } from "react";
import useMedicalRecord from "../../global/hooks/useMedicalRecord";
import { MedicalRecord } from "../../global/types/MedicalRecord";
import MedicalRecordCard from "../../global/components/medical-record-card/MedicalRecordCard";
import useIcons from "../../global/hooks/useIcons";
import HeaderResults from "../../global/components/header-results/HeaderResults";
import useAuth from "../../global/hooks/useAuth";
import SelectPatient from "../../global/components/select-patient/SelectPatient";
import { useNavigate } from "react-router-dom";

export default function MedicalRecordPage() {
  const { getAll, create } = useMedicalRecord();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const { AddRoundedIcon } = useIcons();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    async function getMedicalRecords() {
      const response = await getAll(page, 10);
      setTotalPages(response.total_pages);
      setTotalResults(response.total_results);
      setMedicalRecords([...medicalRecords, ...response.results]);
    }
    getMedicalRecords();
  }, []);

  async function newMedicalRecord() {
    setOpen(true);
  }

  async function handleSelectPatient(patientId: string) {
    setOpen(false);
    const medicalRecord = await create(patientId, user.id);
    navigate(`${medicalRecord.id}`);
  }

  return (
    <>
      <HeadTitleSection title="Prontuários" backTo="/" />
      <SelectPatient
        open={open}
        onClose={() => setOpen(false)}
        dispach={handleSelectPatient}
      />
      <Box className={`${style["medical-record-container"]} container`}>
        <HeaderResults>
          <Button
            variant="contained"
            color="error"
            startIcon={<AddRoundedIcon />}
            onClick={newMedicalRecord}
          >
            Novo
          </Button>
          <small>
            {medicalRecords.length} resultado(s) de {totalResults} resultado(s)
          </small>
        </HeaderResults>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {medicalRecords.map((record) => (
            <MedicalRecordCard key={record.id} medicalRecord={record} />
          ))}
        </Box>

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
    </>
  );
}
