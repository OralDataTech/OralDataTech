import { useState } from "react";
import MoreOptions from "../../../../global/components/more-options/MoreOptions";
import useDisciplines from "../../../../global/hooks/useDisciplines";
import { Discipline } from "../../../../global/types/Discipline";
import style from "./MiniCardDiscipline.module.css";
import { Box } from "@mui/material";
import useMedicalRecord from "../../../../global/hooks/useMedicalRecord";
import ConfirmModal from "../../../../global/components/confirm-action/ConfirmAction";
import useIcons from "../../../../global/hooks/useIcons";

interface MiniCardDisciplineProps {
  discipline: Discipline;
  triggerDispach: (value: boolean) => void;
  trigger: boolean;
  idMedicalRecord: string;
}

export default function MiniCardDiscipline({
  discipline,
  triggerDispach,
  trigger,
  idMedicalRecord,
}: MiniCardDisciplineProps) {
  const { getAbreviation } = useDisciplines();
  const { removeDicipline } = useMedicalRecord();
  const [openModalDiscipline, setOpenModalDiscipline] = useState(false);
  const { CalendarMonthIcon } = useIcons();

  const handleRemoveDiscipline = async (idDiscipline: string) => {
    await removeDicipline(idDiscipline, idMedicalRecord);
    triggerDispach(!trigger);
    setOpenModalDiscipline(false);
  };

  return (
    <Box className={style["discipline-card"]} key={discipline.id}>
      <ConfirmModal
        onClose={() => setOpenModalDiscipline(false)}
        severity="error"
        open={openModalDiscipline}
        dispach={() => handleRemoveDiscipline(discipline.id)}
      />
      <Box className={style["discipline-head"]}>
        <h3 className={style["abreviation"]}>
          {getAbreviation(discipline.name)}
        </h3>
        <Box>
          <p
            style={{
              display: "flex",
              flexWrap: "wrap",
              wordBreak: "break-word",
              width: "90%",
            }}
          >
            {discipline.name}
          </p>
          <small
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            <CalendarMonthIcon />

            {new Date(discipline.created_at).toLocaleDateString()}
          </small>
        </Box>
      </Box>
      <MoreOptions
        sx={{
          position: "absolute",
          top: "0",
          right: "0",
        }}
        options={[
          {
            name: "Remover da lista",
            action: () => setOpenModalDiscipline(true),
            isLink: false,
          },
        ]}
      />
    </Box>
  );
}
