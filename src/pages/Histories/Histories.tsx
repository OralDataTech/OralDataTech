import { Box, Button, MenuItem, Select } from "@mui/material";
import style from "./Histories.module.css";
import HeadTitleSection from "../../global/components/head-section/HeadTitleSection";
import HeaderResults from "../../global/components/header-results/HeaderResults";
import { useEffect, useState } from "react";
import useHistory from "../../global/hooks/useHistory";
import HistoryCard from "../../global/components/history-card/HistoryCard";
import { History } from "../../global/types/MedicalRecord";

export default function Histories() {
  const { getAll, getAllNotCheck } = useHistory();
  const [histories, setHistories] = useState<History[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [type, setType] = useState("Todos");
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    fetchAll();
  }, [page, trigger]);

  async function fetchAll(pageParam?: number) {
    const response =
      type === "Todos"
        ? await getAll(pageParam || page, 10)
        : await getAllNotCheck(pageParam || page, 10);
    const data = response.results;

    if (page === 1 || pageParam === 1) {
      setHistories(data);
    } else {
      setHistories(() => [...histories, ...data]);
    }
    setTotalResults(response.total_results);
    setTotalPages(response.total_pages);
  }

  useEffect(() => {
    fetchAll(1);
    setPage(1);
  }, [type]);

  return (
    <Box component={"main"} className={style["containerHistories"]}>
      <HeadTitleSection backTo="/" title="Histórico" />

      <Box className={`${style["historic"]} container`}>
        <HeaderResults>
          <Select
            color="error"
            sx={{
              width: "40%",
            }}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={"Todos"}>Todos</MenuItem>
            <MenuItem value={"Não Assinados"}>Não Assinados</MenuItem>
          </Select>
          <small>
            {histories.length} resultado(s) de {totalResults} resultado(s)
          </small>
        </HeaderResults>
        {histories.map((history) => (
          <HistoryCard
            dispachTrigger={() => setTrigger(!trigger)}
            history={history}
            key={history.id}
            variant="standard"
          />
        ))}
        {histories && histories.length === 0 && (
          <p>Nenhum resultado encontrado</p>
        )}
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
