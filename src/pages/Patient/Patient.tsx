import { Box, Button } from "@mui/material";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import { useEffect, useState } from "react";
import usePatient from "../../global/hooks/usePatient";
import { Patient as PatientType } from "../../global/types/Patient";
import HeaderResults from "../../global/components/header-results/HeaderResults";
import { Link } from "react-router-dom";
import useIcons from "../../global/hooks/useIcons";
import style from "./Patient.module.css";
import PatientCard from "../../global/components/patient-card/PatientCard";

export default function Patient() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [patients, setPatients] = useState<PatientType[]>([]);
  const { getAll } = usePatient();
  const { AddRoundedIcon } = useIcons();

  useEffect(() => {
    async function fetch() {
      const response = await getAll(page, 10);
      setPatients(() => [...patients, ...response.results]);
      setTotalPages(response.total_pages);
      setTotalResults(response.total_results);
    }
    fetch();
  }, [page]);

  return (
    <>
      <HeadTitleSection title="Pacientes" backTo="/perfil" />
      <Box className={`container ${style["patient-container"]}`}>
        <HeaderResults>
          <Link to={"create"}>
            <Button
              startIcon={<AddRoundedIcon />}
              variant="contained"
              color="error"
            >
              Novo
            </Button>
          </Link>

          <small>
            {patients.length} resultado(s) de {totalResults} resultado(s)
          </small>
        </HeaderResults>
        {patients.map((patient) => (
          <PatientCard showOptions patient={patient} key={patient.id} />
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
    </>
  );
}
