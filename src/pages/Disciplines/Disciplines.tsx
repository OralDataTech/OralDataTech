import { Box, Button } from "@mui/material";
import style from "./Disciplines.module.css";
import useDisciplines from "../../global/hooks/useDisciplines";
import { useEffect, useState } from "react";
import { Discipline } from "../../global/types/Discipline";
import DisciplineCard from "../../global/components/discipline-card/DisciplineCard";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import { Link } from "react-router-dom";
import useIcons from "../../global/hooks/useIcons";
import useAuth from "../../global/hooks/useAuth";
import HeaderResults from "../../global/components/header-results/HeaderResults";
export default function Disciplines() {
  const { getAll } = useDisciplines();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { AddRoundedIcon } = useIcons();
  const [totalResults, setTotalResults] = useState(0);
  const { isAdmin, isTeacher } = useAuth();

  useEffect(() => {
    async function fetchAll() {
      const response = await getAll(page, 10);
      const data = response.results;
      setDisciplines(() => [...disciplines, ...data]);
      setTotalResults(response.total_results);
      setTotalPages(response.total_pages);
    }
    fetchAll();
  }, [page]);

  const isAdminOrTeacher = isAdmin() || isTeacher();

  return (
    <Box component={"main"} className={style["containerDisciplines"]}>
      <HeadTitleSection backTo="/" title="Disciplinas" />
      <Box className={`${style["disciplines"]} container`}>
        <HeaderResults>
          {isAdminOrTeacher && (
            <Link to={"create"}>
              <Button
                startIcon={<AddRoundedIcon />}
                variant="contained"
                color="error"
              >
                Nova
              </Button>
            </Link>
          )}

          <small>
            {disciplines.length} resultado(s) de {totalResults} resultado(s)
          </small>
        </HeaderResults>
        {disciplines.map((discipline, k) => (
          <DisciplineCard key={k} discipline={discipline} id={discipline.id} />
        ))}
      </Box>
      {page < totalPages && (
        <Button
          color="error"
          variant="contained"
          onClick={() => setPage(page + 1)}
        >
          Carregar mais
        </Button>
      )}
    </Box>
  );
}
