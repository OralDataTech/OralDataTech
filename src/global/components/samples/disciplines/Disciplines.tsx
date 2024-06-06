import { Box, Skeleton } from "@mui/material";
import style from "./Disciplines.module.css";
import { Discipline } from "../../../types/Discipline";
import { useEffect, useState } from "react";
import useDisciplines from "../../../hooks/useDisciplines";
import DisciplineCard from "../../discipline-card/DisciplineCard";
import { Link } from "react-router-dom";
import useLoading from "../../../hooks/useLoading";

export default function Disciplines() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const { getAll } = useDisciplines();
  const { loading } = useLoading();
  useEffect(() => {
    async function fetchAll() {
      const data = (await getAll(1, 2)).results;
      setDisciplines(data);
    }
    fetchAll();
  }, []);

  return (
    <Box
      component={"section"}
      className={`${style["disciplines"]} custom-section`}
    >
      <Box className={style["title-section"]}>
        <p>Disciplinas</p>
        <Link to={"/disciplinas"}>Ver mais</Link>
      </Box>
      <Box className={style["disciplines-container"]}>
        {loading && <Skeleton width={"100%"} height={200} />}
        {!loading &&
          disciplines.map((discipline, k) => (
            <DisciplineCard id={k} discipline={discipline} key={k} />
          ))}
      </Box>
    </Box>
  );
}
