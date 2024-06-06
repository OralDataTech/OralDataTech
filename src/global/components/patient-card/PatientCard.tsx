import { Avatar, Box } from "@mui/material";
import style from "./PatientCard.module.css";
import { Patient } from "../../types/Patient";
import { CardProperty } from "../card-property/CardProperty";
import useIcons from "../../hooks/useIcons";
import MoreOptions from "../more-options/MoreOptions";
import usePatient from "../../hooks/usePatient";
import ConfirmModal from "../confirm-action/ConfirmAction";
import { useState } from "react";

interface PatientCardProps {
  patient: Patient;
  showOptions?: boolean;
}
export default function PatientCard({
  patient,
  showOptions,
}: PatientCardProps) {
  const { deletePatient } = usePatient();
  const [open, setOpen] = useState(false);
  const {
    LocalPhoneRoundedIcon,
    BrandingWatermarkRoundedIcon,
    verifyPatientPhotoPath,
  } = useIcons();

  const handleDelete = async () => {
    await deletePatient(patient.id);
    setOpen(false);
  };

  return (
    <Box className={style["patient-card"]}>
      <ConfirmModal
        dispach={handleDelete}
        onClose={() => setOpen(false)}
        open={open}
        severity="error"
      />
      <Box className={style["patient-card-head"]}>
        <Avatar src={verifyPatientPhotoPath(patient.gender)} />
        <Box>
          <h4>{patient.name}</h4>
          <small>Nome</small>
        </Box>
        {showOptions && (
          <MoreOptions
            options={[
              {
                name: "Editar",
                action: () => {},
                isLink: true,
                to: `${patient.id}`,
              },
              {
                name: "Excluir",
                action: () => setOpen(true),
                isLink: false,
              },
            ]}
          />
        )}
      </Box>

      <Box className={style["patient-card-body"]}>
        <CardProperty
          icon={<LocalPhoneRoundedIcon />}
          title="Telefone"
          value={patient.phone}
        />
        <CardProperty
          icon={<BrandingWatermarkRoundedIcon />}
          title="CPF"
          value={`${patient.cpf}`}
        />
      </Box>
    </Box>
  );
}
