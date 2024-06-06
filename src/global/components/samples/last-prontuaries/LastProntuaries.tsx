import { Box, Skeleton } from "@mui/material";
import style from "./LastProntuaries.module.css";
import useMedicalRecord from "../../../hooks/useMedicalRecord";
import { useEffect, useState } from "react";
import { MedicalRecord } from "../../../types/MedicalRecord";
import { Link } from "react-router-dom";
import MedicalRecordBasic from "../../medical-record-basic-infos/MedicalRecordBasic";
import useLoading from "../../../hooks/useLoading";

export default function LastProntuaries() {
  const { getAll } = useMedicalRecord();
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord[]>([]);
  const { loading } = useLoading();
  useEffect(() => {
    async function getProntuaries() {
      const prontuaries: MedicalRecord[] = (await getAll(1, 1)).results;
      setMedicalRecord(prontuaries);
    }
    getProntuaries();
  }, []);

  return (
    <Box
      component={"section"}
      className={`${style["last-prontuaries"]} custom-section`}
    >
      <Box className={style["title-section"]}>
        <p>Ultimos Prontuários</p>
        <Link to="/prontuarios">Ver mais</Link>
      </Box>
      {/* <Divider /> */}
      <Box className={style["prontuaries"]}>
        {loading && (
          <Skeleton
            sx={{
              margin: "1rem 0",
            }}
            width={300}
            height={80}
            variant="rectangular"
          />
        )}
        {medicalRecord.map((record) => (
          <MedicalRecordBasic
            showDetails
            medicalRecord={record}
            key={record.id}
          />
        ))}
      </Box>
    </Box>
  );
}
