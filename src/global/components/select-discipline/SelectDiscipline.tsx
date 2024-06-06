import { useEffect, useState } from "react";
import style from "./SelectDiscipline.module.css";
import { Box, Button, Fab, Modal } from "@mui/material";
import useDisciplines from "../../hooks/useDisciplines";
import { Discipline } from "../../types/Discipline";
import DisciplineCard from "../discipline-card/DisciplineCard";
import useIcons from "../../hooks/useIcons";

interface SelectDisciplineProps {
  open: boolean;
  onClose: () => void;
  dispach: (id: string) => void;
}
export default function SelectDiscipline({
  dispach,
  onClose,
  open,
}: SelectDisciplineProps) {
  const { getAll } = useDisciplines();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline>();
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const { CheckRoundedIcon, ArrowBackIosIcon } = useIcons();

  useEffect(() => {
    async function fetchDisciplines() {
      const data = await getAll(page, 10);
      setTotalPages(data.total_pages);
      setDisciplines(() => [...disciplines, ...data.results]);
    }
    fetchDisciplines();
  }, [page]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={`container ${style["container-select-discipline"]}`}>
        <Box className={style["head-select-discipline"]}>
          <Button
            startIcon={<ArrowBackIosIcon />}
            onClick={onClose}
            color="error"
          >
            Voltar
          </Button>
          <h2>Selecione a disciplina</h2>
          <p>Para que seja adicionada ao prontuário</p>
        </Box>

        {disciplines.map((discipline: Discipline) => (
          <Box
            key={discipline.id}
            color="success"
            className={`${style["select-discipline-button"]} ${
              discipline.id === selectedDiscipline?.id && style["selected"]
            }`}
            onClick={() => setSelectedDiscipline(discipline)}
          >
            <DisciplineCard
              id={discipline.id}
              discipline={discipline}
              key={discipline.id}
            />
          </Box>
        ))}
        {selectedDiscipline && (
          <Fab
            variant="extended"
            color="success"
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              gap: "1rem",
            }}
            onClick={() => dispach(selectedDiscipline.id)}
          >
            <CheckRoundedIcon />
            Adicionar disciplina
          </Fab>
        )}
        {page < totalPages && (
          <Button
            variant="contained"
            color="error"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Ver mais
          </Button>
        )}
      </Box>
    </Modal>
  );
}
