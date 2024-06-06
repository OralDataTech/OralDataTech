import { Avatar, Box, Button } from "@mui/material";
import style from "./MedicalRecordBasic.module.css";
import { MedicalRecord } from "../../types/MedicalRecord";
import { CardProperty } from "../card-property/CardProperty";
import useIcons from "../../hooks/useIcons";
import { useNavigate } from "react-router-dom";

interface CardPropertyProps {
  medicalRecord: MedicalRecord;
  showBorder?: boolean;
  showDetails?: boolean;
}

export default function MedicalRecordBasic({
  medicalRecord,
  showBorder = true,
  showDetails = false,
}: CardPropertyProps) {
  const { MaleOutlinedIcon, verifyPhotoPath, AccessibilityNewOutlinedIcon } =
    useIcons();

  const navigate = useNavigate();
  return (
    <Box
      className={style["prontuary"]}
      sx={!showBorder ? { border: "none" } : {}}
    >
      <Box className={style["prontuary-head"]}>
        <Avatar
          alt={medicalRecord.user.name}
          src={verifyPhotoPath(medicalRecord.user)}
          sx={{ width: 50, height: 50 }}
        />
        <Box className={style["prontuary-head-info"]}>
          <p>{medicalRecord.user.name}</p>
          <span>{new Date(medicalRecord.created_at).toLocaleString()}</span>
        </Box>
      </Box>
      <Box className={style["prontuary-body"]}>
        <CardProperty
          title="Paciente"
          value={`${medicalRecord.patient.social_name.substring(0, 7)}...`}
          icon={<AccessibilityNewOutlinedIcon fontSize="large" />}
        />
        <CardProperty
          title="Gênero"
          value={medicalRecord.patient.gender}
          icon={<MaleOutlinedIcon fontSize="large" />}
        />
      </Box>
      {showDetails && (
        <Button
          color="error"
          onClick={() => navigate(`/prontuarios/${medicalRecord.id}`)}
        >
          Detalhes
        </Button>
      )}
    </Box>
  );
}
