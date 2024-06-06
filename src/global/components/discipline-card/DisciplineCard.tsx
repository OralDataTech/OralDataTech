import { Box } from "@mui/material";
import style from "./DisciplineCard.module.css";
import { Discipline } from "../../types/Discipline";
import useAuth from "../../hooks/useAuth";
import ConfirmModal from "../confirm-action/ConfirmAction";
import { useState } from "react";
import useDisciplines from "../../hooks/useDisciplines";
import MoreOptions from "../more-options/MoreOptions";

interface DisciplineCardProps {
  discipline: Discipline;
  id: number | string;
}

export default function DisciplineCard({
  discipline,
  id,
}: DisciplineCardProps) {
  const { isTeacherOrAdmin } = useAuth();

  const [open, setOpen] = useState(false);
  const { deleteByid, getAbreviation } = useDisciplines();

  async function handleDelete() {
    const response = await deleteByid(discipline.id as string);
    setOpen(false);
    if (response) {
      window.location.reload();
    }
  }

  return (
    <Box key={id} className={`${style["discipline-card"]}`}>
      {isTeacherOrAdmin() && (
        <>
          <ConfirmModal
            onClose={() => setOpen(false)}
            dispach={handleDelete}
            open={open}
            severity="warning"
          />
          <MoreOptions
            sx={{
              position: "absolute",
              right: "0px",
              top: "5px",
            }}
            options={[
              {
                name: "Excluir",
                action: () => setOpen(true),
                isLink: false,
              },
              {
                name: "Editar",
                action: () => {},
                isLink: true,
                to: `/disciplinas/${discipline.id}`,
              },
            ]}
          />
        </>
      )}
      <Box className={style["discipline-card-head"]}>
        <h3>{getAbreviation(discipline.name)}</h3>
        <span>{discipline.name}</span>
      </Box>
      <Box>
        <small>Descrição</small>
        <p
          style={{
            wordWrap: "break-word",
          }}
        >
          {discipline.description}
        </p>
      </Box>
    </Box>
  );
}
